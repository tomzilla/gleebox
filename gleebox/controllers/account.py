from facebook import GraphAPI
from pyramid_handlers import action

from pyramid.response import Response
from . import *
from gleebox.lib import account, auth

class Account(BaseController):

    @action(renderer='json')
    @api
    def create(self):
        email = self.request.params.get('email')
        password = self.request.params.get('password')
        facebook_token = self.request.params.get('fb_token')
        if facebook_token or (email and password):
            #create user
            if email and password:
                user = account.create(email, password)
            elif facebook_token:
                user = account.create_fb(facebook_token)
            id = user['id']
            token = auth.issue_token(id)
            user['token'] = token
            self.request.response.set_cookie('token', token, max_age=365*86400)
            return {'user': user}
        else:
            raise ApiException('missing info')

    @action(renderer='json')
    @api
    def get(self):
        token = self.request.params.get('token')
        if not token:
            token = self.request.cookies.get('token')
        id = auth.decode_token(token).split('|')[0]
        blob = account.get(id)
        if blob:
            blob['token'] = token
        else:
            raise ApiException('User not found')
        return {'user': blob}

    @action(renderer='json')
    @api
    def fb_login(self):
        fb_token = self.request.params.get('fb_token')
        if fb_token:
            user = account.get_from_fb_token(self.request.params.get('fb_token'))
            if not user:
                user = account.create_fb(fb_token)
            id = user['id']
            token = auth.issue_token(id)
            self.request.response.set_cookie('token', token, max_age=365*86400)
            user['token'] = token
            return {'user': user}
        else:
            raise ApiException('missing info')
