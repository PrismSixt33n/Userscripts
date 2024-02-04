// ==UserScript==
// @name         PTP group names
// @namespace    https://github.com/po5
// @version      0.1.24
// @description  Display release groups next to torrents
// @author       Eva
// @updateURL    https://gist.github.com/po5/e668df1650d0231d163fdbe1e8f7043f/raw/ptp-group-names.user.js
// @downloadURL  https://gist.github.com/po5/e668df1650d0231d163fdbe1e8f7043f/raw/ptp-group-names.user.js
// @grant        none
// @match        https://passthepopcorn.me/torrents.php*
// @match        http://passthepopcorn.me/torrents.php*
// @icon        https://passthepopcorn.me/favicon.ico
// @license      GPL-3.0
// @run-at       document-end
// ==/UserScript==

/* Heavily modified from https://passthepopcorn.me/forums.php?action=viewthread&threadid=35906 */

async function groups() {
  var before = true;

  var unknown = "UnKnown";

  var boldfont = true;

  var coloredfont = true;
  var groupnamecolor = "#afcfee";

  var api = true;

  var selfrip = ["", "PTP", "BTN"]
  var blacklist = ["tbb", "xvid", "x264", "x265", "avc", "hevc", "dvd", "dvd5", "dvd9", "dvdiso", "dvd-r", "dvdr", "movie", "4k", "2160p", "1080p", "720p", "576p", "480p", "2160", "1080", "720", "576", "480", "bluray", "bdmv", "bdiso", "proper", "aac", "ac3", "flac", "vob", "ifo", "vob ifo", "vob.ifo", "vob_ifo", "avi", "remux", "uncut", "dl", "us", "r", "j", "jp", "jpn", "ita", "dvdrip", "pal", "ntsc", "bd", "bdremux", "bdremux.1080p", "1080p remux", "hd", "eng", "exclusive", "japanese", "nogrp", "nogroup", "3d half sbs", "r1", "r2", "r2j", "extras", "trailers", "rifftrax", "cd1", "cd2"];
  var groupregex = /^\[(?!Japanese)(?:[0-9]+[pP]?|MOVIE|DVD(?:[95]|ISO|-?R)?|BDMV|([^[\u4E00-\u9FCC¶^\]]+))\](?!\[).*|^\[(?!Japanese)(?:MOVIE|DVD(?:[95]|ISO|-?R)?|BDMV|\d{6}|([^½ \]\u4E00-\u9FCC]+))\].*|.*[a-zA-Z .\]]\[(?:.* Edition|[rR]iff[tT]rax|REMUX|PROPER|MOVIE|DVD(?:[95]|ISO|R).*|BD(?:MV|\d+)|AC3|AAC|.* DVD|[0-9]+[pP]?|.*?26[45]+.*?|[a-f0-9]{8}|[A-F0-9]{8}|.*FLAC|R2[ JFD].*|([^[)+-]+))](?:\[[0-9]+[pP]])$|.*(?:\.|[xhXH]\.?26[45] )(?:REMUX|PROPER|MOVIE|DVD(?:[95]|ISO|-?R)?|BD(?:MV|\d+)|AC3|AAC|FLAC|PAL|NTSC|XVID|DTS|DUB|[xhXH]\.?26[45]|(?![cC][dD]\d|BLURAY)([A-Z]-)?([A-Z][A-Zi0-9]+|[A-Z][a-z][A-Z]|@[a-zA-Z]{2,}))$|^(lazers|neroz)-[a-z0-9-]+$|^([a-z]{3,4}|refined|publichd)(?:-[a-z0-9-]*|(?:\.EXTRAS)?\.[a-z0-9.]*)\.?(?:2160|1080|720|480)p?$|.*(?:WEB-DL|10-bit|(?:_-_|(?:[ \d]- )(?!DTS-))(?:\d+|[0-9]+[pP]?|PROPER|OU|J(?:PN?)?|US|R|WB|[xhXH]\.?26[45]|[aA][vV][iI]|Uncut|Untouched|DVDRIP|Extras|Trailers|Copy|[rR]iff[tT]rax|[a-z]*1080p|[([]?\d+|[bB][iI]|[cC][dD]\d|([^ .\])_~]+)))\)?$|.*(?:WEB-DL|10-bit|(?:_-_|(?:-([A-Z][A-Z0-9]-)|...-))(?:\d+|[0-9]+[pP]?|PROPER|OU|J(?:PN?)?|US|R|[xhXH]\.?26[45]|Uncut|Untouched|[a-z]*1080p|.*_3D_([A-Z]{4,})$|.*DVD(?:[95]|ISO|-?R)?|[bB][iI]|Live_In_.*|([^ .\])]+)))-Exclusive\)?$|.*(?:[bB]lu-[rR]ay|WEB-DL|10-bit|(?:_-_|(?:S-([A-WYZ][A-Z0-9]?-)|[^S]-([A-Z][A-Z0-9]?-)|(FTW-)|.(?!BD-[JKR][)\]]?$).(?!3-D$).-))(?:\d+|[0-9]+[pP]?|PROPER|OU|J(?:PN?)?|US|R|X|[xhXH]\.?26[45]|Uncut|Untouched|[mM]ovie|[a-z]*1080p|.*_3D_([A-Z]{4,})$|.*DVD(?:[95]|ISO|-?R)?|[bB][iI]|Live_In_.*|\[([A-Z]+|[a-z]+)]|((?:[A-Z]\.?)+|[^ .\])]+(?:\[\d+])?)))\)?$|.*(?:[bB]lu-[rR]ay|WEB-DL|10-bit|(?:_-_|(?:S-([A-WYZ][A-Z0-9]?-)|[^S]-([A-Z][A-Z0-9]?-)|(FTW-)|.(?!BD-[JKR][)\]]?$).(?!3-D$).-|~))(?:\d+|[0-9]+[pP]?|PROPER|OU|J(?:PN?)?|US|R|X|[xhXH]\.?26[45]|Uncut|Untouched|[mM]ovie|[a-z]*1080p|.*_3D_([A-Z]{4,})$|.*DVD(?:[95]|ISO|-?R)?|[bB][iI]|Live_In_.*|\[([A-Z]+|[a-z]+)]|((?:[A-Z]\.?)+|[^ .\])]+(?:\[\d+])?)))\)?$|^[a-z]{3}_\[(?:[0-9]+[pP]?|MOVIE|DVD(?:[95]|ISO|-?R)?|BDMV|([^[\u4E00-\u9FCC]+))\]|^([a-z]{2,3})\..*|.*?(?:\[((?:[A-Z]{3}-)?[A-Z][a-z]{3,})\]) ?\[(?:[a-f0-9]{8}|[A-F0-9]{8})]$|(?!DVD-R).*[a-zA-Z .\]]\[(?:.* Edition|[rR]iff[tT]rax|REMUX|PROPER|MOVIE|PAL|(?:PAL.)?DVD(?:[95]|ISO|R).*|BD(?:MV|\d+)|AC3|AAC|.* DVD|[0-9]+[pP]?|.*?26[45]+.*?|[a-f0-9]{8}|[A-F0-9]{8}|.*FLAC|Eng|Ita|R\d(?:J|FR)?|.*DVD\.XviD|VOB.IFO|R2[ JFD].*|EXTRAS.*|\d+p [rR]emux|.*, \d{4}|([^[)+-]+))]$|^([a-z]+)-.*(?:[0-9]+[pP]?$)|^[a-z]{2}-([a-z]{3})$|^(?:[A-Z_]|3D)+_(?:REMUX|BLURAY|([A-Zi]{2,4}HD|HD[A-Z]{4}))$|.*\d\.\d ([a-z]{4}|[A-Z][a-z]+[A-Z]+)$|.*\.\d{4}\.BDrip\.([A-Z][a-z]+[A-Z][a-z]+)$|.*(?:-AC3|\.[xX][vV][iI][dD]|\.dxva)\.([a-z0-9]+|[A-Zi0-9]+|[A-Z][a-z]+[A-Z])$|.+/g;

  function formattext(str) {
    var style = [];
    if (boldfont) style.push("font-weight:bold");
    if (coloredfont) style.push(`color:${groupnamecolor}`);
    return `<span style="${style.join(";")}">${str.replace(/<|>/g, "")}</span>`;
  }

  function nice(groupname) {
    return (groupname && groupname.length > 0 && !blacklist.includes(groupname.toLowerCase())) ? groupname : "";
  }

  function setgroupname(groupname, target) {
    info = $(target).contents().filter(function() {
      return this.nodeType === 3;
    }).first();
    if (document.title.indexOf("Browse Torrents ::") === -1 && groupname != "TBB" && selfrip.includes(nice(groupname)) && target.parentElement.parentElement.nextElementSibling.innerText.trim().startsWith("Ripped by ")) {
      groupname = target.parentElement.parentElement.nextElementSibling.innerText.split(" ")[2]
    }
    if (nice(groupname)) {
      before ? info.before(formattext(groupname) + " / ") : info.after(info.text().endsWith(" / ") ? formattext(groupname) + " / " : " / " + formattext(groupname));
    } else if (info.text().includes(" / TBB")) {
      if (before) info.before(formattext("TBB") + " / ");
      info.replaceWith(info.text().replace(" / TBB", before ? "" : " / " + formattext("TBB")));
    } else if (unknown) {
      before ? info.before(formattext(unknown) + " / ") : info.after(info.text().endsWith(" / ") ? formattext(unknown) + " / " : " / " + formattext(unknown));
    }
  }

  if (document.title.indexOf("Browse Torrents ::") !== -1) {
    var releases = [];
    if (typeof PageData !== "undefined" && PageData.Movies) {
      var movies = PageData.Movies;
      movies.forEach(function(movie) {
        movie.GroupingQualities.forEach(function(torrentgroup) {
          torrentgroup.Torrents.forEach(function(torrent) {
            var group = "";
            if (torrent.ReleaseName) {
              group = torrent.ReleaseName.trim().replace("DTS-HD-", "-").replace(groupregex, "$1$2$3$4$5$6$7$8$9$10$11$12$13$14$15$16$17$18$19$20$21$22$23$24$25$26$27$28$29$30$31$32$33");
            }
            if (!group) {
              group = "";
            }
            releases[torrent.TorrentId] = nice(group.replace(/-$/, ""));
          });
        });
      });

      if (PageData.ClosedGroups != 1 || document.querySelector("a.torrent-info-link")) {
        releases.forEach(function(groupname, index) {
          $(`a.torrent-info-link[href$="torrentid=${index}"]`).each(function() {
            setgroupname(groupname, this);
          });
        });
      } else {
        var targetNodes = $("tbody");
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        var myObserver = new MutationObserver(mutationHandler);
        var obsConfig = {
          childList: true,
          characterData: false,
          attributes: false,
          subtree: false
        };

        targetNodes.each(function() {
          myObserver.observe(this, obsConfig);
        });

        function mutationHandler(mutationRecords) {
          mutationRecords.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
              $(mutation.addedNodes).find("a.torrent-info-link").each(function() {
                var mutatedtorrentid = this.href.match(/\btorrentid=(\d+)\b/)[1];
                var groupname = releases[mutatedtorrentid];
                setgroupname(groupname, this);
              });
            }
          });
        }
      }
    } else {
      document.querySelectorAll("a.torrent-info-link").forEach(link => {
        releases[link.href.match(/\btorrentid=(\d+)\b/)[1]] = "";
        setgroupname("", link);
      })
    }

    if (api) {
      var url = window.location.href.replace(/\?+$/, "");
      url = url + (url.includes("?") ? "&" : "?") + "json=noredirect&filelist[]=";
      var data = await fetch(url);
      var movies = await data.json();
      movies["Movies"].forEach(m => {
        m["Torrents"].forEach(t => {
          var done = false;
          if (!releases[t["Id"]]) {
            t["FileList"].forEach(f => {
              if (!done && !f["Path"].includes(".srt")) {
                var releasename = f["Path"].replace(/([^/]+).*$/, "$1").replace(/\.[^/.]+$/, "");
                var group = nice(releasename.replace("DTS-HD-", "-").replace(groupregex, "$1$2$3$4$5$6$7$8$9$10$11$12$13$14$15$16$17$18$19$20$21$22$23$24$25$26$27$28$29$30$31$32$33"));
                if (group) {
                  releases[t["Id"]] = group.replace(/-$/, "");
                  var torrent = $(`a.torrent-info-link[href$="torrentid=${t["Id"]}"]`);
                  if (torrent.html()) {
                    torrent.html(torrent.html().replace(/( \/ )<span style=".*?<\/span>|<span style=".*?<\/span>( \/ )/, ""));
                    setgroupname(group, torrent);
                  }
                }
                done = true;
              }
            });
          }
        });
      });
    }
  } else {
    $("#torrent-table a.torrent-info-link[onclick]").each(function() {
      var groupname = "";
      var releasename = $(this).parent().parent().data("releasename").toString().trim();
      if (releasename) {
        groupname = releasename.replace("DTS-HD-", "-").replace(groupregex, "$1$2$3$4$5$6$7$8$9$10$11$12$13$14$15$16$17$18$19$20$21$22$23$24$25$26$27$28$29$30$31$32$33");
      }
      if (!groupname) {
        groupname = "";
        var releasename2 = $(this).parent().parent().next().find("[id^='files_'] td:first-child:not(:contains('.srt'))").first().text().replace(/([^/]+).*$/, "$1").replace(/\.[^/.]+$/, "");
        if (releasename2) {
          groupname = releasename2.replace("DTS-HD-", "-").replace(groupregex, "$1$2$3$4$5$6$7$8$9$10$11$12$13$14$15$16$17$18$19$20$21$22$23$24$25$26$27$28$29$30$31$32$33");
          if (!groupname) {
            groupname = "";
          }
        }
      }
      setgroupname(groupname.replace(/-$/, ""), this);
    });
  }
}

groups();

var torrents = document.querySelector("#torrents-movie-view > div");
if (torrents) {
  new MutationObserver(m => groups()).observe(torrents, {
    attributes: false,
    childList: true
  });
}
