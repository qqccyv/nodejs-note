const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;
    // console.log(req.path);

    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || '';
        // const listData = getList(author, keyword);
        // return new SuccessModel(listData)
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id);
        return result.then((data) => {
            return new SuccessModel(data)
        });
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = 'zhangsan'
            // console.log(req.body);

        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data)
        })

    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body);
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('博客更新失败')
            }
        })



    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        const author = 'zhangsan'
        const result = delBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('博客删除失败')
            }
        })

    }

}

module.exports = handleBlogRouter;