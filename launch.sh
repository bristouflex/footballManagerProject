#!/bin/bash

cd backend && npm run build
cd ../
sudo docker build -t footballerbackend ./backend
sudo docker build -t footballerfrontend ./frontend
sudo docker-compose up