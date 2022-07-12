const express = require('express');
const error =  require('./middleware/error.middleware')
const userRoute =  require('./routes/user.route')

const app = express();
// app.use(crossOriginIsolated)
app.use(express.json())

app.use('/register', userRoute )

app.use(error)

module.exports = app;
