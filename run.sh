#!/bin/bash

port_number=9999

while getopts "p:" option; do
  case $option in
    p ) port_number=$OPTARG
    ;;
  esac
done

echo "[SERVICE] API port is $port_number"

trap 'kill %1' SIGINT
python3 -m venv ./backend/.venv
source ./backend/.venv/bin/activate
pip install -r ./backend/requirements.txt | sed -e 's/^/[Server] /'
python ./backend/server.py --port=$port_number &

server=$!
echo "[SERVICE] Server PID is $server"

npm install --prefix ./frontend/ | sed -e 's/^/[Client] /'
PORT=$port_number SERVER=$server npm start --prefix ./frontend/ | sed -e 's/^/[Client] /'