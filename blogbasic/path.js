const path = require('path');
const fs = require('fs')
const finalPath = path.join('public', 'uploads', 'avatar')
    // console.log(finalPath);
    //绝对路径
console.log(__dirname + '/file.txt');
console.log(path.join(__dirname, 'file.txt'));