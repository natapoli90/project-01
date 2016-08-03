var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
  name: String,
  calories: Number,
  image: String,
  // TODO: Was the description field ever used? If not, remove it.
  description: String
});

var Food = mongoose.model('Food', FoodSchema);

module.exports = Food;
