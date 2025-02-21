const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI;

console.log('conecting to: ', url);
mongoose.connect(url)
  .then(result => {
    console.log('conected to MongoDB');
  })
  .catch(error => {
    console.log('Error conecting to MongoDB');    
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Convert _id (ObjectId) to a string and store it in 'id'
    delete returnedObject._id // Remove the original _id field
    delete returnedObject.__v // Remove the __v field (used for versioning by Mongoose)
  }
});

module.exports = mongoose.model('Note', noteSchema)