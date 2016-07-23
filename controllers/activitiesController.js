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
  console.log('body', req.body);
  db.Activity.create(req.body, function(err, activity) {
    if (err) { console.log('error', err); }
    console.log(activity);
    res.json(activity);
  });
}
function show(req, res) {
  db.Activity.findById(req.params.activityId, function(err, foundActivity) {
    if(err) { console.log('activitiesController.show error', err); }
    console.log('activitiesController.show responding with', foundActivity);
    res.json(foundActivity);
  });
}

function destroy(req, res) {
  db.Activity.findOneAndRemove({_id: req.params.activityId}, function(err, foundActivity){

    console.log("DESTROYED Activity SUCCESS: " , foundActivity);
    res.json(foundActivity);
  });
}

function update(req, res) {

}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  // update: update
};
