from gleebox import models
from time import sleep
from contextlib import contextmanager

@contextmanager
def lock(key, duration=2):
    tries = 0
    while tries < 5:
        try:
            lock = models.couchbase.add('lock_' + key, duration, 0, 'lock')
            break
        except:
            tries = tries + 1
            sleep(0.5)
    yield lock
    try:
        models.couchbase.delete(key)
    except:
        pass
