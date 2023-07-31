#!/bin/bash

source "$(dirname "$0")/../set-env.sh"

# This script will create a backup file of a mysql database.  

start_time="$(date -u +%s)"
printf "\n\n"
printf "******************************\n"
printf "Started Automatic Mysql Backup\n"
printf "******************************\n"

printf "Starting Mysql Dump \n"

if [  $mode == "development" ]
then
docker exec $DB_CONTAINER_NAME /usr/bin/mysqldump  --no-tablespaces -u $DB_USER --password=$DB_PASSWORD $DB_DATABASE > $PATH_TO_DUMP_FILE
else
mysqldump  -h $DB_HOST -u $DB_USER --password=$DB_PASSWORD --set-gtid-purged=OFF $DB_DATABASE > $PATH_TO_DUMP_FILE
fi

end_time="$(date -u +%s)"

elapsed=$(($end_time-$start_time))

printf "%sMysql Dump Completed In $elapsed seconds\n"

printf "******************************\n"