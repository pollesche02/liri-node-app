require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

console.log(process.argv)
var command = process.argv[2];
var parameter = process.argv.slice(3).join(" ") || "";
console.log(command,parameter)

function favoritebands(artist) {
  console.log("Let's find your favorite band");
  if (artist === "") {
    artist = "Hobbit";
  }
  var bandURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
    console.log(bandURL)
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
  if (song === "") {
    song = "The Sign";
}


spotify.search({ type: "track", query: song }, function (err, data) {
  if (err) {
    return console.log("error happened: " + err);
  }
//console.log(data.tracks.items[0])
  console.log("*************");
  console.log("Artist: " + data.tracks.items[0].artists[0].name);
  console.log("Song Name: " + data.tracks.items[0].name);
  console.log("Preview Link: " + data.tracks.items[0].preview_url);
  console.log("Album: " + data.tracks.items[0].album.name);
  console.log("*************");
});
}

function movies (movie) {
  if (movie === undefined) {
    movie = "Mr. Nobody";
  };
  var movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  console.log(movieURL)
  axios.get(movieURL).then(
    function (response) {
    //  console.log(response);
      console.log("Title: ", response.data.Title);
      console.log("Year Released: ", response.data.Year-Released);
      console.log("IMDB Rating: ", response.data.IMDB-Rating);
      console.log("Rotten Tomatoes Rating: ", response.data.Rotten-Tomatoes-Rating);
      console.log("Country Produced: ", response.data.Country-Produced);
      console.log("Language: ", response.data.Language);
      console.log("Plot: ", response.data.Plot);
      console.log("Actors: ", response.data.Actors);
      console.log("********************** ",);
    });

}
function doWhatItSays () {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if(err) {
      return console.log(err);
    }
    console.log(data)
    command = data.split(",")[0]
    topic= data.split(",")[1]
    menu(command,topic)
  });
    
}

function menu(command, parameter){

if (command === "concert-this") {
  favoritebands(parameter)
}

else if (command === "spotify-this-song") {
  songs(parameter)
}

else if (command === "movie-this") {
  movies(parameter)
}

else if (command === "do-what-it-says") {
  doWhatItSays()
} 
else {
  console.log("invalid choice");
  process.exit(0);
}
}

menu(command, parameter)