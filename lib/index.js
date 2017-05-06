var fs = require('fs');
var _ = require('lodash');

var parseBuffer = require('./parser');
var writeBuffer = require('./writer');

function noop(){}

function parseFile(filePath, opts, callback){

    if(_.isFunction(opts)){
        callback = opts;
        opts = null;
    }
    callback = callback || noop;

    fs.readFile(filePath, function(err, data){
        if(err){
            callback(err);
            return;
        }

        var obj;
        try {
            obj = parseBuffer(data, opts);
        } catch(err){
            callback(err);
            return;
        }

        callback(null, obj, data);
    });
}

function writeFile(filePath, obj, opts, callback){
    if(_.isFunction(opts)){
        callback = opts;
        opts = null;
    }
    callback = callback || noop;

    var data = writeBuffer(obj);

    fs.writeFile(filePath, data, callback);
}


module.exports = {
    parseFile: parseFile,
    parseBuffer: parseBuffer,
    writeFile: writeFile,
    writeBuffer: writeBuffer
};