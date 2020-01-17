const { User } = require('../../model/user');
const bcrypt = require('bcryptjs')
module.exports = async(req, res, next) => {
    const { username, email, role, state, password } = req.body;
    const id = req.query.id
        //send方法 只能一个一个的导出
        // res.send(id)
    let user = await User.findOne({ _id: id })
    let isvalid = await bcrypt.compare(password, user.password)
    if (isvalid) {
        //不能直接把req.boy更新到数据库，会把密码也更新为明文密码，而导致二次更新因数据对不上而更新失败
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        })
        res.redirect('/admin/user');
        // res.send(body)
    } else {
        let obj = { path: '/admin/user-edit', message: '密码错误，不能修改信息', id: id };
        next(JSON.stringify(obj))
    }

}