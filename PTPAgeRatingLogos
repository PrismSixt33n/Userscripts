// ==UserScript==
// @name         PTP Age Ratings Logos
// @version      1
// @description  Adda age rating logos for uk movie cerifications on passthepopcorn
// @author       Prism16
// @match        https://passthepopcorn.me/torrents.php*
// @icon         https://www.palacemalton.info/content/images/cert_18.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var certElement = document.querySelector('#certification');
    var textContent = certElement.textContent;
    var imgElement = document.createElement('img');
    var certification = textContent.slice(textContent.lastIndexOf(':') + 1);
    var movieInfoElement = document.querySelector("#movieinfo");

    function ukRatings(certification) {
        if (certification.includes('PG')) {
            imgElement.src = 'https://www.palacemalton.info/content/images/cert_pg.png';
        } else if (certification.includes('U')) {
            imgElement.src = 'https://www.palacemalton.info/content/images/cert_u.png';
        } else if (certification.includes('12')) {
            imgElement.src = 'https://www.palacemalton.info/content/images/cert_12.png';
        } else if (certification.includes('15')) {
            imgElement.src = 'https://www.palacemalton.info/content/images/cert_15.png';
        } else if (certification.includes('18')) {
            imgElement.src = 'https://www.palacemalton.info/content/images/cert_18.png';
        }
    }
    function usRatings(certification) {
        if (certification.includes('PG-13')) {
            imgElement.src = 'https://static.wikia.nocookie.net/rating-system/images/c/cb/MPA_PG-13.svg';
        } else if (certification.includes('PG')) {
            imgElement.src = 'https://static.wikia.nocookie.net/rating-system/images/8/8e/MPA_PG.svg';
        } else if (certification.includes('TV-14')) {
            imgElement.src = 'https://static.wikia.nocookie.net/rating-system/images/8/8e/MPA_PG-13.svg';
        } else if (certification.includes('G')) {
            imgElement.src = 'https://static.wikia.nocookie.net/rating-system/images/2/22/MPA_G.svg';
        } else if (certification.includes('R')) {
            imgElement.src = 'https://static.wikia.nocookie.net/rating-system/images/b/bb/MPA_R.svg';
        } else if (certification.includes('NC-17')) {
            imgElement.src = 'https://static.wikia.nocookie.net/rating-system/images/6/6c/MPA_NC-17.svg';
        }
    }
    if (textContent.includes('UK')) {
        ukRatings(certification);
    }

    certElement.style.display = 'none';
    imgElement.style.position = 'absolute';
    imgElement.style.right = '15px';
    imgElement.style.bottom = '15px';
    imgElement.style.width = '30px';

    movieInfoElement.style.position = 'relative';
    movieInfoElement.appendChild(imgElement);
})();
