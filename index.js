const fs = require('fs')
const http = require('http')
var pdf = require('html-pdf');
var html = fs.readFileSync('./test/businesscard.html', 'utf8');

const server = http.createServer(function (req, res) {
  pdf.create(html, {width: '50mm', height: '90mm'}).toStream((err, stream) => {
    if (err) return res.end(err.stack)
    res.setHeader('Content-type', 'application/pdf')
    stream.pipe(res)
  })
})

server.listen(8080, function (err) {
  if (err) throw err
  console.log('Listening on http://localhost:%s', server.address().port)
})
