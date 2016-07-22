var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/trainorgain");
module.exports.Food = require("./food.js");
module.exports.Activity = require("./activity.js");
