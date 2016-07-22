// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var foodsList =[
              {
                "name": "Big Mac Burger",
                "calories": 550,
                "image": "a",
                "description": "1 burger, Mc Donald's"
              },
              {
                "name": "All meat Pizza",
                "calories": 550,
                "image": "a",
                "description": "2 slices, Papa John's"
              },
              {
                "name": "French fries",
                "calories": 510,
                "image": "a",
                "description": "Large, Mc Donald's"
              },
              {
                "name": "Strawbery glazed Donut",
                "calories": 420,
                "image": "a",
                "description": "1 donut, Dunkin Donuts"
              },
              {
                "name": "Snikers bar",
                "calories": 480,
                "image": "a",
                "description": "1 Snikers Super bar, 100g"
              },
              {
                "name": "Ice-cream",
                "calories": 280,
                "image": "a",
                "description": "1/2 cup, Ben & Jerry's"
              },
              {
                "name": "Coca-Cola",
                "calories": 280,
                "image": "a",
                "description": "1 Large Soda"
              },
              {
                "name": "Iced Caramel Macchiato",
                "calories": 550,
                "image": "a",
                "description": "1 Large, Starbucks"
              },
              {
                "name": "Beer Sculpin Ipa",
                "calories": 210,
                "image": "a",
                "description": "1 bottle, Ballast Point"
              }
];



var activitiesList =[
              {
                "name": "Sexual activity",
                "MET": 2,
                "image": "String"
              },
              {
                "name": "Yoga",
                "MET": 3,
                "image": "String"
              },
              {
                "name": "Walking (brisk) - 4/mph",
                "MET": 4,
                "image": "String"
              },
              {
                "name": "Zumba",
                "MET": 6,
                "image": "String"
              },
              {
                "name": "Swimming (moderate)",
                "MET": 7,
                "image": "String"
              },
              {
                "name": "Weight Training (moderate)",
                "MET": 8,
                "image": "String"
              },
              {
                "name": "Bicycling (moderate) - 13/mph",
                "MET": 9,
                "image": "String"
              },
              {
                "name": "Running - 7/mph",
                "MET": 11,
                "image": "String"
              },
              {
                "name": "Boxing",
                "MET": 12,
                "image": "String"
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
