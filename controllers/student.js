var User = require('../models/student');
var async = require('async');

// Get all student
exports.getallstudentlist = async function(req, res) {
    const data = await User.find({}, null, { sort: { "createdon": -1 } });
    if (data) {
        res.send(data);
    } else {
        res.send({ status: 'error'});
    }
};

// Create new student
exports.createnewstudent = function(req, res) {
    var user = new User(req.body);
    user.save(function(err, data) {
        if (err)
            res.send({status: 'error'});
        else
            res.send({status: 'success', data: data});
    })
};

// Update student by id
exports.updatestudentbyid = function(req, res) {
	console.log('body= ', req.body);
	console.log('body= ', req.params);
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, data) {
        if (err) {
            res.send({ status: 'error'});
        } else
            res.send({ status: 'success'});
    });
};
// Delete student by id
exports.deletestudentbyid = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send({ status: 'error'});
        else
            res.send({ status: 'success'});
    })
};
// Delete student by  teacher id
exports.deletestudentdatabyteacherid = function(req, res) {
    //console.log(req.params.id);
    User.deleteMany({teacher_id:req.params.id},function(err) {
        console.log(res);
        if (err)
            res.send({ status: 'error'});
        else
            res.send({ status: 'success'});
    })
};
