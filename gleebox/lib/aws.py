import mimetypes
from boto.s3.key import Key
from gleebox import models




def s3_upload_file(file, content_type, key, bucket):
    bucket = models.s3.get_bucket(bucket)
    _key = Key(bucket)
    _key.key = key
    _key.set_metadata('Content-Type', content_type)
    _key.set_contents_from_file(file, policy='public-read')

