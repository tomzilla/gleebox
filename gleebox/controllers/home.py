from pyramid_handlers import action

from pyramid.response import Response
from . import *

class Home(BaseController):

    @action(renderer='home/index.mako')
    def index(self):
        return {}
