'use strict';

// See documentation here: http://www.microsoft.com/typography/otspec/kern.htm

var _ = require('lodash');
var ByteBuffer = require('../../byte_buffer.js');

function tableSize(font) {
  var result = 4; // table header
  return result;
}

function pascalString(str) {
  var bytes = [];
  var len = str ? (str.length < 256 ? str.length : 255) : 0; //length in Pascal string is limited with 255
  bytes.push(len);
  for (var i = 0; i < len; i ++) {
    var char = str.charCodeAt(i);
    bytes.push(char < 128 ? char : 95); //non-ASCII characters are substituted with '_'
  }
  return bytes;
}

function createKernTable(font) {
  var buf = ByteBuffer.prototype.create(tableSize(font));

  buf.writeUInt16(0); // format 0

  return buf;
}

module.exports = createKernTable;
