import simplejson
import time
from UserDict import UserDict

from sqlalchemy import (
    Column,
    Integer,
    SmallInteger,
    BigInteger,
    String,
    )

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    )

from zope.sqlalchemy import ZopeTransactionExtension
from hashlib import sha512

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()
couchbase = None
s3 = None

class MyModel(Base):
    __tablename__ = 'models'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)
    value = Column(Integer)

    def __init__(self, name, value):
        self.name = name
        self.value = value

class CouchData(UserDict):
    def __init__(self, data=None):
        data = data if data else self._default_blob()
        UserDict.__init__(self, data)

    @classmethod
    def find(self, id):
        data = couchbase.get(self.make_key(id))
        if data and len(data) == 3:
            return self(simplejson.loads(data[2]))
        return None

    @classmethod
    def _schema(self):
        raise Exception('Must Implement')

    @classmethod
    def _default_blob(self):
        blob = {}
        for k in self._schema():
            blob[k] = ''
        return blob

    @classmethod
    def make_key(self, id):
        raise Exception('Must Implement')

    def save(self):
        return couchbase.set(self.make_key(self['id']), 0, 0, simplejson.dumps(self.data))

class User(CouchData):
    SALTa = '(*(*n3nn(u3nb'
    SALTb = 'A(&(2d0003HA^1cv 2*Hsh'

    @classmethod
    def create(self, email, password, **kw):
        blob = User()
        blob['id'] = self.next_id()
        blob['email'] = email
        blob['favs'] = []
        if password:
            blob['password'] = sha512(self.SALTa + password + self.SALTb).hexdigest()
        for k, v in kw.iteritems():
            blob[k] = v
        couchbase.add(self.make_key(blob['id']), 0, 0, simplejson.dumps(blob.data))
        return blob

    @classmethod
    def _schema(self):
        return ['id', 'email', 'password', 'fbid', 'favs', 'first_name', 'last_name', 'display_name']

    @classmethod
    def next_id(self):
        key = 'INTERNAL_%s_id_increment' % 'user'
        next = couchbase.incr(key, 1, 0)[0]
        return next

    @classmethod
    def make_key(self, id):
        return 'User_%s' % (id)

class FBUserMapping(CouchData):
    @classmethod
    def _schema(self):
        return ['id', 'fb_id', 'user_id']

    @classmethod
    def create(self, fb_id, user_id):
        map = FBUserMapping()
        map['id'] = fb_id
        map['fb_id'] = fb_id
        map['user_id'] = user_id
        map.save()
        return map

    @classmethod
    def make_key(self, id):
        return 'FBUserMapping_%s' % (id)

class Item(CouchData):
    @classmethod
    def _schema(self):
        return ['id', 'user_id', 'title', 'price', 'time_submitted', 'time_modified', 'user']

    @classmethod
    def create(self, user_id, title, price):
        item = Item()
        item['id'] = self.next_id()
        item['user_id'] = user_id
        item['title'] = title
        item['price'] = price
        item['pictures'] = []
        item.save()
        return item

    @classmethod
    def make_key(self, id):
        return 'Item_%s' % (id)

    @classmethod
    def next_id(self):
        key = 'INTERNAL_%s_id_increment' % 'item'
        next = couchbase.incr(key, 1, 0)[0]
        return next

class Comment(CouchData):
    @classmethod
    def _schema(self):
        return ['id', 'user_id', 'item_id', 'comment', 'time_submitted', 'time_modified']

    @classmethod
    def create(self, user_id, item_id, comment):
        item = Comment()
        item['id'] = self.next_id()
        item['user_id'] = user_id
        item['item_id'] = item_id
        item['comment'] = comment
        item['time_submitted'] = int(time.time())
        item.save()
        return item

    @classmethod
    def make_key(self, id):
        return 'Comment_%s' % (id)

    @classmethod
    def next_id(self):
        key = 'INTERNAL_%s_id_increment' % 'comment'
        next = couchbase.incr(key, 1, 0)[0]
        return next
