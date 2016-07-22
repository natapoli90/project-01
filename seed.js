// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var foodsList =[
              {
                "name": "Big Mac Burger",
                "calories": 550,
                "image": "",
                "description": "1 burger, Mc Donald's"
              },
              {
                "name": "All meat Pizza",
                "calories": 550,
                "image": "",
                "description": "2 slices, Papa John's"
              },
              {
                "name": "French fries",
                "calories": 510,
                "image": "",
                "description": "Large, Mc Donald's"
              },
              {
                "name": "Glazed Donut",
                "calories": 420,
                "image": "",
                "description": "1 donut, Dunkin Donuts"
              },
              {
                "name": "Vanilla Ice-cream",
                "calories": 280,
                "image": "",
                "description": "1/2 cup, Ben & Jerry's"
              },
              {
                "name": "Coca-Cola",
                "calories": 280,
                "image": "",
                "description": "1 Large Soda"
              },
              {
                "name": "Caramel Macchiato",
                "calories": 550,
                "image": "",
                "description": "1 Large, Starbucks"
              },
              {
                "name": "Ipa Beer",
                "calories": 210,
                "image": "",
                "description": "1 bottle, Ballast Point"
              }
];



var activitiesList =[
              {
                "name": "Yoga",
                "MET": 3,
                "image": ""
              },
              {
                "name": "Walking - 4/mph",
                "MET": 4,
                "image": ""
              },
              {
                "name": "Zumba",
                "MET": 6,
                "image": ""
              },
              {
                "name": "Swimming",
                "MET": 7,
                "image": ""
              },
              {
                "name": "Weight Training",
                "MET": 8,
                "image": ""
              },
              {
                "name": "Bicycling - 13/mph",
                "MET": 9,
                "image": ""
              },
              {
                "name": "Running - 7/mph",
                "MET": 11,
                "image": ""
              },
              {
                "name": "Boxing",
                "MET": 12,
                "image": ""
              }
];

db.Food.remove({}, function(err, food) {
  if (err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all foods');

    db.Food.create(foodsList, function(err, food){
      if (err) {
        return console.log('err', err);
      }
      console.log('created', Object.keys(foodsList).length, 'foods');
    });
  }
});

db.Activity.remove({}, function(err, activity) {
  if (err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all activities');

    db.Activity.create(activitiesList, function(err, activity){
      if (err) {
        return console.log('err', err);
      }
      console.log('created', activitiesList.length, 'activities');
      process.exit();
    });
  }
});
