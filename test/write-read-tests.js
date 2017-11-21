const shortcut = require('../lib');
const should = require('should');


describe('write-read tests', function(){

    it('writes and reads same object', function(done){

        const input = {
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
            flag: false,
            tags: [
                7800
            ]
        };

        let buffer = shortcut.writeBuffer(input);
        let output = shortcut.parseBuffer(buffer, { autoConvertBooleans: true, autoConvertArrays: true, dateProperties: ['someDate']});

        should.deepEqual(input, output);
        done();
    });


});

