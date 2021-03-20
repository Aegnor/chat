const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const env_config = require('./config/index')

const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: env_config.FRONT_URI
    }
})

const PORT = process.env.PORT ?? 3030

const csrfProtection = require('csurf')({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600 // 1-hour
    }
})

app.use(require('helmet')())
app.use(require('cors')())
app.use(require('cookie-parser')())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/auth', csrfProtection, require('./routes/auth'))

// Create csrfToken
app.get('/form', csrfProtection, (req, res) => {
    res.send({ csrfToken: req.csrfToken()})
})

io.on('connection', (socket) => {
    console.log('a user connected')
});

(async () => {
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
})()
