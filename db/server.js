const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://vineethakondepudi:Vinnu123@cluster0.8oxzge1.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  dbName: 'mongoData',
  bufferCommands: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));
