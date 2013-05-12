#!/bin/bash

tail -n 100 "/usr/local/nextgen/groups/shared/logs/groups.log" | mail -s "groups restared" ogolan@yp.com
