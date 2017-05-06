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
                'world',
                78,
                false
            ],
            f: {
                g: [
                    {
                        name: 'hello',
                        value: 'hi',
                        d: 7786
                    },
                    {
                        n: 'hola',
                        v: 'ciao',
                        ddd: 1244004
                    }
                ]
            },
            someDate: new Date(2001, 11, 15),
            numBER: 12345,
            NUMber: 92928,
            flag: false
        };

        var buffer = shortcut.writeBuffer(input);
        var output = shortcut.parseBuffer(buffer, { autoConvertBooleans: true, autoConvertArrays: true, dateProperties: ['someDate']});

        should.deepEqual(input, output);
        done();
    });


});
