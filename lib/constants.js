
module.exports = {
    types: {
        object: '\00',
        string: '\01',
        boolean: '\02'
    },
    values: {
        true: '\01\0\00',
        false: '\00\00\00'
    },
    special: {
        objectEnd: '\b',
        stringEnd: '\00',
        booleanEnd: '\00',
        propertyNameEnd: '\00'
    }
};