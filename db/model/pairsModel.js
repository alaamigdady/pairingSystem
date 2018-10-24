var mongoose = require('mongoose');

var pairsSchema = mongoose.Schema({
  pairs : [{student1 : String , student2 : String}]
});

var Pairs = mongoose.model('Pairs', pairsSchema);
module.exports = Pairs;