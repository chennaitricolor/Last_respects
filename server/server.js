'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// const slots_route = require('./ro    utes/slots');
const path = require('path');

const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const winston = require('winston');
const expressWinston = require('express-winston');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    meta: false,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
    ),
    expressFormat: true,
  }),
);

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

app.use(express.static(path.join('build')));
/* istanbul ignore next */
app.get('/', function (request, response) {
/* istanbul ignore next */
  response.redirect('index.html');
});
/* istanbul ignore next */
const port = process.env.PORT || 3200;
app.listen(port, function () {
  console.log(`Application listening on port ${port}`);
});

// app.use('/recommend_taxonomy', api_route);
module.exports = app;
