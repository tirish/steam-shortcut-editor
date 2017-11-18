const util = require('../lib/util');
const should = require('should');


describe('util tests', function () {

    it('multiples of', function (done) {

        const cases = [
            { n: 101, of: 5, out: 21},
            { n: 1, of: 5, out: 1},
            { n: 123000, of: 256, out: 481},
            { n: 25, of: 5, out: 5},
        ];

        cases.forEach( c=> {
            util._multiplesOf(c.n, c.of).should.eql(c.out);
        });


        done();
    });

});