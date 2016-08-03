/* CLIENT-SIDE JS
*/
var foodsTemplate;
var activitiesTemplate;
var weight;
var food;

// TODO: Please watch your indentation- it's very important to write well-indented, clean looking code

$(document).ready(function() {
  console.log('app.js loaded!');

  $('.weight').hide();
  $('.foodDB').hide();
  $('.activityDB').hide();
  $('.start-over').hide();
  $('h1.start').hide();

  var foodHtml = $('#foods-template').html();
  foodsTemplate = Handlebars.compile(foodHtml);

  var activityHtml = $('#activities-template').html();
  activitiesTemplate = Handlebars.compile(activityHtml);

  $.get('/api/foods').success(function (foods) {
    // TODO: Missing  error handling
    foods.forEach(function(food) {
      renderFood(food);
    });
  });

// I really like the way that you use jQuery to guide the user through your app!
  $('.start-button').on('click', function(e) {
    $('.weight').show();
    $('.jumbotron').hide();
    $('.foodDB').show();
  });
  // TODO: Remove commented-out code
// $('#food').on('click', '.imgFood', onClickFood);


});

function startOver (e) {
  $('#activities').html("");
  $('.foodDB').show();
  $('.activityDB').hide();
  $('.start-over').hide();
}


function onClickFood (calories) {
  //TODO:  Remember to remove your sanity checks before submitting code
  console.log("sanity check");
  $('.foodDB').hide();
  $('.activityDB').show();
  $('.start-over').show();
  weight = $('#weight').val();
  $.get('/api/activities').success(function (activities) {
    // It might be cleaner to define this function outside of the forEach callback
    activities.forEach(function calculateTime (activity, met) {
      var weightKg = (weight / 2.205);
      var metKg = (activity.met * weightKg);
      activity.time = Math.round(((calories / metKg)/0.01));
      renderActivity(activity);
    });
  });
}

function playSound1 () {
  document.getElementById('audio1').play();
  $('h1.ok').hide();
  $('h1.start').show();
}

function playSound2 () {
  document.getElementById('audio2').play();
}

// this function takes a single food and renders it to the page
function renderFood(food) {
  console.log('rendering food', food);
  var html = foodsTemplate(food);
  $('#foods').prepend(html);
}

function renderActivity(activity) {
  console.log('rendering activity', activity);
  var html = activitiesTemplate(activity);
  console.log("Activity html: ", html);
  $('#activities').prepend(html);
}
