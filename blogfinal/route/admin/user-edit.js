const { User } = require('../../model/user')
module.exports = async(req, res) => {
    const { message, id } = req.query

    if (id) {
        // console.log('编辑');
        let user = await User.findOne({ _id: id });
        res.render('admin/user-edit', {
            message,
            user,
            link: '/admin/user-modify',
            button: '修改'
        })
    } else {
        // console.log('新增');
        res.render('admin/user-edit', {
            message,
            link: '/admin/user-edit',
            button: '添加'
        })
    }



}