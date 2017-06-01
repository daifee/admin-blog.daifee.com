#!/bin/bash

PUBLIC_URL='/admin-blog.daifee.com'
export PUBLIC_URL

node run build

rm -rf ./docs
cp -r ./build ./docs
cp ./docs/index.html ./docs/404.html

master:remote/master
git add --all
git commit -m '发布'
git push