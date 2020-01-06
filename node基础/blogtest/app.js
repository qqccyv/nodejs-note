const http = require('http')
    // const querystring = require('querystring')
    // const server = http.createServer((req, res) => {
    //     console.log('method:', req.method);
    //     const url = req.url
    //     console.log('url:', url);
    //     req.query = querystring.parse(url.split('?')[1])
    //     console.log('query:', req.query);
    //     res.end(
    //         JSON.stringify(req.query)
    //     )


// })

// const server = http.createServer((req, res) => {
//     if (req.method === 'POST') {
//         console.log('req content-type:', req.headers['content-type']);
//         let postData = '';
//         req.on('data', chunk => {
//             postData += chunk.toString();
//         })
//         req.on('end', () => {
//             console.log('postData:', postData);

//             res.end('hello world')
//         })

//     }
// })

// const server = http.createServer((req, res) => {
//     const url = req.url
//     const path = url.split('?')[0]
//     res.end(path)
// })

const querystring = require('querystring');
const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    const query = querystring.parse(url.split('?')[1]);
    const path = url.split('?')[0];
    res.setHeader('content-type', 'application/json')
    const resData = {
        method,
        url,
        query,
        path
    }
    if (method === 'GET') {
        res.end(JSON.stringify(resData))
    };


    if (method === 'POST') {
        // console.log('req content-type:', req.headers['content-type']);
        let postData = '';
        req.on('data', chunk => {
            // console.log('chunk:', chunk);

            postData += chunk.toString();
        })
        req.on('end', () => {
            // console.log('postData:', postData);
            resData.postData = postData;
            res.end(JSON.stringify(resData))
        })

    }
})
server.listen(8000)
console.log('ok');