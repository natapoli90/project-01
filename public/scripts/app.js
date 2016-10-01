/* CLIENT-SIDE JS
*/
  var foodsTemplate;
  var activitiesTemplate;

$(document).ready(function() {
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

    $.ajax({
      method: 'GET',
      url: '/api/activities',
      success: handleActivitySuccess,
      error: handleError,
    });

  $('#food-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: 'api/foods',
      data: formData,
      success: handleFoodAddSuccess,
      error: handleError,
    });
    $(this).trigger("reset");
  });

  $('#activity-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: 'api/activities',
      data: formData,
      success: handleActivityAddSuccess,
      error: handleError,
    });
    $(this).trigger("reset");
  });

$('#foods').on('click', '.delete-food', handleFoodDeleteClick);
$('#activities').on('click', '.delete-activity', handleActivityDeleteClick);

$('#foods').on('click', '.edit-food', handleFoodEditClick);
$('#foods').on('click', '.save-food', handleFoodSaveChangesClick);

$('#activities').on('click', '.edit-activity', handleActivityEditClick);
$('#activities').on('click', '.save-activity', handleActivitySaveChangesClick);
});

function handleFoodSuccess(foods) {
  foods.forEach(function(food) {
    renderFood(food);
  });
}

function handleActivitySuccess(activities) {
  activities.forEach(function(activity) {
    renderActivity(activity);
  });
}

function handleFoodAddSuccess(json) {
  renderFood(json);
}

function handleActivityAddSuccess(json) {
  renderActivity(json);
}

// this function takes a single food and renders it to the page
function renderFood(food) {
  var html = foodsTemplate(food);
  $('#foods').prepend(html);
}
function renderActivity(activity) {
  console.log('rendering activity', activity);
  var html = activitiesTemplate(activity);
  $('#activities').prepend(html);
}

// when a food delete button is clicked
function handleFoodDeleteClick(e) {
  var foodId = $(this).parents('.card-deck').data('foodId');
  $.ajax({
    method: 'DELETE',
    url: '/api/foods/' + foodId,
    success: handleFoodDeleteSuccess,
    error: handleError,
  });
}

function handleFoodDeleteSuccess(food) {
  var deletedFood = food;
  var divToRemove = 'div[data-food-id=' + deletedFood._id + ']';
  $(divToRemove).remove();
}

// when an activity delete button is clicked
function handleActivityDeleteClick(e) {
  var activityId = $(this).parents('.card-deck').data('activityId');
  $.ajax({
    method: 'DELETE',
    url: '/api/activities/' + activityId,
    success: handleActivityDeleteSuccess,
    error: handleError,
  });
}

function handleActivityDeleteSuccess(activity) {
  var deletedActivity = activity;
  var divToRemove = 'div[data-activity-id=' + deletedActivity._id + ']';
  $(divToRemove).remove();
}

// when the edit button for food is clicked
function handleFoodEditClick(e) {
  var $foodRow = $(this).closest('.card-deck');
  var foodId = $foodRow.data('food-id');
  // show the save changes button
  $foodRow.find('.save-food').toggleClass('hidden');
  // hide the edit button
  $foodRow.find('.edit-food').toggleClass('hidden');
  var foodName = $foodRow.find('h4.food-name').text();
  $foodRow.find('h4.food-name').html('<input class="edit-food-name" value="' + foodName + '"></input>');
  var foodCalories = $foodRow.find('p.food-calories').text();
  $foodRow.find('p.food-calories').html('<input class="edit-food-calories" value="' + foodCalories + '"></input>');
}

// after editing food, when the save changes button is clicked
function handleFoodSaveChangesClick(e) {
  var foodId = $(this).parents('.card-deck').data('food-id');
  var $foodRow = $('[data-food-id=' + foodId + ']');
  var data = {
    name: $foodRow.find('.edit-food-name').val(),
    calories: $foodRow.find('.edit-food-calories').val(),
  };
  $.ajax({
    method: 'PUT',
    url: '/api/foods/' + foodId,
    data: data,
    success: handleFoodUpdatedResponse,
    error: handleError,
  });
  function handleFoodUpdatedResponse(data) {
    var foodId = data._id;
    $('[data-food-id=' + foodId + ']').remove();
    renderFood(data);
    $('[data-food-id=' + foodId + ']')[0].scrollIntoView();
  }
}

// when the edit button for activity is clicked
function handleActivityEditClick(e) {
  var $activityRow = $(this).closest('.card-deck');
  var activityId = $activityRow.data('activity-id');
  // show the save changes button
  $activityRow.find('.save-activity').toggleClass('hidden');
  // hide the edit button
  $activityRow.find('.edit-activity').toggleClass('hidden');
  var activityName = $activityRow.find('h4.activity-name').text();
  $activityRow.find('h4.activity-name').html('<input class="edit-activity-name" value="' + activityName + '"></input>');
console.log(activityName);
  var activityMet = $activityRow.find('p.activity-met').text();
  $activityRow.find('p.activity-met').html('<input class="edit-activity-met" value="' + activityMet + '"></input>');
console.log(activityMet);
}

// after editing activity, when the save changes button is clicked
function handleActivitySaveChangesClick(e) {
  var activityId = $(this).parents('.card-deck').data('activity-id');
  var $activityRow = $('[data-activity-id=' + activityId + ']');
  var data = {
    name: $activityRow.find('.edit-activity-name').val(),
    met: $activityRow.find('.edit-activity-met').val(),
  };
  $.ajax({
    method: 'PUT',
    url: '/api/activities/' + activityId,
    data: data,
    success: handleActivityUpdatedResponse,
    error: handleError,
  });
  function handleActivityUpdatedResponse(data) {
    var activityId = data._id;
    $('[data-activity-id=' + activityId + ']').remove();
    renderActivity(data);
    $('[data-activity-id=' + activityId + ']')[0].scrollIntoView();
  }
}

function handleError(err) {
  console.log("Server returned an error.", err);
}
