function charArrayContext(arr, index, reach){

    var str = '';
    var first = index-reach;
    if(first < 0) first = 0;

    for(var i = first; i < index; i++){
        str+= arr[i];
    }
    str += arr[index];
    for(var i = index+1; i < arr.length && i < index+reach+1; i++){
        str+=arr[i];
    }

    return str;
}

function compareData(origStr,mineStr, verbose){
    //compare
    if(verbose) {
        console.log(JSON.stringify({ORIG: origStr}));
        console.log(JSON.stringify({MINE: mineStr}));
    }

    var mineArr = mineStr.split('');
    var origArr = origStr.split('');
    var foundMismatch = false;

    if(mineArr.length !== origArr.length){
        foundMismatch = true;
        console.log('Length mismatch: Mine='+mineArr.length+'; Orig='+origArr.length);
    } else if(verbose) {
        console.log('Length matches!');
    }
    for(var i = 0; i< mineArr.length; i++){

        if(i >= origArr.length){
            break;
        }
        if(mineArr[i] !== origArr[i]){
            foundMismatch = true;
            console.log('\tchar mismatch ['+i+']: '+JSON.stringify({Mine:mineArr[i]})+'; '+JSON.stringify({Orig:origArr[i]}));
            console.log('\t\tcontext '+JSON.stringify({Mine:charArrayContext(mineArr,i,5)}));
            console.log('\t\tcontext '+JSON.stringify({Orig:charArrayContext(origArr,i,5)}));
        }

    }

    if(!foundMismatch) console.log('NO MISMATCHES!');

}


module.exports = {
    compareData: compareData,
    charArrayContext: charArrayContext
};