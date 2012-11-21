import time

from pyramid_handlers import action
from pyramid.response import Response

from . import *
from gleebox.models import couchbase

class Item(BaseController):

    @action(renderer='json')
    @authed_api
    def create(self):
        title, price = self.required_params(['title', 'price'])
        blob = {}
        return {'item': blob}
    @action(renderer='json')
    @authed_api
    def fav(self):
        #go directly to couchbase for now
        user = User.get(self.user_id)
        user.setdefault('favs', [])
        if item_id not in user['favs']:
            user['favs'].append(item_id)
            user.save()

            item_id = self.required_params(['item_id'])
            timeblock = int(time.time() / (60 * 30))
            key = 'favsblock_%s_%s' % (item_id, timeblock)
            val, cas = couchbase.incr('INTERNAL_%s' % key , 1, 0)
            couchbase.set(key, 0, 0, {'value': val, 'item_id':item_id, 'time_block': timeblock})

            key = 'favs_%s' % (item_id)
            var, cas = couchbase.incr('INTERNAL_%s' % key, 1, 0)
            couchbase.set(key, 0, 0, {'value': val, 'item_id':item_id})

    @action(renderer='json')
    @api
    def get_home_items(self):
        return {}
