
var _ = require('lodash');

var constants = require('./constants');

function writeValue(val){

    //treat these as strings
    if(val === null || val === undefined){
        return constants.special.stringEnd;
    }

    if(_.isString(val) || _.isNumber(val)){
        return val+constants.special.stringEnd;
    } else if(_.isBoolean(val)){
        return (val ? constants.values.true : constants.values.false) + constants.special.booleanEnd;
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

            if(propValue === undefined || propValue === null || _.isString(propValue) || _.isNumber(propValue)){
                str += constants.types.string;
            } else if(_.isBoolean(propValue)){
                str += constants.types.boolean;
            } else {
                str += constants.types.object;
            }
            str+= key + constants.special.propertyNameEnd;

            str += writeValue(propValue);
        });
        str += constants.special.objectEnd;

        return str;
    }

    throw 'Writer encountered unhandled value: '+val;
}

function topLevel(obj){
    return writeValue(obj);
}


module.exports = topLevel;