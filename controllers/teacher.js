var User = require('../models/teacher');
var Stud = require('../models/student');
var async = require('async');
// Get all teacher
exports.getallteacherlist = async function(req, res) {
    const data = await User.find({}, null, { sort: { "createdon": -1 } });
    if (data) {
        res.send(data);
    } else {
        res.send({ status: 'error'});
    }
};

// Create new teacher
exports.createnewteacher = function(req, res) {
    var user = new User(req.body);
    user.save(function(err, data) {
        if (err)
            res.send({status: 'error'});
        else
            res.send({status: 'success', data: data});
    })
};

// Update teacher by id
exports.updateteacherbyid = function(req, res) {
	//console.log('body= ', req.body);
	//console.log('body= ', req.params);
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, data) {
        if (err) {
            res.send({ status: 'error'});
        } else
            res.send({ status: 'success'});
    });
};
// Delete teacher by id
exports.deleteteacherbyid = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send({ status: 'error'});
        else
            res.send({ status: 'success'});
    });  
};

