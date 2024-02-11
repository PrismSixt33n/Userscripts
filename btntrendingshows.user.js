// ==UserScript==
// @name         Add Trending Shows to BTN Homepage
// @version      1
// @description  Add Trending Shows to BTN Homepage
// @author       Prism16
// @match        https://broadcasthe.net/index.php
// @icon         https://broadcasthe.net/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let tmdbApiKey = '######################';

    function fetchTrendingShows() {
        let url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${tmdbApiKey}&language=en-US`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                let trendingShows = data.results.slice(0, 7);
                return trendingShows;
            })
            .catch(error => console.error('Error:', error));
    }

    function fetchShowDetails(show) {
        let showDetailsUrl = `https://api.themoviedb.org/3/tv/${show.id}?api_key=${tmdbApiKey}`;

        return fetch(showDetailsUrl)
            .then(response => response.json())
            .catch(error => console.error('Error:', error));
    }

    function panelBuilder() {
        var mainColumn = document.querySelector("#content > div.thin > div.main_column");

        var boxDiv = document.createElement('div');
        boxDiv.className = 'box';
        boxDiv.style.display = 'flex';
        boxDiv.style.flexWrap = 'wrap';
        boxDiv.style.justifyContent = 'space-between';

        var headDiv = document.createElement('div');
        headDiv.className = 'head';
        headDiv.textContent = 'Trending Shows From TMDB';
        headDiv.style.fontWeight = 'bold';
        headDiv.style.fontSize = '1rem';
        headDiv.style.width = '100%';
        boxDiv.appendChild(headDiv);

        fetchTrendingShows().then(trendingShows => {
            for (let show of trendingShows) {
                fetchShowDetails(show).then(showData => {
                    let posterUrl = `https://media.themoviedb.org/t/p/w440_and_h660_face${showData.poster_path}`;

                    var showDiv = document.createElement('div');
                    showDiv.style.width = '12%';
                    showDiv.style.margin = '1%';
                    var img = document.createElement('img');
                    img.src = posterUrl;
                    img.style.width = '100%';
                    var nameDiv = document.createElement('div');
                    nameDiv.textContent = showData.name;
                    nameDiv.style.textAlign = 'center';
                    nameDiv.style.cursor = 'pointer';
                    nameDiv.onclick = function() {
                        window.location.href = `https://broadcasthe.net/series.php?name=${encodeURIComponent(showData.name)}`;
                    };
                    showDiv.appendChild(img);
                    showDiv.appendChild(nameDiv);
                    boxDiv.appendChild(showDiv);
                });
            }
        });
        mainColumn.insertBefore(boxDiv, mainColumn.firstChild);
    }

    panelBuilder();
})();
