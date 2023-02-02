var OMDBKey = "407da853";
var counter = 0;
var videoIdo;

function OMDBInfoRequest() {

    var queryParam = $("#find-input").val();
    var queryURL = "https://www.omdbapi.com/?t=" + queryParam + "&apikey=" + OMDBKey;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(OMDBObject) {
        // console.log(OMDBObject);
        displayInfo(OMDBObject);
      })
};

$("#find-movie").on("click", function(event) {
    event.preventDefault();
    OMDBInfoRequest();
    getTrailer();
   });

   
function displayInfo(arbitrary) {
    // console.log("hey");
    var discoverDiv = $("<div class='discover'>");
    var imageURL = arbitrary.Poster;
    var moviePoster = $("<img>").attr("src", imageURL);
    discoverDiv.append(moviePoster);
    var detailsDiv = $("<div class='details'>");
    var playerDiv = $("<div class='player'>")
    const keys = Object.keys(arbitrary);
    for (const key of keys) {
        if (counter === 13) break;
        var theDeets = $("<p>").text(arbitrary[key])
        detailsDiv.append(theDeets);
        // console.log(arbitrary[key]);
        counter++;
        discoverDiv.append(detailsDiv);
        discoverDiv.append(playerDiv);
    }
    $("#movies-view").append(discoverDiv);
}
    function getTrailer() {
        var queryParam = $("#find-input").val();
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + queryParam + " trailer&key=" + youtubeApiKey;
        console.log(queryParam)
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(youtubeObject) {
            videoIdo = youtubeObject.items[0].id.videoId;
            // console.log(videoIdo);
            // console.log(youtubeObject);
            console.log("this works");
            onYouTubeIframeAPIReady(youtubeObject)
          })
    };
    
    
    
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady(youtubeObject) {
    console.log(youtubeObject);
    videoIdo = youtubeObject.items[0].id.videoId;
player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoIdo,
    // switch back to videoIdo to get working again
    playerVars: {
    'playsinline': 1
    },
    // events: {
    // 'onReady': onPlayerReady,
    // 'onStateChange': onPlayerStateChange
    // }
});
}