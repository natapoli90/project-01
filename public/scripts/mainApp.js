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
$('h1.start').hide();

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
});
function startOver (e) {
  $('#activities').html("");
  $('.foodDB').show();
  $('.activityDB').hide();
  $('.start-over').hide();
}

function onClickFood (calories) {
  $('.foodDB').hide();
  $('.activityDB').show();
  $('.start-over').show();
  weight = $('#weight').val();
  console.log("Weight: ", weight);
  console.log("Food calories: ", calories);
  $.get('/api/activities').success(function (activities) {
    activities.forEach(function calculateTime (activity, met) {
      console.log("MET: ", activity.met);
      console.log("Weight before parse: ", weight);
      console.log("Weight:", weight);
      var weightKg = (weight / 2.205);
      console.log("WeightKG: ", weightKg);
      var metKg = (activity.met * weightKg);
      console.log("MetKg: ", metKg);
      activity.time = Math.round(((calories / metKg)/0.01));
      console.log("Activity.time: ", activity.time);
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
