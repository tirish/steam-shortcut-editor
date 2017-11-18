const sizeof = require('object-sizeof');

function multiplesOf(number, constant) {
    return Math.max(1, Math.floor(number/constant) + (number%constant === 0 ? 0 : 1));
}

function extendBufferIfNeeded(buffer, newAmountOfBytes) {

    if (buffer.data === undefined) {
        let multiplesOfAlloc = multiplesOf(newAmountOfBytes, buffer.allocSize);
        buffer.data = Buffer.alloc(multiplesOfAlloc * buffer.allocSize);
    } else if (buffer.data.length < buffer.offset + newAmountOfBytes) {
        let remainingSize = newAmountOfBytes - (buffer.data.length - buffer.offset);
        let multiplesOfAlloc = multiplesOf(remainingSize, buffer.allocSize);
        buffer.data = Buffer.concat([buffer.data], buffer.data.length + (multiplesOfAlloc * buffer.allocSize));
    }
}


function initBuffer(obj){
    let buffer = { data: undefined, offset: 0, allocSize: 256 };

    // try to predict object size to reduce number of allocations
    extendBufferIfNeeded(buffer, sizeof(obj));

    return buffer;
}


module.exports = {
    _multiplesOf: multiplesOf,
    initBuffer: initBuffer,
    extendBufferIfNeeded: extendBufferIfNeeded
};