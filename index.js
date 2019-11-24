'use strict';

function getLyrics(){

var artistSearch = $('#artistSearch').value;
$('#lyrics').textContent = "";
  $.ajax({
    type: "GET",
    data: {
        apikey:"35dca821ba186e1444dd4cb881cc4bc6",
        q_artist: artistSearch,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/track.search",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
        console.log(data); 
        console.log(data.message.body.track_list[0].track.album_coverart_350x350)
        console.log(data.message.body.track_list[0].track.lyrics_id)
        var rand = data.message.body.track_list[Math.floor(Math.random() * data.message.body.track_list.length)];
        console.log(rand.track.track_id)
        var thisTrack = (rand.track.track_id)
        var thisPic = rand.track.album_coverart_350x350;
        console.log(thisPic)

        var p = $("p");
        p.textContent = thisTrack;
        p.id = thisTrack;

        var img = document.createElement("img")
        img.setAttribute("src",thisPic)

        $('#lyrics').append(img);
        $('#lyrics').append(p).style.opacity = 0;
        $('#ghost').click();

    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 };
 

 function getLyricsNow(){
    var trackId = $('#lyrics').textContent;
    console.log(trackId)
  $.ajax({
    type: "GET",
    data: {
        apikey:"35dca821ba186e1444dd4cb881cc4bc6",
        track_id: trackId,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
       console.log(data); console.log(data.message.body.lyrics.lyrics_body); 
      var lyricsBody = data.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ")+ "...";
       
        var j = document.createElement(`p`)
        j.textContent = lyricsBody
        $("#lyrics").appendChild(j)
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 };

 $(getLyricsNow);

 const apiKey = 'AIzaSyDDGwAYs26p40kdSf_gYO6d32TOqmsWLb4'; 
 const searchURL = 'https://www.googleapis.com/youtube/v3/search';
 
 
 function formatQueryParams(params) {
   const queryItems = Object.keys(params)
     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
   return queryItems.join('&');
 }
 
 function displayResults(responseJson) {
   console.log(responseJson);
   $('#results-list').empty();
   for (let i = 0; i < responseJson.items.length; i++){
     $('#results-list').append(
       `<li><h3>${responseJson.items[i].snippet.title}</h3>
       <p>${responseJson.items[i].snippet.description}</p>
       <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
       </li>`
     )}; 
   $('#results').removeClass('hidden');
 };
 
 function getYouTubeVideos(query, maxResults=10) {
   const params = {
     key: apiKey,
     q: query,
     part: 'snippet',
     maxResults,
     type: 'video'
   };
   const queryString = formatQueryParams(params)
   const url = searchURL + '?' + queryString;
 
   console.log(url);
 
   fetch(url)
     .then(response => {
       if (response.ok) {
         return response.json();
       }
       throw new Error(response.statusText);
     })
     .then(responseJson => displayResults(responseJson))
     .catch(err => {
       $('#js-error-message').text(`Something went wrong: ${err.message}`);
     });
 }
 
 function watchForm() {
   $('form').submit(event => {
     event.preventDefault();
     const searchTerm = $('#js-search-term').val();
     const maxResults = $('#js-max-results').val();
     getYouTubeVideos(searchTerm, maxResults);
   });
 }
 
 $(watchForm);