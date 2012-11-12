#! /bin/sh

BASEDIR=$(dirname $0)
DEPLOY_DIR=/var/www-staging/

rsync -qrlpgoDz -c --delete $EXCLUDES --progress $BASEDIR/../gleebox $DEPLOY_DIR
cd $DEPLOY_DIR/gleebox
./runpaste-staging restart

