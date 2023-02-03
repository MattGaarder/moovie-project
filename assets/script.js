
var videoIdo;
var seenList = $("#seenList");
var watchList = $("#watchList");

$("#find-movie").on("click", function (event) {
    //moving all element generation inside find-movie button
    playerDiv = $("<div id='player'>");
    buttonDiv = $("<div id='buttonDiv'>");
    discoverDiv = $("<div class='discover'>");
    seenButton = $("<button id='seen'>");
    watchButton = $("<button id='watch'>");
    detailsDiv = $("<div class='details'>");
    $("#movies-view").append(discoverDiv);
    event.preventDefault();
    OMDBInfoRequest();
    getTrailer()
});

function OMDBInfoRequest() {
    var queryParam = $("#find-input").val();
    var queryURL = "https://www.omdbapi.com/?t=" + queryParam + "&apikey=" + OMDBKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (OMDBObject) {
        displayInfo(OMDBObject);
    })
};


function displayInfo(OMDBCall) {
    var imageURL = OMDBCall.Poster;
    var moviePoster = $("<img>").attr("src", imageURL);
    discoverDiv.append(moviePoster);
    const keys = Object.keys(OMDBCall);
    let i = 0;
    for (const key of keys) {
        if (i === 13) break;
        if (i === 3 || i === 7 || i === 11) {
            i++;
            continue;
        }
        var theDeets = $("<p>").text(OMDBCall[key]).addClass(key);
        detailsDiv.append(theDeets);
        i++;
    }
    movieObject = {
        Title: OMDBCall.Title,
        Year: OMDBCall.Year,
        Poster: OMDBCall.Poster,
    };
    console.log(movieObject);
    console.log(OMDBCall.Title);
    appendElements(movieObject);
    getTrailer();
};

function appendElements(OMDBCall) {
    discoverDiv.append(detailsDiv);
    discoverDiv.append(playerDiv);
    detailsDiv.append(buttonDiv);
    buttonDiv.append(watchButton);
    buttonDiv.append(seenButton);
    seenButton.on('click', function () {
        moveToSeen(OMDBCall);
    });
    watchButton.on('click', function () {
        moveToWatch(OMDBCall);
    });
}

function getTrailer() {
    var queryParam = $("#find-input").val();
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + queryParam + " trailer&key=" + youtubeApiKey;
    console.log(queryParam)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (youtubeObject) {
        videoIdo = youtubeObject.items[0].id.videoId;
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
    videoIdo = youtubeObject.items[0].id.videoId;
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoIdo,
        playerVars: {
            'playsinline': 1
        },
    });
}
function moveToSeen(movieObject) {
    console.log(movieObject);
    var seenArray = JSON.parse(localStorage.getItem("seenArray")) || [];
    for(var i = 0; i < seenArray.length; i++) {
        if(movieObject.Title === seenArray[i].Title) {
            return;
        }
    }
        clearArray(seenList);
        seenArray.push(movieObject);
        localStorage.setItem("seenArray", JSON.stringify(seenArray));
        createSeenArray();
}

function createSeenArray() {
    var seenArray = JSON.parse(localStorage.getItem("seenArray")) || [];
    for(var i = 0; i < seenArray.length; i++) {
        var seenItem = $("<li>");
        seenItem.text(seenArray[i].Title);
        seenList.append(seenItem);
    }
};
createSeenArray();

function moveToWatch(movieObject) {
    console.log(movieObject);
    var watchArray = JSON.parse(localStorage.getItem("watchArray")) || [];
    for(var i = 0; i < watchArray.length; i++) {
        if(movieObject.Title === watchArray[i].Title) {
            return;
        }
    }   
        clearArray(watchList)
        watchArray.push(movieObject);
        localStorage.setItem("watchArray", JSON.stringify(watchArray));
        createWatchArray();
}

function createWatchArray() {
    var watchArray = JSON.parse(localStorage.getItem("watchArray")) || [];
    for(var i = 0; i < watchArray.length; i++) {
        var watchItem = $("<li>");
        watchItem.text(watchArray[i].Title);
        watchList.append(watchItem);
    }
};
createWatchArray();

function clearArray(array) {
    array.empty();
}