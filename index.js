const app = require('./server/app')
const http = require('http')
const config = require('./server/utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
