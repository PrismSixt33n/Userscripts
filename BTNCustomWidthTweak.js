// ==UserScript==
// @name         BTN Custom Width Tweak
// @version      0.1
// @author       Prism16
// @description  Apply custom width for use with BTN Future CSS
// @match        https://broadcasthe.net/*
// @icon         https://broadcasthe.net/favicon.ico
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle("@media (min-width: 1236px) { #wrapper { max-width: 1920px; } }");
})();
