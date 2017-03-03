var fs = require('fs');
var shortcut = require('../lib');
var should = require('should');


var filePath = __dirname+'/shortcuts1.vdf';
function readFile(cb){
    fs.readFile(filePath, {encoding:'utf8'}, function(err, data){

        if(err){
            console.log('failed to read '+filePath);
            throw err;
        }
        cb(data);
    });
}

describe('read-write tests', function(){


    it('reads and writes same content', function(done){


        readFile(function(input){

            var obj = shortcut.parse(input);
            var output = shortcut.stringify(obj);

            should.equal(input, output);
            done();

        });

    });

    it('reads expected objects', function(done){

        readFile(function(input){

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

            done();

        });


    });


    it('writes and reads same object', function(done){

        var input = {
            a: 'one',
            b: {
                c: 'two'
            },
            d: true,
            e: [
                'hello',
                'world'
            ],
            f: {
                g: [
                    {
                        name: 'hello',
                        value: 'hi'
                    },
                    {
                        n: 'hola',
                        v: 'ciao'
                    }
                ]
            }
        };

        var str = shortcut.stringify(input);
        var output = shortcut.parse(str);

        should.deepEqual(input, output);
        done();
    });



});

