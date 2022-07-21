const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: false},
        email: { type: String, required: true, unique: false},
        phone: { type: String, required: true, unique: false},
        eventname: { type: String, required: true, unique: false},
		info: { type: String, required: true, unique: false}
	},
	{ collection: 'events' }
)

const model = mongoose.model('eventSchema', eventSchema)

module.exports = model