'use strict';

// See documentation here: http://www.microsoft.com/typography/otspec/kern.htm

var _ = require('lodash');
var ByteBuffer = require('../../byte_buffer.js');

function tableSize(font) {
  var result = 4; // table header
  return result;
}

function createKernTable(font) {
  var buf = ByteBuffer.prototype.create(tableSize(font));

  buf.writeUInt16(0); // format 0

  return buf;
}

module.exports = createKernTable;
