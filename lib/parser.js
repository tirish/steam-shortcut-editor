const _ = require('lodash');
const constants = require('./constants');
const numberRegex = /\d+/;

function isNumber(str) {
    return str && (str.match(numberRegex) || '').length;
}

function parseStringValue(input) {

    let start = input.i;
    while (input.buf.readUInt8(input.i) !== constants.special.stringEnd) {
        input.i++;
    }

    let value = input.buf.toString('utf8', start, input.i);
    input.i++;
    return value;
}

// LE 32 bit number
function parseIntValue(input) {

    let value = input.buf.readInt32LE(input.i);
    input.i += 4;
    return value;
}

function parseObjectValue(input) {

    let obj = {};
    let val;

    //should have properties, with type and value
    do {
        let type = input.buf.readUInt8(input.i);
        input.i++;
        //handle empty objects/arrays
        if (type === constants.special.objectEnd) {
            break;
        }

        let propName = parseStringValue(input);

        try {
            switch (type) {
                case constants.types.object:
                    val = parseObjectValue(input);
                    break;
                case constants.types.string:
                    val = parseStringValue(input);
                    break;
                case constants.types.int:
                    val = parseIntValue(input);

                    if (input.options.dateProperties && _.includes(input.options.dateProperties, propName)) {
                        val = new Date(val * 1000);
                    } else if (input.options.autoConvertBooleans && (val === 1 || val === 0)) {
                        val = !!val;
                    }

                    break;
            }
            obj[propName] = val;
        } catch (err) {
            throw new Error(`encountered error while handling property: ${propName} ${err}`);
        }

    } while (input.i < input.buf.length);


    if (input.options.autoConvertArrays) {
        //check if we should convert to an array instead
        let keys = Object.keys(obj);
        if (_.every(keys, isNumber)) {
            let arr = new Array(keys.length);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                arr[key] = obj[key];
            }
            obj = arr;
        }
    }

    return obj;
}

function topLevel(buffer, opts) {
    return parseObjectValue({ buf: buffer, i: 0, options: opts || { autoConvertArrays: true, autoConvertBooleans: true } });
}

module.exports = topLevel;