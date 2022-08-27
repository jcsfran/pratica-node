const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const app = express();
const routes = require('./src/Routes');

app.use(bodyParser.json());
app.use(routes);

app.use(function (req, res, next) {
  res.setHeader('Content-type', 'text/json');
  next();
});

app.listen(config.get('api.port'), () => console.log('Server is running'));
