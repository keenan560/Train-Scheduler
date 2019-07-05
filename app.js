
// Firebase setup
var firebaseConfig = {
    apiKey: "AIzaSyCbxoP9qONbJUSXKeaQ3LwpmhdKwSf5V4M",
    authDomain: "train-schedule-c98dd.firebaseapp.com",
    databaseURL: "https://train-schedule-c98dd.firebaseio.com",
    projectId: "train-schedule-c98dd",
    storageBucket: "train-schedule-c98dd.appspot.com",
    messagingSenderId: "697884478017",
    appId: "1:697884478017:web:d86502bb016e0edd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Train whistle mp3
var whistle = new Audio("salamisound-2271961-steam-locomotive-whistle.mp3");

// Code to validate First Train Time input
function validate(first) {
    if (first.length !== 5 || first.indexOf(":") === -1) {
        first = "";
        alert("Please enter the correct format HH:mm");
    } else {
        return first;
    }
}
// Code to add input to fire base
$(document).on("click", "#submit", function (event) {

    event.preventDefault();
    whistle.play();
    var trainName = $("#train").val().trim();
    var destiny = $("#destination").val().trim();
    var firstTrain = validate($("#first").val().trim());
    var frequency = $("#frequency").val().trim();


    var newTrain = {
        trainName: trainName,
        destination: destiny,
        firstTrain: firstTrain,
        frequency: frequency
    }


    database.ref().push(newTrain);

    $("#train").val("");
    $("#destination").val("");
    $("#first").val("");
    $("#frequency").val("");

})


// Code to grab data from Firebase and render to page



    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var name = childSnapshot.val().trainName;
        var dest = childSnapshot.val().destination;
        var firstT = childSnapshot.val().firstTrain;
        var freq = childSnapshot.val().frequency;

        console.log(name);
        console.log(dest);
        console.log(firstT);
        console.log(freq);
        
        var nextTrain = firstT;
      

        var newTrainRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(dest),
            $("<td>").text(freq),
            $("<td>").text(nextTrain),
            $("<td>").text(freq)
        )
        
        $("marquee").append(dest + " " + firstT + " ");
        $("tbody").append(newTrainRow);

    });


console.log(database.ref()) ;