var fs = require('fs');
var shortcut = require('../lib');
var should = require('should');

function readFile(fileName, cb){
    var filePath = __dirname + '/static/'+fileName+'.vdf';
    fs.readFile(filePath, {encoding:'utf8'}, function(err, data){

        if(err){
            console.log('failed to read '+filePath);
            throw err;
        }
        cb(data);
    });
}

describe('read-write tests', function(){


    it('reads and writes same content: shortcuts1', function(done){


        readFile('shortcuts1', function(input){

            var obj = shortcut.parse(input);

            var expected = {
                shortcuts: [
                    {
                        AppName: 'Minecraft - FTB',
                        exe: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\launcher^FTB_Launcher.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: ['favorite']
                    },
                    {
                        AppName: 'Minecraft',
                        exe: '"U:\\Users\\Me\\Minecraft\\Vanilla\\Minecraft_New.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Vanilla\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: ['favorite']
                    },
                    {
                        AppName: 'Tom Clancy\'s The Division',
                        exe: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\TheDivision.exe"',
                        StartDir: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: ['favorite']
                    }
                ]
            };

            should.deepEqual(expected, obj);

            var output = shortcut.stringify(obj);

            should.equal(input, output);
            done();

        });

    });

    it('reads and writes same content: shortcuts2', function(done){


        readFile('shortcuts2', function(input){

            var obj = shortcut.parse(input);


            var expected = {
                shortcuts: [
                    {
                        AppName: 'AI Suite 3',
                        exe: '"C:\\Program Files (x86)\\ASUS\\AI Suite III\\AISuite3.exe"',
                        StartDir: '"C:\\Program Files (x86)\\ASUS\\AI Suite III\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        LaunchOptions: undefined,
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        LastPlayTime: false,
                        tags: []
                    }
                ]
            };

            should.deepEqual(expected, obj);

            var output = shortcut.stringify(obj);

            should.equal(input, output);
            done();

        });

    });


    it('reads and writes same content: shortcuts3', function(done){


        readFile('shortcuts3', function(input){

            var obj = shortcut.parse(input);

            var expected = {
                shortcuts: [
                    {
                        AppName: 'AI Suite 3',
                        exe: '"C:\\Program Files (x86)\\ASUS\\AI Suite III\\AISuite3.exe"',
                        StartDir: '"C:\\Program Files (x86)\\ASUS\\AI Suite III\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        LaunchOptions: undefined,
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        LastPlayTime: false,
                        tags: []
                    },
                    {
                        AppName: '3D Vision Photo Viewer',
                        exe: '"C:\\Program Files (x86)\\NVIDIA Corporation\\3D Vision\\nvstview.exe"',
                        StartDir: '"C:\\Program Files (x86)\\NVIDIA Corporation\\3D Vision\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        LaunchOptions: undefined,
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        LastPlayTime: false,
                        tags: []
                    }
                ]
            };

            should.deepEqual(expected, obj);

            var output = shortcut.stringify(obj);

            should.equal(input, output);
            done();

        });

    });

});

