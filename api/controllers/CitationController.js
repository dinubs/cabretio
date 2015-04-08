module.exports = {

	create: function(req, res) {
		var citation = req.body;
		if (req.session.authenticated) {
			Category.findOrCreate({'user': req.user.id, 'title': citation.category}).exec(function(err, data) {
				Citation.create({
					'user': req.user.id,
					'category': data.id,
					'title': citation.title,
					'author': citation.author,
					'publicationInfo': citation.publication,
					'website': citation.url,
					'dateAccessed': citation.dateAccessed,
					'journalTitle': citation.journalTitle,
					'yearPublished': citation.yearPublished
				}).exec(function(err, data) {
					req.flash('success', "You're citation has been created!");
					res.redirect('/me/citations/'+ data.id);
				});
			});
		} else {
			Citation.create({
				'title': citation.title,
				'author': citation.author,
				'publicationInfo': citation.publication,
				'website': citation.url,
				'dateAccessed': citation.dateAccessed,
				'journalTitle': citation.journalTitle,
				'yearPublished': citation.yearPublished
			}).exec(function(err, data) {
				req.flash('success', "Your citation has been created!");
				if (req.session.citations == undefined) {
					req.session.citations = [];
					req.session.citations.push(data.id);
				} else {
					req.session.citations.push(data.id);
				}
				sails.log(req.session.citations);
				res.redirect('/me/citations/'+ data.id);
			});
		}
	},

	show: function(req, res) {
		Citation.findOne(req.params.id).populate("category").exec(function(err, data){
			if ((!req.session.authenticated || req.user.id != data.user || err) && data.user) {
				req.flash('error', "That's not your citation to view!");
				return res.redirect('/')
			}
			res.view({citation: data});	
		});
	},

	importCitations: function(req, res) {
		if (req.session.citations == undefined) {
			req.flash('error', "You don't have any citations currently created on this session to import!");
		} else if (!req.session.authenticated) {
			req.flash('error', "You need to be signed in to import citations from your current session!");
		} else {
			var cites = req.session.citations;
			Category.findOrCreate({title: "Uncategorized Citations", user: req.user.id}).exec(function(err, cat){
				for (var i = 0; i < cites.length; i++) {
					Citation.update({id: cites[i]}, {user: req.user.id, category: cat.id}).exec(function(err, data) {
						sails.log(data);
					});
				}
				req.flash('success', "All the citations in your current session have been imported!");
				res.redirect('/');
			});
		}
	} 

}