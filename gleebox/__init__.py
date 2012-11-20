import os
from couchbase.client import Couchbase
from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from .controllers.account import Account
from .controllers.home import Home

from .models import (
    DBSession,
    Base,
    couchbase
    )


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    global couchbase
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    here = os.path.dirname(os.path.abspath(__file__))
    settings['mako.directories'] = os.path.join(here, 'templates')
    Base.metadata.bind = engine
    config = Configurator(settings=settings)
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.include('pyramid_handlers')
    config.scan()
    config.add_handler('account', 'account/{action}', handler=Account)
    config.add_handler('home', '/', handler=Home, action='index')
    cb = Couchbase(settings['couchbase.host'], settings['couchbase.bucket'], settings['couchbase.password'])[settings['couchbase.bucket']]
    models.couchbase = cb
    return config.make_wsgi_app()

