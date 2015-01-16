webAppEKGAPI
============
[![Stories in Ready](https://badge.waffle.io/ekgapi/webappekgapi.png?label=ready&title=Ready)](https://waffle.io/ekgapi/webappekgapi) [![Build Status](https://travis-ci.org/EKGAPI/webAppEKGAPI.svg?branch=master)](https://travis-ci.org/EKGAPI/webAppEKGAPI)
===========

Check out our site [Kardia](http://kardia.io/)!

<!-- To view our commented code, please click [here](http://www.explainjs.com/explain?src=https%3A%2F%2Fraw.githubusercontent.com%2FEKGAPI%2FwebAppEKGAPI%2Fmaster%2Fdist%2FnewConcat.js)! -->

App Architecture
============
![alt text](http://res.cloudinary.com/kardia-io/image/upload/v1421366596/Screen_Shot_2015-01-15_at_4_02_38_PM_d3unqx.png "App Architecture")

Server
============
### Web Sockets: Require the Socket Functionality
```javascript
require('./server/python/pythonComm.js')(io);
```
### Web Sockets: Listen to Swift
When Swift emits the event 'message', data will be grabbed by the node.js server.
```javascript
socket.on('message')
```
Within the event listening to 'message', node will call the python server's functions using zerorpc's 'invoke'.
```javascript
client.invoke("function name", data, function(error, result, more));
```








Client
============