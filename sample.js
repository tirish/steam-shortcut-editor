var fs = require('fs');
var config = {
    steamUserId: process.env.STEAM_USER_ID,
    steamDirectory: process.env.STEAM_DIRECTORY || 'C:/Program Files (x86)/Steam'
};
var shortcut = require('./lib');


var filePath = config.steamDirectory+'/userdata/'+config.steamUserId+'/config/shortcuts.vdf';
var writePath = filePath.replace('shortcuts','shortcuts_write');

shortcut.parseFile(filePath,
    { autoConvertArrays: true, autoConvertBooleans: true, dateProperties: ['LastPlayTime']},
function(err, obj, inputBuffer){

    if(err){
        console.log('failed to read '+filePath);
        return;
    }

    //Buffer read from file
    console.log('Raw Buffer:', inputBuffer);

    //Parsed Object
    console.log(JSON.stringify(obj,null,2));

    shortcut.writeFile(writePath, obj, function (err) {
        if(err){
            console.log('failed to write '+writePath);
        }
    });

});
