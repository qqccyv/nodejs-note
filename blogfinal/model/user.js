const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Joi = require('joi')

//创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0 //0禁用 1启用
    }
});

//创建结合
//解决(node:23348) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead  报错
mongoose.set('useCreateIndex', true);
const User = mongoose.model('User', userSchema);

//创建用户的键名必须严格与规则，集合对应
async function createUser() {
    let salt = await bcrypt.genSalt(10);
    let pwd = await bcrypt.hash('123456', salt)
    User.create({
        username: 'dengyu',
        email: '313187515@qq.com',
        password: pwd,
        role: 'admin',
        state: 0
    }).then(() => {
        console.log('用户创建成功');

    }).catch(() => {
        console.log('用户创建失败');

    })
}

const validateUser = user => {
        const schema = {
            username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
            email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
            role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
            state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
        };
        return Joi.validate(user, schema)
    }
    // createUser()

module.exports = {
    User,
    validateUser
}