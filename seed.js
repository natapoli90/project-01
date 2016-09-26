// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var foodsList =[
              {
                "name": "Burger",
                "calories": 550,
                "image": "/images/food/1burger.jpg",
              },
              {
                "name": "Pizza, 1 slice",
                "calories": 230,
                "image": "/images/food/2pizza.jpg"
              },
              {
                "name": "French fries",
                "calories": 510,
                "image": "/images/food/3fries.jpg"
              },
              {
                "name": "Donut, 1",
                "calories": 420,
                "image": "/images/food/4donut.jpg"
              },
              {
                "name": "Ice-cream",
                "calories": 280,
                "image": "/images/food/5ice-cream.jpg"
              },
              {
                "name": "Coca-Cola",
                "calories": 280,
                "image": "/images/food/6coca-cola.jpg"
              },
              {
                "name": "Iced coffee",
                "calories": 350,
                "image": "/images/food/7coffee.jpg"
              },
              {
                "name": "Beer",
                "calories": 210,
                "image": "/images/food/8beer.jpg"
              }
];



var activitiesList =[
              {
                "name": "Yoga",
                "met": 3,
                "image": "/images/activity/1yoga.jpg"
              },
              {
                "name": "Jogging",
                "met": 4,
                "image": "/images/activity/2walk.jpg"
              },
              {
                "name": "Zumba",
                "met": 6,
                "image": "/images/activity/3zumba.png"
              },
              {
                "name": "Swimming",
                "met": 7,
                "image": "/images/activity/4swim.jpg"
              },
              {
                "name": "Gym",
                "met": 8,
                "image": "/images/activity/5gym.jpeg"
              },
              {
                "name": "Bicycling",
                "met": 9,
                "image": "/images/activity/6cycling.jpg"
              },
              {
                "name": "Running",
                "met": 11,
                "image": "/images/activity/7run.jpg"
              },
              {
                "name": "Boxing",
                "met": 12,
                "image": "/images/activity/8box.jpg"
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
