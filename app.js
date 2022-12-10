const express = require('express')
const mongoose = require('mongoose')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    cors: {
      origin: 'http://localhost:5555',
    },
  },
})
module.exports = { app, io }

const fileUpload = require('express-fileupload')
const cors = require('cors')
const config = require('config')
const PORT = config.get('port') || 7777

app.use(express.static('/static'))
app.use(fileUpload())
app.use(cors())
app.use(express.json())
app.use('/api', require('./routes/index.js'))

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'))
    server.listen(PORT, () =>
      console.log(`server connected successfully ${PORT}`)
    )
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start()
