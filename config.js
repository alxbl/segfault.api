let config = {};

if (process.env.NODE_ENV === "production") {
  config = {
    auth: {
      google: {
        clientId: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        redirect: 'https://api.segfault.me/auth/google/callback'
      }
    },
    // https://docs.microsoft.com/en-us/azure/app-service/web-sites-configure#connection-strings
    database: process.env.SQLCONNSTR_SqlDatabase,

  };
} else {
  const env = process.env.NODE_ENV || "development";
  config = require(`./env/${env}`);
}

module.exports = config;
