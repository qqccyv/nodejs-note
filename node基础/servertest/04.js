// 引入mongoose第三方模块 用来操作数据库
const mongoose = require('mongoose');
// 数据库连接
mongoose.connect('mongodb://localhost/player', { useNewUrlParser: true, useUnifiedTopology: true })
    // 连接成功
    .then(() => console.log('数据库连接成功'))
    // 连接失败
    .catch(err => console.log(err, '数据库连接失败'));

// 创建集合规则
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
});

// 使用规则创建集合
const User = mongoose.model('User', userSchema);


// User.find().then(result => {
//     console.log(result);

// })


// User.find({ _id: '5c09f294aeb04b22f8460969' })
//     .then(result => {
//         console.log(result);

//     })

// User.findone

User.find({ hobbies: { $in: ['足球'] } }).then((result) => {
    console.log(result);
})