const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const winston = require('winston');
const expressWinston = require('express-winston');
const moment = require('moment-timezone');
const port = process.env.PORT || 3200;

moment.tz.setDefault('Asia/Kolkata');

// var cors = require('cors')
// app.options('*', cors()) // include before other routes
// app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'frame-src': ["'self'", 'https://ap-south-1.quicksight.aws.amazon.com'],
      },
    },
  }),
);
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
const swaggerDefinition = {
  info: {
    title: 'Last Respects Service',
    version: '1.0.0-PreRelease',
    description: 'Last Respects Service',
  },
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '/service/*.js')],
};

app.get('/swagger.json', (req, res) => {
  try {
    const swaggerSpec = swaggerJSDoc(options);
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  } catch (err) {
    console.log('Error in generating swagger');
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

app.use('/api', routes);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const userPages = ['/slotBooking', '/machinery'];

const adminPages = ['/dashboard'];

app.get(userPages, function (req, res) {
  let isAdmin = req.cookies.isAdmin;
  if (isAdmin === undefined || isAdmin === '' || isAdmin === 'false') {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  }
  if (isAdmin !== undefined && isAdmin === 'true') {
    res.redirect('/dashboard');
  }
});

app.get(adminPages, function (req, res) {
  let isAdmin = req.cookies.isAdmin;
  if (isAdmin !== undefined && isAdmin === 'true') {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  }
  if (isAdmin === undefined || isAdmin === '' || isAdmin === 'false') {
    res.redirect('/slotBooking');
  }
});

app.use(express.static(path.join('build')));

app.listen(port, function () {
  console.log(`Application listening on port ${port}`);
});
