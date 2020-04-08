require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var parameter = process.argv.slice(3).join(" ") || "";

function favoritebands(artist) {
  console.log("Artist", artist, "string");
  if (artist === "") {
    artist === "Coldplay";
  }
  var bandURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios.get(bandURL).then(function (response) {
    var concerts = response.data;

    for (let i = 0; i < concerts.length; i++) {
      console.log("venue: " + concerts[i].venue.name);
      console.log(
        "Location: " + concerts[i].venue.city + "," + concerts[i].venue.country
      );
      console.log("Date: " + moment(concerts[i].datetime).format("MM/DD/YYY"));
    }
  });
}
function mapartist(artist) {
  return artist.name;
}
function songs(song) {
  if (song === "") song = "Yellow";
}

spotify.search({ type: "track", query: sont }, function (err, data) {
  if (err) {
    return console.log("error happened: " + err);
  }

  console.log("*************");
  console.log("Artist: " + data.tracks.items[0].artist.name);
  console.log("Song Name: " + data.tracks.items[0].name);
  console.log("Preview Link: " + data.tracks.items[0].preview_url);
  console.log("Album: " + data.tracks.items[0].album.name);
  console.log("*************");
});

function movies (movie) {
  if (movie === undefined) {
    movie = "Pride & Predjudice";
  };
  var movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey+trilogy";
  axios.get(movieURL).then(
    function (response) {
      console.log(response);
      console.log("Title: ",);
      console.log("Year Released: ",);
      console.log("IMDB Rating: ",);
      console.log("Rotten Tomatoes Rating: ",);
      console.log("Country Produced: ",);
      console.log("Language: ",);
      console.log("Plot: ",);
      console.log("Actors: ",);
      console.log("********************** ",);
    });

}
function doWhat () {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if(err) {
      return console.log(err);
    }});
}

if (command === "concert-this") {
  bandsintown(parameter)
}

else if (command === "spotify-this-song") {
  songs(parameter)
}

else if (command === "movie-this") {
  movies(parameter)
}

else if (command === "do-what-it-says") {
  doWhat()
} 
else {
  console.log("invalid choice");
  process.exit(0);
}
