// ==UserScript==
// @name         PTP - TMDB To PassThePopcorn
// @version      1.2
// @grant        GM_xmlhttpRequest
// @grant        GM.notification
// @match        https://passthepopcorn.me/torrents.php*
// @description  Pulls and impliments multiple sections from TMDB to PassThePopcorns movies pages.
// @icon         https://www.themoviedb.org/assets/1/v4/logos/312x276-primary-green-74212f6247252a023be0f02a5a45794925c3689117da9d20ffe47742a665c518.png
// @author       Prism16
// ==/UserScript==



/// API KEY GOES BELOW 'INBETWEEN_THESE'
let apiKey = '#########';
/// API KEY GOES ABOVE 'INBETWEEN_THESE'

if (!apiKey || apiKey.trim() === '') {
  GM.notification("No API Key..", "TMDB To PTP");
  console.log('No API Key. Stopping script.');
  return;
}
window.addEventListener('load', function() {
    var movieName = document.querySelector("#content > div > h2").innerText;
    movieName = movieName.split('[')[0];
    movieName = movieName.trim();
    movieName = movieName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    movieName = movieName.replace(/\s+/g,"+");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + movieName);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status != 200) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            var response = JSON.parse(xhr.response);
            if (response.results && response.results.length > 0) {
                var movieId = response.results[0].id;
                var xhrImages = new XMLHttpRequest();
                xhrImages.open('GET', 'https://api.themoviedb.org/3/movie/' + movieId + '/images?api_key=' + apiKey + '&include_image_language=en,null');
                xhrImages.send();
                xhrImages.onload = function() {
                    if (xhrImages.status != 200) {
                        alert(`Error ${xhrImages.status}: ${xhrImages.statusText}`);
                    } else {
                        var imagesResponse = JSON.parse(xhrImages.response);
                        var posters = imagesResponse.posters;
                        var posterImg = document.querySelector("#content > div > div.sidebar > div.box_albumart.panel > div.panel__body > img");
                        var currentIndex = 0;
                        function updatePoster() {
                            if (posters[currentIndex]) {
                                posterImg.src = 'https://image.tmdb.org/t/p/w500' + posters[currentIndex].file_path;
                            }
                        }
var textSpan = document.querySelector("#content > div > div.sidebar > div.box_albumart.panel > div.panel__heading > span");
textSpan.style.position = 'relative';
textSpan.style.left = '0px';
var textPrevButton = document.createElement('button');
textPrevButton.textContent = '<';
textPrevButton.style.backgroundColor = 'transparent';
textPrevButton.style.border = 'none';
textPrevButton.style.color = '#afcfee';
textPrevButton.style.fontSize = '1em';
textPrevButton.style.top = '2px';
textPrevButton.style.left = '-13px';
textPrevButton.addEventListener('click', function() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = posters.length - 1;
    }
    updatePoster();
});
var textNextButton = document.createElement('button');
textNextButton.textContent = '>';
textNextButton.style.backgroundColor = 'transparent';
textNextButton.style.border = 'none';
textNextButton.style.color = '#afcfee';
textNextButton.style.fontSize = '1em';
textNextButton.style.top = '2px';
textNextButton.style.right = '-13px';
textNextButton.addEventListener('click', function() {
    currentIndex++;
    if (currentIndex >= posters.length) {
        currentIndex = 0;
    }
    updatePoster();
});
textSpan.parentNode.insertBefore(textPrevButton, textSpan);
textSpan.parentNode.insertBefore(textNextButton, textSpan.nextSibling);
updatePoster();
                    }
                }
            }
        }
    }
});

window.addEventListener('load', function() {
var menu = document.querySelector("#content > div > div.linkbox");
var newLink = document.createElement("a");
newLink.textContent = " [FanArt]";
newLink.href = "#";
newLink.className = "linkbox_link";
newLink.addEventListener('click', function(e) {
e.preventDefault();
var movieName = document.querySelector("#content > div > h2").innerText;
movieName = movieName.split('[')[0];
movieName = movieName.trim();
movieName = movieName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
movieName = movieName.replace(/\s+/g,"+");
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + movieName);
xhr.send();
xhr.onload = function() {
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                var response = JSON.parse(xhr.response);
                if (response.results && response.results.length > 0) {
                    var movieId = response.results[0].id;
                    var xhrImages = new XMLHttpRequest();
                    xhrImages.open('GET', 'https://api.themoviedb.org/3/movie/' + movieId + '/images?api_key=' + apiKey + '&include_image_language=en,null');
                    xhrImages.send();
                    xhrImages.onload = function() {
                        if (xhrImages.status != 200) {
                            alert(`Error ${xhrImages.status}: ${xhrImages.statusText}`);
                        } else {
                            var imagesResponse = JSON.parse(xhrImages.response);
                            var posters = imagesResponse.backdrops;
                            var modal = document.createElement('div');
                            modal.style.position = 'fixed';
                            modal.style.zIndex = '1';
                            modal.style.left = '0';
                            modal.style.top = '0px';
                            modal.style.width = '100%';
                            modal.style.height = '100%';
                            modal.style.zindex = '14';
                            modal.style.overflow = 'auto';
                            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
                            var carousel = document.createElement('div');
                            carousel.style.position = 'relative';
                            carousel.style.margin = 'auto';
                            carousel.style.top = '500px';
                            carousel.style.width = '800px';
                            carousel.style.height = '550px';
                            carousel.style.zindex = '15';
                            var close = document.createElement('span');
                            close.textContent = 'X';
                            close.style.position = 'absolute';
                            close.style.top = '10px';
                            close.style.right = '-25px';
                            close.style.color = 'white';
                            close.style.fontSize = '20px';
                            close.style.fontWeight = '';
                            close.style.cursor = 'pointer';
                            close.style.Zindex = '18';
                            close.onclick = function() {
                                document.body.removeChild(modal);
                            };
                            var prev = document.createElement('a');
                            prev.textContent = '<';
                            prev.style.position = 'absolute';
                            prev.style.left = '-46px';
                            prev.style.top = '50%';
                            prev.style.transform = 'translateY(-50%)';
                            prev.style.color = 'white';
                            prev.style.fontSize = '36px';
                            prev.style.textDecoration = 'none';
                            prev.style.cursor = 'pointer';
                            var next = document.createElement('a');
                            next.textContent = '>';
                            next.style.position = 'absolute';
                            next.style.right = '-46px';
                            next.style.top = '50%';
                            next.style.transform = 'translateY(-50%)';
                            next.style.color = 'white';
                            next.style.fontSize = '36px';
                            next.style.textDecoration = 'none';
                            next.style.cursor = 'pointer';
                            var index = 0;
                            prev.onclick = function() {
                                if (index > 0) {
                                    index--;
                                    updateCarousel();
                                }
                            };
                            next.onclick = function() {
                                if (index < posters.length - 1) {
                                    index++;
                                    updateCarousel();
                                }
                            };
                            function updateCarousel() {
                                var posterPath = posters[index].file_path;
                                var imgUrl = 'https://image.tmdb.org/t/p/original' + posterPath;
                                img.src = imgUrl;
                            }
                            var img = document.createElement('img');
                            img.style.width = '800px';
                            img.style.display = 'block';
                            updateCarousel();
                            carousel.appendChild(prev);
                            carousel.appendChild(img);
                            carousel.appendChild(next);
                            carousel.appendChild(close);
                            modal.appendChild(carousel);
                            document.body.appendChild(modal);
                        }
                    };
                }
            }
        };
    });
    menu.appendChild(newLink);
});

window.addEventListener('load', function() {
    var movieName = document.querySelector("#content > div > h2").innerText;
    movieName = movieName.split('[')[0];
    movieName = movieName.trim();
    movieName = movieName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    movieName = movieName.replace(/\s+/g,"+");
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + movieName,
        onload: function(response) {
            var searchResults = JSON.parse(response.responseText);
            if (searchResults.results.length > 0) {
                var movieId = searchResults.results[0].id;
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://api.themoviedb.org/3/movie/" + movieId + "/videos?api_key=" + apiKey,
                    onload: function(response) {
                        var videoResults = JSON.parse(response.responseText);
                        var videoList = document.createElement('ol');
                        videoList.style.paddingInlineStart = '18px';
                        videoResults.results.forEach(function(video, index) {
                            if (video.site === "YouTube") {
                                var youtubeLink = "https://www.youtube.com/watch?v=" + video.key;
                                var listItem = document.createElement('li');
                                var link = document.createElement('a');
                                link.href = youtubeLink;
                                link.target = '_blank';
                                link.textContent = video.name;
                                listItem.appendChild(link);
                                videoList.appendChild(listItem);
                            }
                        });
                        var newPanel = document.createElement('div');
                        newPanel.className = 'panel';
                        newPanel.id = 'parents_guide';
                        var panelHeading = document.createElement('div');
                        panelHeading.className = 'panel__heading';
                        var title = document.createElement('span');
                        title.className = 'panel__heading__title';
                        var tmdb = document.createElement('span');
                        tmdb.style.color = '#50C2BF';
                        tmdb.textContent = 'TMDB';
                        title.appendChild(tmdb);
                        title.appendChild(document.createTextNode(' Video Links'));
                        panelHeading.appendChild(title);
                        var poweredBy = document.createElement('span');
                        poweredBy.id = 'powered_by';
                        poweredBy.style.cssText = 'float: right; font-size: 0.4rem !important; font-weight: bold;';
                        poweredBy.textContent = 'Powered By TMDB Helper';
                        panelHeading.appendChild(poweredBy);
                        newPanel.appendChild(panelHeading);
                        var panelBody = document.createElement('div');
                        panelBody.className = 'panel__body';
                        panelBody.style.position = 'relative';
                        panelBody.appendChild(videoList);
                        newPanel.appendChild(panelBody);
                        var sidebar = document.querySelector('div.sidebar');
                        sidebar.insertBefore(newPanel, sidebar.childNodes[7]);
                    }
                });
            }
        }
    });
});

// EXTRA INFO DETAILS
window.addEventListener('load', function() {
    var movieName = document.querySelector("#content > div > h2").innerText;
    movieName = movieName.split('[')[0];
    movieName = movieName.trim();
    movieName = movieName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    movieName = movieName.replace(/\s+/g,"+");

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + movieName,
        onload: function(response) {
            var searchResults = JSON.parse(response.responseText);
            if (searchResults.results.length > 0) {
                var movieId = searchResults.results[0].id;
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey,
                    onload: function(response) {
                        var movieDetails = JSON.parse(response.responseText);
                        var genreNames = movieDetails.genres.map(function(genre) {
                            return "<b>" + genre.name + "</b>";
                        });
                        var voteAverage = movieDetails.vote_average > 0 ? "" + movieDetails.vote_average + "" : "";
                        var releaseDate = "" + formatDate(movieDetails.release_date) + "";
                        var revenue = movieDetails.revenue > 1000000 ? "$" + (movieDetails.revenue / 1000000).toFixed(1) + " Million" : movieDetails.revenue > 0 ? "$" + movieDetails.revenue + "" : "";
                        var budget = movieDetails.budget > 1000000 ? "$" + (movieDetails.budget / 1000000).toFixed(1) + " Million" : movieDetails.budget > 0 ? "$" + movieDetails.budget + "" : "";
                        var panelBody = document.querySelector("div#movieinfo.panel div.panel__body");
                        var tmdbId = movieDetails.id;
                        panelBody.innerHTML += voteAverage !== "" ? "<br><b><span style='color: #50C2BF;'>Vote Average</b></span>: " + voteAverage : "";
                        panelBody.innerHTML += "<br><b><span style='color: #50C2BF;'>Release Date</b></span>: " + releaseDate;
                        panelBody.innerHTML += revenue !== "" ? "<br><b><span style='color: #50C2BF;'>Revenue</b></span>: " + revenue : "";
                        panelBody.innerHTML += budget !== "" ? "<br><b><span style='color: #50C2BF;'>Budget</b></span>: " + budget : "";
                        panelBody.innerHTML += genreNames.length > 0 ? "<br><br><b><span style='color: #50C2BF;'>Genres</b></span>: " + genreNames.join(", ") : "";
                        GM_xmlhttpRequest({
                            method: "GET",
                            url: "https://api.themoviedb.org/3/movie/" + movieId + "/external_ids?api_key=" + apiKey,
                            onload: function(response) {
                                var externalIds = JSON.parse(response.responseText);
                                if (externalIds.imdb_id) {
                                    panelBody.innerHTML += "<br><br><a href='https://www.imdb.com/title/" + externalIds.imdb_id + "' target='_blank' style='margin-right: 15px;'><img src='https://i.imgur.com/DNd8o4z.png' alt='IMDb' style='width:20px;height:20px;'></a>";
                                }
                                if (tmdbId) {
                                    panelBody.innerHTML += "<a href='https://www.themoviedb.org/movie/" + tmdbId + "' target='_blank' style='margin-right: 15px;'><img src='https://i.imgur.com/S6bVol7.png' alt='TMDB' style='width:auto;height:20px;'></a>";
                                }
                                if (externalIds.facebook_id) {
                                    panelBody.innerHTML += "<a href='https://www.facebook.com/" + externalIds.facebook_id + "' target='_blank' style='margin-right: 15px;'><img src='https://i.imgur.com/96zOO4D.png' alt='Facebook' style='width:20px;height:20px;'></a>";
                                }
                                if (externalIds.instagram_id) {
                                    panelBody.innerHTML += "<a href='https://www.instagram.com/" + externalIds.instagram_id + "' target='_blank' style='margin-right: 15px;'><img src='https://i.imgur.com/M1zCxsI.png' alt='Instagram' style='width:20px;height:20px;'></a>";
                                }
                                if (externalIds.twitter_id) {
                                    panelBody.innerHTML += "<a href='https://twitter.com/" + externalIds.twitter_id + "' target='_blank' style='margin-right: 15px;'><img src='https://i.imgur.com/dem79up.png' alt='Twitter' style='width:20px;height:20px;'></a>";
                                }
                            }
                        });
                    }
                });
            }
        }
    });
});
function formatDate(dateString) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date(dateString);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var suffix = '';
    if (day == 1 || day == 21 || day == 31) {
        suffix = 'st';
    } else if (day == 2 || day == 22) {
        suffix = 'nd';
    } else if (day == 3 || day == 23) {
        suffix = 'rd';
    } else {
        suffix = 'th';
    }
    return day + suffix + ' ' + months[monthIndex] + ' ' + year;
}


window.addEventListener('load', function() {
    var reviewPanel = document.createElement('div');
    reviewPanel.className = 'panel';
    reviewPanel.id = 'tmdb_reviews';
    var panelHeading = document.createElement('div');
    panelHeading.className = 'panel__heading';
    panelHeading.style.fontWeight = 'bold';
    panelHeading.style.display = 'flex';
    panelHeading.style.justifyContent = 'space-between';
    var panelBody = document.createElement('div');
    panelBody.className = 'panel__body';
    var titleSpan = document.createElement('span');
    titleSpan.id = 'tmdb_reviews_title';
    var tmdbSpan = document.createElement('span');
    tmdbSpan.textContent = 'TMDB';
    tmdbSpan.style.color = '#50C2BF';
    titleSpan.appendChild(tmdbSpan);
    titleSpan.appendChild(document.createTextNode(' Reviews'));
    var avgRatingSpan = document.createElement('span');
    avgRatingSpan.id = 'average_rating';
    avgRatingSpan.textContent = 'Powered By TMDB Helper';
    avgRatingSpan.style.fontSize = '0.6em';
    panelHeading.appendChild(titleSpan);
    panelHeading.appendChild(avgRatingSpan);
    reviewPanel.appendChild(panelHeading);
    reviewPanel.appendChild(panelBody);
    var mainColumn = document.querySelector('.main-column');
    mainColumn.appendChild(reviewPanel);
    var filmTitle = document.querySelector("#content > div > h2").innerText;
    filmTitle = filmTitle.split('[')[0];
    filmTitle = filmTitle.trim();
    filmTitle = filmTitle.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    filmTitle = filmTitle.replace(/\s+/g,"+");
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + filmTitle,
        onload: function(response) {
            var searchResults = JSON.parse(response.responseText);
            if (searchResults.results.length > 0) {
                var filmId = searchResults.results[0].id;
                var reviewUrl = "https://api.themoviedb.org/3/movie/" + filmId + "/reviews?api_key=" + apiKey;
                console.log("API call URL for reviews: " + reviewUrl);
                GM_xmlhttpRequest({
                    method: "GET",
                    url: reviewUrl,
    onload: function(response) {
    var reviewResults = JSON.parse(response.responseText);
    reviewResults.results.forEach(function(review, index) {
        var reviewData = {
            author: review.author,
            rating: review.author_details.rating,
            content: review.content.replace(/_/g, ' ').replace(/</g, '[').replace(/>/g, ']'),
            url: review.url
        };
        var reviewElement = document.createElement('p');
        reviewElement.className = 'review-content';
        var authorLink = document.createElement('a');
        authorLink.href = review.url;
        authorLink.textContent = review.author + " - " + review.author_details.rating + "★";
        authorLink.style.fontSize = '1.5em';
        reviewElement.appendChild(authorLink);
        var toggleButton = document.createElement('button');
        toggleButton.textContent = '[+]';
        toggleButton.style.backgroundColor = 'transparent';
        toggleButton.style.border = 'none';
        toggleButton.style.color = '#afcfee';
        toggleButton.style.textDecoration = 'none';
        toggleButton.style.fontSize = '0.8em';
        toggleButton.style.paddingTop = '5px';
        toggleButton.style.float = 'right';
        toggleButton.onclick = function() {
            if (reviewElement.style.display === '-webkit-box') {
                reviewElement.style.display = 'block';
                toggleButton.textContent = '[-]';
            } else {
                reviewElement.style.display = '-webkit-box';
                toggleButton.textContent = '[+]';
            }
        };
        reviewElement.appendChild(toggleButton);
        reviewElement.appendChild(document.createElement('br'));
        var reviewContent = document.createTextNode(reviewData.content);
        reviewElement.appendChild(reviewContent);
        panelBody.appendChild(reviewElement);
        var style = document.createElement('style');
        style.innerHTML = `
            .review-content {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
                        });
                    }
                });
            }
        }
    });
});
