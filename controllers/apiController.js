function index(req, res) {
  res.json({
    message: "Welcome to Train or Gain!",
    documentation_url: "https://github.com/natapoli90/project-01/README.md",
    base_url: "https://trainorgain.herokuapp.com/",
    endpoints: [
      // If you're going to include this, remember to fill it out.
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
