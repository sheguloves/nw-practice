# NW-practice
This is a NW.js (node-webkit) practice build with AngularJS

### What is NW.js?
You can find more info from [here](http://nwjs.io/)

### Config build system of sublime
Tools -> Build System -> New Build System

Copy and past the following code

```
{
    "cmd": ["nw.exe", "--enable-logging", "${project_path:${file_path}}"],
    "working_dir": "${project_path:${file_path}}",
    "path": "your_nw_path",
    "shell": true
}
```
Save as nodewebkit.sublime-build
Then you can build your current project with this.

### How to run this project?
* Download NW.js. You can get it from [here](http://nwjs.io/) if you haven't it yet.
* Run the following command
```
git clone https://github.com/sheguloves/nw-practice.git
```
or
```
git clone git@github.com:sheguloves/nw-practice.git
```
* Change your current directory to nw-practice.
```
cd nw-practice
```
* Install all dependencies (if you haven't install node.js or npm, you can get it from [here](https://nodejs.org/en/))
```
npm install
```
* Run project
```
$ /path/to/nw .  (suppose the current directory contains 'package.json')
```
Note: on Windows, you can drag the folder containing package.json to nw.exe to open it.
Note: on OSX, the executable binary is in a hidden directory within the .app file. To run node-webkit on OSX, type:
```
/path/to/nwjs.app/Contents/MacOS/nwjs . (suppose the current directory contains 'package.json')
```
### Distribute app
```
npm run gulp
```
Currently, the app for osx32/osx64/win32/win64 platform will be builded and placed at target folder

* You can get more information from [here](https://github.com/nwjs/nw.js)
