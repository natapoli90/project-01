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

$('#foods').on('click', '.delete-food', handleDeleteFoodClick);
$('#activities').on('click', '.delete-activity', handleDeleteActivityClick);
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
// when a food delete button is clicked
function handleDeleteFoodClick(e) {
  console.log("DELETE CALLED");
  var foodId = $(this).parents('.card-deck').data('foodId');
  console.log('someone wants to delete food id=' + foodId );
  $.ajax({
    method: 'DELETE',
    url: '/api/foods/' + foodId,
    success: handleDeleteFoodSuccess
  });
}

function handleDeleteFoodSuccess(food) {
  console.log("ready to delete");
  var deletedFood = food;
  console.log('removing the following food from the page:', deletedFood);
  var divToRemove = 'div[data-food-id=' + deletedFood._id + ']';
  console.log(divToRemove);
  $(divToRemove).remove();
}

// when an activity delete button is clicked
function handleDeleteActivityClick(e) {
  console.log("DELETE CALLED");
  var activityId = $(this).parents('.card-deck').data('activityId');
  console.log('someone wants to delete activity id=' + activityId );
  $.ajax({
    method: 'DELETE',
    url: '/api/activities/' + activityId,
    success: handleDeleteActivitySuccess
  });
}

function handleDeleteActivitySuccess(activity) {
  console.log("ready to delete");
  var deletedActivity = activity;
  console.log('removing the following activity from the page:', deletedActivity);
  var divToRemove = 'div[data-activity-id=' + deletedActivity._id + ']';
  console.log(divToRemove);
  $(divToRemove).remove();
}
