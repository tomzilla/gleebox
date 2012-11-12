#! /bin/sh

BASEDIR=$(dirname $0)

rsync -qrlpgoDz -c --delete $EXCLUDES --progress $BASEDIR/gleebox /var/www-staging
