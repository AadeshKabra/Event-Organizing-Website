const mongoose = require('mongoose')

const OrganizerSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: false},
		password: { type: String, required: true, unique: false }
	},
	{ collection: 'organizers' }
)

const model = mongoose.model('OrganizerSchema', OrganizerSchema)

module.exports = model