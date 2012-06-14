var color = require('ansi-color').set,
    net   = require('net');

var timeout = 5000; // default 5 second socket timeout

exports.connect = function connect(destination, callback) {
  if (destination instanceof Array) {
    if (destination.length == 0) {
      // no arguments provided, so read from standard input
      process.stdin.resume();
      process.stdin.setEncoding('utf8');

      process.stdin.on('data', function (line) {
        connect(line.split(/\s|\n/), function() {});
      });
    } else {
      // try connecting to every item in the array
      for (var i = 0; i < destination.length; i++) {
        connect(destination[i], callback);
      }
    }
  } else if (typeof(destination) === 'string' || destination instanceof String) {
    destination = destination.replace(/^\s+|\s+$/g, ''); // trim whitespace from the string

    // lines starting with # are ignored
    var ignore = destination.indexOf('#') === 0;
    if (ignore) destination = destination.substr(1);

    if (destination !== '') {
      if (ignore) {
        console.warn(color('ignored: ' + destination, 'yellow'));
        callback(true);
      } else {
        var host = destination.split(":")[0],
            port = destination.split(":")[1],
            error = null;

        var socket = net.connect(port, host, function() {
          socket.end();
        });

        socket.setTimeout(timeout);
        socket.setKeepAlive(false);

        var handleError = function(err) {
          error = err;
          socket.destroy();
        }

        socket.on('timeout', function() {
          handleError(new Error('connect ETIMEDOUT'));
        });

        socket.on('error', handleError);

        socket.on('close', function() {
          if (error) {
            console.error(color('failure: ' + destination + ' -- ' + error, 'red'));
          } else {
            console.info(color('success: ' + destination, 'green'));
          }
          callback(!error);
        });
      }
    } else {
      callback(true);
    }
  } else {
    callback(false);
  }
}
