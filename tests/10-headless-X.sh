#!/bin/bash

# setup to import google-chrom
rpm --import ../assets/RPM-KEY-google-chrome
cp ../assets/google-chrome.repo /etc/yum.repos.d/

yum -y install firefox xorg-x11-server-Xvfb google-chrome-stable

# get npm in place
yum install centos-release-scl
yum install rh-nodejs4 rh-nodejs4-npm
scl enable rh-nodejs4 'npm install protractor-jasmine2-screenshot-reporter'


git clone https://github.com/fabric8io/fabric8-planner payload/
find payload -name protractor.config.js -exec cp -f ../assets/protractor.config.js {} \;
cd payload
bash -x ./cico_run_tests.sh
xvfb-run ./run_functional_tests.sh
