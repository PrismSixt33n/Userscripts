// ==UserScript==
// @name         BTN Banner Yoinker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Copy the src of the image with id 'banner' to the clipboard.
// @author       Prism16
// @match        https://broadcasthe.net/series.php?id=*
// @icon         https://broadcasthe.net/favicon.ico
// @grant        GM_setClipboard
// @grant        GM_notification
// ==/UserScript==

(function() {
    'use strict';

    let imgElement = document.querySelector("#banner");
    if (imgElement) {
        let imgSrc = imgElement.getAttribute("src");
        if (imgSrc.startsWith("//")) {
            imgSrc = imgSrc.substring(2);
        }

        // Create the YOINK!! link
        let linkbox = document.querySelector('#content > div.thin > div.linkbox');
        let aElement = document.createElement('a');
        aElement.innerHTML = "YOINK!!";
        aElement.style.color = "#FDD9EE";
        aElement.style.fontWeight = "bold";
        aElement.style.border = "none";
        aElement.style.padding = "10px 24px";
        aElement.style.textAlign = "center";
        aElement.style.textDecoration = "none";
        aElement.style.display = "inline-block";
        aElement.style.margin = "4px 2px";
        aElement.style.cursor = "pointer";

        // Set the link's click event
        aElement.onclick = function() {
            GM_setClipboard(imgSrc);
            GM_notification("Image URL Yoinked");
        };

        linkbox.insertBefore(aElement, linkbox.firstChild);
    } else {
        console.log("No element found with id 'banner'");
    }
})();
