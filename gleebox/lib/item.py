import simplejson
from gleebox import models

def append_summary_info(items):
    users = {}
    for item in items:
        #favs
        item_id = item['id']
        key = 'favs_%s' % (item_id)
        favs = models.couchbase.get(key)
        item['fav_count'] = simplejson.loads(favs[2])['value'] if favs else 0
        #comments
        comment_count = models.couchbase.view('_design/search/_view/comment_count_for_item', key=str(item_id))
        user_id = item['user_id']
        if user_id not in users:
            user = models.User.find(user_id).data
            name = user.get('display_name')
            if not name:
                name = '%s %s' % (user.get('first_name', ''), user.get('last_name', ''))
            user = {
                    'id': user_id,
                    'display_name': name
                    }

            users[user_id] = user
        item['user'] = users[user_id]
        item['comment_count'] = comment_count[0]['value'] if comment_count else 0
    return items



