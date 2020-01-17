var formidable = require('formidable')
const path = require('path')
const { Article } = require('../../model/article')
module.exports = (req, res) => {
    debugger
    var form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    form.keepExtensions = true;

    form.parse(req, async(err, fields, files) => {
        let {
            title,
            author,
            publishDate,
            content
        } = fields
        await Article.create({
                title,
                author,
                publishDate,
                content,
                cover: files.cover.path.split('public')[1]
            })
            // console.log(files);

        // res.send('ok')

        res.redirect('/admin/article')
    })
}