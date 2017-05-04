
module.exports = {
    types: {
        object: '\00',
        string: '\01',
        int: '\02'
    },
    special: {
        objectEnd: '\b',
        stringEnd: '\00',
        propertyNameEnd: '\00'
    }
};