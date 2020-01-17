//引入mongoose模块
const mongoose = require('mongoose')
    //创建文章规则,同时关联用户集合
const articleSchema = new mongoose.Schema({
        title: {
            type: String,
            maxlength: 20,
            minlength: 4,
            required: [true, '请填写文章标题']
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, //关联User集合！！！！！
            ref: 'User',
            required: [true, '请传递作者']
        },
        publishDate: {
            type: Date,
            default: Date.now
        },
        cover: {
            type: String,
            default: null
        },
        content: {
            type: String
        }
    })
    //创建文章集合
const Article = mongoose.model('Article', articleSchema)
    //导出文章集合
module.exports = {
    Article
}