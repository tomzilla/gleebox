from pyramid_handlers import action
from pyramid.response import Response

from . import *

class Item(BaseController):

    @action(renderer='json')
    @authed_api
    def create(self):
        title, price = self.required_params(['title', 'price'])
        blob = {}
        return {'response': blob}

