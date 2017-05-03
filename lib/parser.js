var _ = require('lodash');
var constants = require('./constants');


function execRegexAt(str, reg, i){
    reg.lastIndex = i;
    return reg.exec(str);
}

function isNumber(str){
    return str && (str.match(/\d+/)||'').length;
}

function parseStringValue(input){
    var m = execRegexAt(input.str, /([^\00\01\02\b]+)?\00/y, input.i);
    var value = m[1];
    input.i += (value ? value.length: 0) + 1;
    return value;
}

// LE 32 bit number
// each character is one byte
function parseIntValue(input){

    var chars = [
        input.str.charCodeAt(input.i),
        input.str.charCodeAt(input.i + 1),
        input.str.charCodeAt(input.i + 2),
        input.str.charCodeAt(input.i + 3)
    ];
    var value = Buffer.from(chars).readInt32LE();
    input.i += 4;
    return value;
}

function parseObjectValue(input){

    var obj = {};

    //should have properties, with type and value
    do {
        var type = input.str[input.i];
       
        //handle empty objects
        if (type === constants.special.objectEnd) {
            break;
        }

        var m = execRegexAt(input.str, /([^\00\01\02\b]+)\00/y, ++input.i);
        var propName = m[1];

        input.i += 1 + propName.length;
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

    } while(input.i < input.str.length);

    input.i++;

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


function topLevel(str, opts){
    return parseObjectValue({str:str,i: 0, options: opts || { autoConvertArrays: true }});
}

module.exports = topLevel;