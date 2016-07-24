/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/albums
function index(req, res) {
  db.Food.find({}, function(err, allFoods) {
    res.json(allFoods);
  });
}

function create(req, res) {
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
    console.log('foodsController.show responding with', foundFood);
    res.json(foundFood);
  });
}

function destroy(req, res) {
  db.Food.findOneAndRemove({_id: req.params.foodId}, function(err, foundFood){

    console.log("DESTROYED Food SUCCESS: " , foundFood);
    res.json(foundFood);
  });
}

function update(req, res) {
  console.log('updating with data', req.body);
db.Food.findById(req.params.foodId, function(err, foundFood) {
  if(err) { console.log('foodsController.update error', err); }
  foundFood.name = req.body.name;
  foundFood.calories = req.body.calories;
  // foundFood.image = req.body.image;
  foundFood.description = req.body.description;
  foundFood.save(function(err, food) {
    if(err) { console.log('saving altered food failed'); }
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
