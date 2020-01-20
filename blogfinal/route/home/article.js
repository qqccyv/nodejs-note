const { Article } = require('../../model/article')
module.exports = async(req, res, next) => {

    const id = req.query.id
    let article = await Article.findOne({ _id: id }).populate('author')
    console.log(req.session.username);

    res.render('home/article', {
            article,
            username: req.session.username
        })
        // res.rend('欢迎来到博客详情页')

}