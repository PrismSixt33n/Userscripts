// ==UserScript==
// @name         Fanart.tv API Additions
// @version      1
// @grant        GM_xmlhttpRequest
// @grant        GM.notification
// @match        https://passthepopcorn.me/torrents.php*
// @description  Adds additional artwork to PTP from the Fanart.tv API
// @icon        https://passthepopcorn.me/favicon.ico
// @author       Prism16
// ==/UserScript==

let apiKey = '';
var fanartapiKey = "";
(function() {
    'use strict';
window.addEventListener('load', function() {
    var movieName = document.querySelector("#content > div > h2").innerText;
    movieName = movieName.split('[')[0];
    movieName = movieName.trim();
    movieName = movieName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    movieName = movieName.replace(/\s+/g,"+");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + movieName);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.results && response.results.length > 0) {
            var movieId = response.results[0].id;
            var url = "https://webservice.fanart.tv/v3/movies/" + movieId + "?api_key=" + fanartapiKey;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    var englishArtwork = data.moviebanner.filter(artwork => artwork.lang === "en");

                    if (englishArtwork && englishArtwork.length > 0) {
                        var bannerUrl = englishArtwork[0].url;
                        var newPanel2 = document.createElement('div');
                        newPanel2.className = 'panel';
                        newPanel2.id = 'banner_panel';
                        var panelHeading2 = document.createElement('div');
                        panelHeading2.className = 'panel__heading';
                        var title2 = document.createElement('span');
                        title2.className = 'panel__heading__title';
                        var fanarttv2 = document.createElement('span');
                        fanarttv2.style.color = '#50C2BF';
                        fanarttv2.textContent = 'Fanart.tv';
                        title2.appendChild(fanarttv2);
                        title2.appendChild(document.createTextNode(' Banner'));
                        panelHeading2.appendChild(title2);
                        newPanel2.appendChild(panelHeading2);
                        var panelBody2 = document.createElement('div');
                        panelBody2.className = 'panel__body';
                        panelBody2.style.position = 'relative';
                        var bannerImg = document.createElement('img');
                        bannerImg.src = bannerUrl;
                        bannerImg.style.height = 'auto';
                        bannerImg.style.width = '100%';
                        panelBody2.appendChild(bannerImg);
                        newPanel2.appendChild(panelBody2);
                        var sidebar2 = document.querySelector('div.sidebar');
                        sidebar2.insertBefore(newPanel2, sidebar2.childNodes[4]);
                    } else {
                        console.log("No English language movie banner found for this movie.");
                    }
if (data.hdmovielogo && data.hdmovielogo.length > 0) {
    var englishArtwork2 = data.hdmovielogo.filter(artwork => artwork.lang === "en");

    if (englishArtwork2 && englishArtwork2.length > 0) {
        var logoUrl = englishArtwork2[0].url;
        var newPanel = document.createElement('div');
        newPanel.className = 'panel';
        newPanel.id = 'parents_guide';
        var panelHeading = document.createElement('div');
        panelHeading.className = 'panel__heading';
        var title = document.createElement('span');
        title.className = 'panel__heading__title';
        var fanarttv = document.createElement('span');
        fanarttv.style.color = '#50C2BF';
        fanarttv.textContent = 'Fanart.tv';
        title.appendChild(fanarttv);
        title.appendChild(document.createTextNode(' Logo'));
        panelHeading.appendChild(title);
        newPanel.appendChild(panelHeading);
        var panelBody = document.createElement('div');
        panelBody.className = 'panel__body';
        panelBody.style.position = 'relative';
        var logoImg = document.createElement('img');
        logoImg.src = logoUrl;
        logoImg.style.width = '100%';
        panelBody.appendChild(logoImg);
        newPanel.appendChild(panelBody);
        var sidebar = document.querySelector('div.sidebar');
        sidebar.insertBefore(newPanel, sidebar.childNodes[4]);
    } else {
        console.log("No English language HD movie logo found for this movie.");
    }
} else {
    console.log("No HD movie logo found for this movie.");
                        }
                    })
                    .catch(error => console.error("Error:", error));
            } else {
                console.log("No results found for this movie.");
            }
        }
    };
    xhr.send();
});
})();
