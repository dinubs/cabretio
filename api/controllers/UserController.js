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
		User.findOne({id: req.session.passport.user}).exec(function(err, u) {
			res.view('user/me', {user: u});
		});
	}
};

