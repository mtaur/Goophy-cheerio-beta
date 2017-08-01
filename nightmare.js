

/*const imageDL = require("image-downloader");
const options = {
    url: 'http://i.imgur.com/FnC28.gif',
    dest: './public/images/wharrgarbl.gif'                  // Save to /path/to/dest/image.jpg
};*/

var Article = require('./models/Article.js');

/////
function googleScrape(searchStr,callback) {


    var Nightmare = require('nightmare');
    var nightmare = Nightmare({ show: true, height: 900, width: 1600 });

    var jq = require('cheerio');
//    var searchQuery ='wharrgarbl';



/*    const imageDL = require("image-downloader");
    const options = {
        url: 'http://i.imgur.com/FnC28.gif',
        dest: './public/images/wharrgarbl.gif'                  // Save to /path/to/dest/image.jpg
    };

    imageDL.image(options)
        .then(({ filename, image }) => {
            console.log('File saved to', filename)
        }).catch((err) => {
        throw err
    });    */

/*    function loop(nm,j){

        return nm.click('rg_ic[scrapeID="num'+j+'"]')
            .wait(2000)
            .evaluate (function(){
                arr.push($('irc_mi')[1]);
            })

    }*/

    var arr = [];
    var ind = 0;

/*    Nightmare.action('store', function (done) {
        this.evaluate_now(function(inpt) {
            inpt.push($('.irc_ic')[1].src);
            return {};
        }, done)
    });*/

    function getPic(index) {
        nightmare.click('.rg_ic[scrapeID="num'+index+'"]')
            .wait(500)
            .evaluate(function(arr)
                {
                    for(var i=0; i<2; i++)
                        {
                            var imgSel = $('.irc_mi');
                            if(arr.indexOf(imgSel[i].src) == -1 && imgSel[i].src !='') {arr.push(imgSel[i].src);}
                        }
                    return arr;
                }, arr).then(function(result)
                    {
                        arr=result;
                        ind++;
                        if(arr.length<20) {getPic(ind);}
                        else {

                            for(var j=0; j<arr.length; j++) {
                                // Save an empty result object
                                var result = {};

                                // Add the text and href of every link, and save them as properties of the result object
                                result.title = 'image' + j;
                                result.link = arr[j]; //$(this).children("a").attr("href");

                                // Using our Article model, create a new entry
                                // This effectively passes the result object to the entry (and the title and link)
                                var entry = new Article(result);

                                // Now, save that entry to the db
                                entry.save(function (err, doc) {
                                    // Log any errors
                                    if (err) {
                                        console.log(err);
                                    }
                                    // Or log the doc
                                    else {
                                        console.log(doc);
                                    }
                                });
                            }

                            console.log(arr);
                            nightmare.end().then(function (result) {
                                console.log('I always let the wookie win... -C-3PO');
                            })
                            .catch(function (error) {
                                    console.error('Search failed:', error);
                                });
                            callback();

                        }
                    });
    }

    nightmare
        .goto(searchStr)
        // .goto('https://www.google.com/search?q=' + searchTerm + '&tbm=isch&tbs=itp:animated')
        .inject('js', './public/jquery.min.js')
        .wait('.rg_ic').wait(2000)
        .evaluate(function(){
            for(var i=0; i<50; i++)
                    {$('.rg_ic').eq(i).attr('scrapeID','num'+i);}
            }
        ).then(function(){getPic(0);});

/*        .click('.rg_ic[scrapeID="num0"]')*/
/*        .wait(2000)*/
/*        .store(arr)*/
/*        .evaluate (function(arr){
                arr.push($('.irc_mi')[1].src);
                return arr;
            },arr).then(function(result){arr = result;})*/
/*        .then(getPic(0))*/

/*        .then( function() {

            nightmare.click('.rg_ic[scrapeID="num1"]')
                .wait(2000)
                .evaluate(function (arr) {
                    arr[1] = ($('.irc_mi')[1].src);
                }, arr)
                .click('.rg_ic[scrapeID="num2"]')
                .wait(2000)
                .evaluate(function (arr) {
                    arr[2] = ($('.irc_mi')[1].src);
                }, arr)
                .click('.rg_ic[scrapeID="num3"]')
                .wait(2000)
                .evaluate(function (arr) {
                    arr[3] = ($('.irc_mi')[1].src);
                }, arr)
                .click('.rg_ic[scrapeID="num4"]')
                .wait(2000)
                .evaluate(function (arr) {
                    arr[4] = ($('.irc_mi')[1].src);
                }, arr)
                .click('.rg_ic[scrapeID="num5"]')
                .wait(2000)
                .evaluate(function (arr) {
                    arr[5] = ($('.irc_mi')[1].src);
                }, arr)
                .click('.rg_ic[scrapeID="num6"]')
                .wait(2000)
                .evaluate(function (arr) {
                    arr[6] = ($('.irc_mi')[1].src);
                }, arr)
                .click('.rg_ic[scrapeID="num7"]')
                .wait(2000)
                .evaluate(function (arr) {
                    arr[7] = ($('.irc_mi')[1].src);
                }, arr)
                .click('.rg_ic[scrapeID="num8"]')
                .wait(2000)
                .evaluate(function (arr) {
                    arr[8] = ($('.irc_mi')[1].src);
                }, arr)
                .click('.rg_ic[scrapeID="num9"]')
                .wait(2000)
                .evaluate(function (arr) {
                    arr[9] = ($('.irc_mi')[1].src);
                }, arr)
                .click('.rg_ic[scrapeID="num10"]')
                .wait(2000)
                .evaluate(function (arr) {
                    arr[10] = ($('.irc_mi')[1].src);
                    return arr;
                }, arr)
                .end()
                .then(function (result) {
                    console.log(arr);
                })
                .catch(function (error) {
                    console.error('Search failed:', error);
                })
                /!*

                        .then( function(result)
                                { console.log('img.irc_mi'); }
                            )
                *!/

                /!*    .click(".btn-lg")
                    .wait('button[btn-name="login"]')
                    .type('input#name', null)
                    .insert('input#name', 'C-3PO')
                    .type('input#game', null)
                    .insert('input#game', 'game2')
                    .click('button[btn-name="login"]')
                    ///one loop
                    .wait('button')
                    .wait(MAXWAIT*Math.random())
                    .wait('button')
                    .click('button')
                    ///one loop
                    .wait('button')
                    .wait(MAXWAIT*Math.random())
                    .wait('button')
                    .click('button')
                    .wait('button')
                    .wait(MAXWAIT*Math.random())
                    .wait('button')
                    .click('button')
                    .wait('button')
                    .wait(MAXWAIT*Math.random())
                    .wait('button')
                    .click('button')
                    .wait('button')
                    .wait(MAXWAIT*Math.random())
                    .wait('button')
                    .click('button')
                    .wait('button')
                    .wait(MAXWAIT*Math.random())
                    .wait('button')
                    .click('button')*!/

                .then(function (result) {
                    console.log('I always let the wookie win... -C-3PO');
                })
                .catch(function (error) {
                    console.error('Search failed:', error);
                });
        });*/
}

module.exports = googleScrape;

