var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
	fullname : { type : String },
	email_id : { type : String },
	teacher_id : { type : String },
	mobile_number : { type : String },
	address : { type : String },
	createdon : { type : Date, default: Date.now }
},{
    collection: 'student_data'
});

// Export the model
module.exports = mongoose.model('studentSchema', StudentSchema);
