const { User, validateUser } = require('../../model/user')
const bcrypt = require('bcryptjs')
module.exports = async(req, res, next) => {


    try {
        await validateUser(req.body)
    } catch (error) {


        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }))
    }
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }))
    }
    let salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)
    await User.create(req.body)
    res.redirect('/admin/user')
        // res.send(req.body)
}