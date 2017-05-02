const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/api', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({ greeting: 'Bye' }))
    })

    server.get('/:name', (req, res) => {
      return app.render(req, res, '/index', { name: req.params.name })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
