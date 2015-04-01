var Citation = {
	schema: true,

	attributes: {
		title: {type: 'string', required: true},
		author: {type: 'string'},
		publicationInfo: {type: 'string'},
		user:{
	      model: "user"
	    },
	    category: {
	    	model: "Category"
	    }
	}
}

module.exports = Citation;