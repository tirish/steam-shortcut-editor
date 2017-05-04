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

            var obj = shortcut.parse(input, { autoConvertBooleans: true, autoConvertArrays: true });

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

    it('reads and writes same content: shortcuts1 (no auto arrays)', function(done){


        readFile('shortcuts1', function(input){

            var obj = shortcut.parse(input, { autoConvertBooleans: true });

            var expected = {
                shortcuts: {
                    0: {
                        AppName: 'Minecraft - FTB',
                        exe: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\launcher^FTB_Launcher.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: {0: 'favorite'}
                    },
                    1: {
                        AppName: 'Minecraft',
                        exe: '"U:\\Users\\Me\\Minecraft\\Vanilla\\Minecraft_New.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Vanilla\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: {0: 'favorite'}
                    },
                    2: {
                        AppName: 'Tom Clancy\'s The Division',
                        exe: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\TheDivision.exe"',
                        StartDir: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: {0: 'favorite'}
                    }
                }
            };

            should.deepEqual(expected, obj);

            var output = shortcut.stringify(obj);

            should.equal(input, output);
            done();

        });

    });

    it('reads and writes same content: shortcuts1 (no auto booleans)', function(done){


        readFile('shortcuts1', function(input){

            var obj = shortcut.parse(input, { autoConvertArrays: true });

            var expected = {
                shortcuts: [
                    {
                        AppName: 'Minecraft - FTB',
                        exe: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\launcher^FTB_Launcher.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        IsHidden: 0,
                        AllowDesktopConfig: 1,
                        OpenVR: 0,
                        tags: ['favorite']
                    },
                    {
                        AppName: 'Minecraft',
                        exe: '"U:\\Users\\Me\\Minecraft\\Vanilla\\Minecraft_New.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Vanilla\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        IsHidden: 0,
                        AllowDesktopConfig: 1,
                        OpenVR: 0,
                        tags: ['favorite']
                    },
                    {
                        AppName: 'Tom Clancy\'s The Division',
                        exe: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\TheDivision.exe"',
                        StartDir: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        IsHidden: 0,
                        AllowDesktopConfig: 1,
                        OpenVR: 0,
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


    it('reads and writes same content: shortcuts4', function(done){


        readFile('shortcuts4', function(input){

            console.log(JSON.stringify({str: input}));
            var obj = shortcut.parse(input, { autoConvertBooleans: true, autoConvertArrays: true, dateProperties: ['LastPlayTime']});

            var expected = {
                shortcuts: [
                    {
                        AppName: 'The Legend of Zelda: Breath of the Wild',
                        exe: '"C:\\Games\\CEMU\\Cemu.exe"',
                        StartDir: '"C:\\Games\\CEMU\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        LaunchOptions: '-f -g "C:\\Games\\CEMU Roms\\The Legend of Zelda Breath of the Wild\\00050000101C9500\\code\\U-King.rpx"',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        LastPlayTime: new Date('2017-05-01 09:24:13.000 -0400'),
                        tags: []
                    },
                    {
                        AppName: 'Xenoblade Chronicles X',
                        exe: '"C:\\Games\\CEMU\\Cemu.exe"',
                        StartDir: '"C:\\Games\\CEMU\\"',
                        icon: undefined,
                        ShortcutPath: undefined,
                        LaunchOptions: '-f -g "C:\\Games\\CEMU Roms\\Xenoblade Chronicles X\\code\\spaceTravel.rpx"',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        LastPlayTime: new Date('2017-05-01 09:38:34.000 -0400'),
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

