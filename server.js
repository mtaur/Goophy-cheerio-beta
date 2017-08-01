/* Showing Mongoose's "Populated" Method (18.3.8)
 * INSTRUCTOR ONLY
 * =============================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");



var googleSearch = require('./nightmare.js');




/*const imageDL = require("image-downloader");
const options = {
    url: 'http://i.imgur.com/FnC28.gif',
    dest: './public/images/wharrgarbl.gif'                  // Save to /path/to/dest/image.jpg
};

imageDL.image(options)
    .then(({ filename, image }) => {
    console.log('File saved to', filename)
}).catch((err) => {
    throw err
});*/


/*
//var jQuery = require('jquery');
var jsdom = require('jsdom');*/



// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

var timeout = require('connect-timeout'); //express v4

app.use(timeout(120000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
    if (!req.timedout) next();
}

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
//mongoose.connect("mongodb://localhost/week18day3mongoose");
mongoose.connect("mongodb://heroku_9dnr272d:eqcj56l2npni9ute2k3sfcjdp8@ds037272.mlab.com:37272/heroku_9dnr272d");
//mongoose.connect("mongodb://localhost/week18day3mongoose");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


var images = [];

// Routes
// ======

// A GET request to Nightmare scrape Google images
app.get("/search/:str?", function(req, res) {

    var searchQuery = 'wharrgarbl';

    if (req.params.str) {
        searchQuery = req.params.str;
    }

    var j = 4;

    var url1 = 'https://www.google.com/search?q=' + searchQuery + '&tbm=isch&tbs=itp:animated&safe=active';
//    var url1 = 'https://www.google.com/search?q=' + searchQuery + '&site=imghp&tbm=isch&source=lnt&tbs=itp:animated&sa=X&ved=0ahUKEwjep_bhipnVAhWGMz4KHVP3A2IQpwUIHw&biw=1900&bih=1129&dpr=1.58'; //'&tbm=isch&tbs=itp:animated';

//    googleSearch('star+craft+remaster');
    googleSearch(url1, function(){res.redirect('/');});

    }
);

/*    request(url1, function(error, response, html) {



        var $ = cheerio.load(html);



           for(var j=0; j<40; j++) {

               var thing1 = $($('body').find('tr')[j]);

               for(var i=0; i<10; i++) {
                   if (thing1) {
                       var thing = $(thing1.find('a')[i]).attr('href');
                       if (thing && thing.search('http') > 0) {
                            // var result = 'http://www.google.com/imgres?imgurl'+thing;
                           // console.log('http://www.google.com/imgres?imgurl'+thing);
                           var result = thing.slice(thing.indexOf('h'), thing.indexOf('&'));
                          console.log(thing.slice(thing.indexOf('h'), thing.indexOf('&')));
//                           console.log(inception('http://www.google.com'+thing));
                           inception(result);
                       }
                   }
               }
           }

        res.send(html);

//        console.log($(dom.window.document).find('tr').find('a').attr('href'));

//        console.log($($(html).find('a .rg_l')[30]).attr('href'));

//        for(var j=0; j<100; j++) {
//            console.log($($(html).find('.rg_bx.rg_di.rg_el.ivg-i')[j]).find('a').attr('href'));
//              console.log($($(html).find('.rg_l')[j]).find('a').attr('href'));
//        }


    //  }



    /!*
    // First, we grab the body of the html with request
    request("http://www.echojs.com/", function(error, response, html) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(html);
      // Now, we grab every h2 within an article tag, and do the following:
      $("article h2").each(function(i, element) {

        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this).children("a").text();
        result.link = $(this).children("a").attr("href");

        // Using our Article model, create a new entry
        // This effectively passes the result object to the entry (and the title and link)
        var entry = new Article(result);

        // Now, save that entry to the db
        entry.save(function(err, doc) {
          // Log any errors
          if (err) {
            console.log(err);
          }
          // Or log the doc
          else {
            console.log(doc);
          }
        });

      });
    });
    // Tell the browser that we finished scraping the text
    res.send("Scrape Complete");*!/

/!*        console.log(result);
        console.log(result);
        console.log(result);
        console.log(result);
        console.log(result);
        console.log(result);
        console.log(result);
        console.log(result);
        console.log(result);
        console.log(result);
        console.log(result);
        res.send('Minotaur?');*!/

//    res.send('Minotaur?');

});
});


function inception(url) {

//    var imgs = images;
    console.log(images, 'images!!!!!!!!!!!!!!!');

    request(url, function(error, response, html) {
        if(error) {return error}

        console.log('url received:',url);
        var jq = cheerio.load(html);
//        console.log('img tag:',jq('img'));
        console.log(jq('body').find('img').attr('src'));

//        jq('body').find('img').each( function(index,data){console.log( index,data.attribs.src,'in a loop.')} )

        jq('body').find('img').each( function(index,data) {
            var newThing = data.attribs.src;
            console.log(index, data.attribs.src, 'in a loop.')
            if (images.indexOf(newThing) == -1) {
                images.push(newThing);
            }
        });

        if(images.indexOf(jq('img').attr('src'))==-1){images.push(jq('img').attr('src'));}

        //        console.log(images[0],'images[0]');


        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = 'image'+(images.length - 1);
        result.link = images[images.length -1]; //$(this).children("a").attr("href");

        // Using our Article model, create a new entry
        // This effectively passes the result object to the entry (and the title and link)
        var entry = new Article(result);

        // Now, save that entry to the db
        entry.save(function(err, doc) {
            // Log any errors
            if (err) {
                console.log(err);
            }
            // Or log the doc
            else {
                console.log(doc);
            }
        });


    });
}*/


// This will get the articles we scraped from the mongoDB
app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({})
    .populate("note")
    .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

// Grab an article by it's ObjectId
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.findOne({ "_id": req.params.id })
  // ..and populate all of the notes associated with it
  .populate("note")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});


// Create a new note or replace an existing note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  var newNote = new Note(req.body);

  // And save the new note the db
  newNote.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the article id to find and update it's note
      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
      // Execute the above query
      .exec(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
          res.send(doc);
        }
      });
    }
  });
});


// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("App running on port 3000!");
});
