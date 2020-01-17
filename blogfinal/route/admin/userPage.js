const { User } = require('../../model/user')
module.exports = async(req, res) => {
    // let users = await User.find({})
    // res.send(users)
    req.app.locals.currentLink = 'user'
    let page = req.query.page || 1;
    let pageSize = 2
    let count = await User.countDocuments();
    let total = Math.ceil(count / pageSize);
    let users = await User.find({}).limit(pageSize).skip((page - 1) * pageSize)
        // res.send(count)
    res.render('admin/user', {
        users,
        page,
        total
    })
}