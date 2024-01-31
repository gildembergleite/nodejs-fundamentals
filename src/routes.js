import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query
      const users = database.select('users', search && {
        name: search,
        email: search
      })
      return res.end(JSON.stringify(users))
    }
  },  
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body
      const user = {
        id: randomUUID(),
        name: name,
        email: email
      }
      database.insert('users', user)
      return res.end("Criação de usuários")
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { name, email } = req.body
      database.update('users', req.params.id, {
        name,
        email,
      })
      return res.writeHead(204).end()
    }
  },  
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      database.delete('users', req.params)
      return res.writeHead(204).end()
    }
  },  
]