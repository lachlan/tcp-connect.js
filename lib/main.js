var async = require('async'),
    color = require('ansi-color').set,
    net   = require('net');

exports.connect = function connect(destination, callback) {
  if (destination instanceof Array) {
    if (destination.length == 0) {
      process.stdin.resume();
      process.stdin.setEncoding('utf8');

      process.stdin.on('data', function (line) {
        connect(line.split(/\s|\n/), function() {});
      });
    } else {
      async.map(destination, connect, function(err, results) {
        callback(err, results);
      });
    }
  } else if (typeof(destination) === 'string' || destination instanceof String){
    destination = destination.replace(/^\s+|\s+$/g, '');
    if (destination !== '') {
      var split = destination.split(":"),
          host = split[0],
          port = split[1];
    
      var client = net.connect(port, host, function() {
        console.info(color('success: ' + destination, 'green'));
        client.destroy();
        callback(null, true);
      });
      client.on('error', function(err) {
        console.error(color('error:   ' + destination + ' -- ' + err, 'red'));
        callback(err, false);
      });
    }
  } else {
    callback('destination was not a string', false);
  }
}

