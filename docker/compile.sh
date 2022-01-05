#!/bin/bash

# 设置淘宝镜像

# create-react-app 关闭CI检测，避免因为警告导致编译失败
export CI=false
export SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/

# 根据分支设置编译环境变量
if [ ${CI_COMMIT_REF_NAME} == "dev" ]
then
    export REACT_APP_BRANCH=dev
fi

if [ ${CI_COMMIT_REF_NAME} == "test" ]
then
    export REACT_APP_BRANCH=test
fi

if [ ${CI_COMMIT_REF_NAME} == "preview" ]
then
    export REACT_APP_BRANCH=preview
fi

if [ ${CI_COMMIT_REF_NAME} == "master" ]
then
    export REACT_APP_BRANCH=prod
fi

npm install
npm run build

