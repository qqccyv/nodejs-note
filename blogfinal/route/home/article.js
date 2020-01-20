const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')
module.exports = async(req, res, next) => {

    const { id } = req.query
    let article = await Article.findOne({ _id: id }).populate('author')
    let comment = await Comment.find({ aid: id }).populate('uid')
        // console.log(comment.uid.username);

    res.render('home/article', {
            article,
            username: req.session.username,
            comment
        })
        // res.rend('欢迎来到博客详情页')

}