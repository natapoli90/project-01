/************
 * DATABASE *
 ************/
var db = require('../models');

function index(req, res) {
  db.Activity.find({}, function(err, allActivities) {
    if (err) {
      console.log('error', err);
    }
    res.json(allActivities);
  });
}

function create(req, res) {
  db.Activity.create(req.body, function(err, activity) {
    if (err) {
      console.log('error', err);
    }
    res.json(activity);
  });
}
function show(req, res) {
  db.Activity.findById(req.params.activityId, function(err, foundActivity) {
    if(err) {
      console.log('activitiesController.show error', err);
    }
    res.json(foundActivity);
  });
}

function destroy(req, res) {
  db.Activity.findOneAndRemove({_id: req.params.activityId}, function(err, foundActivity){
    res.json(foundActivity);
  });
}

function update(req, res) {
  db.Activity.findById(req.params.activityId, function(err, foundActivity) {
    if(err) {
      console.log('activitiesController.update error', err);
    }
    foundActivity.name = req.body.name;
    foundActivity.met = req.body.met;
    foundActivity.save(function(err, activity) {
      if(err) {
        console.log('saving altered activity failed');
      }
      res.json(activity);
    });
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
