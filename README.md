# Description

Test project for Etb-lab.

## Functionality

A simple object(a house), that consists of a brown rectangle and a red triangle, is drawn at the top of interactive map of Moscow. The drawing of a house was implemented as a House object, which includes HousePart objects (roof and basement) for representing a roof of a house and a basement of a house. Each part of a house can is drawn separately and a combination of HouseParts formes a house.   

## Requirements

This project uses Google Maps V3 API to draw an interactive map

## Installation

There are two ways to run this project:
* From local machine: copy project files and drag 'index.html' into your browser's window.
* From remote machime: copy project files to your server and run any http server daemon. For example, node.js http-server can be used:
    * npm install http-server -g
    * http-server

After that the project will be avaliable from the client's browser on the address: ip-of-the-server:port-of-the-server
