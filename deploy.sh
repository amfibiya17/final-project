#!/bin/bash

cd client
npm run build
cd ..
rm -rf backend/build
mv client/build backend
git add .
git commit -m "heroku deploy"
git subtree push --prefix backend heroku main
