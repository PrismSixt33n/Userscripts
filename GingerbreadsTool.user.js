// ==UserScript==
// @name         Gingerbreads Tool
// @version      0.2
// @description  Add a link with item count to the page
// @author       Prism16
// @match        https://www.morethantv.me/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    $.get('https://www.morethantv.me/tools.php?action=marked_for_deletion&viewstatus=unmarked&overdue=0&bots=1', function(data) {
        var html = $.parseHTML(data);
        var itemCount = $(html).find('#content > div > table:nth-child(6) > tbody > tr').length;
        itemCount -= 1;
        var link = $('<a/>', {
            href: 'https://www.morethantv.me/tools.php?action=marked_for_deletion&viewstatus=unmarked&overdue=0&bots=1',
            text: 'Gingerbreads Tool (' + itemCount + ')'
        });
        var listItem = $('<li/>').append(link);
        $('#menu').append(listItem);
    });
})();
