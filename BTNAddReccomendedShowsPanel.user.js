// ==UserScript==
// @name         Add Similar Shows to BTN Pages
// @version      1
// @description  Add Trending Shows to BTN Homepage
// @author       Prism16
// @match        https://broadcasthe.net/series.php?*
// @icon         https://broadcasthe.net/favicon.ico
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    let tmdbApiKey = '######################';
    let title = document.querySelector("head > title").innerText.replace(" :: BroadcasTheNet", "");

    let searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${tmdbApiKey}&query=${encodeURIComponent(title)}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                let series_id = data.results[0].id;
                let url = `https://api.themoviedb.org/3/tv/${series_id}/recommendations?api_key=${tmdbApiKey}&language=en-US`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        var mainColumn = document.querySelector('div.sidebar');
                        var boxDiv = document.createElement('div');
                        boxDiv.className = 'box';
                        var headDiv = document.createElement('div');
                        headDiv.className = 'head';
                        headDiv.textContent = 'TMDB Recommended Shows';
                        headDiv.style.fontWeight = 'bold';
                        headDiv.style.cursor = 'pointer';
                        var notesDiv = document.createElement('div');
                        notesDiv.id = 'recommendedshows';
                        notesDiv.style.display = 'none';
                        var list = document.createElement('ol');
                        notesDiv.appendChild(list);
                        boxDiv.appendChild(headDiv);
                        boxDiv.appendChild(notesDiv);
                        mainColumn.insertBefore(boxDiv, mainColumn.children[1]);

                        headDiv.addEventListener('click', function() {
                            notesDiv.style.display = notesDiv.style.display === 'none' ? 'block' : 'none';
                        });

                        data.results.forEach(series => {
                            var listItem = document.createElement('li');
                            var link = document.createElement('a');
                            link.href = `https://broadcasthe.net/series.php?name=${encodeURIComponent(series.name)}`;
                            link.textContent = series.name;
                            listItem.appendChild(link);
                            list.appendChild(listItem);
                        });
                    })
                    .catch(error => console.error('Error:', error));
            }
        })
        .catch(error => console.error('Error:', error));
})();
