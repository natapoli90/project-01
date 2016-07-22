/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/albums
function index(req, res) {
  db.Activity.find({}, function(err, allActivities) {
    res.json(allActivities);
  });
}

function create(req, res) {

}
function show(req, res) {
  db.Activity.findById(req.params.id, function(err, foundActivity) {
    if(err) { console.log('activitiesController.show error', err); }
    console.log('activitiesController.show responding with', foundActivity);
    res.json(foundActivity);
  });
}

function destroy(req, res) {

}

function update(req, res) {

}


// export public methods here
module.exports = {
  index: index,
  // create: create,
  show: show,
  // destroy: destroy,
  // update: update
};
