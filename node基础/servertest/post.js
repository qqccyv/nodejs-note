const http = require('http');
const app = http.createServer();
const url = require('url')
const querystring = require('querystring')
app.on('request', (req, res) => {
    // res.end('<h1>hello world</h1>')
    let totalData = '';
    req.on('data', chunk => {
        totalData += chunk
    })
    req.on('end', () => {
        console.log(querystring.parse(totalData));

    })
    res.end('ok')
});
app.listen(3000)
console.log('启动成功');