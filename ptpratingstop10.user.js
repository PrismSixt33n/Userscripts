// ==UserScript==
// @name         PTP Ratings on the top10 and bookmark pages
// @version      1.1
// @description  Fetch movie ratings from linked pages
// @author       Prism16
// @match        https://passthepopcorn.me/top10.php*
// @match        https://passthepopcorn.me/bookmarks.php*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function() {
        var movieDivs = $('.cover-movie-list__movie.js-movie-tooltip-triggerer');
        var index = 0;
        function processMovie() {
            if (index >= movieDivs.length) return;
            var movieDiv = $(movieDivs[index]);
            var link = movieDiv.find('a').attr('href');
            var title = movieDiv.find('.cover-movie-list__movie__title').text();
            var userRating = GM_getValue(title);
            if (userRating) {
                movieDiv.find('.cover-movie-list__movie__rating').text(userRating);
                index++;
                processMovie();
            } else {
                $.get(link, function(response) {
                    var html = $.parseHTML(response);
                    userRating = $(html).find('#user_rating').text();
                    GM_setValue(title, userRating);
                    movieDiv.find('.cover-movie-list__movie__rating').text(userRating);
                    index++;
                    processMovie();
                });
            }
        }
        processMovie();
    });
})();
