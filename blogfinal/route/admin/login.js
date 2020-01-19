const { User } = require('../../model/user')
const bcrypt = require('bcryptjs')
module.exports = async(req, res, next) => {

    const { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }
    let user = await User.findOne({ email })

    if (user) {
        let b = await bcrypt.compare(password, user.password)
        if (b) {
            req.session.username = user.username
            req.app.locals.userInfo = user
            req.session.role = user.role
            if (user.role == 'normal') {
                res.redirect('/home/')
            } else if (user.role == 'admin') {
                res.redirect('/admin/user')

            }
            //重定向到用户列表页面
        } else {
            res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
        }
    } else {
        res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }
}