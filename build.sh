#!/bin/bash

port_number=9999

while getopts "p:" option; do
  case $option in
    p ) port_number=$OPTARG
    ;;
  esac
done


python3 -m venv ./backend/.venv
source ./backend/.venv/bin/activate
pip install -r ./backend/requirements.txt | sed -e 's/^/[Server] /'
python -m  PyInstaller -F ./backend/server.py --workpath=./backend/build --distpath=./dist --specpath ./backend

# npm install --prefix ./frontend/ | sed -e 's/^/[Client] /'
