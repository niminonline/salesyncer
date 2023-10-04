#!/bin/bash

# Function to start a service and display a custom message
start_service() {
  service_name=$1
  echo "Starting $service_name microservice..."
  cd $service_name
  npm run dev &

  # Display a message after starting the service
  echo "$service_name microservice started!"
  cd ../
}

# Start each service
start_service "accounts-service"
start_service "api-gateway"
start_service "auth-service"
start_service "business-service"
start_service "office-service"
start_service "products-service"

# Optionally, wait for user input before exiting
read -p "Press enter to exit..." -r
