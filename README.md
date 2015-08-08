# steam-shortcut-editor
Edit Steam Shortcuts using Node.js

Read/Write Steam `shortcuts.vdf` file.
This file is found in `$SteamDirectory/userdata/$SteamUserId/config`.

After modifying the file, Steam will need to be restarted. If you modify the file, then add a Non-Steam Game using the Steam UI, it will overwrite the file. If the file is not formatted correctly after Steam restarts, it will delete the file. **Be sure to backup the file before messing with it.**


To add new shortcuts, stringify an array of objects that look like:
```javascript
{
  "AppName": "Some Name",
  "exe": "\"C:\\path\\to\\exe\"",
  "StartDir": "\"C:\\pate\\to\\dir\\\"",
  "icon": "",
  "ShortcutPath": "",
  "hidden": false,
  "tags": [
    "favorite"
  ]
}
```
- `AppName`: Name shown in Steam
- `exe`: Path to exe file to run. Should be within quotes.
- `StartDir`: Path to directory to run the exe file within. Should be within quotes. Typically, should be directory containing exe file.
- `icon`: Path to icon file. If left blank, will use the icon for the exe file.
- `ShortcutPath`: Not sure what this is used for, I have only ever seen it left blank.
- `hidden`: Should be boolean value. Sometimes Steam puts seemingly random characters (like `)` and `g`) as the value, but boolean values should work as expected.
- `tags`: Array of tags. If no tags are desired, it should be an empty array.
