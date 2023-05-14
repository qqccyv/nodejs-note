const http = require('http')
const https = require('https')
const url = require('url')

const cheerio = require('cheerio')

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
      spider().then(data => {
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

function spider() {
  return new Promise((resolve, reject) => {
    let data = ''
    https.get(`https://i.maoyan.com`, (res) => {

      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('error', (err) => {
        reject(err)
      })
      res.on('end', () => {
        console.log(data);
        const movies = []
        const $ = cheerio.load(data)
        const linkItemList = $('.link.item')
        linkItemList.each((index, value) => {
          movies.push({
            title: $(value).find('.title').text(),
            grade: $(value).find('.grade').text(),
            actor: $(value).find('.actor').text(),
          })
        })
        resolve(JSON.stringify(movies))
        // resolve(data)
      })

    })
  })
}

server.listen(3000, () => {
  console.log('server listening 3000');
})
