#! /bin/sh

BASEDIR=$(dirname $0)
DEPLOY_DIR=/var/www-staging/gleebox

rsync -qrlpgoDz -c --delete $EXCLUDES --progress $BASEDIR $DEPLOY_DIR
cd $DEPLOY_DIR
pwd
if [ $1 = "staging" ]; then
  ./runpaste-staging stop
  ./runpaste-staging start
else if [ $1 == "production" ]; then
  ./runpaste stop
  ./runpaste start

fi
fi
