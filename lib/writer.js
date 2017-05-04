
var _ = require('lodash');

var constants = require('./constants');

function writeValue(val){

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
        return val + constants.special.stringEnd;
    } else if(_.isNumber(val)){
        // four bytes, LE
        var buffer = Buffer.alloc(4);
        buffer.writeInt32LE(val);
        return buffer.toString();
    } else if(_.isObject(val)){

        var str = '';
        var keys;
        if(_.isArray(val)){
            keys = _.range(val.length);
        } else {
            keys = _.keys(val);
        }

        _.forEach(keys, function(key){

            var propValue = val[key];

            if(_.isNull(propValue) || _.isUndefined(propValue) || _.isString(propValue)){
                str += constants.types.string;
            } else if(_.isBoolean(propValue) || _.isNumber(propValue) || _.isDate(propValue)){
                str += constants.types.int;
            } else {
                str += constants.types.object;
            }
            str+= key + constants.special.propertyNameEnd;

            str += writeValue(propValue);
        });
        str += constants.special.objectEnd;

        return str;
    }

    throw new Error('Writer encountered unhandled value: '+val);
}

function topLevel(obj){
    return writeValue(obj);
}


module.exports = topLevel;