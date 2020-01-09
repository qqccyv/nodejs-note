const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/player', { useNewUrlParser: true })
    .then(() => console.log('连接成功'))
    .catch((err) => console.log(err, '连接失败'))