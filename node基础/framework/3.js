const express = require('express');
const app = express();
const home = express.Router();
app.use('/home', home);
home.get('/index', (req, res) => {
    res.send('index页面')
})
app.listen(80)
console.log('启动成功');