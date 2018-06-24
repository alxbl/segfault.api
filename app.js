const express = require('express')
const helmet = require('helmet')

const auth = require('./router/auth');

const app = express()

// Gotta wear your helmet kids.
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'none'"], // API's don't load resources.
  }
}))

app.use(helmet.referrerPolicy({ policy: 'no-referrer' }))
// app.use(helmet.expectCt({ enforce: true, maxAge: 100 });

// Main router
app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/login', (req, res) => {
  res.send('Hello');
});

app.use('/auth', auth);
module.exports = app
