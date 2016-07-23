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
  db.Food.findById(req.params.id, function(err, foundFood) {
    if(err) { console.log('foodsController.show error', err); }
    console.log('foodsController.show responding with', foundFood);
    res.json(foundFood);
  });
}

function destroy(req, res) {

}

function update(req, res) {

}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  // destroy: destroy,
  // update: update
};
