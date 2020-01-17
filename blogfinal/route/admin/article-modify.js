const { Article } = require('../../model/article')
module.exports = async(req, res) => {
    let article = await Article.findOne({ _id: req.query.id })
    res.render('admin/article-edit.html', {
        article
    })
}