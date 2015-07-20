/**
 * BufferStream - A streaming interface to a Buffer
 */
"use strict";


/**
 *Create a BufferStream
 * @param buffer Buffer to wrap
 * @param position
 * @constructor
 */
function BufferStream(buffer, position) {
  this._buffer = buffer;
  this._pos = position || 0;
}

exports.BufferStream = BufferStream;

/**
 * Get current position
 * @returns {*|number|newpos}
 */
BufferStream.prototype.tell = function() {
  return this._pos;
};

/**
 * Seek within buffer, forward or backwards, using offset
 * @param offset
 */
BufferStream.prototype.seek = function(offset) {
  var newpos = this._pos + offset;
  if (newpos < 0 || newpos >= this._buffer.length) {
    throw new Error("Out of bounds: " + this._pos + " + " + offset);
  }
  this._pos = newpos;
};

/**
 * Get byte from current positon and increase position
 * @returns {*}
 */
BufferStream.prototype.getByte = function() {
  if (this._pos >= this._buffer.length) {
    throw new Error("Out of bounds: Last byte read");
  }
  return this._buffer[this._pos++];
};

/**
 * Return a slice with given length and increase position
 * @param size
 * @returns {Buffer}
 */
BufferStream.prototype.getSlice = function(size) {
  if (this._pos + size > this._buffer.length) {
    throw new Error("Out of bounds: " + this._pos + "+" + size);
  }
  var retval = this._buffer.slice(this._pos, this._pos.size);
  this._pos += size;
  return retval;
};