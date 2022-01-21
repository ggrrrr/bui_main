#!/usr/bin/env bash

APP_HASH=`git log -n 1 --pretty=format:"%h"`

# export $GIT_HASH
APP_DATE=$(date '+%Y-%m-%d %H:%M:%S')

sed -i 's/__app__hash__/${GIT_HASH}/g' vue.config.js
sed -i 's/__app__date__/${GIT_DATE}/g' vue.config.js
