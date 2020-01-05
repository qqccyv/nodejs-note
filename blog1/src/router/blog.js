const handleBlogRouter = (req, res) => {
    const method = req.method;
    const url = req.url
    const path = url.split('?')[0];
    if (method === 'GET' && path === '/api/blog/list') {
        return {
            msg: '获得博客列表的接口'
        }
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        return {
            msg: '获得博客详情的接口'
        }
    }
    if (method === 'POST' && path === '/api/blog/new') {
        return {
            msg: '获得新建博客的接口'
        }
    }
    if (method === 'POST' && path === '/api/blog/update') {
        return {
            msg: '获得更新博客的接口'
        }
    }
    if (method === 'POST' && path === '/api/blog/del') {
        return {
            msg: '获得删除博客的接口'
        }
    }

}

module.exports = handleBlogRouter;