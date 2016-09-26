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

$('#foods').on('click', '.edit-food', handleFoodEditClick);
$('#foods').on('click', '.save-food', handleFoodSaveChangesClick);

$('#activities').on('click', '.edit-activity', handleActivityEditClick);
$('#activities').on('click', '.save-activity', handleActivitySaveChangesClick);
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

// when the edit button for food is clicked
function handleFoodEditClick(e) {
  var $foodRow = $(this).closest('.card-deck');
  var foodId = $foodRow.data('food-id');
  console.log('edit food', foodId);

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

  console.log('PUTing data for food', foodId, 'with data', data);
  $.ajax({
    method: 'PUT',
    url: '/api/foods/' + foodId,
    data: data,
    success: handleFoodUpdatedResponse
  });

  function handleFoodUpdatedResponse(data) {
    console.log('response to update', data);
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
  console.log('edit activity', activityId);

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

  console.log('PUTing data for activity', activityId, 'with data', data);
  $.ajax({
    method: 'PUT',
    url: '/api/activities/' + activityId,
    data: data,
    success: handleActivityUpdatedResponse
  });
  
  function handleActivityUpdatedResponse(data) {
    console.log('response to update', data);
    var activityId = data._id;
    $('[data-activity-id=' + activityId + ']').remove();
    renderActivity(data);
    $('[data-activity-id=' + activityId + ']')[0].scrollIntoView();
  }
}
