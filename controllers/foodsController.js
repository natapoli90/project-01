/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/albums --> TODO: Remove tunely code
function index(req, res) {
  db.Food.find({}, function(err, allFoods) {
    // TODO: Needs error handling
    res.json(allFoods);
  });
}

function create(req, res) {
  // TODO: Remove console logs from 'production' (or submitted) code
  console.log('body', req.body);
  db.Food.create(req.body, function(err, food) {
    if (err) { console.log('error', err); }
    console.log(food);
    res.json(food);
  });
}
function show(req, res) {
  db.Food.findById(req.params.foodId, function(err, foundFood) {
    if(err) { console.log('foodsController.show error', err); }
    // TODO: Remove console logs from 'production' (or submitted) code
    console.log('foodsController.show responding with', foundFood);
    res.json(foundFood);
  });
}

function destroy(req, res) {
  db.Food.findOneAndRemove({_id: req.params.foodId}, function(err, foundFood){
    //TODO: Remove console logs from 'production' (or submitted) code
    console.log("DESTROYED Food SUCCESS: " , foundFood);
    res.json(foundFood);
  });
}

function update(req, res) {
  console.log('updating with data', req.body);
  //TODO: Watch your indentation
  db.Food.findById(req.params.foodId, function(err, foundFood) {
    if(err) { console.log('foodsController.update error', err); }
    foundFood.name = req.body.name;
    foundFood.calories = req.body.calories;
    // foundFood.image = req.body.image;
    foundFood.save(function(err, food) {
      if(err) { console.log('saving altered food failed'); }
      // TODO: Should send the newly altered food
      // res.json(food)
      res.json(foundFood);
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
