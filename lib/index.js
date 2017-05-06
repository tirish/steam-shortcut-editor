var fs = require('fs');
var _ = require('lodash');

var parseBuffer = require('./parser');
var writeBuffer = require('./writer');

function parseFile(filePath, opts, callback){

    if(_.isFunction(opts)){
        callback = opts;
        opts = null;
    }

    fs.readFile(filePath, function(err, data){
        if(err){
            callback(err);
            return;
        }

        var obj = parseBuffer(data, opts);
        callback(null, obj, data);
    });
}

function writeFile(filePath, obj, opts, callback){
    if(_.isFunction(opts)){
        callback = opts;
        opts = null;
    }

    var data = writeBuffer(obj);

    fs.writeFile(filePath, data, callback);
}


module.exports = {
    parseFile: parseFile,
    parseBuffer: parseBuffer,
    writeFile: writeFile,
    writeBuffer: writeBuffer
};