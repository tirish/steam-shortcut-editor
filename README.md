# steam-shortcut-editor

```
npm i steam-shortcut-editor
```

Edit Steam Shortcuts using [Node.js](https://nodejs.org/)

**Read/Write Steam `shortcuts.vdf` file.**
This file is found in `$SteamDirectory/userdata/$SteamUserId/config`.

After modifying the file, Steam will need to be restarted. If you modify the file, then add a Non-Steam Game using the Steam UI, it will overwrite the file. If the file is not formatted correctly after Steam restarts, it will delete the file. **Be sure to backup the file before messing with it.**

This has only been tested on Windows 10 and Windows 7, so the string representation of `shortcuts.vdf` might vary by platform.

## Sample Program
To run the `sample.js` file, the environment variable `STEAM_USER_ID` should be defined to the Steam id used in the file path to the `shortcuts.vdf` file. The `sample.js` will read in `shortcuts.vdf`, dump the JSON representation to the console, then rewrite the file into `shortcuts_write.vdf` file.

If not on Windows (or your Steam directory isn't `C:/Program Files (x86)/Steam`) you can set the Steam directory by setting the environment variable `STEAM_DIRECTORY`.


## Data Contract - Shortcut Object

To add new shortcuts, write an object that looks like:
```javascript
{
  "shortcuts": [
    {
      "AppName": "Minecraft - FTB",
      "exe": "\"C:\\Path\\With Space\\To\\some.exe\"",
      "StartDir": "\"C:\\Path\\With Space\\To\\\"",
      "IsHidden": false,
      "icon": '',
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
- `AppName`: Name shown in Steam. (the casing seems to vary, have seen it appear as `appname`)
- `exe`: Path to exe file to run. Should be within quotes.
- `StartDir`: Path to directory to run the exe file within. Should be within quotes. Typically, should be directory containing exe file.
- `icon`: Path to icon file. If left blank, will use the icon for the exe file.
- `IsHidden`: Should be boolean value.
- `LastPlayTime`: Date of last play. To automatically parse this value, include `dateProperties: ['LastPlayTime']` in the parser options.
- `tags`: Array of tags. If no tags are desired, it should be an empty array.

## Usage

```
npm i steam-shortcut-editor
```

```javascript
var shortcut = require('steam-shortcut-editor');

var filePath = 'full/path/to/shortcuts.vdf';
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

```



### Parsing

There are two parsing functions exposed:
- `shortcut.parseFile(filePath[, options], callback)` : Uses `fs` to read file as `Buffer`, then uses `shortcut.parseBuffer` to parse it.
  - The callback should be `function (err, parsedObject, inputBuffer) { ... }`
- `shortcut.parseBuffer(buffer[, options])`

The parse functions accept an optional `options` argument. This `options` argument should be an object the looks like:
```javascript
{
    autoConvertBooleans: true,
    autoConvertArrays: true,
    dateProperties: ['LastPlayTime']
}
```
- If `autoConvertBooleans` is truthy, numbers that equal `1` will be set to `true` and numbers that equal `0` will be set to `false`. Handles the common flags within a shortcut object.
- If `autoConvertArrays` is truthy, any objects with only numbers for properties (like the `shortcuts` object) will be changed to be arrays.
- The `dateProperties` array is used to indicate properties that should be automatically adjusted from numbers to `Date` objects. Numbers are adjusted to dates by doing `new Date(number * 1000)`.

If no options are provided, it will use the default settings of `{ autoConvertBooleans: true, autoConvertArrays: true }`.

**This library does not make any property name/value assumptions. It is up to you to handle the weird variations in property names. It is also up to you to explicitly include any date properties you need parsed in the `dateProperties` parse option.**

### Writing

There are two writing functions exposed:
- `shortcut.writeFile(filePath, obj, callback)` : Writes the object to the file after converting to a `Buffer` using `shortcut.writeBuffer`.
  - The callback should be `function (err) { ... }`
- `shortcut.writeBuffer(obj)` : returns a `Buffer` that can be written to a file

The writing functions will automatically convert..
- boolean values to the numbers `1` and `0` (for `true` and `false`)
- `Date` objects to numbers (using `date.valueOf() / 1000`)
- arrays to objects
- `null` and `undefined` to empty string



