/* CLIENT-SIDE JS
*/
  var foodsTemplate;
  var activitiesTemplate;

$(document).ready(function() {



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

  $('#food-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/foods', formData, function(food) {
      console.log('food after POST', food);
      renderFood(food);  //render the server's response
    });
    $(this).trigger("reset");
  });

  $('#activity-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/activities', formData, function(activity) {
      console.log('activity after POST', activity);
      renderActivity(activity);  //render the server's response
    });
    $(this).trigger("reset");
  });



});
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
