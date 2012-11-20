from pyramid_handlers import action

from pyramid.response import Response

class ApiException(Exception):
    pass

class BaseController(object):
    def __init__(self, request):
        self.request = request


def api(f):
    def _wrap(*args, **kw):
        try:
            return f(*args, **kw)
        except ApiException, e:
            return {'response':'', 'error': str(e)}
    return _wrap
