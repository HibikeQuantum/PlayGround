#!/bin/bash

##########################
# $1 should be target full path
# for example "/Users/kth/Code/PlayGround/Bear"
##########################

# echo "hello bash"
# bash --version

publisherPath="/Users/kth/Code/Bear-Auto-Publisher"
blogPath="/Users/kth/Code/HibikeQuantum.github.io"

canChangeDirectory () {
    currentPath=`pwd`
    targetPath=$1

    echo "pwd:" $currentPath
    echo "target:" $targetPath
    echo "${currentPath}" "${targetPath}"
    if [ "${currentPath}" = "${targetPath}" ]; then
        echo 0
    else 
        echo 1
    fi
}

_postBlogAutoCommit() {
    targetPath=$blogPath
    commitMessage="Build and auto commit "`date`
    mypwd=`pwd`
    cd $targetPath
    bundle exec jekyll build; 
    git add -A; git commit -m "${commitMessage}"; 
    git push origin main;
    cd $mypwd
}

_autoBearPublish() {
    mypwd=`pwd`
    cd $publisherPath
    sh AutoPublish.sh
    cd $mypwd
}
