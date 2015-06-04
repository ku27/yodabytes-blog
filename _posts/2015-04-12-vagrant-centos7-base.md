---
layout: post
title: Vagrant base box for CentOS 7
date: '2015-04-12T16:32:00-08:00'
categories: Technology
tags: vagrant, CentOS
comments: true
---
Working on a proof of concept or evaluating open source projects requires setting up multiple environments, but I hate to install them on my Mac. I like to keep the environment very close to production which uses stantads linux distributions like CentOS.  I also follow a practice maintain isolated environment for each project. This makes VirtualBox my best friend. I have many vbox images I keep few active ones on my machine and archive others on external drive.

Vagrant has been there for a while and recently started using it, it works great since you can automate the startup process and use command line to startup, shutdown and destroy vboxes.

Here is a Vagrant Box for CentOS 7 minimal for VirtualBox. It has virtual box guest additions installed. I also added a startup script that installs Java, Maven and Docker on vagrant up.

Vagrantfile: {% gist  7d6d3fd494e0433c9df6 %}

Install Java Script: {% gist  b1f5e283580f4adf84c7 %}

Here is the Git project to Vagrant Box: https://github.com/kumrigar/vagrant-centos7-java-base

Here are few links helped me create the base vagrant box:

 - http://thornelabs.net/2013/11/11/create-a-centos-6-vagrant-base-box-from-scratch-using-virtualbox.html
 - http://docs.vagrantup.com/v2/virtualbox/boxes.html
