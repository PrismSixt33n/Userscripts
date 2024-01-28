// ==UserScript==
// @name         PTP Parental Guidance Helper
// @namespace    Prism16
// @version      1
// @description  Add IMDB Parental Guidance Notes Onto PTP
// @author       Prism16
// @match        https://passthepopcorn.me/torrents.php*
// @icon        https://passthepopcorn.me/favicon.ico
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
;
    var link = document.querySelector("a#imdb-title-link.rating");
    var imdbUrl = link.getAttribute("href");
    var advisoryDiv = document.createElement('div');
    imdbUrl += "parentalguide";

    var newPanel = document.createElement('div');
    newPanel.className = 'panel';
    newPanel.id = 'parents_guide';
    var panelHeading = document.createElement('div');
    panelHeading.className = 'panel__heading';
    var title = document.createElement('span');
    title.className = 'panel__heading__title';

    var imdb = document.createElement('span');
    imdb.style.color = '#F2DB83';
    imdb.textContent = 'iMDB';

    title.appendChild(imdb);
    title.appendChild(document.createTextNode(' Parental Notes'));

    panelHeading.appendChild(title);
    newPanel.appendChild(panelHeading);
    var panelBody = document.createElement('div');
    panelBody.className = 'panel__body';
    panelBody.style.position = 'relative';
    panelBody.appendChild(advisoryDiv);
    newPanel.appendChild(panelBody);
    var sidebar = document.querySelector('div.sidebar');
    sidebar.insertBefore(newPanel, sidebar.childNodes[4]);

    GM_xmlhttpRequest({
        method: "GET",
        url: imdbUrl,
        onload: function(response) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(response.responseText, "text/html");

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

            var elements = document.querySelectorAll('h4.ipl-list-title');
            elements.forEach(function(element) {
                element.style.marginBottom = '0';
});
            var elements2 = document.querySelectorAll('h4.ipl-list-title');
            if (elements2.length > 0) {
                elements2[0].style.marginTop = '0';
}
            var elementsred = document.querySelectorAll('h4.ipl-list-title');
            elementsred.forEach(function(element) {
                element.style.color = '#F2DB83';
});
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
            var selectors = ['div.ipl-hideable-container', '.ipl-hideable-container--hidden', '.ipl-zebra-list__action-row'];
            selectors.forEach(function(selector) {
                var elements = document.querySelectorAll(selector);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'none';
    }

                var advisoryDiv = document.getElementById("advisoryDiv");
                var panelBody = document.querySelector(".panel__body");
                panelBody.appendChild(advisoryDiv);
                advisoryDiv.className = 'advisory__body';

});
        }
    });
})();
