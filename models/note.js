const mongoose = require('mongoose')
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Convert _id (ObjectId) to a string and store it in 'id'
    delete returnedObject._id // Remove the original _id field
    delete returnedObject.__v // Remove the __v field (used for versioning by Mongoose)
  }
})

module.exports = mongoose.model('Note', noteSchema)