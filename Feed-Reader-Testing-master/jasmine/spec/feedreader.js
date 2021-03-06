/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each have defined non-empty URL', function() {
           for(var i = 0; i < allFeeds.length; i++) {
              expect(allFeeds[i].url).toBeDefined();
              expect(allFeeds[i].url.length).not.toBe(0);
            }
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each have defined non-empty name', function() {
           for(var i = 0; i < allFeeds.length; i++) {
              expect(allFeeds[i].name).toBeDefined();
              expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });

    describe('The menu', function() {
        // Add a matcher from a Jasmine extention jasmine-jquery: https://github.com/velesin/jasmine-jquery
        beforeEach(function () {
          jasmine.addMatchers({
            toHaveClass: function () {
              return  {
                compare: function (actual, className) {
                  return { pass: $(actual).hasClass(className) }
                }
              }
            }
          });
        });
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('element is hidden by default', function() {
           expect($('body')).toHaveClass('menu-hidden');
         });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
         it('displays when clicked and hides when clicked again', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body')).not.toHaveClass('menu-hidden');
            menuIcon.click();
            expect($('body')).toHaveClass('menu-hidden');
         });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         it('can be loaded', function() {
           expect($('.feed .entry').length).not.toBeLessThan(1);
         });
    });

    describe('New Feed Selection', function() {
        var feedContent, newFeedContent;

        beforeEach(function(done) {
            // save original content
            loadFeed(0, function() {
            feedContent = $('.feed').children().text();
            // call loadFeed again and save new content
            loadFeed(1, function() {
              newFeedContent = $('.feed').children().text();
              done();
            });
        });
        });
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         it('changes content', function() {
           //console.log("0: ",feedContent);
           //console.log("1: ",newFeedContent);
           expect(newFeedContent).not.toBe(feedContent);
         });
    });
}());
