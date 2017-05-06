
var _ = require('lodash');

var constants = require('./constants');

function stringValues(str){
    if(!str){
        return [];
    }
    var buffer = Buffer.from(str);
    return Array.from(buffer.values());
}

function appendValue(val, octets){

    //pre process values to align with writable values
    if(_.isNull(val) || _.isUndefined(val)) {
        //treat as empty strings
        val = '';
    } else if(_.isDate(val)){
        //treat dates as numbers
        val = val.valueOf() / 1000;
    } else if(_.isBoolean(val)){
        //treat booleans as numbers
        val = val ? 1 : 0;
    }

    // write values
    if(_.isString(val)) {
        var values = stringValues(val);
        values.push(constants.special.stringEnd);
        return octets.concat(values);
    } else if(_.isNumber(val)){
        // four bytes, LE
        var buffer = Buffer.alloc(4);
        buffer.writeInt32LE(val);
        return octets.concat(Array.from(buffer.values()));
    } else if(_.isObject(val)){

        var values = [];
        var keys;
        if(_.isArray(val)){
            keys = _.range(val.length);
        } else {
            keys = _.keys(val);
        }

        _.forEach(keys, function(key){

            var propValue = val[key];

            if(_.isNull(propValue) || _.isUndefined(propValue) || _.isString(propValue)){
                values.push(constants.types.string);
            } else if(_.isBoolean(propValue) || _.isNumber(propValue) || _.isDate(propValue)){
                values.push(constants.types.int);
            } else {
                values.push(constants.types.object);
            }

            values = values.concat(stringValues(key.toString()));
            values.push(constants.special.propertyNameEnd);

            values = appendValue(propValue, values);
        });
        values.push(constants.special.objectEnd);

        return octets.concat(values);
    }

    throw new Error('Writer encountered unhandled value: '+val);
}

function topLevel(obj){
    var octets = appendValue(obj, []);
    return Buffer.from(octets);
}


module.exports = topLevel;