var Category = {
	schema: true,

	attributes: {
		title: {type: 'string', required: true},
		user: {
			model: "user"
		},
		citations: {collection: "Citation", via: "category"}
	}
}

module.exports = Category;