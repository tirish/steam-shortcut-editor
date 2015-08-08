var fs = require('fs');
var config = require('./config');
var shortcut = require('./lib');


var filePath = 'C:/Program Files (x86)/Steam/userdata/'+config.steamUserId+'/config/shortcuts.vdf';
var writePath = filePath.replace('shortcuts','shortcuts_write');

fs.readFile(filePath, {encoding:'utf8'}, function(err,data){

    if(err){
        console.log('failed to read '+filePath);
        return;
    }

    var dataObj = shortcut.parse(data);

    console.log(JSON.stringify(dataObj,null,2));

    var dataStr = shortcut.stringify(dataObj);

    //sanity check
    shortcut.util.compareData(data,dataStr);

    fs.writeFile(writePath,dataStr, function(err){
        if(err){
            console.log('failed to write '+writePath);
        }
    });


});