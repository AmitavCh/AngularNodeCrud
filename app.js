var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var route = require('./routes/route'); // Imports routes for the products

var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/testtempdb';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// print currently executing query
mongoose.set("debug", (collectionName, method, query, doc) => {});

// Handle CORS error
const cors = require('cors');
app.use(cors({}));

//app.use(bodyParser.json());
app.use(bodyParser.json({
	limit: '50mb'
}));
app.use(bodyParser.urlencoded({
	limit: '50mb',
	extended: true
}));
//app.use(bodyParser.urlencoded({extended: false}));

app.use('/angularcrudexample', route); 

var port = 2000;

app.listen(port, () => {
	console.log('\n----------------------------------------------------\n\n !!!   Server is up and running on port # ' + port + '   !!! \n\n----------------------------------------------------\n');
});
