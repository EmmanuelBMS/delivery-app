const express = require('express');
const error = require('./middleware/error.middleware');

const appRouter = require('./routes');

const app = express();

app.use(express.json());

appRouter(app);

app.use(error);

module.exports = app;
