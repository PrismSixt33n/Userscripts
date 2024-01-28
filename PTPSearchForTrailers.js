// ==UserScript==
// @name     Search Youtube for trailers on PTP by Prism16
// @author   Prism16
// @version  1
// @grant    none
// @match    https://passthepopcorn.me/torrents.php*
// @description  Search youtube for trailer
// @icon        https://passthepopcorn.me/favicon.ico
// @require 11
// @run-at document-start
// ==/UserScript==

window.addEventListener('load', function() {
    var menu = document.querySelector("#content > div > div.linkbox");

    var newLink = document.createElement("a");
    newLink.textContent = "[Trailer Search]";
    newLink.href = "#";
    newLink.className = "linkbox_link";

    newLink.addEventListener('click', function(e) {
        e.preventDefault();
        var movieName = document.querySelector("#content > div > h2").innerText;
        movieName = movieName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        movieName = movieName.replace(/\s+/g,"+");
        movieName = movieName + "+trailer";
        var youtubeURL = 'https://www.youtube.com/results?search_query=' + movieName;
        window.open(youtubeURL, '_blank');
    });

    menu.appendChild(newLink);
}, false);
