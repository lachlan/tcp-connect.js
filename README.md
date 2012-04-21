tcp-connect.js
==============

Tests TCP connections by opening a TCP socket to the given host:port.

Examples
--------

    $ bin/tcp-connect.js www.apple.com:80
    success: www.apple.com:80
	
    $ bin/tcp-connect.js www.apple.com:80 8.8.8.8:53 192.0.2.0:65535
    success: www.apple.com:80
    success: 8.8.8.8:53
    failure: 192.0.2.0:65535 -- Error: connect ETIMEDOUT
	
    $ cat test/example.txt | bin/tcp-connect.js
	failure: localhost:54321 -- Error: connect ECONNREFUSED
	success: 8.8.8.8:53
	success: www.apple.com:80
	failure: 192.0.2.0:65535 -- Error: connect ETIMEDOUT
    
	$ bin/tcp-connect.js
	www.google.com:80
	success: www.google.com:80
	www.yahoo.com:80
	success: www.yahoo.com:80
	^C