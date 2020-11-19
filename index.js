// Imports
const http = require('http')
const express = require('express')
const nodemailer = require('nodemailer');
const credentials = require('./config/credentials');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const formidable = require('formidable');

const app = express();
function cors (req, res, next) {
  const origin = req.headers.origin
  res.setHeader('Access-Control-Allow-Origin', origin || '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, DELETE, OPTIONS, XMODIFY'
  )
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '86400')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  )
  next()
}
app.use(cors);
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use('/media', express.static('asset'))

// Set ups
app.use(helmet());
app.use(compression());
app.set('NODE_ENV', 'production')

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const form = formidable({ multiples: true, uploadDir: 'asset', keepExtensions: true, maxFileSize: 10 * 1024 * 1024 })

app.get('/kapecom', function (req, res, next) {
  return res.json({ name: 'Kapecom Connect' })
})

app.post('/logo', function (req, res, next) {
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
    }
    res.json(files.file)
  })
})

app.post('/documents', function (req, res, next) {
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
    }
    res.json(files.file)
  })
})

const mailTransport = nodemailer.createTransport({
  host: credentials.host,
  secureConnection: true, // use SSL
  port: credentials.smtpport,
  auth: {
    user: credentials.email,
    pass: credentials.password,
  }
});
require('./api')(app, mailTransport);

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'))

io.on('connection', function (socket) {
  socket.on('newmsg', response => {
    socket.broadcast.emit('newmsg', response)
  })
})

