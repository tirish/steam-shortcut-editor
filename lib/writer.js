var _ = require('lodash');

function objToUgly(obj){
    var str  ='';

    if(!_.isObject(obj)){
        return obj + '\00';
    }

    _.forIn(obj, function(value,key){

        var c = '\01';

        if(value === true){
            value = '\01';
        } else if(value === false){
            value = '\00';
        }

        if(key === 'hidden'){
            c = '\02';
            value = value + '\00\00';
        }


        if(!_.isString(value) && _.isArray(value)){
            str += arrToUgly(key,value);
        } else {
            str += c+key+'\00' + value + '\00';
        }

    });
    return str;
}

function arrToUgly(name,arr){
    var str = '\00'+name+'\00';

    arr = _.filter(arr, function(item){
        return item !== undefined && item !== null;
    });

    for(var i = 0; i < arr.length; i++){
        if(name === 'tags'){
            str +='\01'+i+'\00';
        } else {
            str +='\00'+i+'\00';
        }
        str += objToUgly(arr[i]);
    }
    str += '\b\b';
    return str;
}

module.exports = function(data){

    return objToUgly({shortcuts :data});

};