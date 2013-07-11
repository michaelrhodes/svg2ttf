'use strict';

// See documentation here: http://www.microsoft.com/typography/otspec/hhea.htm

var jDataView = require('jDataView');

function createHHeadTable(font) {

  var buf = new jDataView(36); // fixed table length

  buf.writeInt32(0x10000); // version
  buf.writeInt16(font.ascent); // ascent
  buf.writeInt16(font.descent); // descend
  buf.writeInt16(font.lineGap); // lineGap
  buf.writeUint16(font.width); // advanceWidthMax
  buf.writeInt16(font.lsb); // minLeftSideBearing
  buf.writeInt16(font.width + font.lsb - font.xMax + font.xMin); // minRightSideBearing
  buf.writeInt16(font.lsb + font.xMax - font.xMin); // xMaxExtent
  buf.writeInt16(1); // caretSlopeRise
  buf.writeInt16(0); // caretSlopeRun
  buf.writeUint32(0); // reserved1
  buf.writeUint32(0); // reserved2
  buf.writeUint16(0); // reserved3
  buf.writeInt16(0); // metricDataFormat
  buf.writeUint16(font.glyphs.length); // numberOfHMetrics

  return buf;
}

module.exports = createHHeadTable;