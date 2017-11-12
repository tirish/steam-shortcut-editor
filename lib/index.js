const fs = require('fs');
const _ = require('lodash');

const parseBuffer = require('./parser');
const writeBuffer = require('./writer');

function noop() { }

function parseFile(filePath, opts, callback) {
    if (_.isFunction(opts)) {
        callback = opts;
        opts = null;
    }
    callback = callback || noop;

    fs.readFile(filePath, function (err, data) {
        if (err) {
            callback(err);
            return;
        }

        try {
            let obj = parseBuffer(data, opts);
            callback(null, obj, data);
        } catch (err) {
            callback(err);
            return;
        }
    });
}

function writeFile(filePath, obj, opts, callback) {
    if (_.isFunction(opts)) {
        callback = opts;
        opts = null;
    }
    callback = callback || noop;

    let data = writeBuffer(obj);

    fs.writeFile(filePath, data, callback);
}


module.exports = {
    parseFile: parseFile,
    parseBuffer: parseBuffer,
    writeFile: writeFile,
    writeBuffer: writeBuffer
};