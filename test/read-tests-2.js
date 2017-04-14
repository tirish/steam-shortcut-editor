var fs = require('fs');
var shortcut = require('../lib');
var should = require('should');


var filePath = __dirname+'/shortcuts2.vdf';
function readFile(cb){
    fs.readFile(filePath, {encoding:'utf8'}, function(err, data){

        if(err){
            console.log('failed to read '+filePath);
            throw err;
        }
        cb(data);
    });
}

describe('read test', function(){


    it('reads and writes same content', function(done){


        readFile(function(input){

            var obj = shortcut.parse(input);
            var output = shortcut.stringify(obj);

            should.equal(input, output);
            done();

        });

    });


});

