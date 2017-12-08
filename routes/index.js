var express = require('express');
var router = express.Router();
/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

// set the view engine to ejs



mongoose.connect('mongodb://localhost/siteDB', { useMongoClient: true }); //Connects to a mongo database called "commentDB"

var siteSchema = mongoose.Schema({ //Defines the Schema for this database
URI: String,
bio: String,
imgURL: String,
password: String
});

var Sites = mongoose.model('Sites', siteSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
console.log('Connected');
});

router.post('/site/:siteURI/:password/delete', function(req, res, next) {
  console.log("DELETING??");
  console.log(req.body);
  var siteURIString = req.params.siteURI;
  var query = Sites.find().remove({ URI: siteURIString});
  
  query.exec(function(err, response){
    if (err) return console.error(err);
    else {
      console.log("HELLLO?");
      res.sendStatus(200);
    }
  });
})


router.post('/submit', function(req, res, next) {
  console.log("SUBMITTED");
  console.log(req.body);

  var newSite = new Sites(req.body);
  console.log(newSite);
  newSite.save(function(err, post) {
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  })
})

router.get('/site', function(req, res, next) {
  Sites.find(function(err, siteList) {
    if (err) return console.error(err);
    else {
      console.log(siteList);
      res.json(siteList);
    }
  })
})


router.get('/site/:siteURI', function(req, res, next) {
  var siteURIString = req.params.siteURI;

  var query = Sites.findOne({ 'URI': siteURIString});
  query.select('URI bio imgURL password');
  query.exec(function (err, site) {
    if (err) return handleError(err); 
  
    if(typeof query !== 'null'){
      res.render('site', {title: site.URI, bio:site.bio, img: site.imgURL, password: site.password});
    }
  });
});

router.get('/site/:siteURI/delete', function(req, res, next) {
  console.log("DELETE");

});


//
// router.get('/deleteAll', function(req, res, next) {
//   Comment.remove({}, function (err) {
//   console.log("Collection deleted");
//   res.sendStatus(200);
//   });
// });

module.exports = router;
