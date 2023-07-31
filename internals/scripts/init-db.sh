#!/bin/bash

source "$(dirname "$0")/../set-env.sh"

# This script will import a backup file into a mysql database.  

start_time="$(date -u +%s)"
printf "\n\n"
printf "******************************\n"
printf "Started Automatic Mysql Import\n"
printf "******************************\n"

printf "Starting Mysql Import\n"


if [  $mode == "development" ]
then
docker exec -i $DB_CONTAINER_NAME  /usr/bin/mysql -u $DB_USER --password=$DB_PASSWORD $DB_DATABASE < $PATH_TO_DUMP_FILE
else
mysql -h $DB_HOST -u $DB_USER --password=$DB_PASSWORD $DB_DATABASE < $PATH_TO_DUMP_FILE
fi

end_time="$(date -u +%s)"

elapsed=$(($end_time-$start_time))

printf "%sMysql Import Completed In $elapsed seconds\n"

printf "******************************\n"