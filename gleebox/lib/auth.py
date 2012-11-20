import time
import random
from Crypto.Cipher import AES

SALT = 'saltyballs'
SECRET = 'a*NSs09&&}(&*Ans'
TOKEN_EXPIRE_TIME = 86400 * 90

#return token
def issue_token(id, issue_time=None):
    if issue_time is None:
        issue_time = int(time.time())
    msg = '%s|%s|' % (id, issue_time + TOKEN_EXPIRE_TIME)
    while len(msg) % 16:
        msg += '='
    cipher = AES.new(SECRET, AES.MODE_ECB)
    msg = cipher.encrypt(msg)
    return msg.encode('hex')

#return user_id
def decode_token(token):
    msg = token.decode('hex')
    cipher = AES.new(SECRET, AES.MODE_ECB)
    return cipher.decrypt(msg)

def validate_token(token):
    pass
