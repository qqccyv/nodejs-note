const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('hello express')
});
app.get('/list', (req, res) => {
    res.send({

        name: 'dengyu',
        age: 18

    })
})

app.listen(80)
console.log('启动成功');