const http = require('http')
const https = require('https')
const url = require('url')
const server = http.createServer()

server.on('request', (req, res) => {

  if (req.url === '/favicon.ico') return

  const queryObj = url.parse(req.url, true)

  res.writeHead(200, {
    "Content-Type": "application/json;charset=utf-8",
    "access-control-allow-origin": "*"
  })

  switch (queryObj.pathname) {

    case '/jsonp':
      res.end(`${queryObj.query.callback}(123456)`)
      break
    case '/api/xxx':
      httpsGet().then(data => {
        res.end(data)
      }).catch(err => {
        res.end(err)
      })
      break
    default:
      res.end('123')
      break
  }
})

function httpsGet() {
  return new Promise((resolve, reject) => {
    let data = ''
    https.get(`https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E6%88%90%E9%83%BD&ci=59&channelId=4`, (res) => {

      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('error', (err) => {
        reject(err)
      })
      res.on('end', () => {
        resolve(data)
      })

    })
  })
}

server.listen(3000, () => {
  console.log('server listening 3000');
})
