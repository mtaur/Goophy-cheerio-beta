# Goophy-cheerio-beta
Giphy with better search terms!  Powered by Google!

## Deprecated
See Goophy for a more powerful version using npm Nightmare.

## Why so many bad results?
Essentially, I used npm Cheerio (jQuery) to scrape a "JavaScriptless" version of a Google Images search.  Then I scraped each page in the search result for images.  Then I returned all of these images, one of which may be the animated gif of the actual search result.  Relative path mangling and the presence of additional images of the page interfere with the accuracy, so the user is forced to search for the proverbial needle in the haystack.
