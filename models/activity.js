var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  name: String,
  met: Number,
  image: String,
});

var Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
