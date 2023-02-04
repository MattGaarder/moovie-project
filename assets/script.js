
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
//The continue statement is similar to the break statement. Instead of exiting a loop,
// however, continue restarts a loop at the next iteration.
// When the continue statement is executed, the current iteration of the enclosing loop
// is terminated, and the next iteration begins.
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
        moveToList(OMDBCall, 'seen');
    });
    watchButton.on('click', function () {
        moveToList(OMDBCall, 'watch');
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


// The operands of the conditional operator may be of any type. The first operand is
// evaluated and interpreted as a boolean. If the value of the first operand is truthy, then
// the second operand is evaluated, and its value is returned. Otherwise, if the first
// operand is falsy, then the third operand is evaluated and its value is returned. Only
// one of the second and third operands is evaluated; never both.

function moveToList(movieObject, list) {
    var listArray = JSON.parse(localStorage.getItem(list + "Array")) || [];
    for(var i = 0; i < listArray.length; i++) {
        if(movieObject.Title === listArray[i].Title) {
            return;
        }
    }
        clearArray(list === 'seen' ? seenList : watchList);
        listArray.push(movieObject);
        localStorage.setItem(list + "Array", JSON.stringify(listArray));
        if (list === 'seen') {
            createSeenArray();
        } else {
            createWatchArray();
        }
}




function createSeenArray() {
    var seenArray = JSON.parse(localStorage.getItem("seenArray")) || [];
    for(var i = 0; i < seenArray.length; i++) {
        var seenItem = $("<li>");
        seenItem.text(seenArray[i].Title);
        seenItem.attr("data-title", seenArray[i].Title);
        seenItem.append('<button class="btn btn-danger btn-small delete-item-btn">Remove</button>');
        seenList.append(seenItem);
    }
};
createSeenArray();

function createWatchArray() {
    var watchArray = JSON.parse(localStorage.getItem("watchArray")) || [];
    for(var i = 0; i < watchArray.length; i++) {
        var watchItem = $("<li>");
        watchItem.text(watchArray[i].Title);
        watchItem.attr("data-title", watchArray[i].Title);
        watchItem.append('<button class="btn btn-danger btn-small delete-item-btn">Remove</button>');
        watchItem.append('<button class="btn btn-danger btn-small seen-item-btn">Seen</button>');
        watchList.append(watchItem);
    }
};
createWatchArray();

var watchArray;

function moveToSeen(event) {
    var seenArray = JSON.parse(localStorage.getItem("seenArray"));

    var moveToSeenObject = {
        Title: $(event.target).parent().data("title")
    }
    seenArray.push(moveToSeenObject);
    localStorage.setItem("seenArray", JSON.stringify(seenArray));
    clearArray(seenList);
    createSeenArray();
    var watchArray = JSON.parse(localStorage.getItem("watchArray"));
    for(var i = 0; i < watchArray.length; i++) {
        if(watchArray[i].Title === $(event.target).parent().data("title")){
            watchArray.splice(i, 1);
            break;
        }
    } 
    localStorage.setItem("watchArray", JSON.stringify(watchArray));
    clearArray(watchList);
    createWatchArray();
}

// so far this removes the item from the watchArray. I could a. remove the item with the removeItem function
// or b. save this new array to localStorage and then call the create watchArray again

function clearArray(array) {
    array.empty();
}

seenList.on('click', '.delete-item-btn', removeItem);
watchList.on('click', '.delete-item-btn', removeItem);
watchList.on('click', '.seen-item-btn', moveToSeen);

function removeItem(event) {
    var removeBtn = $(event.target);
    removeBtn.parent('li').remove();
    console.log(this);
};
// I want to create a move to seen button. This will have a moveToSeen function called on click. 
// The moveToSeen function needs to get the watch array from LocalStorage and find the film with the same key as the data-title of the div that is being clicked on 
// To do this the div will already have to have a recognisable data attribute applied to it. 
// I will have to iterate through the array till the data attribute and the key in the array match
// Once this is done I will have to store this index in a variable 
// I will then split? splice? slice? This from the array. 
// And then get the seen array from local storage and push the film that wants to be moved to the array and then I can call the createSeenArray.
// First step to do this is to figure out where to apply the data attribute. 

// function moveToWatch(movieObject) {
//     console.log(movieObject);
//     var watchArray = JSON.parse(localStorage.getItem("watchArray")) || [];
//     for(var i = 0; i < watchArray.length; i++) {
//         if(movieObject.Title === watchArray[i].Title) {
//             return;
//         }
//     }   
//     clearArray(watchList)
//     watchArray.push(movieObject);
//     localStorage.setItem("watchArray", JSON.stringify(watchArray));
//     createWatchArray();
// }
// var shoppingFormEl = $('#shopping-form');
// var shoppingListEl = $('#shopping-list');

// shoppingListItemEl.append(
//     '<button class="btn btn-danger btn-small delete-item-btn">Remove</button>'
//   );