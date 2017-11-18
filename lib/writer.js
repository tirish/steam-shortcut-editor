const constants = require('./constants');
const sizeof = require('object-sizeof');

function multiplesOf(number, constant) {
    let multiples = 1;
    while (number > 0) {
        number -= constant;
        multiples++;
    }
    return multiples;
}

function extendBufferIfNeeded(buffer, newAmountOfBytes) {

    if (buffer.data === undefined) {
        let multiplesOfAlloc = multiplesOf(newAmountOfBytes, buffer.allocSize);
        buffer.data = Buffer.alloc(multiplesOfAlloc * buffer.allocSize);
    }
    else if (buffer.data.length < buffer.offset + newAmountOfBytes) {
        let remainingSize = newAmountOfBytes - (buffer.data.length - buffer.offset);
        let multiplesOfAlloc = multiplesOf(remainingSize, buffer.allocSize);
        buffer.data = Buffer.concat([buffer.data], buffer.data.length + (multiplesOfAlloc * buffer.allocSize));
    }
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
        extendBufferIfNeeded(buffer, lengthInBytes + 1);

        buffer.data.write(val, buffer.offset, lengthInBytes);
        buffer.offset += lengthInBytes;
        buffer.data.writeInt8(constants.special.stringEnd, buffer.offset);
        buffer.offset += 1;
    } else if (!isNaN(parseFloat(val)) && isFinite(val) /* isNumber */) {
        // four bytes, LE
        extendBufferIfNeeded(buffer, 4);
        buffer.data.writeInt32LE(val, buffer.offset);
        buffer.offset += 4;
    } else if (typeof val === 'object') {

        let keys = undefined;
        let keyIsNumber = false;
        let constant = undefined;
        let lengthInBytes = undefined;

        if (val instanceof Array) {

            keyIsNumber = true;
            keys = new Array(val.length);
            for (var i = 0; i < keys.length; i++)
                keys[i] = i;
        } else {
            keys = Object.keys(val);
        }

        for (var i = 0; i < keys.length; i++) {

            let key = keys[i];
            const propValue = val[key];

            if (propValue === null || propValue === undefined || typeof propValue === 'string') {
                constant = constants.types.string;
            } else if (propValue === true || propValue === false || (!isNaN(parseFloat(propValue)) && isFinite(propValue)) /* isNumber */ || propValue instanceof Date) {
                constant = constants.types.int;
            } else {
                constant = constants.types.object;
            }

            if (keyIsNumber)
                key = key.toString();

            lengthInBytes = Buffer.byteLength(key);
            extendBufferIfNeeded(buffer, lengthInBytes + 2);

            buffer.data.writeInt8(constant, buffer.offset);
            buffer.offset += 1;
            buffer.data.write(key, buffer.offset, lengthInBytes);
            buffer.offset += lengthInBytes;
            buffer.data.writeInt8(constants.special.propertyNameEnd, buffer.offset);
            buffer.offset += 1;

            appendValue(propValue, buffer);
        }

        extendBufferIfNeeded(buffer, 1);
        buffer.data.writeInt8(constants.special.objectEnd, buffer.offset);
        buffer.offset += 1;
    }
    else
        throw new Error(`Writer encountered unhandled value: ${val}`);
}

function topLevel(obj) {

    let buffer = { data: undefined, offset: 0, allocSize: 256 };

    // try to predict object size to reduce number of allocations
    extendBufferIfNeeded(buffer, sizeof(obj));

    appendValue(obj, buffer);
    return buffer.data.slice(0, buffer.offset);
}

module.exports = topLevel;