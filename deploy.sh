#! /bin/sh

BASEDIR=$(dirname $0)
DEPLOY_DIR=/var/www-staging/gleebox

rsync -qrlpgoDz -c --delete $EXCLUDES --progress $BASEDIR $DEPLOY_DIR
cd $DEPLOY_DIR
./runpaste-staging stop
./runpaste-staging start

