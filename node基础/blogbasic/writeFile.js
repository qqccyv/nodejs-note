const fs = require('fs');
fs.writeFile('./writeFile.txt', '添加点什么', err => { //会覆盖原有信息
    if (err != null) {
        console.log('写入失败');
        console.log(err);

        return

    } else {
        console.log('写入成功');

    }
})