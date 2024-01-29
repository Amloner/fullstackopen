require('dotenv').config()

const PORT = 3000

const MONGODB_URI = 'mongodb+srv://aaudit0prabakar:Frog@cluster0.rhavh4a.mongodb.net/?retryWrites=true&w=majority'


console.log(MONGODB_URI)
module.exports = {
  MONGODB_URI,
  PORT
}