#!/usr/bin/env bash

# Export passed argument as key,value pairs
for ARGUMENT in "$@"
do
   KEY=$(echo $ARGUMENT | cut -f1 -d=)

   KEY_LENGTH=${#KEY}
   VALUE="${ARGUMENT:$KEY_LENGTH+1}"

   export "$KEY"="$VALUE"
done

ENVPATH=$(dirname "$0")/../../.env.${mode}

# path to where the db dump folder lies
PATH_TO_DUMP_FILE=$(dirname "$0")/../../dump/${file}.sql

# # Show env vars
# grep -v '^#' ${ENVPATH}

# Export env vars
export $(grep -v '^#' ${ENVPATH} | xargs)
export ENVPATH
export PATH_TO_DUMP_FILE