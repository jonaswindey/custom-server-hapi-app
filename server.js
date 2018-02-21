const next = require('next')
const Hapi = require('hapi')
const Good = require('good')
const { pathWrapper, defaultHandlerWrapper } = require('./next-wrapper')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const server = new Hapi.Server()

// add request logging (optional)
const pluginOptions = [
  {
    register: Good,
    options: {
      reporters: {
        console: [{
          module: 'good-console'
        }, 'stdout']
      }
    }
  }
]

app.prepare()
.then(() => {
  server.connection({ port })
  server.register(pluginOptions)
  .then(() => {
    server.route({
      method: 'GET',
      path: '/detail/{id}',
      handler: pathWrapper(app, '/detail')
    })

    server.route({
      method: 'GET',
      path: '/{p*}', /* catch all route */
      handler: defaultHandlerWrapper(app)
    })

    server.start().catch(error => {
      console.log('Error starting server')
      console.log(error)
    }).then(() => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
})
