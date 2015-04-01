// This policy is to ensure that there is a user logged in for
// profile pages and any other pages that may arise

module.exports = function(req, res, next) {
	if (req.session.authenticated) {
		next();
	} else {
		req.flash('message', 'You need to be signed in to see that');
		sails.log(req.session)
		res.redirect('/');
	}
}