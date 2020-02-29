#!/bin/bash

rm -rf ./dist

python3 -m venv ./backend/.venv
source ./backend/.venv/bin/activate
pip install -r ./backend/requirements.txt
python -m  PyInstaller -F ./backend/server.py --workpath=./backend/build --distpath=./backend/dist --specpath ./backend

npm install --prefix ./frontend/

cp ./backend/dist/server ./frontend/src/
npm --prefix ./frontend/ run package
mv ./frontend/out/ ./dist/
