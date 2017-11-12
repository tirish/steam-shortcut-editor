var fs = require('fs');
var shortcut = require('../lib');
var should = require('should');

function readFile(fileName, cb) {
    var filePath = __dirname + '/static/' + fileName + '.vdf';
    fs.readFile(filePath, { encoding: 'utf8' }, function (err, data) {

        if (err) {
            console.log('failed to read ' + filePath);
            throw err;
        }
        cb(data);
    });
}

function getFilePath(fileName) {
    return __dirname + '/static/' + fileName + '.vdf';
}

describe('read-write tests', function () {

    it('reads and writes same content: shortcuts1', function (done) {


        shortcut.parseFile(getFilePath('shortcuts1'), function (err, obj, buffer) {

            should.equal(null, err);

            var expected = {
                shortcuts: [
                    {
                        AppName: 'Minecraft - FTB',
                        exe: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\launcher^FTB_Launcher.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\"',
                        icon: '',
                        ShortcutPath: '',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: ['favorite']
                    },
                    {
                        AppName: 'Minecraft',
                        exe: '"U:\\Users\\Me\\Minecraft\\Vanilla\\Minecraft_New.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Vanilla\\"',
                        icon: '',
                        ShortcutPath: '',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: ['favorite']
                    },
                    {
                        AppName: 'Tom Clancy\'s The Division',
                        exe: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\TheDivision.exe"',
                        StartDir: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\"',
                        icon: '',
                        ShortcutPath: '',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: ['favorite']
                    }
                ]
            };

            should.deepEqual(expected, obj);

            var output = shortcut.writeBuffer(obj);

            should.deepEqual(buffer, output);
            done();

        });

    });

    it('reads and writes same content: shortcuts1 (no auto arrays)', function (done) {


        shortcut.parseFile(getFilePath('shortcuts1'), { autoConvertBooleans: true }, function (err, obj, buffer) {

            should.equal(null, err);

            var expected = {
                shortcuts: {
                    0: {
                        AppName: 'Minecraft - FTB',
                        exe: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\launcher^FTB_Launcher.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\"',
                        icon: '',
                        ShortcutPath: '',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: { 0: 'favorite' }
                    },
                    1: {
                        AppName: 'Minecraft',
                        exe: '"U:\\Users\\Me\\Minecraft\\Vanilla\\Minecraft_New.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Vanilla\\"',
                        icon: '',
                        ShortcutPath: '',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: { 0: 'favorite' }
                    },
                    2: {
                        AppName: 'Tom Clancy\'s The Division',
                        exe: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\TheDivision.exe"',
                        StartDir: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\"',
                        icon: '',
                        ShortcutPath: '',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        tags: { 0: 'favorite' }
                    }
                }
            };

            should.deepEqual(expected, obj);

            var output = shortcut.writeBuffer(obj);

            should.deepEqual(buffer, output);
            done();

        });

    });

    it('reads and writes same content: shortcuts1 (no auto booleans)', function (done) {


        shortcut.parseFile(getFilePath('shortcuts1'), { autoConvertArrays: true }, function (err, obj, buffer) {

            should.equal(null, err);

            var expected = {
                shortcuts: [
                    {
                        AppName: 'Minecraft - FTB',
                        exe: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\launcher^FTB_Launcher.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Feed the Beast\\"',
                        icon: '',
                        ShortcutPath: '',
                        IsHidden: 0,
                        AllowDesktopConfig: 1,
                        OpenVR: 0,
                        tags: ['favorite']
                    },
                    {
                        AppName: 'Minecraft',
                        exe: '"U:\\Users\\Me\\Minecraft\\Vanilla\\Minecraft_New.exe"',
                        StartDir: '"U:\\Users\\Me\\Minecraft\\Vanilla\\"',
                        icon: '',
                        ShortcutPath: '',
                        IsHidden: 0,
                        AllowDesktopConfig: 1,
                        OpenVR: 0,
                        tags: ['favorite']
                    },
                    {
                        AppName: 'Tom Clancy\'s The Division',
                        exe: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\TheDivision.exe"',
                        StartDir: '"C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\games\\Tom Clancy\'s The Division\\"',
                        icon: '',
                        ShortcutPath: '',
                        IsHidden: 0,
                        AllowDesktopConfig: 1,
                        OpenVR: 0,
                        tags: ['favorite']
                    }
                ]
            };

            should.deepEqual(expected, obj);

            var output = shortcut.writeBuffer(obj);

            should.deepEqual(buffer, output);
            done();

        });

    });

    it('reads and writes same content: shortcuts2', function (done) {


        shortcut.parseFile(getFilePath('shortcuts2'), function (err, obj, buffer) {

            should.equal(null, err);

            var expected = {
                shortcuts: [
                    {
                        AppName: 'AI Suite 3',
                        exe: '"C:\\Program Files (x86)\\ASUS\\AI Suite III\\AISuite3.exe"',
                        StartDir: '"C:\\Program Files (x86)\\ASUS\\AI Suite III\\"',
                        icon: '',
                        ShortcutPath: '',
                        LaunchOptions: '',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        LastPlayTime: false,
                        tags: []
                    }
                ]
            };

            should.deepEqual(expected, obj);

            var output = shortcut.writeBuffer(obj);

            should.deepEqual(buffer, output);
            done();

        });

    });


    it('reads and writes same content: shortcuts3', function (done) {


        shortcut.parseFile(getFilePath('shortcuts3'), function (err, obj, buffer) {

            should.equal(null, err);

            var expected = {
                shortcuts: [
                    {
                        AppName: 'AI Suite 3',
                        exe: '"C:\\Program Files (x86)\\ASUS\\AI Suite III\\AISuite3.exe"',
                        StartDir: '"C:\\Program Files (x86)\\ASUS\\AI Suite III\\"',
                        icon: '',
                        ShortcutPath: '',
                        LaunchOptions: '',
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
                        icon: '',
                        ShortcutPath: '',
                        LaunchOptions: '',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        LastPlayTime: false,
                        tags: []
                    }
                ]
            };

            should.deepEqual(expected, obj);

            var output = shortcut.writeBuffer(obj);

            should.deepEqual(buffer, output);
            done();

        });

    });


    it('reads and writes same content: shortcuts4', function (done) {


        shortcut.parseFile(getFilePath('shortcuts4'), { autoConvertBooleans: true, autoConvertArrays: true, dateProperties: ['LastPlayTime'] }, function (err, obj, buffer) {

            should.equal(null, err);

            var expected = {
                shortcuts: [
                    {
                        AppName: 'The Legend of Zelda: Breath of the Wild',
                        exe: '"C:\\Games\\CEMU\\Cemu.exe"',
                        StartDir: '"C:\\Games\\CEMU\\"',
                        icon: '',
                        ShortcutPath: '',
                        LaunchOptions: '-f -g "C:\\Games\\CEMU Roms\\The Legend of Zelda Breath of the Wild\\00050000101C9500\\code\\U-King.rpx"',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        LastPlayTime: new Date('2017-05-01 09:24:07.000 -0400'),
                        tags: []
                    },
                    {
                        AppName: 'Xenoblade Chronicles X',
                        exe: '"C:\\Games\\CEMU\\Cemu.exe"',
                        StartDir: '"C:\\Games\\CEMU\\"',
                        icon: '',
                        ShortcutPath: '',
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

            var output = shortcut.writeBuffer(obj);

            should.deepEqual(buffer, output);
            done();

        });

    });


    it('reads and writes same content: shortcuts5', function (done) {


        shortcut.parseFile(getFilePath('shortcuts5'), { autoConvertBooleans: true, autoConvertArrays: true, dateProperties: ['LastPlayTime'] }, function (err, obj, buffer) {

            should.equal(null, err);

            var expected = {
                shortcuts: [
                    {
                        appname: '中文',
                        exe: '"C:\\Games\\CEMU\\Cemu.exe"',
                        StartDir: '"C:\\Games\\CEMU\\"',
                        icon: '',
                        ShortcutPath: '',
                        LaunchOptions: '',
                        IsHidden: false,
                        AllowDesktopConfig: true,
                        OpenVR: false,
                        LastPlayTime: new Date('2017-05-05 15:48:09.000 -0400'),
                        tags: ['Test']
                    }
                ]
            };

            should.deepEqual(expected, obj);

            var output = shortcut.writeBuffer(obj);

            should.deepEqual(buffer, output);
            done();

        });

    });


    it('reads and writes same content: shortcuts6', function (done) {


        shortcut.parseFile(getFilePath('shortcuts6'), { autoConvertBooleans: true, autoConvertArrays: true, dateProperties: ['LastPlayTime'] }, function (err, obj, buffer) {

            should.equal(null, err);

            var output = shortcut.writeBuffer(obj);

            should.deepEqual(buffer, output);
            done();

        });

    }).timeout(10000);

});

