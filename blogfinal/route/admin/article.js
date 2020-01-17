const { Article } = require('../../model/article')

const p = require('mongoose-sex-page')
module.exports = async(req, res) => {
    let page = req.query.page
    req.app.locals.currentLink = 'article'
    let articles = await p(Article).find({}).page(page).size(2).display(3).populate('author').exec();
    res.render('admin/article', {
            articles
        })
        // res.send(articles)

    // res.render('admin/article')
}