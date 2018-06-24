let config = {};

if (process.env.NODE_ENV === "production") {
  config = {
    auth: {
      google: {
        clientId: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET
      }
    }
  };
} else {
  config = require(`./env/${process.env.NODE_ENV}`);
}

module.exports = config;
