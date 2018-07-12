// Initialize Firebase
var config = {
    apiKey: "AIzaSyDp5lflCgUvJtGuH4zWUON6qVQcUhXun9E",
    authDomain: "trainschedule-789b1.firebaseapp.com",
    databaseURL: "https://trainschedule-789b1.firebaseio.com",
    projectId: "trainschedule-789b1",
    storageBucket: "trainschedule-789b1.appspot.com",
    messagingSenderId: "391234354738"
  };
  firebase.initializeApp(config);

//   reference to our firebase database
  var trainData = firebase.database();

  $("#addTrainBtn").on('click',function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    // moment.js
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

  var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,

    }

    trainData.ref().push(newTrain);

    alert("Train Added!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    pull();
    // return false;

  })

  // Collect data from firebase and store data

  function pull () {
  trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;

    var timeLeft = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - timeLeft;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(timeLeft);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td><td>");
  


  })
}

pull();
