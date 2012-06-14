#!/usr/bin/env node
var tcp = require('../lib/main');

tcp.connect(process.argv.slice(2), function(connected) {
  if (!connected) process.exit(1);
});

process.on('uncaughtException', function(err) {
  console.log(err);
  process.exit(1);
});
