const constants = require('./constants');
const util = require('./util');

function isNumber(value){
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

function appendValue(val, buffer) {

    // pre process values to align with writable values
    if (val === null || val === undefined) {
        // treat as empty strings
        val = '';
    } else if (val instanceof Date) {
        // treat dates as numbers
        val = val.valueOf() / 1000;
    } else if (val === true) {
        // treat booleans as numbers
        val = 1;
    } else if (val === false) {
        // treat booleans as numbers
        val = 0;
    }

    // write values
    if (typeof val === 'string') {

        let lengthInBytes = Buffer.byteLength(val);
        util.extendBufferIfNeeded(buffer, lengthInBytes + 1);

        buffer.data.write(val, buffer.offset, lengthInBytes);
        buffer.offset += lengthInBytes;
        buffer.data.writeInt8(constants.special.stringEnd, buffer.offset);
        buffer.offset += 1;
    } else if (isNumber(val)) {
        // four bytes, LE
        util.extendBufferIfNeeded(buffer, 4);
        buffer.data.writeInt32LE(val, buffer.offset);
        buffer.offset += 4;
    } else if (typeof val === 'object') {

        let keys;

        if (val instanceof Array) {

            keys = new Array(val.length);
            for (let i = 0; i < keys.length; i++){
                keys[i] = i.toString();
            }
        } else {
            keys = Object.keys(val);
        }

        for (let i = 0; i < keys.length; i++) {

            let constant;
            let key = keys[i];
            const propValue = val[key];

            if (propValue === null || propValue === undefined || typeof propValue === 'string') {
                constant = constants.types.string;
            } else if (propValue === true || propValue === false || isNumber(propValue) || propValue instanceof Date) {
                constant = constants.types.int;
            } else if (typeof val === 'object') {
                constant = constants.types.object;
            } else {
                throw new Error(`Writer encountered unhandled value: ${val}`);
            }

            let lengthInBytes = Buffer.byteLength(key);
            util.extendBufferIfNeeded(buffer, lengthInBytes + 2);

            buffer.data.writeInt8(constant, buffer.offset);
            buffer.offset += 1;
            buffer.data.write(key, buffer.offset, lengthInBytes);
            buffer.offset += lengthInBytes;
            buffer.data.writeInt8(constants.special.propertyNameEnd, buffer.offset);
            buffer.offset += 1;

            appendValue(propValue, buffer);
        }

        util.extendBufferIfNeeded(buffer, 1);
        buffer.data.writeInt8(constants.special.objectEnd, buffer.offset);
        buffer.offset += 1;
    } else {
        throw new Error(`Writer encountered unhandled value: ${val}`);
    }
}

function topLevel(obj) {

    let buffer = util.initBuffer(obj);

    appendValue(obj, buffer);
    return buffer.data.slice(0, buffer.offset);
}

module.exports = topLevel;