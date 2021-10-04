var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeacherSchema = new Schema({
	fullname : { type : String },
	email_id : { type : String },
	mobile_number : { type : String },
	address : { type : String },
	createdon : { type : Date, default: Date.now }
},{
    collection: 'teacher_data'
});

// Export the model
module.exports = mongoose.model('teacherSchema', TeacherSchema);
