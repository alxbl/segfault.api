const express = require('express')
const helmet = require('helmet')
const passport = require('passport')
const auth = require('./router/auth');
const app = express()

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'none'"], // API's don't load resources.
  }
}));

app.use(helmet.referrerPolicy({ policy: 'no-referrer' }))
// app.use(helmet.expectCt({ enforce: true, maxAge: 100 }));

if (app.get('env') === 'development' || process.env.NODE_DEBUG == 'true'){
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
} else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: {}
    });
  });
}

app.get('/', (req, res) => {
  res.send('WIP');
});

// app.use(passport.initialize());
// app.use('/auth', auth);

module.exports = app

