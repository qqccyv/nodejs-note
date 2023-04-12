const http = require('http')
const url = require('url')
const server = http.createServer()
server.on('request', (req, res) => {
  if (req.url === '/favicon.ico') return
  const queryObj = url.parse(req.url, true)
  res.writeHead(200, {
    "Content-Type": "application/json;charset=utf-8",
    "access-control-allow-origin": "*"
  })
  res.end(switchPath(queryObj))
})

const switchPath = (queryObj) => {
  switch (queryObj.pathname) {
    case '/jsonp':

      return `${queryObj.query.callback}(123456)`
    case '/cors':

      return JSON.stringify({ name: 'dengYu', age: 19 })
    default:
      return '123'
  }
}

server.listen(3000, () => {
  console.log('server listening 3000');
})
