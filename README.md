tcp-connect.js
==============

Tests TCP connections by opening a TCP socket to the given host:port.

Installation
------------

    $ npm install -g tcp-connect.js

Examples
--------

    $ tcp-connect www.apple.com:80
    success: www.apple.com:80
	
    $ tcp-connect www.apple.com:80 8.8.8.8:53 192.0.2.0:65535 unknown.example.com:80
    success: www.apple.com:80
    success: 8.8.8.8:53
    failure: unknown.example.com:80 -- Error: getaddrinfo ENOENT
    failure: 192.0.2.0:65535 -- Error: connect ETIMEDOUT
	
    $ cat test/example.txt | tcp-connect
    failure: localhost:54321 -- Error: connect ECONNREFUSED
    ignored: www.google.com:80
    success: 8.8.8.8:53
    success: www.apple.com:80
    failure: unknown.example.com:80 -- Error: getaddrinfo ENOENT
    failure: 192.0.2.0:65535 -- Error: connect ETIMEDOUT
    
    $ tcp-connect
    www.google.com:80
    success: www.google.com:80
    www.yahoo.com:80
    success: www.yahoo.com:80
    ^C
    
    $ tcp-connect #www.google.com:80
    ignored: www.google.com:80