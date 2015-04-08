module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'PageController.homepage',
  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',
   
  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',
   
  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback',

  'post /me/citations/create': 'CitationController.create',
  'get /me/citations/import': 'CitationController.importCitations',
  'get /me/citations/:id': 'CitationController.show',

  '/me': 'UserController.me',
  'get /download/citation/:id': 'DownloadController.downloadCitation',
  'get /download/category/:id': 'DownloadController.downloadCategory'
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
