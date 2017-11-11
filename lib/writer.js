const _ = require('lodash');
const constants = require('./constants');
const buffer_32bit = Buffer.alloc(4);

function stringValues(str) {
    if (!str) {
        return [];
    }
    return [...Buffer.from(str)];
}

function appendValue(val, octets) {

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
        let values = stringValues(val);
        values.push(constants.special.stringEnd);
        return octets.concat(values);
    } else if (!isNaN(parseFloat(val)) && isFinite(val) /* isNumber */) {
        // four bytes, LE
        buffer_32bit.writeInt32LE(val);
        return octets.concat([...buffer_32bit]);
    } else if (typeof val === 'object') {

        let values = [];
        let keys = undefined;
        let isKeyA_Number = false;
        if (val instanceof Array) {
            isKeyA_Number = true;
            keys = new Array(val.length);
            for (var i = 0; i < keys.length; i++)
                keys[i] = i;
        } else {
            keys = Object.keys(val);
        }

        for (var i = 0; i < keys.length; i++) {
            const key = keys[i];
            const propValue = val[key];

            if (propValue === null || propValue === undefined || typeof propValue === 'string') {
                values.push(constants.types.string);
            } else if (propValue === true || propValue === false || (!isNaN(parseFloat(propValue)) && isFinite(propValue)) /* isNumber */ || propValue instanceof Date) {
                values.push(constants.types.int);
            } else {
                values.push(constants.types.object);
            }

            values = values.concat(stringValues(isKeyA_Number ? key.toString() : key));
            values.push(constants.special.propertyNameEnd);

            values = appendValue(propValue, values);

        }
        values.push(constants.special.objectEnd);

        return octets.concat(values);
    }

    throw new Error(`Writer encountered unhandled value: ${val}`);
}

function topLevel(obj) {
    let octets = appendValue(obj, []);
    return Buffer.from(octets);
}

module.exports = topLevel;