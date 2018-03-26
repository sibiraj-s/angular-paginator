#!/bin/bash

# remove existing builds
rm -rf build/
rm -rf dist/

# remove npm tarballs if present
rm -rf build.tgz

# build 
./node_modules/.bin/ng-packagr -p ng-package.json

# delete unwanted folders
rm -rf .ng_build
rm -rf .ng_pkg_build
