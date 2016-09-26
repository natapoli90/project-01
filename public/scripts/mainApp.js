/* CLIENT-SIDE JS
*/
  var foodsTemplate;
  var activitiesTemplate;
  var weight;
  var food;

$(document).ready(function() {

$('.weight').hide();
$('.foodDB').hide();
$('.activityDB').hide();
$('.start-over').hide();

  console.log('app.js loaded!');
  var foodHtml = $('#foods-template').html();
  foodsTemplate = Handlebars.compile(foodHtml);
  var activityHtml = $('#activities-template').html();
  activitiesTemplate = Handlebars.compile(activityHtml);

  $.get('/api/foods').success(function (foods) {
    foods.forEach(function(food) {
      renderFood(food);
    });
  });

  $('.start-button').on('click', function(e) {
        $('.weight').show();
        $('.jumbotron').hide();
        $('.foodDB').show();
});
// $('#food').on('click', '.imgFood', onClickFood);


});

function startOver (e) {
  $('#activities').html("");
  $('.foodDB').show();
  $('.activityDB').hide();
  $('.start-over').hide();
}


function onClickFood (calories) {
  console.log("sanity check");
  $('.foodDB').hide();
  $('.action').hide();
  $('.activityDB').show();
  $('.start-over').show();
  weight = $('#weight').val();
  $.get('/api/activities').success(function (activities) {
    activities.forEach(function calculateTime (activity, met) {
      var weightKg = (weight / 2.205);
      var metKg = (activity.met * weightKg);
      activity.time = Math.round(((calories / metKg)/0.01));
      renderActivity(activity);
    });
  });
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
