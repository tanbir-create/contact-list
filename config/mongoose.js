//require library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://tanbir-admin:legendaddy@cluster0.ok1p4.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });

//acquire the connection to check if successful
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running 
db.once('open', function(){
    console.log('Successfully connected to the database');
});