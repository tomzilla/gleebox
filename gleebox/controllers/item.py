import time, hashlib, urllib2, simplejson, base64

from pyramid_handlers import action
from pyramid.response import Response

from . import *
from gleebox.lib import account, aws, item
from gleebox.models import couchbase, Item as ItemModel, User
from gleebox import models

class Item(BaseController):

    @action(renderer='item/create.mako')
    def create_test(self):
        return {}

    @action(renderer='json')
    @authed_api
    def create(self):
        title, price = self.required_params(['title', 'price'])
        user = account.get(self.user_id)
        longitude, latitude, place_ref, place_name, address = self.optional_params(['longitude', 'latitude', 'place_ref', 'place_name', 'formatted_address'])
        new_item = ItemModel.create(self.user_id, title, price=price, loc=[longitude, latitude], place_name=place_name, place_ref=place_ref, address=address)

        if 'picture' in self.request.POST:
            extension = self.request.POST['picture'].filename.split('.')[-1]
            sha = hashlib.sha224('%s_%s_%s' % (new_item['id'], 0, '*&(##BD!@'))
            image_key = sha.hexdigest() + '.' + extension
            input_file = self.request.POST['picture'].file
            content_type = self.request.POST['picture'].type
            aws.s3_upload_file(input_file, content_type, image_key, 'gleebox_items',)
            new_item['pictures'].append(image_key)
            new_item.save()

        return {'item': new_item.data}

    @action(renderer='json')
    @authed_api
    def unfav(self):
        #go directly to couchbase for now
        user = account.get(self.user_id)
        user.setdefault('favs', [])
        item_id, = self.required_params(['item_id'])
        increment = 1
        if str(item_id) in user['favs']:
            user['favs'].remove(str(item_id))
            user.save()

            timeblock = int(time.time() / (60 * 30))
            key = 'favsblock_%s_%s' % (item_id, timeblock)
            current_block = models.couchbase.get('INTERNAL_%s' % key)
            if current_block and current_block[2] > 0:
                val, cas = models.couchbase.decr('INTERNAL_%s' % key , increment, 0)
                models.couchbase.set(key, 0, 0, {'value': val, 'item_id':item_id, 'time_block': timeblock})

            key = 'favs_%s' % (item_id)
            val, cas = models.couchbase.decr('INTERNAL_%s' % key, increment, 0)
            models.couchbase.set(key, 0, 0, {'value': val, 'item_id':item_id})

        return {'success': True}


    @action(renderer='json')
    @authed_api
    def fav(self):
        #go directly to couchbase for now
        user = account.get(self.user_id)
        user.setdefault('favs', [])
        item_id, = self.required_params(['item_id'])
        fav = int(self.request.params.get('fav'))
        print fav, type(fav)
        if not fav:
            return self.unfav()
        increment = 1
        if item_id not in user['favs']:
            user['favs'].append(str(item_id))
            user.save()

            timeblock = int(time.time() / (60 * 30))
            key = 'favsblock_%s_%s' % (item_id, timeblock)
            val, cas = models.couchbase.incr('INTERNAL_%s' % key , 1, 0)
            models.couchbase.set(key, 0, 0, {'value': val, 'item_id':item_id, 'time_block': timeblock})

            key = 'favs_%s' % (item_id)
            val, cas = models.couchbase.incr('INTERNAL_%s' % key, increment, 0)
            models.couchbase.set(key, 0, 0, {'value': val, 'item_id':item_id})

        return {'success': True}

    @action(renderer='json')
    @api
    def get_home_items(self):
        limit = 20
        offset = self.request.params.get('offset', 0)
        view = models.couchbase.view('_design/search/_view/all_items', limit=limit, skip=offset, descending=True)
        ret = []
        for v in view:
            ret.append(v['value'])

        ret = item.append_summary_info(ret)

        return {'items': ret}

    @action(renderer='json')
    @api
    def get(self):
        item_id, = self.required_params(['item_id'])
        item_obj = ItemModel.find(item_id)

        return {'item': item_obj.data}

    @action(renderer='json')
    @api
    def get_comments(self):
        item_id, = self.required_params(['item_id'])
        comments = models.couchbase.view('_design/search/_view/comments_for_item', key=str(item_id))
        users = {}
        ret = []
        for comment in comments:
            user_id = comment['value']['user_id']
            if user_id not in users:
                user = models.User.find(user_id).data
                name = user.get('display_name')
                if not name:
                    name = '%s %s' % (user.get('first_name', ''), user.get('last_name', ''))
                user = {
                        'id': user_id,
                        'display_name': name,
                        'fbid': user.get('fbid')
                        }

                users[user_id] = user
            comment['value']['user'] = users[user_id]
            del(comment['value']['user_id'])
            del(comment['value']['item_id'])
            ret.append(comment['value'])
        return ret
