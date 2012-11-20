import simplejson

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

class MyModel(Base):
    __tablename__ = 'models'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)
    value = Column(Integer)

    def __init__(self, name, value):
        self.name = name
        self.value = value

class CouchData(dict):
    def __init__(self, *args):
        dict.__init__(self, self._default_blob())

    @classmethod
    def get(self, id):
        data = couchbase.get(self.make_key(id))
        if len(data) == 3:
            return simplejson.loads(data[2])
        return None

    @classmethod
    def _schema(self):
        raise Exception('Must Implement')

    @classmethod
    def _default_blob(self):
        blob = {}
        for k in self._schema():
            blob[k] = None
        return blob

    @classmethod
    def make_key(self, id):
        return '%s_%s' % (self.__class__, id)

    def save(self):
        return couchbase.set(self.make_key(self['id']), 0, 0, simplejson.dumps(self))

class User(CouchData):
    SALTa = '(*(*n3nn(u3nb'
    SALTb = 'A(&(2d0003HA^1cv 2*Hsh'

    @classmethod
    def create(self, email, password, **kw):
        blob = User()
        blob['id'] = self.next_id()
        blob['email'] = email
        if password:
            blob['password'] = sha512(self.SALTa + password + self.SALTb).hexdigest()
        for k, v in kw.iteritems():
            blob[k] = v
        couchbase.add(self.make_key(blob['id']), 0, 0, simplejson.dumps(blob))
        return blob

    @classmethod
    def _schema(self):
        return ['id', 'email', 'password', 'fbid']

    @classmethod
    def next_id(self):
        key = 'INTERNAL_%s_id_increment' % self.__class__
        return couchbase.incr(key, 1, 0)[1]

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
