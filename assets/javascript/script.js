// Initialize Firebase
var config = {
	apiKey            : 'AIzaSyAswgmZ536I0ZtdFRx9OEhdhjft-ZFOyjM',
	authDomain        : 'employee-data-e4941.firebaseapp.com',
	databaseURL       : 'https://employee-data-e4941.firebaseio.com',
	projectId         : 'employee-data-e4941',
	storageBucket     : '',
	messagingSenderId : '811195306784'
};
firebase.initializeApp(config);
firebase.database.enableLogging(function(message) {
	//console.log("[FIREBASE]", message);
});
let database = firebase.database();
// { myKey: "this is the value", myKey2: "value", myKey3: "value"} myObject.myKey [{myKey: "value"}, {myKey: "value"}]
database.ref().on('value', function(snapshot) {
	console.log(snapshot.val());
	console.log(Object.keys(snapshot) + ' keys');
	newTrain = Object.keys(snapshot.val());
	for (i = 0; i < newTrain.length; i++) {
		var tableRow = $('<tr>');
		var trainName = $('<th>').html(snapshot.val()[newTrain[i]].newTrain.trainName);
		trainName.attr('scope', 'row');
		var destination = $('<td>').html(snapshot.val()[newTrain[i]].newTrain.destination);
		var frequency = $('<td>').html(snapshot.val()[newTrain[i]].newTrain.frequency);
		var nextArrivalTime = $('<td>').html(snapshot.val()[newTrain[i]].newTrain.nextArrivalTime);
		var minutesAway = $('<td>').html(snapshot.val()[newTrain[i]].newTrain.minutesAway);
		tableRow.append(trainName);
		tableRow.append(destination);
		tableRow.append(frequency);
		tableRow.append(nextArrivalTime);
		tableRow.append(minutesAway);
		$('#employeeTable').append(tableRow);
	}
});

function setup() {
	$('#submitTrain').on('click', function() {
		let trainName = $('#trainName').val();
		let destination = $('#destination').val();
		let frequency = $('#frequency').val();
		let firstTrainTime = $('#firstTrainTime').val();
		firstTimeConverted = moment(firstTrainTime, 'hh:mm').subtract(1, 'years');
		currentTime = moment();
		timeDifference = moment().diff(moment(firstTimeConverted), 'minutes');
		remainder = timeDifference % frequency;
		minutesAway = frequency - remainder;
		console.log(minutesAway);
		nextArrival = moment().add(minutesAway, 'minutes');
		nextArrivalTime = moment(nextArrival).format('hh:mm');
		console.log(nextArrivalTime);
		let newTrain = {
			trainName       : trainName,
			destination     : destination,
			frequency       : frequency,
			nextArrivalTime : nextArrivalTime,
			minutesAway     : minutesAway
		};
		console.log(newTrain);
		database.ref().push({
			newTrain
		});
	});
}
