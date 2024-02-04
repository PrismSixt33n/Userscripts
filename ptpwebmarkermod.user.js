// ==UserScript==
// @name         PTP WEB Marker
// @version      1.9.16
// @description  Marks WEB sourced torrents with WEB-DL/WEBRip distinction and source tag
// @author       vevv, Fear, MOD by Prism16
// @match        https://passthepopcorn.me/torrents.php*
// @match        https://passthepopcorn.me/artist.php*
// @match        https://passthepopcorn.me/user.php*
// @icon https://passthepopcorn.me/favicon.ico
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const streaming_ids = {'4OD': 'All4', 'AE': 'A&E', 'AJAZ': 'Al Jazeera English', 'ALL4': 'All4', 'AMBC': 'ABC', 'AMC': 'AMC', 'AMZN': 'Amazon', 'ANLB': 'AnimeLab', 'ANPL': 'Animal Planet', 'AOL': 'AOL', 'APTN': 'APTN', 'ARD': 'ARD', 'AS': 'Adult Swim', 'ATK': "America's Test Kitchen", 'ATVP': 'Apple TV+', 'AUBC': 'ABC Australia', 'BNGE': 'Binge', 'BRAV': 'BravoTV', 'BRTB': 'Britbox', 'CBC': 'CBC', 'CBS': 'CBS', 'CC': 'Comedy Central', 'CCGC': 'Comedians in Cars Getting Coffee', 'CHGD': 'CHRGD', 'CITY': 'City TV', 'CLBI': 'Club illico', 'CMAX': 'Cinemax', 'CMOR': 'C More', 'CMT': 'Country Music Television', 'CN': 'Cartoon Network', 'CNBC': 'CNBC', 'CANP': 'Canal+', 'CNLP': 'Canal+', 'CR': 'Crunchyroll', 'CRAV': 'Crave', 'CRKL': 'Crackle', 'CSPN': 'CSpan', 'CTV': 'CTV', 'CUR': 'CuriosityStream', 'CW': 'The CW', 'CWS': 'CWSeed', 'DCU': 'DC Universe', 'DDY': 'Digiturk Diledigin Yerde', 'DF': 'DramaFever', 'DHF': 'Deadhouse Films', 'DISC': 'Discovery', 'DIY': 'DIY Network', 'DOCC': 'Doc Club', 'DPLY': 'DPlay', 'DSCP': 'Discovery+', 'DSKI': 'Daisuki', 'DSNP': 'Disney+', 'DSNY': 'Disney', 'EPIX': 'EPIX', 'ESPN': 'ESPN', 'ESQ': 'Esquire', 'ETTV': 'El Trece', 'ETV': 'E!', 'FAM': 'Family Ch', 'FJR': 'Family Jr', 'FOOD': 'Food Network', 'FOX': 'Fox', 'FOXP': 'Foxplay', 'FREE': 'Freeform', 'FXTL': 'Foxtel Now', 'FYI': 'FYI Network', 'GC': 'NHL GameCenter', 'GLBL': 'Global', 'GLOB': 'GloboSat Play', 'HBO': 'HBO', 'HGO': 'HBO Go', 'HBON': 'HBO Nordic', 'HGTV': 'HGTV', 'HIST': 'History', 'HLMK': 'Hallmark', 'HMAX': 'HBO Max', 'HULU': 'Hulu', 'ID': 'Investigation Discovery', 'IFC': 'IFC', 'iP': 'BBC iPlayer', 'iT': 'iTunes', 'iTunes': 'iTunes', 'ITV': 'ITV', 'KNOW': 'Knowledge Network', 'LIFE': 'Lifetime', 'MBC': 'MBC', 'MNBC': 'MSNBC', 'MTOD': 'Motor Trend OnDemand', 'MTV': 'MTV', 'NATG': 'National Geographic', 'NBA': 'NBA TV', 'NBC': 'NBC', 'NF': 'Netflix', 'NFL': 'NFL', 'NFLN': 'NFL Now', 'NICK': 'Nickelodeon', 'NOW': 'NOW TV', 'NRK': 'Norsk Rikskringkasting', 'ODK': 'OnDemandKorea', 'PBS': 'PBS', 'PBSK': 'PBS Kids', 'PCOK': 'Peacock', 'PLAY': 'Google Play', 'PLUZ': 'Pluzz', 'PMTP': 'Paramount+', 'PSN': 'Playstation Network', 'RED': 'YouTube Red', 'ROKU': 'Roku', 'RTE': 'RTE One', 'SBS': 'SBS (AU)', 'SESO': 'SeeSo', 'SHMI': 'Shomi', 'SHO': 'Showtime', 'SNET': 'Sportsnet', 'SPIK': 'Spike', 'SPKE': 'Spike TV', 'SPRT': 'Sprout', 'STAN': 'Stan', 'STRP': 'Star+', 'STZ': 'Starz', 'SVT': 'Sveriges Television', 'SWER': 'SwearNet', 'SYFY': 'Syfy', 'TBS': 'TBS', 'TCM': 'TCM', 'TFOU': 'TFou', 'TLC': 'TLC', 'TOU': 'Ici TOU.TV', 'TUBI': 'TubiTV', 'TV3': 'TV3 Ireland', 'TV4': 'TV4 Sweeden', 'TVING': 'TVING', 'TVL': 'TV Land', 'TVNZ': 'TVNZ', 'UFC': 'UFC', 'UKTV': 'UKTV', 'UNIV': 'Univision', 'USAN': 'USA Network', 'VH1': 'VH1', 'VIAP': 'Viaplay', 'VICE': 'Viceland', 'VIKI': 'Viki', 'VLCT': 'Velocity', 'VMEO': 'Vimeo', 'VRV': 'VRV', 'VUDU': 'Vudu', 'WME': 'WatchMe', 'WNET': 'W Network', 'WWEN': 'WWE Network', 'XBOX': 'Xbox Video', 'YHOO': 'Yahoo', 'ZDF': 'ZDF', 'CRIT': 'Criterion', 'KNPY': 'Kanopy', 'KANOPY': 'Kanopy', 'MUBI': 'Mubi', 'MA.WEB-DL': 'Movies Anywhere', 'MA.WEBRip': 'Movies Anywhere', 'HS': 'Hotstar', 'HTSR': 'Hotstar', 'HSTR': 'Hotstar', 'FLMN': 'Filmin', 'MAX': 'Max', 'OSN': 'OSN+', 'SNXT': 'Sun NXT', 'JC': 'Jio Cinema', 'BMS': 'Book MY Show', 'CHTV': 'Chaupal TV'}
const show_key = false;

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getReleaseName(infolink) {
    let rls_name;
    if (window.location.href.includes("torrents.php") && window.location.href.match(/[\?\&]id=/)) {
        rls_name = infolink.context.parentElement.parentElement.getAttribute('data-releasename');
    } else {
        rls_name = infolink.context.getAttribute('title');
    }
    return rls_name;
}

function getSource(rls_name, is_scene=false) {
    let rls_lower = rls_name.toLowerCase();
    let source;
    if (rls_lower.match(/web[-\.]?rip/)) {
        source = "WEBRip";
    } else if (rls_lower.match(/web[-\.]?dl/) || (rls_lower.includes("web") && is_scene) || rls_lower.includes("untouched")) {
        source = "Web ";
    } else {
        source = "Web ";
    }
    return source;
}


function getSite(rls_name, is_x26=false) {

    if (is_x26 == true && ((show_key && getSite(rls_name) == "DSNP") || (!show_key && getSite(rls_name) == "Disney+")) && !rls_name.match(RegExp("webrip", "i"))) {
      return "Hotstar";
    }

    if (rls_name.includes(".IT.WEB-DL")) {
        return show_key ? "IT" : streaming_ids.iT;
    }

    for (let key in streaming_ids) {
        if (rls_name.includes(`.${key}.WEB`)) {
          return show_key ? key : streaming_ids[key];
        }
    }

    for (let key in streaming_ids) {
        let site_reg = new RegExp("[ \.]"+key+"[ \.]");
        if (rls_name.match(site_reg)) {
          return show_key ? key : streaming_ids[key];
        }
    }

    for (let key in streaming_ids) {
        let site_reg = new RegExp("[ \.]"+escapeRegExp(streaming_ids[key])+"[ \.]WEB");
        if (rls_name.match(site_reg)) {
          return show_key ? key : streaming_ids[key];
        }
    }

    for (let key in streaming_ids) {
        let site_reg = new RegExp("[ \.]"+escapeRegExp(key)+"[ \.]");
        if (rls_name.match(site_reg)) {
          return show_key ? key : streaming_ids[key];
        }
    }
}

function updateTorrentLink(idx) {
    let description = $(this).html();
    let rls_name = getReleaseName($(this)) || "";
    let source = getSource(rls_name, description.includes("Scene"));
    let site = getSite(rls_name, description.includes("x26"));
    if (site) {
      source = `${source} (${site})`
    }

    let sourceSpan = `<span class='source-text'>${source}</span>`;

    let newDescription = description.replace("WEB", sourceSpan);

    $(this).html(newDescription);

    $('.source-text').css({
        "color": "#afcfee",
    });
}

let torrentLinks = $('a.torrent-info-link[href="#"]:contains(/ WEB /)');
if (torrentLinks.length == 0) {
  torrentLinks = $('a.torrent-info-link[href^="torrents.php"]:contains(/ WEB /)');
}

torrentLinks.each(updateTorrentLink);
