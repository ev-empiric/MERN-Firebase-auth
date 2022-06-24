require("dotenv").config();
require('./config/db.config')

const cors = require('cors')
const express = require('express')
const app = express()

const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const usersdataRoute = require('./routes/allusers.route')

const { PORT } = process.env;
const port = process.env.PORT || PORT;

app.use(express.json())
app.use(cors())


app.post('/api/signup', userRoute.signup)
app.post('/api/auth', authRoute.signin)
app.get('/getapi/users/',usersdataRoute.userData)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
