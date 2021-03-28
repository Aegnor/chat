const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const env_config = require('./config/index')

const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: env_config.FRONT_URI,
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
app.use(require('cors')({
    origin: env_config.FRONT_URI,
    credentials: true
}))
app.use(require('cookie-parser')())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/auth', csrfProtection, require('./routes/auth'))

// Create csrfToken
app.get('/api/v1/form', csrfProtection, (req, res) => {
    res.send({ csrfToken: req.csrfToken()})
})

app.get('*', (req, res) => {
    res.status(404).send({error: '404 Page Not Found'})
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

io.on('connection', (socket) => {
    let user = null

    socket.on('chat message', (msgObj) => {
        io.emit('chat message', msgObj)
    })

    socket.on('user joined', (userObj) => {
        user = userObj
        io.emit('user joined', userObj)
    })

    socket.on('disconnect', () => {
        if (user) {
            io.emit('user left', user._id)
        }
    })
})
