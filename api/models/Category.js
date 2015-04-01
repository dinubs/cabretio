var Category = {
	schema: true,

	attributes: {
		title: {type: 'string', required: true},
		user: {
			model: "user"
		}
	}
}

module.exports = Category;