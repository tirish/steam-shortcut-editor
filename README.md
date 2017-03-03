# steam-shortcut-editor

```
npm i steam-shortcut-editor
```

Edit Steam Shortcuts using [Node.js](https://nodejs.org/)

Read/Write Steam `shortcuts.vdf` file.
This file is found in `$SteamDirectory/userdata/$SteamUserId/config`.

After modifying the file, Steam will need to be restarted. If you modify the file, then add a Non-Steam Game using the Steam UI, it will overwrite the file. If the file is not formatted correctly after Steam restarts, it will delete the file. **Be sure to backup the file before messing with it.**

This has only been tested on Windows 10 and Windows 7, so the string representation of `shortcuts.vdf` might vary by platform.

## Sample Program
To run the `sample.js` file, the environment variable `STEAM_USER_ID` should be defined to the Steam id used in the file path to the `shortcuts.vdf` file. The `sample.js` will read in `shortcuts.vdf`, dump the JSON representation to the console, then rewrite the file into `shortcuts_write.vdf` file. Before writing the file, the re-created string representation is compared against the original file to ensure the parsing/writing is working correctly.

If not on Windows (or your Steam directory isn't `C:/Program Files (x86)/Steam`) you can set the Steam directory by setting the environment variable `STEAM_DIRECTORY`.


## Data Contract - Shortcut Object

To add new shortcuts, stringify an object that looks like:
```javascript
{
  "shortcuts": [
    {
      "AppName": "Minecraft - FTB",
      "exe": "\"C:\\Path\\With Space\\To\\some.exe\"",
      "StartDir": "\"C:\\Path\\With Space\\To\\\"",
      "IsHidden": false,
      "icon": null,
      "AllowDesktopConfig": true,
      "OpenVR": false,
      "tags": [
        "favorite"
      ]
    },
    //.. more shortcut objects
  ]
}
```
- `AppName`: Name shown in Steam
- `exe`: Path to exe file to run. Should be within quotes.
- `StartDir`: Path to directory to run the exe file within. Should be within quotes. Typically, should be directory containing exe file.
- `icon`: Path to icon file. If left blank, will use the icon for the exe file.
- `IsHidden`: Should be boolean value.
- `tags`: Array of tags. If no tags are desired, it should be an empty array.

## Usage

```
npm i steam-shortcut-editor
```

```javascript
var shortcut = require('steam-shortcut-editor');

var fs = require('fs');


var filePath = 'full/path/to/shortcuts.vdf';
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
```

Parsing is handled by `lib/parser.js`. Read the file using `fs.readFile`, specify the encoding to `utf8`, then give the string value to the parser to get a JSON blob.

Writing is handled by `lib/writer.js`. Give it an object with a `shortcuts` property set to an array of the above Shortcut objects and it will return a string representation, that can be written to a file using `fs.writeFile`.
