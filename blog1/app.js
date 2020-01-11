const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const getCookieExpires = () => {
        let d = new Date();
        // console.log(d);

        d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
            // console.log(d);

        // console.log('d.toGMTString() is', d.toGMTString());
        return d.toGMTString()

    }
    // const url = require('url')
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        // console.log(req.headers['content-type']);

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
            // console.log(postData);

            // resolve(JSON.parse(JSON.stringify(postData)))
            resolve(JSON.parse(postData))
                // console.log(postData);

        })
    })
    return promise
}

const SESSION_DATA = {};
const serverHandle = (req, res) => {

    res.setHeader('content-type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0];

    req.query = querystring.parse(url.split('?')[1])
        //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
            if (!item) {
                return
            }
            const arr = item.split('=')
            const key = arr[0].trim();
            const val = arr[1].trim()
            req.cookie[key] = val
        })
        // console.log(req.cookie);
        //解析session ????????????????????????????
    let needSetCookie = false;
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}

    }
    req.session = SESSION_DATA[userId]
        // let { pathname, query } = url.parse(req.url, true)  url.parse方法简写
    getPostData(req).then(postData => {
        // console.log(postData);

        req.body = postData;
        // console.log(req.body);

        // const blogData = handleBlogRouter(req, res)
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }


        const resultData = handleUserRouter(req, res);
        if (resultData) {
            resultData.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })

            return
        }



        res.writeHead(404, { "content-type": "text/plain" });
        res.write("404 Not Found\n")
        res.end()
    })


}
module.exports = serverHandle