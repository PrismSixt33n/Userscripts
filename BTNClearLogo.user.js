// ==UserScript==
// @name         BTN Fanart.tv API
// @version      1.1
// @grant        GM_xmlhttpRequest
// @grant        GM.notification
// @match        https://broadcasthe.net/series.php?id=*
// @description  Fanart.tv API
// @icon         https://broadcasthe.net/favicon.ico
// @author       Prism16
// ==/UserScript==

var fanartapiKey = "##########";
var isPanelVisible = false;

(function() {
    'use strict';

    var fanartapiKey = "#################";

    function searchTVDBUrl() {
        let aElements = document.getElementsByTagName('a');
        for (let i = 0; i < aElements.length; i++) {
            let aElement = aElements[i];
            if (aElement.href.includes('thetvdb.com')) {
                return aElement.href;
            }
        }
    }

    function PassTvdbIdToFanartTv() {
        let tvdbUrl = searchTVDBUrl();
        if (tvdbUrl) {
            GM_xmlhttpRequest({
                method: "GET",
                url: tvdbUrl,
                onload: function(response) {
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(response.responseText, "text/html");
                    let spanElement = doc.querySelector("#series_basic_info > ul > li:nth-child(1) > span");
                    if (spanElement) {
                        let tvdbId = spanElement.textContent;
                        var fanartUrl = "https://webservice.fanart.tv/v3/tv/" + tvdbId + "?api_key=" + fanartapiKey;
                        console.log("Fanart API Call: " + fanartUrl);
                        getHDClearLogo(fanartUrl);
                    }
                }
            });
        }
    }

function getHDClearLogo(fanartUrl) {
    GM_xmlhttpRequest({
        method: "GET",
        url: fanartUrl,
        onload: function(response) {
            let jsonResponse = JSON.parse(response.responseText);
            if (jsonResponse && jsonResponse.hdtvlogo) {
                for (let i = 0; i < jsonResponse.hdtvlogo.length; i++) {
                    let logo = jsonResponse.hdtvlogo[i];
                    if (logo.lang === 'en') {
                        console.log("HD Clear Logo URL: " + logo.url);
                        addLogoToPanel(logo.url);
                        break;
                    }
                }
            }
        }
    });
}

function addLogoToPanel(logoUrl) {
    var mainColumn = document.querySelector('div.sidebar');
    var boxDiv = document.createElement('div');
    boxDiv.className = 'box';
    var logoImg = document.createElement('img');
    logoImg.src = logoUrl;
    logoImg.style.width = '100%';
    boxDiv.appendChild(logoImg);
    mainColumn.insertBefore(boxDiv, mainColumn.children[0]);
}

    PassTvdbIdToFanartTv();

})();
