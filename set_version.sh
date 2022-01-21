#!/usr/bin/env bash

APP_HASH=`git log -n 1 --pretty=format:"%h"`
APP_DATE=$(date '+%d-%m-%YT%H:%M')
echo "${APP_HASH} ${APP_DATE} "
sed -i "s/_hash_/${APP_HASH}/g" vue.config.js
sed -i "s/_date_/${APP_DATE}/g" vue.config.js
