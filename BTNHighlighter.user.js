// ==UserScript==
// @name         BTN Highlighter Bundle
// @version      1.3.1b
// @description  Allows for custom highlighting on torrents.
// @author       JimboDev
// @downloadURL  https://gitea.com/Jimbo/PT-Userscripts/raw/branch/main/btn-highlighter.user.js
// @updateURL    https://gitea.com/Jimbo/PT-Userscripts/raw/branch/main/btn-highlighter.user.js
// @grant        GM_xmlhttpRequest
// @match        https://broadcasthe.net/torrents.php*
// @match        https://broadcasthe.net/series.php*
// @match        https://broadcasthe.net/upload.php*
// @icon         https://broadcasthe.net/favicon.ico
// @run-at       document-end
// ==/UserScript==

// Thanks to vevv for this list from their PTP script
const streaming_ids = {'4OD': 'All4', 'AE': 'A&E', 'AJAZ': 'Al Jazeera English', 'ALL4': 'All4', 'AMBC': 'ABC', 'AMC': 'AMC', 'AMZN': 'Amazon', 'ANLB': 'AnimeLab', 'ANPL': 'Animal Planet', 'AOL': 'AOL', 'APTN': 'APTN', 'ARD': 'ARD', 'AS': 'Adult Swim', 'ATK': "America's Test Kitchen", 'ATVP': 'Apple TV+', 'AUBC': 'ABC Australia', 'BNGE': 'Binge', 'BRAV': 'BravoTV', 'BRTB': 'Britbox', 'CBC': 'CBC', 'CBS': 'CBS', 'CC': 'Comedy Central', 'CCGC': 'Comedians in Cars Getting Coffee', 'CHGD': 'CHRGD', 'CITY': 'City TV', 'CLBI': 'Club illico', 'CMAX': 'Cinemax', 'CMOR': 'C More', 'CMT': 'Country Music Television', 'CN': 'Cartoon Network', 'CNBC': 'CNBC', 'CANP': 'Canal+', 'CNLP': 'Canal+', 'CR': 'Crunchyroll', 'CRAV': 'Crave', 'CRKL': 'Crackle', 'CSPN': 'CSpan', 'CTV': 'CTV', 'CUR': 'CuriosityStream', 'CW': 'The CW', 'CWS': 'CWSeed', 'DCU': 'DC Universe', 'DDY': 'Digiturk Diledigin Yerde', 'DF': 'DramaFever', 'DHF': 'Deadhouse Films', 'DISC': 'Discovery', 'DIY': 'DIY Network', 'DOCC': 'Doc Club', 'DPLY': 'DPlay', 'DSCP': 'Discovery+', 'DSKI': 'Daisuki', 'DSNP': 'Disney+', 'DSNY': 'Disney', 'EPIX': 'EPIX', 'ESPN': 'ESPN', 'ESQ': 'Esquire', 'ETTV': 'El Trece', 'ETV': 'E!', 'FAM': 'Family Ch', 'FJR': 'Family Jr', 'FOOD': 'Food Network', 'FOX': 'Fox', 'FOXP': 'Foxplay', 'FUNI': 'Funimation', 'FREE': 'Freeform', 'FXTL': 'Foxtel Now', 'FYI': 'FYI Network', 'GC': 'NHL GameCenter', 'GLBL': 'Global', 'GLOB': 'GloboSat Play', 'HBO': 'HBO', 'HGO': 'HBO Go', 'HBON': 'HBO Nordic', 'HGTV': 'HGTV', 'HIST': 'History', 'HIDIVE': 'HIDIVE', 'HLMK': 'Hallmark', 'HMAX': 'HBO Max', 'HULU': 'Hulu', 'ID': 'Investigation Discovery', 'IFC': 'IFC', 'iP': 'BBC iPlayer', 'iT': 'iTunes', 'iTunes': 'iTunes', 'ITV': 'ITV', 'KNOW': 'Knowledge Network', 'LIFE': 'Lifetime', 'MBC': 'MBC', 'MNBC': 'MSNBC', 'MTOD': 'Motor Trend OnDemand', 'MTV': 'MTV', 'NATG': 'National Geographic', 'NBA': 'NBA TV', 'NBC': 'NBC', 'NF': 'Netflix', 'NFL': 'NFL', 'NFLN': 'NFL Now', 'NICK': 'Nickelodeon', 'NOW': 'NOW TV', 'NRK': 'Norsk Rikskringkasting', 'ODK': 'OnDemandKorea', 'PBS': 'PBS', 'PBSK': 'PBS Kids', 'PCOK': 'Peacock', 'PLAY': 'Google Play', 'PLUZ': 'Pluzz', 'PMTP': 'Paramount+', 'PSN': 'Playstation Network', 'RED': 'YouTube Red', 'ROKU': 'Roku', 'RTE': 'RTE One', 'SBS': 'SBS (AU)', 'SESO': 'SeeSo', 'SHMI': 'Shomi', 'SHO': 'Showtime', 'SNET': 'Sportsnet', 'SPIK': 'Spike', 'SPKE': 'Spike TV', 'SPRT': 'Sprout', 'STAN': 'Stan', 'STV': 'STV', 'STRP': 'Star+', 'STZ': 'Starz', 'SVT': 'Sveriges Television', 'SWER': 'SwearNet', 'SYFY': 'Syfy', 'TBS': 'TBS', 'TCM': 'TCM', 'TFOU': 'TFou', 'TLC': 'TLC', 'TOU': 'Ici TOU.TV', 'TUBI': 'TubiTV', 'TV3': 'TV3 Ireland', 'TV4': 'TV4 Sweeden', 'TVING': 'TVING', 'TVL': 'TV Land', 'TVNZ': 'TVNZ', 'UFC': 'UFC', 'UKTV': 'UKTV', 'UNIV': 'Univision', 'USAN': 'USA Network', 'VH1': 'VH1', 'VIAP': 'Viaplay', 'VICE': 'Viceland', 'VIKI': 'Viki', 'VLCT': 'Velocity', 'VMEO': 'Vimeo', 'VRV': 'VRV', 'VUDU': 'Vudu', 'WME': 'WatchMe', 'WNET': 'W Network', 'WWEN': 'WWE Network', 'XBOX': 'Xbox Video', 'YHOO': 'Yahoo', 'ZDF': 'ZDF', 'CRIT': 'Criterion', 'KNPY': 'Kanopy', 'KANOPY': 'Kanopy', 'MUBI': 'Mubi', 'MA.WEB-DL': 'Movies Anywhere', 'MA.WEBRip': 'Movies Anywhere', 'HS': 'Hotstar', 'HTSR': 'Hotstar', 'HSTR': 'Hotstar', 'FLMN': 'Filmin', 'MAX': 'Max', 'OSN': 'OSN+', 'SNXT': 'Sun NXT', 'JC': 'Jio Cinema', 'BMS': 'Book MY Show', 'CHTV': 'Chaupal TV', 'ZEE5': 'ZEE5', 'ITVX': 'ITV X', 'SHAHID': 'Shahid'}

// DV and HDR replace H265 so the tag isn't needed
const REMOVE_TAG = ["DV", "HDR", "HLG", "Remux"]
// Convert this tag to the group name
const SHOW_GROUP_NAME = ["P2P", "Internal"]
// Replace H265 with HDR tags if present (if false you may want to remove the DV and HDR tags from the REMOVE_TAG list)
const REPLACE_H265_WITH_HDR = true
// This option will convert WEB-DL (Netflix) to Netflix
const REPLACE_WEBDL_WITH_SOURCE = true
// This option will replace Bluray with Remux if present
const REPLACE_BLURAY_WITH_REMUX = true
// These fields will be replaced if found.
const REPLACE_OUTPUT = {
    "x264-Hi10P": "Hi10p"
}

function insertCSSRules() {
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.textContent = `
.torrent-field {
    border-radius: 0px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    word-spacing: normal;
    color: #999;
}

strong.torrent-field {
    font-weight: normal;
}

a.tor_highlight_seed > span {
    font-weight: bold;
}

[data-source*="Bluray"] {
    color: #26a1ff;
}

[data-source="HDTV"] {
    color: #f00;
}

[data-source="WEB-DL"] {
    color: #ff8000;
}

[data-source="WEBRip"] {
    color: #ff329f;
}

[data-container*="ISO"],
[data-container*="M2TS"] {
    color: #be00ff;
}

[data-container*="MP4"] {
    color: #be0000;
}

[data-container*="TS"] {
    color: #ff00c8;
}

[data-container*="AVI"] {
    color: #ffaf00;
}

[data-container*="MKV"] {
    color: #ff4100;
}


[data-codec="h264 10-bit"],
[data-codec="x264-Hi10P"],
[data-codec="H.264"] {
    color: #7deb7d;
}

[data-codec="H.265"],

[data-resolution="2160p"] {
    color: yellow;
}

[data-resolution="1080p"] {
    color: #f1c40f;
}

[data-resolution="720p"] {
    color: red;
}

[data-hdr="DV-P8"],
[data-hdr="DV-P7"],
[data-hdr="DV-HDR"] {
    color: green;
}

[data-hdr="DV-P5"],
[data-hdr="DV"] {
    color: purple;
}

[data-hdr="HLG"] {
    color: pink;
}

[data-hdr="HDR"] {
    color: cyan;
}

[data-type="Internal"] {
    color: #58ff00;
    font-weight: bold !important;
}

[data-type="P2P"] {
    color: #ae83cc;
    font-weight: bold;
}

[data-type="Scene"] {
    color: #ff0000;
    font-weight: bold;
}

[data-type="BHD"] {
    color: #3988cc;
    font-weight: bold;
}

[data-key="5.1ch"] {
    color: #02d3ee;
}

[data-key="7.1ch"] {
    color: #0251ee;
}

[data-key="Subs"] {
    color: #00ffea;
}

[data-key="Dual"] {
    color: #26a1ff;
}

[data-key="Atmos"] {
    color: lightgreen;
}
    `;
}

insertCSSRules();

function parse_mediainfo(mediainfo_el) {
    let mediainfo_text = mediainfo_el.textContent

    for (const block of mediainfo_el.querySelectorAll("blockquote")) {
        mediainfo_text = mediainfo_text.replace(block.textContent, "")
    }

    var mediainfo_sections = Array.from(mediainfo_text.matchAll(/^(General|Video|Audio|Text)( #\d+)?\s?\n(((.+)\n)+)/mg));

    if (mediainfo_sections.length === 0)
        return {};

    var output = {};

    mediainfo_sections.forEach(mediainfo_section => {
        var values = {};

        var mediainfo_values = Array.from(mediainfo_section[3].matchAll(/^([\(\)/,#\w\d *\.]+):\s(.+)$/mg));

        mediainfo_values.forEach( value => {
            values[value[1].trim()] = value[2].trim();
        })

        const key = mediainfo_section[1].trim()
        if (!(key in output)) {
            output[key] = []
        }

        output[key].push(values);
    });

    return output;
}

const release_group_res = [
    /-\s?([\w\.]+)\)?$/,
    /^\[([\w\s]+)\]/,
]

/**
 * @param {object} mediainfo the mediainfo
 * @param {Element} element The torrent info element
 * @param {Number} index The index of the info
 * @param {String} info The default text
 * @param {boolean} hasNfo Do we have an NFO
 * @param {Element} torrentGroup The row elements
 * @param {boolean} hasDV Do we have DV
 * @param {boolean} hasHDR Do we have HDR
 * @param {boolean} isRemux Is this a remux
 */
function handle_element_info(mediainfo, element, index, info, hasNfo, torrentGroup, hasDV, hasHDR, isRemux) {
    if (hasNfo && index >= 2) index--;

    if (info == "NFO") {
        return info;
    }

    let output = info

    let file_name = ""

    if ("General" in mediainfo) {
        const general = mediainfo["General"][0]
        file_name = (general["Complete name"] || general["File name"] || "").replace(/\.[^/.]+$/, "")
    } else if (torrentGroup.className === "group_torrent") {
        file_name = torrentGroup.nextElementSibling.textContent.trim().slice(2)    
    } else if (torrentGroup.querySelector("span[title]")) {
        file_name = torrentGroup.querySelector("span[title]").title
    } else if ("ReleaseName" in mediainfo) {
        file_name = mediainfo["ReleaseName"]
    }

    if (index === 0) {
        element.setAttribute("data-container", info);
    }
    if (index === 1) {
        element.setAttribute("data-codec", info);

        let didHdr = false

        if (("Video" in mediainfo)) {
            const video = mediainfo["Video"][0]
    
            if ("HDR format" in video) {
                const hdr = video["HDR format"];
    
                if (hdr.includes("Dolby Vision")) {
                    if (hdr.includes("dvhe.05")) {
                        element.setAttribute("data-hdr", "DV-P5")
                    } else if (hdr.includes("dvhe.07")) {
                        element.setAttribute("data-hdr", "DV-P7")
                    } else if (hdr.includes("dvhe.08")) {
                        element.setAttribute("data-hdr", "DV-P8")
                    }
                } else {
                    element.setAttribute("data-hdr", "HDR")
                }

                didHdr = true
    
            }
            
            if ("Transfer characteristics" in video) {
                const tc = video["Transfer characteristics"];
                
                if (tc.match(/\bHLG\b/)) {
                    element.setAttribute("data-hdr", "HLG")
                }
            }

        }

        if (!didHdr) {
            if (file_name.match(/\b(DoVi|DV)\b/i) || hasDV) {
                if (file_name.match(/\bHDR\b/i) || hasHDR) {
                    element.setAttribute("data-hdr", "DV-HDR")
                } else {
                    element.setAttribute("data-hdr", "DV")
                }
            } else if (file_name.match(/\bHDR\b/i) || hasHDR) {
                element.setAttribute("data-hdr", "HDR")
            } else if (file_name.match(/\bHLG\b/i)) {
                element.setAttribute("data-hdr", "HLG")
            }
        }



        if (element.getAttribute("data-hdr") && REPLACE_H265_WITH_HDR)
            output = `${element.getAttribute("data-hdr")?.replace("-", " ")}`
    }
    if (index === 2) {

        if (info === "WEB-DL" || info === "WEBRip") {

            let siteName = undefined

            if ("General" in mediainfo && "Video" in mediainfo) {
                const video = mediainfo["Video"][0]
    
                const tbody = torrentGroup.nextElementSibling
    
                const releaseName = tbody?.querySelector(":scope > td:nth-child(1)")?.textContent?.trim().slice(2)
    
                
                const isx26 = (video["Writing library"]||"").includes("x26")
                siteName = getSite(file_name, isx26) || getSite(releaseName, isx26)
            } else {
                siteName = getSite(file_name, false) 

            }

            if (siteName !== undefined) {
                if (info === "WEB-DL" && REPLACE_WEBDL_WITH_SOURCE)
                    output = `${siteName}`
                else
                    output = `${output} (${siteName})`
            }

        } else if ( info === "Bluray") {
            if (isRemux && REPLACE_BLURAY_WITH_REMUX)
                output = 'Remux'
        }

        element.setAttribute("data-source", info);
    }
    if (index === 3) {
        element.setAttribute("data-resolution", info);
    }
    if (index === 4) {
        element.setAttribute("data-type", info);

        if (SHOW_GROUP_NAME.includes(info)) {
            for (const name_re of release_group_res) {
                var release_group_re = file_name.match(name_re);
                if (release_group_re){
                    output = release_group_re[1];
                    break
                }
            } 
        }
    }

    if (index >= 5) {
        if (REMOVE_TAG.includes(info))
            return ""
    }

    return REPLACE_OUTPUT[output] || output

}

document["BTN_HIGHLIGHT_INFO"] = handle_element_info


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// Credit to vevv again
// this looks hacky and it is, but it does all those in a specific order to minimize false positives
function getSite(rls_name, is_x26=false) {
    // exception for Hotstar which unlike Disney+ has x264/x265 headers
    if (is_x26 == true && getSite(rls_name) == "Disney+" && !rls_name.match(RegExp("webrip", "i"))) {
      return "Hotstar";
    }
    // it's rarely capitalized this specific way
    if (rls_name.includes(".IT.WEB-DL")) {
        return "iTunes";
    }
    // best case, "SRC.WEB"
    for (let key in streaming_ids) {
        if (rls_name.includes(`.${key}.WEB`)) {
          return streaming_ids[key];
        }
    }
    // next best case, ".SRC." or " SRC "
    for (let key in streaming_ids) {
        let site_reg = new RegExp("[\\s\\.]"+key+"[\\s\\.]");
        if (rls_name.match(site_reg)) {
          return streaming_ids[key];
        }
    }
    // with full name + space check for "Source WEB" matches first to avoid movie titles matching e.g. Amazon
    for (let key in streaming_ids) {
        let site_reg = new RegExp("[\\s\\.]"+escapeRegExp(streaming_ids[key])+"[\\s\\.]WEB");
        if (rls_name.match(site_reg)) {
            return streaming_ids[key];
        }
    }
    // just " Source " now
    for (let key in streaming_ids) {
        let site_reg = new RegExp("[\\s\\.]"+escapeRegExp(key)+"[\\s\\.]");
        if (rls_name.match(site_reg)) {
            return streaming_ids[key];
        }
    }
}


function handle_torrent_page() {

    const torrents = document.querySelectorAll('#content > div > div.main_column > table.torrent_table > tbody > tr.group_torrent');

    torrents.forEach((el,key) => {
        const torrent_link = el.querySelector('td > a');

        const torrent_info = torrent_link?.childNodes[0]?.textContent;
        let elements = []

        // const torrent_id = torrent_link?.getAttribute("onclick")?.match(/return swapDisplay\('(\d+)','\d+'\);/)[1];
        // const torrent_data = document.querySelector(`tr[id="torrent_${torrent_id}"]`);
        const torrent_data = el.nextElementSibling?.nextElementSibling

        const mediainfo_elem = torrent_data?.querySelector("td > blockquote:last-child")

        const mediainfo = parse_mediainfo(mediainfo_elem);

        const span_abbr = el.querySelector('td > a > span[style]')
        let abbr_info_list = []
        if (span_abbr) {
            abbr_info_list = span_abbr?.textContent.split(" / ")
        }



        let torrent_info_list = torrent_info?.slice(2).split(" / ")
        const strong = torrent_link?.querySelector(":scope > strong")
        if (strong) {
            torrent_info_list = torrent_info_list.filter(Boolean)
            torrent_info_list?.push(strong.textContent?.trim())
            strong.remove()
        }
        torrent_info_list.forEach((info, ind, list) => {
            const hasNfo = list.includes("NFO");
            const hasDV = abbr_info_list.includes("DV")
            const hasHDR = abbr_info_list.includes("HDR")
            const isRemux = abbr_info_list.includes("Remux")
            const element = document.createElement("span");

            element.className="torrent-field"

            element.setAttribute("data-key", info);

            const text = handle_element_info(mediainfo, element, ind, info, hasNfo, el, hasDV, hasHDR, isRemux)
            if (text) {
                element.textContent = text
                elements.push(element.outerHTML);
            }
            element.remove()
        })

        const info = "<span>» </span>" + elements.join("<span> / </span>");

        torrent_link?.childNodes[0].remove()
        torrent_link?.insertAdjacentHTML( 'afterbegin', info );

        if (span_abbr) {
            let abbr_info_list = span_abbr?.textContent.split(" / ")
    
            span_abbr.innerHTML = ""
    
    
            elements = []
            abbr_info_list.forEach((info,key) => {  
                const element = document.createElement("span");
                element.className="torrent-field"
    
                element.setAttribute("data-key", info);
                const text = handle_element_info({}, element, torrent_info_list?.length + key, info, torrent_info_list?.includes('NFO'), el, false, false, false)
                if (text) {
                    element.textContent = text
                    elements.push(element.outerHTML);
                }
                element.remove()
            })
    
            span_abbr?.insertAdjacentHTML( 'afterbegin', elements.join("<span> / </span>") );

        }

    })

}


function handle_torrent_browse_page() {

    const torrents = document.querySelectorAll('#torrent_table > tbody > tr.torrent');

    torrents.forEach((el,key) => {
        const parent = el.querySelector(':scope > td:nth-child(3)');
        const br = parent.querySelector(':scope > br');

        let childCount = 0
        childCount += (parent?.querySelectorAll(":scope > abbr[title]").length*2)
        childCount += (parent?.querySelectorAll(":scope > strong").length*2)
        let torrent_text = parent?.childNodes[8].textContent?.trim()
        
        for (const [ind, child] of [...parent?.childNodes].slice(9, 9 + childCount).entries()) {
            torrent_text += ' '

            torrent_text += child.textContent.replace(/\s{2,}/g, ' ').trim()

        }
        
        let torrent_split = torrent_text.replace(/\s{2,}/g, ' ').split("] [")

        const torrent_info = torrent_split[0].trim().slice(1);
        let elements = []



        torrent_info?.split(" / ").forEach((info, ind, list) => {
            const hasNfo = list.includes("NFO");
            const element = document.createElement("strong");

            element.className="torrent-field"

            element.setAttribute("data-key", info);

            const text = handle_element_info({}, element, ind, info, hasNfo, el, list.includes("DV"), list.includes("HDR"), list.includes("Remux"))
            if (text) {
                element.textContent = text
                elements.push(element.outerHTML);
            }
            element.remove()
        })

        const info = `[${elements.join(" / ")}] [${torrent_split[1].trim()}`;

        for (const [ind, child] of [...parent?.childNodes].slice(8, 9 + childCount).entries()) {
            child.remove()
        }
        br?.insertAdjacentHTML( 'afterend', info );

    })

}

function fetchSearchPage(url, method = "GET", timeout = 10000) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: method,
            url: url,
            timeout,
            ontimeout: function() {
                reject(new Error(`Request timed out after ${timeout}ms`));
            },
            onerror: function(err) {
                reject(err ? err : new Error('Failed to fetch'))
            },
            onload: function(response) {
                resolve(response);
            }
        })
    });
}

async function fetch_release_map() {

    const title = document.querySelector('#content > div.thin > div.sidebar div.head > strong')

    const url = `https://broadcasthe.net/torrents.php?artistname=${encodeURIComponent(title?.textContent?.trim())}&exactartist=1&action=advanced&releasename=WEB`

    const response = await fetchSearchPage(url)

    const parser = new DOMParser()
    const result = parser.parseFromString(response.responseText, "text/html").body

    const map = new Map()

    for (const torrent of result.querySelectorAll('#torrent_table tr.torrent')) {
        const torrent_url_el = torrent.querySelector('a[href^="torrents.php"][href*="torrentid"]')

        const torrent_url = new URL(torrent_url_el?.getAttribute("href"), document.baseURI)

        const release_name = torrent.querySelector('div > span[title]')?.getAttribute("title")

        map.set(torrent_url.searchParams.get('torrentid'), release_name)

    }

    return map
}


async function handle_series_page() {


    const release_map = await fetch_release_map()

    const torrents = document.querySelectorAll('.main_column > table tr.group_torrent');

    
    torrents.forEach((el,key) => {
        
        let elements = []
        
        const torrent_url_el = el.querySelector('a[href^="torrents.php"][href*="torrentid"]')
        const torrent_url = new URL(torrent_url_el?.getAttribute("href"), document.baseURI)
        const torrent_id = torrent_url.searchParams.get('torrentid')
        const mediainfo = {"ReleaseName": (release_map.get(torrent_id) || "")}
        
        const torrent_info = [...el.querySelectorAll("td a span[class]")]
        const tag_span = el.querySelector("td a span:last-child")
        const tags = tag_span?.textContent?.trim().split(' / ')

        torrent_info.forEach((element, ind, list) => {
            element.className="torrent-field"

            element.setAttribute("data-key", element.textContent);
            const text = handle_element_info(mediainfo, element, ind, element.textContent, false, el, tags.includes("DV"), tags.includes("HDR"), tags.includes("Remux"))

            if (text)
                element.textContent = text
            else {
                element.nextSibling?.remove()
                element.remove()
            }
        })

        tags.forEach((tag, ind, list) => {

            const element = document.createElement("span");
            element.className="torrent-field"

            element.setAttribute("data-key", tag);
            const text = handle_element_info(mediainfo, element, torrent_info.length + ind, tag, false, el, false, false, false)

            if (text) {
                element.textContent = text
                elements.push(element.outerHTML);
            }
            element.remove()
        })

        tag_span.innerHTML = ""

        tag_span?.insertAdjacentHTML( 'afterbegin', elements.join("<span> / </span>") );


    })

}



(function() {
    'use strict';
    const url = new URL(window.location.href)
    if (window.location.pathname === '/torrents.php') {
        if (url.searchParams.get("id"))
            handle_torrent_page();
        else
            handle_torrent_browse_page();
    } else if (window.location.pathname === '/series.php') {
        handle_series_page()
    } else if (window.location.pathname === '/upload.php') {
        handle_torrent_browse_page()
    }
})();
