/* CLIENT-SIDE JS
*/
  var foodsTemplate;
  var activitiesTemplate;

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
  $.get('/api/activities').success(function (activities) {
    activities.forEach(function(activity) {
      renderActivity(activity);
    });
  });

  $('.start-button').on('click', function(e) {
        $('.weight').show();
        $('.jumbotron').hide();
        $('.foodDB').show();

});






});
function startOver (e) {
  $('.foodDB').show();
  $('.activityDB').hide();
  $('.start-over').hide();
}


function showAll (e) {
  $('.foodDB').hide();
  $('.activityDB').show();
  $('.start-over').show();

  var weight = ($('#weight')/2);
  var time = foodsList.calories / (activitiesList.met * weight);
  $('.card-block').appendText(time + " min");
}

function playSound () {
    document.getElementById('my_audio').play();
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
  $('#activities').prepend(html);
}
