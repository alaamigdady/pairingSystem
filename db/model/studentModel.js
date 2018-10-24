var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  studentName   : {type:String, unique: true},
  level      : Number,
  pairs : [String]
});

var Student = mongoose.model('Student', studentSchema);
module.exports = Student;