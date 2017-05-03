var shortcut = require('../lib');
var should = require('should');


describe('write-read tests', function(){

    it('writes and reads same object', function(done){

        var input = {
            a: 'one',
            b: {
                c: 'two'
            },
            d: true,
            e: [
                'hello',
                'world'
            ],
            f: {
                g: [
                    {
                        name: 'hello',
                        value: 'hi'
                    },
                    {
                        n: 'hola',
                        v: 'ciao'
                    }
                ]
            }
        };

        var str = shortcut.stringify(input);
        var output = shortcut.parse(str, { autoConvertBooleans : true, autoConvertArrays: true});

        should.deepEqual(input, output);
        done();
    });


});

