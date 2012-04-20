#!/usr/bin/env node
var tcp = require('../lib/main');
tcp.connect(process.argv.slice(2), function(err, results) {
  process.exit(err == null ? 0 : 1);
});