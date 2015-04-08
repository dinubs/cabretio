/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
		User.find().exec(function(err, u) {
			res.view('user/index', {users: u});
		});
	},
	me: function(req, res) {
		Category.find({user: req.session.passport.user}).populate('citations').exec(function(err, data) {
			res.view('user/me', {user: req.user, categories: data});
		});
	}
};

