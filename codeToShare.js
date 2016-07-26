// calculate activity time
$.get('/api/activities').success(function (activities) {
  activities.forEach(function calculateTime (activity, met) {
    var weightKg = (weight / 2.205);
    var metKg = (activity.met * weightKg);
    activity.time = Math.round(((calories / metKg)/0.01));
  });
  });
