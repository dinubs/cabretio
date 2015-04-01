/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and where you
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },

  bearer: {
    strategy: require('passport-http-bearer').Strategy
  },

  twitter: {
    name: 'Twitter',
    protocol: 'oauth',
    strategy: require('passport-twitter').Strategy,
    options: {
      consumerKey: 'WlcCZ5iSwkngGJ1GVTMZdBssX',
      consumerSecret: 'WwBBlF9c8fj2RBcPv9bbRrRV9P1dcRiJo1eLk4QCkZXoLtvhJN'
    }
  }
};
