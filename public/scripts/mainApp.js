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

  var foodHtml = $('#foods-template').html();
  foodsTemplate = Handlebars.compile(foodHtml);

  var activityHtml = $('#activities-template').html();
  activitiesTemplate = Handlebars.compile(activityHtml);

  $.ajax({
    method: 'GET',
    url: '/api/foods',
    success: handleFoodSuccess,
    error: handleError,
  });

  $('.start-button').on('click', function(e) {
    $('.weight').show();
    $('.jumbotron').hide();
    $('.foodDB').show();
  });
});

function handleFoodSuccess(foods) {
  foods.forEach(function(food) {
    renderFood(food);
  });
}

function startOver (e) {
  $('#activities').html("");
  $('.foodDB').show();
  $('.activityDB').hide();
  $('.start-over').hide();
}

function onClickFood (calories) {
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
  var html = foodsTemplate(food);
  $('#foods').prepend(html);
}

function renderActivity(activity) {
  var html = activitiesTemplate(activity);
  $('#activities').prepend(html);
}

function handleError(err) {
  console.log("Server returned an error.", err);
}
