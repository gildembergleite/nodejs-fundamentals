import http from 'http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const hostname = 'localhost'
const port = 3001

const server = http.createServer(async (req, res) => {
  const method = req.method
  const url = req.url
  
  await json(req, res)
  
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups
    
    req.params = params
    req.query = query ? extractQueryParams(query) : {}
    
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
