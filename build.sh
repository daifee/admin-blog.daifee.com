#!/bin/bash

PUBLIC_URL='/admin-blog.daifee.com'
export PUBLIC_URL

npm run build-css
react-scripts build

rm -rf ./docs
cp -r ./build ./docs

master:remote/master
git add --all
git commit -m '发布'
git push
