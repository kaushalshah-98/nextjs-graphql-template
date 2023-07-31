#!/bin/bash

# progress bar function
# prog() {
#     local w=80 p=$1;  shift
#     # create a string of spaces, then change them to dots
#     printf -v dots "%*s" "$(( $p*$w/100 ))" ""; dots=${dots// /.};
#     # print those dots on a fixed-width space plus the percentage etc. 
#     printf "\r\e[K[%-*s] %3d %% %s" "$w" "$dots" "$p" "$*"; 
# }

# echo "THIS MAY TAKE A WHILE, PLEASE BE PATIENT WHILE IT IS RUNNING..."
# # test loop
# for x in {1..100} ; do
#     prog "$x" still working...
#     sleep .1   # do some work here
# done ; echo


progressBarWidth=80

# Function to draw progress bar
progressBar () {

  # Calculate number of fill/empty slots in the bar
  progress=$(echo "$progressBarWidth/$taskCount*$tasksDone" | bc -l)  
  fill=$(printf "%.0f\n" $progress)
  if [ $fill -gt $progressBarWidth ]; then
    fill=$progressBarWidth
  fi
  empty=$(($fill-$progressBarWidth))

  # Percentage Calculation
  percent=$(echo "100/$taskCount*$tasksDone" | bc -l)
  percent=$(printf "%0.2f\n" $percent)
  if [ $(echo "$percent>100" | bc) -gt 0 ]; then
    percent="100.00"
  fi

  # Output to screen
  printf "\r["
  printf "%${fill}s" '' | sed 's/ /\o342\o226\o210/g'
  printf "%${empty}s" '' | sed 's/ /\o342\o226\o221/g'
  printf "] $percent%% - $text "
}


## Collect task count
# taskCount=30000
# tasksDone=0

# while [ $tasksDone -le $taskCount ]; do

#   # Do your task
#   (( tasksDone += 1 ))

#   # Add some friendly output
#   text=$(echo "Importing Dump Data to DB...")

#   # Draw the progress bar
#   progressBar $taskCount $taskDone $text

#   sleep 0.01
# done

# echo


# Export env vars
export progressBar 