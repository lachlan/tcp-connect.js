#!/usr/bin/env node
var tcp = require('../lib/main');

tcp.connect(process.argv.slice(2), function(result) {
  process.exit(result ? 0 : 1);
});