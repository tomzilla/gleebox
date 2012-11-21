from facebook import GraphAPI
from gleebox.models import User, FBUserMapping

def create(email, password, **kw):
    user = User.create(email, password, **kw)
    del user['password']
    return user

def create_fb(facebook_token):
    graph = GraphAPI(facebook_token)
    profile = graph.get_object('me')
    user = create(profile['email'], None, fbid=profile['id'])
    user.save()
    FBUserMapping.create(profile['id'], user['id'])
    del user['password']
    return user

def get(id):
    user = User.get(id)
    del user['password']
    return user

def get_from_fb_token(token):
    graph = GraphAPI(token)
    profile = graph.get_object('me')
    user_id = FBUserMapping.get(profile['id']).get('user_id')
    if user_id:
        user = User.get(id)
        del user['password']
        return user
