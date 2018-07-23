var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
const PORT = process.env.PORT || 3000;

// parse application
app.use(bodyParser.urlencoded({ extended: false}));

//parse application/json
app.use(bodyParser.json())

// Serve HTML pages
app.get(/\/(([\w]+)\.(html|css))$/, function(req, res, next) {
    const fileName = req.params[0];
    res.sendFile(
      fileName,
      {
        root: __dirname + "/app/public/",
        dotfiles: "deny",
        headers: {
          "x-timestamp": Date.now(),
          "x-sent": true
        }
      },
      function(err) {
        if (err) {
          next(err);
        } else {
          console.log("Sent:", fileName);
        }
      }
    );
  });


require('./app/routing/htmlRoutes.js')(app);



app.listen(PORT, function () {
	console.log(`http://localhost:${PORT}`);
});
