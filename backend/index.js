require("dotenv").config();
require('./config/db.config')

const cors = require('cors')
const express = require('express')
const app = express()

const userRoutes = require('./controller/user.controller')
const authRoutes = require('./controller/auth.controller')

const { PORT } = process.env;
const port = process.env.PORT || PORT;

app.use(express.json())
app.use(cors())

app.post('/api/signup', userRoutes.signup)
app.post('/api/auth', authRoutes.signin)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
