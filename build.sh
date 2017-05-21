#!/bin/bash

npm run build-css
react-scripts build

cp -r ./build ./docs

# master:remote/master
git push
