var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/trainorgain");
module.exports.Food = require("./food.js");
module.exports.Activity = require("./activity.js");
