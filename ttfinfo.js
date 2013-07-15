#!/usr/bin/env node

/*
 * Internal utility qu quickly check ttf tables size
 */

'use strict';


var fs      = require('fs');
var _       = require('lodash');
var format  = require('util').format;

var ArgumentParser = require('argparse').ArgumentParser;

var parser = new ArgumentParser({
  version: require('./package.json').version,
  addHelp: true,
  description: 'Dupm TTF tables info'
});

parser.addArgument(
  [ 'infile' ],
  {
    nargs: 1,
    help: 'Input file'
  }
);

var args = parser.parseArgs();
var ttf;

try {
  ttf = fs.readFileSync(args.infile[0]);
} catch(e) {
  console.error("Can't open input file (%s)", args.infile[0]);
  process.exit(1);
}

var tablesCount = ttf.readUInt16BE(4);

var i, offset, headers = [];

for (i=0; i<tablesCount; i++) {
  offset = 12 + i*16;
  headers.push({
    name: String.fromCharCode(
      ttf.readUInt8(offset),
      ttf.readUInt8(offset + 1),
      ttf.readUInt8(offset + 2),
      ttf.readUInt8(offset + 3)
    ),
    offset: ttf.readUInt32BE(offset + 8),
    length: ttf.readUInt32BE(offset + 12)
  });
}

console.log(format('Tables count: %d'), tablesCount);

_.forEach(_.sortBy(headers, 'offset'), function (info) {
  console.log("- %s: %d bytes (%d offset)", info.name, info.length, info.offset);
});