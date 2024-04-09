const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/besocial_development');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'There is an error connecting to database...'));
db.once('open', ()=>{
    console.log("Databse connection successful...");
})

module.exports = db;