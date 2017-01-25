var _ = require('lodash');


var keywords = ['exe','StartDir','icon','ShortcutPath','hidden'];


function prepObj(obj){

    obj = _.cloneDeep(obj);
    return obj;
}

module.exports = function(utf8Str){


    var arr = utf8Str.split(/[\00\01\02\b]/);

    var appSplit = utf8Str.split(/AppName/i);

    appSplit.splice(0,1);

    var hiddenValues = _.map(appSplit, function(appStr){

        var m = appStr.match(/hidden\00(.)\00/);
        if(m)
            return m[1];

        return undefined;
    });

    var apps = [];

    var obj;
    var key;
    for(var i = 0; i < arr.length; i++){
        var cur = arr[i].trim();
        if(!cur) continue;

        var lower = cur.toLowerCase();

        if(lower === 'appname'){
            if(obj) apps.push(prepObj(obj));
            obj = {};
            key = 'AppName';
        } else if(lower === 'tags') {
            obj[cur] = [];
            key = 'tags';
        } else if(_.any(keywords, function(k){ return k.toLowerCase() === lower; })){
            obj[cur] = '';
            key = cur;
        } else if(cur && key){

            if(lower === 'tags'){
                if(! /(\d+)/.test(cur))
                    obj[key].push(cur);
            } else {
                obj[key] = cur;
                key = undefined;
            }

        }

    }

    apps.push(prepObj(obj));

    //hidden = \01 or \u0001
    // visible = \00 or \0000

    for(var i = 0; i < apps.length; i++){
        if(!apps[i].hidden){
            var h = hiddenValues[i];
            if(h === '\01'){
                apps[i].hidden = true;
            } else{
                apps[i].hidden = false;
            }
        }
    }

    return apps;
};