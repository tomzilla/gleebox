import time, hashlib, urllib2, simplejson, base64

from pyramid_handlers import action
from pyramid.response import Response

from . import *
from gleebox.lib import account, aws, locking
from gleebox.models import couchbase, Comment
from gleebox import models

class CommentController(BaseController):

    @action(renderer='json')
    @authed_api
    def create(self):
        #some sort of anti spam
        text, item_id = self.required_params(['comment', 'item_id'])

        comment = Comment.create(self.user_id, item_id, text)

        return {'comment': comment.data}
