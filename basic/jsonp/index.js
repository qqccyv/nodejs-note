const http = require('http')
const url = require('url')
const server = http.createServer()
server.on('request', (req, res) => {
  if (req.url === '/favicon.ico') return
  const queryObj = url.parse(req.url, true)
  console.log(queryObj);
  res.end(switchPath(queryObj))
})

const switchPath = (queryObj) => {
  switch (queryObj.pathname) {
    case '/jsonp':

      return `${queryObj.query.callback}(123456)`

    default:
      return '123'
  }
}

server.listen(3000, () => {
  console.log('server listening 3000');
})
