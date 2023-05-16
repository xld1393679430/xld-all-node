const http = require('http')
const qs = require('querystring')

const server = http.createServer((req, res) => {
    const { method, url,} = req
    const aa = url.split('?')
    // const qurl = qs.parse(aa)
    // res.end(`hello world---${method}--${url}--${qurl}`)

    res.end('ssss')
})

server.listen(3000, () => {
    console.log('server listen 300')
})

module.exports = server