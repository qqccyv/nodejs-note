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
      httpsPost().then(data => {
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

function httpsPost() {
  return new Promise((resolve, reject) => {
    let data = ''
    const req = https.request({
      hostname: 'm.xiaomiyoupin.com',
      port: '443',
      path: '/mtop/market/search/placeHolder',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res) => {
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

    req.write(JSON.stringify([{}, { "baseParam": { "ypClient": 1 } }]))
    req.end()
  })
}

server.listen(3000, () => {
  console.log('server listening 3000');
})
