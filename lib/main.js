var async = require('async'),
    color = require('ansi-color').set,
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
      async.every(destination, connect, function(result) {
        callback(result);
      });
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
            port = destination.split(":")[1];

        var client = net.connect(port, host, function() {
          console.info(color('success: ' + destination, 'green'));
          client.destroy();
          callback(true);
        });

        client.setTimeout(timeout);

        client.on('timeout', function(err) {
          console.error(color('failure: ' + destination + ' -- Error: connect ETIMEDOUT', 'red'));
          client.destroy();
          callback(false);
        });

        client.on('error', function(err) {
          console.error(color('failure: ' + destination + ' -- ' + err, 'red'));
          client.destroy();
          callback(false);
        });
      }
    } else {
      callback(true);
    }
  } else {
    callback(false);
  }
}

