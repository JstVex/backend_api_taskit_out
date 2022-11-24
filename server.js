require('dotenv').config();
require('express-async-errors')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user')
// const authRoutes = require('./routes/auth')


const app = express();


// middleware
// app.use(logger)

app.use(cookieParser())

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
        credentials: true
    })
)


app.use('/', express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded());


//routes
app.use('/', require('./routes/root'))
// app.use('/api/auth', authRoutes)
app.use('/api/tasks', tasksRoutes)
app.use('/api/user', userRoutes)

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

const PORT = process.env.PORT || 4003;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('listening on port', PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })