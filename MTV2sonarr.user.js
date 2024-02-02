// ==UserScript==
// @name         MTV2Sonarr
// @version      1.0
// @description  Add shows directly to sonarr via the MTV tv show pages and V3 api (Based on BTN2Sonarr v1.3)
// @author       Prism16
// @match        https://www.morethantv.me/user.php?action=edit*
// @match        https://www.morethantv.me/show/*
// @icon         https://www.morethantv.me/favicon.ico
// @require      https://cdn.jsdelivr.net/gh/sizzlemctwizzle/GM_config@43fd0fe4de1166f343883511e53546e87840aeaf/gm_config.js
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @grant        GM.xmlHttpRequest
// @grant        GM.notification
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

window.sonarrApi = GM_getValue('ApiKey', '');
window.sonarrUrl = GM_getValue('URL', '');
window.sonarrpath = GM_getValue('Path', '');
window.sonarrprofileid = GM_getValue('ProfileID', '');
window.sonarrlanguageid = GM_getValue('LanguageID', '');
window.sonarrsearch = GM_getValue('SearchOnAdd', '');
window.sonarrseasons = GM_getValue('SeasonsChoice','');

function settingsPanel() {
    var tbody = document.querySelector("#userform .border tbody");
    var newPanelHeader = document.createElement("tr");
    newPanelHeader.className = "colhead";
    newPanelHeader.innerHTML = `
        <td colspan="2">
            <strong>MTV 2 Sonarr Settings</strong>
        </td>
    `;

    tbody.appendChild(newPanelHeader);
    var newPanelContent = document.createElement("tr");
    newPanelContent.innerHTML = `
        <td>
            <label>Sonarr ApiKey: <input type="text" name="ApiKey" value="${GM_getValue('ApiKey', '')}"></label>
            <label>Sonarr URL: <input type="text" name="URL" value="${GM_getValue('URL', '')}"></label>
            <label>Sonarr Path: <input type="text" name="Path" value="${GM_getValue('Path', '')}"></label>
            <label>Sonarr ProfileID: <input type="text" name="ProfileID" value="${GM_getValue('ProfileID', '')}"></label>
            <label>Sonarr LanguageID: <input type="text" name="LanguageID" value="${GM_getValue('LanguageID', '')}"></label>
            <label>Search On Add: <input type="checkbox" name="SearchOnAdd" ${GM_getValue('SearchOnAdd', false) ? 'checked' : ''}></label>
            <label>Seasons Choice:
                <select name="SeasonsChoice">
                    <option value="ALL" ${GM_getValue('SeasonsChoice', '') === 'ALL' ? 'selected' : ''}>ALL</option>
                    <option value="NONE" ${GM_getValue('SeasonsChoice', '') === 'NONE' ? 'selected' : ''}>NONE</option>
                    <option value="LATEST" ${GM_getValue('SeasonsChoice', '') === 'LATEST' ? 'selected' : ''}>LATEST</option>
                </select>
            </label>
        </td>`;
    tbody.appendChild(newPanelContent);
    newPanelContent.querySelectorAll('input, select').forEach(function(element) {
        element.addEventListener('change', function() {
            GM_setValue(this.name, this.type === 'checkbox' ? this.checked : this.value);
        });
    });
    var confirmButtonRow = document.createElement("tr");

    var confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    confirmButton.addEventListener('click', function() {
        newPanelContent.querySelectorAll('input, select').forEach(function(element) {
            GM_setValue(element.name, element.type === 'checkbox' ? element.checked : element.value);
        });
        alert("Settings saved!");
    });
    confirmButtonRow.appendChild(confirmButton);
    tbody.appendChild(confirmButtonRow);
}

function profileids() {
    let sonarrApi = GM_getValue('Sonarr API Key', '');
    let sonarrUrl = GM_getValue('Sonarr URL', '');

    if (!sonarrApi || !sonarrUrl) {
        GM_notification({
            text: 'ADD URL And API Key, Save and try again.',
            title: 'Missing Information',
            timeout: 4000
        });
    } else {
        let apiUrl = sonarrUrl + '/api/v3/qualityprofile?apikey=' + sonarrApi;
        console.log(apiUrl);

        let xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                let names = filterByName(data);
                let ids = filterById(data);
                let output = {};
                for (let i = 0; i < names.length; i++) {
                    let name = names[i];
                    let id = ids[i];
                    output[name.name] = id.id;
                }
                createModal(output);
            }
        }
        xhr.send();
    }
}

    function languageids() {
    let sonarrApi = GM_getValue('Sonarr API Key', '');
    let sonarrUrl = GM_getValue('Sonarr URL', '');

    if (!sonarrApi || !sonarrUrl) {
        GM_notification({
            text: 'ADD URL And API Key, Save and try again.',
            title: 'Missing Information',
            timeout: 4000
        });
    } else {
        let apiUrl = sonarrUrl + '/api/v3/languageprofile?apikey=' + sonarrApi;
        console.log(apiUrl);

        let xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                let names = filterByName(data);
                let ids = filterById(data);
                let output = {};
                for (let i = 0; i < names.length; i++) {
                    let name = names[i];
                    let id = ids[i];
                    output[name.name] = id.id;
                }
                createModal(output);
            }
        }
        xhr.send();
    }
}

    function filterByName(data) {
    let filtered = [];
    for (let i = 0; i < data.length; i++) {
        let element = data[i];
        if (element.hasOwnProperty("name")) {
            filtered.push(element);
        }
    }
    return filtered;
}

function filterById(data) {
    let filtered = [];
    for (let i = 0; i < data.length; i++) {
        let element = data[i];
        if (element.hasOwnProperty("id")) {
            filtered.push(element);
        }
    }
    return filtered;
}


    function searchTVDBUrl() {
        let aElements = document.getElementsByTagName('a');
        for (let i = 0; i < aElements.length; i++) {
            let aElement = aElements[i];
            if (aElement.href.includes('thetvdb.com')) {
                return aElement.href;
            }
        }
    }

    function createModal(obj) {
    let modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.zIndex = "1";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.overflow = "auto";
    modal.style.backgroundColor = "rgba(0,0,0,0.4)";

    let modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#000";
    modalContent.style.color = "#fff";
    modalContent.style.margin = "15% auto";
    modalContent.style.padding = "0px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "80%";
    modalContent.style.maxWidth = "300px";
    modalContent.style.borderRadius = "5px";

    let closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.backgroundColor = "transparent";
    closeButton.style.color = "white";
    closeButton.style.position = "absolute";
    closeButton.style.top = "0px";
    closeButton.style.right = "0px";
    closeButton.style.padding = "5px 10px";
    closeButton.onclick = function() {
        modal.style.display = "none";
    };
    modalContent.style.position = "relative";
    modalContent.appendChild(closeButton);

    let table = createTable(obj);
    table.style.textAlign = "left";

    modalContent.appendChild(table);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function createTable(obj) {
    let table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    let th1 = document.createElement("th");
    th1.textContent = "Name";
    tr.appendChild(th1);

    let th2 = document.createElement("th");
    th2.textContent = "ID";
    tr.appendChild(th2);

    thead.appendChild(tr);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    for (let key in obj) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.textContent = key;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.textContent = obj[key];
        tr.appendChild(td2);

        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    return table;
}

function getTVDBIdAndPassToSonarr() {
    let tvdbUrl = searchTVDBUrl();
    console.log(tvdbUrl);
    if (tvdbUrl) {
        let tvdbId = tvdbUrl.split('id=')[1];
            console.log(tvdbId);
        let sonarrSeriesLookupUrl = `${window.sonarrUrl}/api/v3/series/lookup?term=tvdb:${tvdbId}`;
            console.log(sonarrSeriesLookupUrl);
        GM_xmlhttpRequest({
            method: "GET",
            url: sonarrSeriesLookupUrl,
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": window.sonarrApi
            },
            onload: function(response) {
                let result = JSON.parse(response.responseText);
                let linkbox = document.querySelector("#content > div > div > div.linkbox");
                let aElement = document.createElement('a');
                aElement.href = '#';
                if (result[0] && result[0].path) {
                    aElement.textContent = '[View In Sonarr]';
                    aElement.style.color = "#b1fcb1";
                    aElement.style.fontWeight = "bold";
                    let sonarrSeriesUrl = `${window.sonarrUrl}/series/${result[0].titleSlug}`;
                    aElement.href = sonarrSeriesUrl;
                    aElement.target = '_blank';
                } else {
                    aElement.textContent = '[Add to Sonarr]';
                    aElement.style.color = "#afe4ee";
                    aElement.style.fontWeight = "bold";
                    aElement.onclick = function() {
                        addToSonarr(result);
                        return false;
                    };
                }

                linkbox.appendChild(aElement);
            }
        });
    } else {
        console.log('No TVDB URL found on this page');
    }
}

function addToSonarr(result) {
    let fullPath = window.sonarrpath + '/' + result[0].title;
    let seriesData = {
        title: result[0].title,
        seasons: result[0].seasons,
        path: fullPath,
        qualityProfileId: window.sonarrprofileid,
        languageProfileId: window.sonarrlanguageid,
        images: result[0].images,
        tvdbId: result[0].tvdbId,
        titleSlug: result[0].titleSlug,
        monitored: true,
        addOptions: {
            ignoreEpisodesWithFiles: false,
            ignoreEpisodesWithoutFiles: false,
            searchForMissingEpisodes: window.sonarrsearch
        }
    };
if (window.sonarrseasons === "NONE") {
    for (let i = 0; i < seriesData.seasons.length; i++) {
        seriesData.seasons[i].monitored = false;
    }
} else if (window.sonarrseasons === "ALL") {
    for (let i = 0; i < seriesData.seasons.length; i++) {
        seriesData.seasons[i].monitored = true;
    }
} else if (window.sonarrseasons === "LATEST") {
    for (let i = 0; i < seriesData.seasons.length; i++) {
        seriesData.seasons[i].monitored = false;
    }
    if (seriesData.seasons.length > 0) {
        seriesData.seasons[seriesData.seasons.length - 1].monitored = true;
    }
}
    let sonarrAddSeriesUrl = `${window.sonarrUrl}/api/v3/series/`;
    GM_xmlhttpRequest({
        method: "POST",
        url: sonarrAddSeriesUrl,
        data: JSON.stringify(seriesData),
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": window.sonarrApi
        },
        onload: function(response) {
            let responseData = JSON.parse(response.responseText);
            if (responseData.title === result[0].title) {
                GM_notification({
                    text: `Please Click This Notification To Refresh The Page..`,
                    title: 'MTV2Sonarr - Added',
                    timeout: 7500,
                    onclick: function() {
                        location.reload();
            }
        });
    } else {
                GM_notification({
                    text: `Failed to add ${result[0].title}. Possibly Already Added..`,
                    title: 'MTV 2 Sonarr',
                    timeout: 2500
                });
            }
        }
    });
}

var url = window.location.href;

if (url.startsWith("https://www.morethantv.me/user.php?action=edit")) {
    settingsPanel();
} else if (url.startsWith("https://www.morethantv.me/show/")) {
    getTVDBIdAndPassToSonarr();
}
})();
