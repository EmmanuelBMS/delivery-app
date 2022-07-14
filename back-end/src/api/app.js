const express = require('express');
const cors = require('cors');
const error = require('./middleware/error.middleware');

const appRouter = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

appRouter(app);

app.use(express.static('public'));
app.use(error);

module.exports = app;
