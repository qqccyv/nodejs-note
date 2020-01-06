const http = require('http');
const app = http.createServer();
const url = require('url')
app.on('request', (req, res) => {
    // res.end('<h1>hello world</h1>')
    res.writeHead(200, {
            'content-type': 'text/html;charset-utf8'
        })
        // console.log(req.url);
        // console.log(url.parse(req.url, true));
    let { pathname, query } = url.parse(req.url, true)
    console.log(pathname);
    console.log(query);

    if (req.url === '/index' || req.url === '/') {
        res.end('index...')
    } else {
        res.end('404....')
    }
    if (req.method === 'GET') {
        res.end('get')
    } else if (req.method === 'POST') {
        res.end('post')
    }
});
app.listen(3000)
console.log('启动成功');