/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/albums --> Tunely code?
function index(req, res) {
  db.Activity.find({}, function(err, allActivities) {
    // This controller action needs error handling
    res.json(allActivities);
  });
}

function create(req, res) {
  // Remove sanity check console logs from 'production' (or submitted) code
  console.log('body', req.body);
  db.Activity.create(req.body, function(err, activity) {
    // These kinds of console logs are great, since they indicate errors. Keep these!
    if (err) { console.log('error', err); }
    console.log(activity);
    res.json(activity);
  });
}
function show(req, res) {
  db.Activity.findById(req.params.activityId, function(err, foundActivity) {
    if(err) { console.log('activitiesController.show error', err); }
    // Remove console logs from 'production' (or submitted) code
    console.log('activitiesController.show responding with', foundActivity);
    res.json(foundActivity);
  });
}

function destroy(req, res) {
  db.Activity.findOneAndRemove({_id: req.params.activityId}, function(err, foundActivity){
    // Remove console logs from 'production' (or submitted) code
    console.log("DESTROYED Activity SUCCESS: " , foundActivity);
    res.json(foundActivity);
  });
}

function update(req, res) {
  // Remove console logs from 'production' (or submitted) code
  console.log('updating with data', req.body);
  // Watch your indentation!
  db.Activity.findById(req.params.activityId, function(err, foundActivity) {
    if(err) { console.log('activitiesController.update error', err); }
    foundActivity.name = req.body.name;
    foundActivity.met = req.body.met;
    // foundActivity.image = req.body.image;
    foundActivity.save(function(err, activity) {
      if(err) { console.log('saving altered activity failed'); }
      // You should send the newly saved activity
      // res.json(activity)
      res.json(foundActivity);
    });
  });
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
