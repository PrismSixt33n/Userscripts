// ==UserScript==
// @name         PTP Ratings on the top10 and bookmark pages
// @version      0.1
// @description  Fetch movie ratings from linked pages
// @author       Prism16
// @match        https://passthepopcorn.me/top10.php*
// @match        https://passthepopcorn.me/bookmarks.php*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $(document).ready(function() {
        // Select all the movie divs
        $('.cover-movie-list__movie.js-movie-tooltip-triggerer').each(function() {
            var movieDiv = $(this);
            var link = movieDiv.find('a').attr('href');

            // Fetch the page
            $.get(link, function(response) {
                var html = $.parseHTML(response);
                var userRating = $(html).find('#user_rating').text();

                // Replace the rating in the movie div
                movieDiv.find('.cover-movie-list__movie__rating').text(userRating);
            });
        });
    });

})();
