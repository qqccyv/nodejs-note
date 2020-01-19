const { Article } = require('../../model/article')
const p = require('mongoose-sex-page')
module.exports = async(req, res, next) => {
    let page = req.query.page
    let article = await p(Article).find({}).page(page).size(4).display(5).populate('author').exec()
    res.render('home/default', {
            article
        })
        // res.send('欢迎来到博客首页')
}