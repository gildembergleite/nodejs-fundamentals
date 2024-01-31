import http from 'node:http'
import { Transform } from 'node:stream'

class PositiveInNegativeStream extends Transform {
  _transform(chunk, encoding, callback) {
    const negativeNumbers = Number(chunk) * -1
    console.log(negativeNumbers)
    callback(null, Buffer.from(String(negativeNumbers)))
  }
}

const hostname = 'localhost'
const port = 3333

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const body = Buffer.concat(buffers).toString()
  console.log(body)
  res.end(body)

  // return req
  //   .pipe(new PositiveInNegativeStream())
  //   .pipe(res)
})

server.listen(port, hostname, () => {
  console.log(`Server working in http://${hostname}:${port}/`)
})