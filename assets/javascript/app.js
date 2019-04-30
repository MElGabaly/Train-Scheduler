
$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAtHMH6kP3bZub_Q0S_mvlPkGR0S7qZx6M",
        authDomain: "trainhomework-9b24f.firebaseapp.com",
        databaseURL: "https://trainhomework-9b24f.firebaseio.com",
        projectId: "trainhomework-9b24f",
        storageBucket: "trainhomework-9b24f.appspot.com",
        messagingSenderId: "631356520018"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // 2. Button for adding Employees
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var traindest = $("#destination-input").val().trim();
        var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
        var trainRate = $("#rate-input").val().trim();

        // Creates local "temporary" object for holding employee data
        var newTrain = {
            name: trainName,
            dest: traindest,
            start: trainStart,
            rate: trainRate
        };

        // Uploads employee data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.dest);
        console.log(newTrain.start);
        console.log(newTrain.rate);

        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#start-input").val("");
        $("#rate-input").val("");
    });

    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var dest = childSnapshot.val().dest;
        var trainStart = childSnapshot.val().start;
        var trainRate = childSnapshot.val().rate;

        // Employee Info
        console.log(trainName);
        console.log(dest);
        console.log(trainStart);
        console.log(trainRate);

        //   // Prettify the employee start
        var trainStartPretty = moment.unix(trainStart).format('LT')

        //   // Calculate the months worked using hardcore math
        //   // To calculate the months worked
        var ETAI = moment().diff(moment(trainStartPretty, "LT"), "minutes");
        var ETA = parseInt(ETAI)*-1;

        //   // Calculate the total billed rate
        //   var empBilled = empMonths * empRate;
        //   console.log(empBilled);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(dest),
            $("<td>").text(trainRate),
            $("<td>").text(trainStartPretty),
            $("<td>").text(ETA),
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });



});


