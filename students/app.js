const http = require('http');
const app = http.createServer();
const path = require('path')
const url = require('url')
const template = require('art-template')
const querystring = require('querystring')
template.defaults.root = path.join(__dirname, 'views')
require('./model/connect')
const User = require('./model/user')

app.on('request', async(req, res) => {
    const method = req.method;
    const { pathname, query } = url.parse(req.url, true)

    if (method === 'GET') {
        if (pathname === '/list') {
            let users = await User.find();
            // console.log(users);
            let html = template('list.art', {
                users
            })
            res.end(html)

        } else if (pathname === '/add') {

            let html = template('add.art', {})
            res.end(html)

        } else if (pathname === '/modify') {
            let user = await User.findOne({ _id: query.id })
            let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头', '吃饭', '睡觉', '打豆豆']
            let html = template('modify.art', {
                user,
                hobbies
            })
            res.end(html)
        }
    } else if (method === 'POST') {

        if (pathname === '/add') {
            let postdata = '';
            req.on('data', chunk => {
                postdata += chunk;
            });
            req.on('end', async() => {
                let user = querystring.parse(postdata)
                await User.create(user);
                res.writeHead(301, {
                    Location: '/list'
                });
                res.end()
            })
        }
    }

})


app.listen(3000)
console.log('启动成功');