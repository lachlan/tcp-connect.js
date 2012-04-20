tcp-connect.js
==============

Tests TCP connections by opening a TCP socket to the given host:port

Example
-------

$ tcp-connect www.google.com:80 www.yahoo.com:80 192.168.0.255:80
success: www.google.com:80
success: www.yahoo.com:80
error:   192.168.0.255:80