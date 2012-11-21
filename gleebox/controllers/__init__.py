from pyramid_handlers import action

from pyramid.response import Response
from gleebox.lib import auth

class ApiException(Exception):
    pass

class BaseController(object):
    def __init__(self, request):
        self.request = request
        self.user_id = None

    def required_params(self, required):
        for p in required:
            v = self.request.params.get(p)
            if v is None:
                raise ApiException('Missing parameter: %s' % p)
            yield v

    def optional_params(self, optional):
        for p in optional:
            v = self.request.params.get(p)
            yield v

def api(f):
    def _wrap(*args, **kw):
        try:
            return {'response': f(*args, **kw)}
        except ApiException, e:
            return {'response':'', 'error': str(e)}
    return _wrap

def authed_api(f):
    def _wrap(*args, **kw):
        try:
            if (args[0].request and args[0].request.params.get('token')) or args[0].request.cookies.get('token'):
                token = args[0].request.params.get('token')
                if not token:
                    token = args[0].request.cookies.get('token')
                args[0].user_id = auth.decode_token(token).split('|')[0]
                return {'response': f(*args, **kw)}
            else:
                raise ApiException('No auth token for authed api call')
        except ApiException, e:
            return {'response':'', 'error': str(e)}
    return _wrap
