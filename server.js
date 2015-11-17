var http         = require('http');
var path         = require('path');

// Parsing 
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require("express-session");

// Config Data for DB
var dbObj        = require('./dbObj.js');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var async        = require('async');
var socketio     = require('socket.io');
var express      = require('express');

var TwitterCommands = require('twitter');

var Twitter = require("node-twitter-api");
var sess;


var twitter = new Twitter({
    consumerKey: 'hRX1i0jMm7NOy55dSHvKPu4EG',
    consumerSecret: 'g7I9VwsBdGUoNjzKMNlsbCb2BlH360RMm1JyOb0GhM915ETQVE',
    callback: 'https://node-play-rsmith590.c9users.io/access-token'
});


// db connection
mongoose.connect(dbObj.dbUrl);

var app = express();
var server = http.createServer(app);

// Dealer Schema
var dealerSchema = new Schema({
  username: String,
  password: String,
  dealerName: String,
  dealerId: Number,
  dealerEdmundsId: Number,
});

// Dealer Tweet Settings
var dealerTweetSettings = new Schema({
  tweetTimes: Array,
  tweetOptionalMessage: Boolean,
  tweetOptionalMessageText: String,
  pastTweets: Object
});

// Dealer Models 
var dealers = mongoose.model('dealers', dealerSchema);


// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());
// cookie parser
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'client')));
app.use(session({secret: 'hoasodofjsaodfi'}));



/*
    Routing
*/

app.post('/new-dealer', function(req, res) {
  var dealer = new dealers(req.body);
  dealer.save(function (err, data) {
      if (err) console.log(err);
          else console.log('Saved : ', data );
      });
      res.status(200).send('OK');
});

/*
app.post('/log-in', function(req, res) {
    var user = req.body;
    console.log(user);
    dealers.findOne({ username: user.username }, function (err, dealer) {
      if (err) return err;
      console.log(dealer.dealerName);
      req.session.dealer = dealer;
      // req.session.dealer info
    });
    console.log(req.session.dealer);
});
*/
app.get('/get-user', function(req, res) {
    console.log('Dealer Twitter Secret: ' + sess.accessSecret);
    console.log('Dealer Twitter Token: ' + sess.accessToken);
    /*
    var dealer = {
        dealerData: req.sess.user,
        accessToken: req.sess.accessToken,
        accessSecret: req.sess.accessSecret
    }
    */
    // json(dealer) 
});


app.get("/request-token", function(req, res) {
    twitter.getRequestToken(function(err, requestToken, requestSecret) {
        if (err)
            res.status(500).send(err);
        else {
            _requestSecret = requestSecret;
            // try redirct client side
            var redirectUrl = 'https://api.twitter.com/oauth/authenticate?oauth_token='+ requestToken;
            res.json(redirectUrl);
        }
    });
    // I need request to
});

app.get('/access-token', function(req, res) {
    var requestToken = req.query.oauth_token,
    verifier = req.query.oauth_verifier;

    twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
        if (err)
            res.status(500).send(err);
        else
            twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
                if (err)
                    res.status(500).send(err);
                else
                    // login to twitter success
                    // set session accessToken accessSecret user
                    sess=req.session;
                    sess.accessToken  = accessToken;
                    sess.accessSecret = accessSecret;
                    sess.user = user;
                    /*
                    console.log('access token: ' + sess.accessToken);
                    console.log('access secret: ' + sess.accessSecret);
                    console.log('user: ' + sess.user);
                    */
                    res.redirect('#/main-menu');
            });
    });
    
});

app.post('/tweet', function(req, res) {
    var tweet = req.body;

    var client = new TwitterCommands({
      consumer_key: 'hRX1i0jMm7NOy55dSHvKPu4EG',
      consumer_secret: 'g7I9VwsBdGUoNjzKMNlsbCb2BlH360RMm1JyOb0GhM915ETQVE',
      access_token_key: req.session.accessToken,
      access_token_secret: req.session.accessSecret
    });
    
    // tweets req body
    client.post('statuses/update', {status: tweet.tweet.tweetText}, function(error, tweet, response){
      if (!error) {
        console.log(tweet);
      }
    });
    
    // Tweet Text
    res.status(200).send('OK');
});


/*
    Twitter Login 
    
    1. Client makes request to server indicating need for Request Token
       Route get('/request-token')
       consumer_token: 'hRX1i0jMm7NOy55dSHvKPu4EG',
       consumer_secret: 'g7I9VwsBdGUoNjzKMNlsbCb2BlH360RMm1JyOb0GhM915ETQVE'
       
    2. Server redirects user to 
       https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken
       
    3. Twitter redirects to get('/access-token');
    
*/

/*
    
    Twitter Usage
    npm twitter
    
    consumer_key: 'hRX1i0jMm7NOy55dSHvKPu4EG',
    consumer_secret: 'g7I9VwsBdGUoNjzKMNlsbCb2BlH360RMm1JyOb0GhM915ETQVE',
    access_token_key: '', // parse from req
    access_token_secret: '' // parse from req
    
    oauth_token
    
    client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response){
      if(error) throw error;
      console.log(tweet);  // Tweet body. 
      console.log(response);  // Raw response object. 
    });
    
*/


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connected to db');
});



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Database app listengin", addr.address + ":" + addr.port);
});
