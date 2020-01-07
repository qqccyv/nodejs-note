const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    const method = req.method;
    const { username, password } = req.body
    if (method === 'POST' && req.path === '/api/user/login') {
        const result = loginCheck(username, password)
        if (result) {
            return new SuccessModel('登录成功')
        }
        return new ErrorModel('登录失败')
    }
}
module.exports = handleUserRouter;