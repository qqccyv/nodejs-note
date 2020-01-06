const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return
        }
        let postData = '';
        req.on('data', chunk => {
            // console.log('chunk:', chunk);

            postData += chunk.toString();
        })
        req.on('end', () => {
            // console.log('postData:', postData);
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}
getPostData(req).then(postData => {
    req.body = postData;
    const serverHandle = (req, res) => {

        res.setHeader('content-type', 'application/json')

        const url = req.url
        req.path = url.split('?')[0];

        req.query = querystring.parse(url.split('?')[1])
            // let { pathname, query } = url.parse(req.url, true)  url.parse方法简写

        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            res.end(
                JSON.stringify(blogData)
            )
            return
        }
        const userData = handleUserRouter(req, res);
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
            return
        }

        res.writeHead(404, { "content-type": "text/plain" });
        res.write("404 Not Found\n")
        res.end()
    }
})

module.exports = serverHandle