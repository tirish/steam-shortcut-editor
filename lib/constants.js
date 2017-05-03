
module.exports = {
    types: {
        object: '\00',
        string: '\01',
        int: '\02'
    },
    values: {
        true: '\01\00\00\00',
        false: '\00\00\00\00'
    },
    special: {
        objectEnd: '\b',
        stringEnd: '\00',
        propertyNameEnd: '\00'
    }
};