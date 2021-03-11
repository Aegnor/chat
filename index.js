const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const env_config = require('./config/index')

const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080'
    }
})

const PORT = process.env.PORT ?? 3030

app.use(require('helmet')())
app.use(require('cors')())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/auth', require('./routes/auth'))

io.on('connection', (socket) => {
    console.log('a user connected')
})

async function start() {
    try {
        await mongoose.connect(env_config.DATABASE_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        http.listen(PORT, () => console.log(`server listening on http://localhost:${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
