// ==UserScript==
// @name         BTN Parental Helper
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Brings IMDB Parental Notes To BTN
// @author       Prism16
// @match        https://broadcasthe.net/series.php?id=*
// @icon         https://broadcasthe.net/favicon.ico
// @require      https://cdn.jsdelivr.net/gh/sizzlemctwizzle/GM_config@43fd0fe4de1166f343883511e53546e87840aeaf/gm_config.js
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @grant        GM.xmlHttpRequest
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.openInTab
// @grant        GM.notification
// @grant        GM.registerMenuCommand
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    function getImdbParentalGuide(imdbUrl) {
        GM_xmlhttpRequest({
            method: "GET",
            url: imdbUrl,
            onload: function(response) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(response.responseText, "text/html");
                var advisoryDiv = document.createElement('div');

                var sexnudityTitle = doc.querySelector('#advisory-nudity > h4');
            var sexnudityStatus = doc.querySelector('#advisory-nudity > ul > li > div > label > div.ipl-swapper__content.ipl-swapper__content-primary > div > span');
            var sexnudityText = doc.querySelector('#advisory-nudity > ul > li.ipl-zebra-list__item');
                    if (sexnudityTitle) {
            advisoryDiv.appendChild(sexnudityTitle);}
                    if (sexnudityStatus) {
            advisoryDiv.appendChild(sexnudityStatus);}
                    if (sexnudityText) {
            advisoryDiv.appendChild(sexnudityText);}

            var violencegoreTitle = doc.querySelector('#advisory-violence > h4');
            var violencegoreStatus = doc.querySelector('#advisory-violence > ul > li > div > label > div.ipl-swapper__content.ipl-swapper__content-primary > div > span');
            var violencegoreText = doc.querySelector('#advisory-violence > ul > li.ipl-zebra-list__item');
                    if (violencegoreTitle) {
            advisoryDiv.appendChild(violencegoreTitle);}
                    if (violencegoreStatus) {
            advisoryDiv.appendChild(violencegoreStatus);}
                    if (violencegoreText) {
            advisoryDiv.appendChild(violencegoreText);}

            var profanityTitle = doc.querySelector('#advisory-profanity > h4');
            var profanityStatus = doc.querySelector('#advisory-profanity > ul > li > div > label > div.ipl-swapper__content.ipl-swapper__content-primary > div > span');
            var profanityText = doc.querySelector('#advisory-profanity > ul > li.ipl-zebra-list__item');
                    if (profanityTitle) {
            advisoryDiv.appendChild(profanityTitle);}
                    if (profanityStatus) {
            advisoryDiv.appendChild(profanityStatus);}
                    if (profanityText) {
            advisoryDiv.appendChild(profanityText);}

            var alcoholdrugsTitle = doc.querySelector('#advisory-alcohol > h4');
            var alcoholdrugsStatus = doc.querySelector('#advisory-alcohol > ul > li > div > label > div.ipl-swapper__content.ipl-swapper__content-primary > div > span');
            var alcoholdrugsText = doc.querySelector('#advisory-alcohol > ul > li.ipl-zebra-list__item');
                    if (alcoholdrugsTitle) {
            advisoryDiv.appendChild(alcoholdrugsTitle);}
                    if (alcoholdrugsStatus) {
            advisoryDiv.appendChild(alcoholdrugsStatus);}
                    if (alcoholdrugsText) {
            advisoryDiv.appendChild(alcoholdrugsText);}

            var frighteningTitle = doc.querySelector('#advisory-frightening > h4');
            var frighteningStatus = doc.querySelector('#advisory-frightening > ul > li > div > label > div.ipl-swapper__content.ipl-swapper__content-primary > div > span');
            var frighteningText = doc.querySelector('#advisory-frightening > ul > li.ipl-zebra-list__item');
                    if (frighteningTitle) {
            advisoryDiv.appendChild(frighteningTitle);}
                    if (frighteningStatus) {
            advisoryDiv.appendChild(frighteningStatus);}
                    if (frighteningText) {
            advisoryDiv.appendChild(frighteningText);}

                var mainColumn = document.querySelector('div.sidebar');
                var boxDiv = document.createElement('div');
                boxDiv.className = 'box';
                var headDiv = document.createElement('div');
                headDiv.className = 'head';
                headDiv.textContent = 'IMDB Parental Guide';
                headDiv.style.fontWeight = 'bold';
                var notesDiv = document.createElement('div');
                notesDiv.id = 'parentalnotes';
                boxDiv.appendChild(headDiv);
                boxDiv.appendChild(notesDiv);
                mainColumn.insertBefore(boxDiv, mainColumn.children[2]);

                notesDiv.appendChild(advisoryDiv);
                var selectors = ['div.ipl-hideable-container', '.ipl-hideable-container--hidden', '.ipl-zebra-list__action-row'];
                selectors.forEach(function(selector) {
                var elements = document.querySelectorAll(selector);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'none';
                }
            });
                var elements = document.querySelectorAll('h4.ipl-list-title');
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.marginBottom = '0';
                }
            var mildStatuses = document.querySelectorAll('.ipl-status-pill--ok');
            mildStatuses.forEach(function(status) {
                status.style.color = '#c5e197';
            });

            var warningStatuses = document.querySelectorAll('.ipl-status-pill--warning');
            warningStatuses.forEach(function(status) {
                status.style.color = '#fbca8c';
            });

            var criticalStatuses = document.querySelectorAll('.ipl-status-pill--critical');
            criticalStatuses.forEach(function(status) {
                status.style.color = '#ffb3ad';
            });
            }
        });
    }

    function searchShow() {
        let titleElement = document.querySelector("head > title");
        if (titleElement) {
            let titleText = titleElement.textContent;
            let index = titleText.lastIndexOf(" :: BroadcasTheNet");
            if (index !== -1) {
                titleText = titleText.substring(0, index);
            }

            let apiKey = '';
            if (!apiKey || apiKey.trim() === '') {
                GM.notification("Please Add TMDB API Key On Line 133", "BTN Parental Helper");
                console.log('No API Key. Stopping script.');
                return;
            }
            let showName = titleText;
            showName = showName.split('[')[0];
            showName = showName.trim();
            showName = showName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            showName = showName.replace(/\s+/g,"+");
            var xhr = new XMLHttpRequest();
            let url = 'https://api.themoviedb.org/3/search/tv?api_key=' + apiKey + '&query=' + showName;
            console.log("API call: " + url);
            xhr.open('GET', url);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText);
                    if (response.results && response.results.length > 0) {
                        let showId = response.results[0].id;
                        let xhr2 = new XMLHttpRequest();
                        let url2 = 'https://api.themoviedb.org/3/tv/' + showId + '/external_ids?api_key=' + apiKey;
                        console.log("API call: " + url2);
                        xhr2.open('GET', url2);
                        xhr2.onload = function() {
                            if (xhr2.status === 200) {
                                let response = JSON.parse(xhr2.responseText);
                                if (response.imdb_id) {
                                    let imdbUrl = 'https://www.imdb.com/title/' + response.imdb_id + '/parentalguide';
                                    getImdbParentalGuide(imdbUrl);
                                }
                            }
                        };
                        xhr2.send();
                    }
                }
            };
            xhr.send();
        } else {
            console.log("Title element not found");
        }
    }
    searchShow();
})();
