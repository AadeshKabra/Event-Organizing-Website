const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: false},
		email: { type:String, required: true, unique:false},
		phone: {type: String, required: true, unique: false},
        eventname: { type: String, required: true, unique: false},
		response: { type: String, required: true, unique: false},
        price: { type: String, required: true, unique: false}
	},
	{ collection: 'response' }
)

const model = mongoose.model('responseSchema', responseSchema)

module.exports = model