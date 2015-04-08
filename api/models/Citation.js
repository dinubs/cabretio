var Citation = {
	schema: true,

	attributes: {
		title: {
			type: 'string', 
			required: true
		},
		journalTitle: {
			type: 'string', 
			required: true
		},
		author: {
			type: 'string'
		},
		publicationInfo: {
			type: 'string',
			defaultsTo: 'n.p'
		},
		isUrl: {
			type: 'boolean',
			defaultsTo: false
		},
		website: {
			type: 'string', 
			defaultsTo: ''
		},
		dateAccessed: {
			type: 'date'
		},
		yearPublished: {
			type: 'string', 
			defaultsTo: 'n.d.'
		},
		user:{
	      model: "user"
	    },
	    category: {
	    	model: "Category"
	    }
	}
}

module.exports = Citation;