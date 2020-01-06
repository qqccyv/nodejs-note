const http = require('http');
const app = http.createServer();
app.on('request', (req, res) => {
    res.end('<h1>hello world</h1>')
});
app.listen(3000)
console.log('启动成功');