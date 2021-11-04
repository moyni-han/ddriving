
const mongo = require('mongodb');
const express = require('express');
const app = express();
const MongoClient = mongo.MongoClient;
const port = 3000;

const connectString = 'mongodb://localhost:27017'
const dbName = 'test';
var db;

//eventually rewrite this using promises and/or async/await
MongoClient.connect(connectString, function(err, client) {
  if (err) {
    console.log("The web server still running without database support.")
  }
  else {
    console.log("Connected successfully to MongoDB server");
    db = client.db(dbName);
  }
});




/*
Key authorization code follows. Note the middle ware function pattern used here
letThemIn() is not written as an anonymous callback simply for clarity
isAuthenticated() and letThemIn() are both callback functions in the call back list
Both have access to req and res objects
*/

app.get('/hello', isAuthenticated, letThemIn);

function letThemIn(req, res){
  //allow access to a protected resource
  res.send('Welcome. You are authorized!'); //or render a pug page or send an html page etc.
}

function isAuthenticated(req, res, next) {
  // do any checks you want to in here
  // Maybe CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (3 === 3) {
    return next(); //this will pass on to letThemIn which is next function in the callback list
  }

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/someroute'); //or we could just send them a message res.send
}

//Of course we don't have to redirect here but that is generally what you would do
//Ideally you would redirect to a login page
app.get('/someroute', function (req, res) {
  res.send("You aren't authorized!")
})





app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
