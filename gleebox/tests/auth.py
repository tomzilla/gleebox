import unittest

from pyramid import testing

class TestAuth(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()

    def tearDown(self):
        testing.tearDown()

    def test_it(self):
        from gleebox.lib import auth
        token = auth.issue_token(26, issue_time=1)
        assert(token == '12e06a79585afb82bb8cbceaf5a1030c')

        id = auth.decode_token(token).split('|')
        assert(id[0] == '26')


