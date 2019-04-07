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

      /*
       * A test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
        allFeeds.forEach(feed => {
           it('feed should have an url', function() {
               expect(feed.url).toBeDefined();
               expect(feed.url.trim()).not.toBe('');
             }
           );
        });

      /* A test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
      allFeeds.forEach(feed => {
        it('feed should have a name', function() {
            expect(feed.name).toBeDefined();
            expect(feed.name.trim()).not.toBe('');
          }
        ) ;
      });
    });

    describe('The menu', function() {

      /* A test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
        it('menu should be hidden by default', function() {
          expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

      /* A test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('menu should toggle properly', function() {
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden')).toBeFalsy();
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {

      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      /* Ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      it('feed should have at least one entry', function(done) {
        expect($('.feed .entry').length).toBeGreaterThan(0);
        done();
      });
    });

    describe('New Feed Selection', function() {
      let feedContent;

      beforeEach(function(done) {
        loadFeed(0, function() {
          feedContent = $('.feed')[0].innerHtml;

          loadFeed(1, function() {
            done();
          });
        });
      });

      /* Ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      it('feed content should change', function(done) {
        expect(feedContent).not.toBe($('.feed')[0].innerHTML);
        done();
      });
    })

}());
