var fs=require('fs')
var Docxtemplater = require('docxtemplater');
var randomstring = require("randomstring");
var months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sep.", "Oct", "Nov.", "Dec."];
module.exports = {
	downloadCitation: function ( req, res ) {
		if (!req.params.id) {
			req.flash('error', 'Hey you need to supply a category');
			return res.redirect('/');
		}
		Citation.findOne(req.params.id).exec(function(err, data) {
			if (err) {
				req.flash('error', 'Something happened in the backend');
				return res.redirect('/');
			}
			return getCites(data, res, data.title);
		});
	},
	downloadCategory: function(req, res) {
		if (!req.params.id) {
			req.flash('error', 'Hey you need to supply a category');
			return res.redirect('/');
		}
		Category.findOne({id: req.params.id, user: req.session.passport.user}).populate('citations').exec(function(err, data) {
			if (err || !data) {
				req.flash('error', 'Something happened on our end, we\'re sorry.');
				return res.redirect('/');
			}
			return getCites(data.citations, res, data.title);
		});
	}
}

function formatDate(date) {
	var month = months[date.getMonth()];
	var day = date.getDay();
	var year = date.getFullYear();

	return day + ' ' + month + ' ' + year + '. '
}
function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

function formatCitations(cites) {
	var citations = cites;
	for (var i = 0; i < citations.length; i++) {
		var cite = citations[i];
		if (cite.author != '') {
			cite.author = cite.author +'. ';
		} else {
			cite.author = '';
		}
		cite.title = '"' + cite.title + '." ';
		if (cite.publicationInfo == 'n.p.') {
			cite.publicationInfo = cite.publicationInfo + ' ';
		} else if (cite.publicationInfo != '') {
			cite.publicationInfo = cite.publicationInfo + '. ';
		} else {
			cite.publicationInfo = 'n.p. ';
		}

		if (cite.isUrl) {
			cite.website = "<" + cite.website + "> ";
			cite.dateAccessed = formatDate(cite.dateAccessed);
		} else {
			cite.website = '';
			cite.dateAccessed = '';
		}

	}
	return citations;
}
function getCites(citations, res, title) {
	var content = fs.readFileSync(__dirname+"/Input.docx","binary")
	
	// Get citation from returned, and format it for Word Document
	if (Array.isArray(citations)) {
		var cites = citations;
	} else {
		var cites = [citations];
	}
	var citations = formatCitations(cites);
	// Render the Word Document with the information that we provided.
	var doc = new Docxtemplater(content);
	doc.setData({
	    "citations":citations
	});
	doc.render();

	// Write the generated document to a randomly named document
	var buf = doc.getZip()
         .generate({type:"nodebuffer"});
    var name = randomstring.generate();
    var out = fs.writeFileSync(__dirname+"/"+name+".docx",buf);

    // Send the document to the client
	return res.download(__dirname+'/'+name+'.docx', title + ".docx");
}