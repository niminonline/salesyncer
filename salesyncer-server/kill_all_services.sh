#!/bin/bash

# Array of ports to kill processes for
ports=(3000 3001 3002 3003 3004 3005)  # Add your port numbers here

for port in "${ports[@]}"
do
  # Find the process ID (PID) using the specified port number
  pid=$(lsof -t -i:$port)

  if [ -n "$pid" ]; then
    echo "Killing process running on port $port (PID: $pid)"
    kill -9 $pid
  else
    echo "No process found running on port $port"
  fi
done

