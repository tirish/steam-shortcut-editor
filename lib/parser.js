var _ = require('lodash');
var constants = require('./constants');


function isNumber(str){
    return str && (str.match(/\d+/)||'').length;
}

function parseStringValue(input){
    var start = input.i;
    while(input.buf.readUInt8(input.i) != constants.special.stringEnd){
        input.i++;
    }

    var value = input.buf.toString('utf8', start, input.i);
    input.i++;
    return value;
}

// LE 32 bit number
function parseIntValue(input){

    var value = input.buf.readInt32LE(input.i);
    input.i += 4;
    return value;
}

function parseObjectValue(input){

    var obj = {};

    //should have properties, with type and value
    do {
        var type = input.buf.readUInt8(input.i);
        input.i++;
        //handle empty objects
        if (type === constants.special.objectEnd) {
            break;
        }

        var propName = parseStringValue(input);

        try {
            var val;
            switch (type) {
                case constants.types.object:
                    val = parseObjectValue(input);
                    break;
                case constants.types.string:
                    val = parseStringValue(input);
                    break;
                case constants.types.int:
                    val = parseIntValue(input);

                    if(input.options.dateProperties && _.includes(input.options.dateProperties, propName)){
                        val = new Date(val * 1000);
                    } else if(input.options.autoConvertBooleans && (val === 1 || val === 0)){
                        val = !!val;
                    }

                    break;
            }
            obj[propName] = val;
        } catch (err) {
            throw new Error('encountered error while handling property: ' + propName +' '+ err);
        }

    } while(input.i < input.buf.length);

    //input.i++;

    if(input.options.autoConvertArrays) {
        //check if we should convert to an array instead
        var keys = _.keys(obj);
        if (_.all(keys, isNumber)) {
            var arr = new Array(keys.length);
            _.forEach(keys, function (key) {
                var i = Number(key);
                arr[i] = obj[key];
            });
            obj = arr;
        }
    }

    return obj;
}


function topLevel(buffer, opts){
    return parseObjectValue({buf:buffer, i: 0, options: opts || { autoConvertArrays: true, autoConvertBooleans: true }});
}

module.exports = topLevel;