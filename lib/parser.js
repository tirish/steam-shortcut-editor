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

function parseBooleanValue(input){
    var m = execRegexAt(input.str, /((?:\00\00\00)|(?:\01\00\00))\00/y, input.i);
    var value = m[1];
    input.i += value.length + 1;
    return value === constants.values.true;
}

function parseObjectValue(input){

    var obj = {};
    var parserRegex = /([^\00\01\02\b]+)\00/y;

    //should have properties, with type and value
    do {
        var type = input.str[input.i];
       
        //handle non-empty objects
        if (type !== constants.special.objectEnd){
            var m = execRegexAt(input.str, parserRegex, ++input.i);
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
                    case constants.types.boolean:
                        val = parseBooleanValue(input);
                        break;
                }
                obj[propName] = val;
            } catch (err) {
                console.error('encountered error while handling property:', propName, err);
            }
        }
        else
            break;

    } while(input.i < input.str.length);

    input.i++;

    //check if we should convert to an array instead
    var keys = _.keys(obj);
    if(_.all(keys, isNumber)){
        var arr = new Array(keys.length);
        _.forEach(keys, function(key){
            var i = Number(key);
            arr[i] = obj[key];
        });
        obj = arr;
    }

    return obj;
}


function topLevel(str){
    return parseObjectValue({str:str,i: 0});
}

module.exports = topLevel;