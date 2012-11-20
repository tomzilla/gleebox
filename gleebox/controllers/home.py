import os
from pyramid_handlers import action

from pyramid.response import Response
from . import *

here = os.path.dirname(os.path.abspath(__file__))
class Home(BaseController):

    @action(renderer='home/index.mako')
    def index(self):
        return {}

    def launchrock(request):
        _robots = open(os.path.join(
                  here, '../static', 'index.html')).read()
        _robots_response = Response(content_type='text/html',
                                body=_robots)
        return _robots_response

