#!/bin/bash

APP="/var/www/groups/current"

cd $APP
npm install
forever stopall
rm -r $APP/shared/logs/forever*
forever start --pidFile $APP/shared/pids/groups.pid -l $APP/shared/logs/forever-groups.log -o $APP/shared/logs/groups.log -e $APP/shared/logs/groups.err $APP/current/groups/server.js

