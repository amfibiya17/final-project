#!/bin/bash

cd client
npm run build
cd ..
rm -rf backend/build
mv client/build backend
git subtree push --prefix backend heroku main
