from facebook import GraphAPI
from gleebox.models import User, FBUserMapping

def create(email, password):
    return User.create(email, password)

def create_fb(token):
    graph = GraphAPI(facebook_token)
    profile = graph.get_object('me')
    user = create(profile['email'], None, fbid=profile['id'])
    user.save()
    FBUserMapping.create(profile['id'], user['id'])
    return user

def get(id):
    return User.get(id)

def get_from_fb_token(token):
    graph = GraphAPI(token)
    profile = graph.get_object('me')
    user_id = FBUserMapping.get(profile['id']).get('user_id')
    if user_id:
        return User.get(user_id)
