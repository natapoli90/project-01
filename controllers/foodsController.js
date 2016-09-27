/************
 * DATABASE *
 ************/
var db = require('../models');

function index(req, res) {
  db.Food.find({}, function(err, allFoods) {
    if (err) {
      console.log('error', err);
    }
    res.json(allFoods);
  });
}

function create(req, res) {
  db.Food.create(req.body, function(err, food) {
    if (err) {
      console.log('error', err);
    }
    res.json(food);
  });
}
function show(req, res) {
  db.Food.findById(req.params.foodId, function(err, foundFood) {
    if(err) {
      console.log('foodsController.show error', err);
    }
    res.json(foundFood);
  });
}

function destroy(req, res) {
  db.Food.findOneAndRemove({_id: req.params.foodId}, function(err, foundFood){
    res.json(foundFood);
  });
}

function update(req, res) {
  db.Food.findById(req.params.foodId, function(err, foundFood) {
    if(err) {
      console.log('foodsController.update error', err);
    }
    foundFood.name = req.body.name;
    foundFood.calories = req.body.calories;
    foundFood.save(function(err, food) {
      if(err) {
        console.log('saving altered food failed');
      }
      res.json(food);
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
