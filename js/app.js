// Initialize Firebase
var config = {
	apiKey: "AIzaSyDE-oe6jwDbtq1S6fx-N5_DG3AFBjTinss",
	authDomain: "wild-fc8bb.firebaseapp.com",
	databaseURL: "https://wild-fc8bb.firebaseio.com",
	projectId: "wild-fc8bb",
	storageBucket: "wild-fc8bb.appspot.com",
	messagingSenderId: "299838869757"
};
firebase.initializeApp(config);

let ref = firebase.database().ref("users");

let data = {};
let map;
var markers = new Array();

ref.once('value', function(snapshot) {
	console.log(snapshot.val());
	for (var user in snapshot.val()) {
		var posts = snapshot.val()[user];

		data[user] = []; 
		var first = posts.first_name;
		var last = posts.last_name;
		
		for (var time in posts.posts) {
			var entry = posts.posts[time];
			// console.log(time);
			if (entry.url){
				data[user].push({
					"post_id": time,
					"first_name": first,
					"last_name": last,
					"timestamp": entry.timestamp,
					"img_url": entry.url,
					"lat": entry.lat,
					"lng": entry.lng
				});
			} else {
				data[user].push({
					"post_id": time,
					"first_name": first,
					"last_name": last,
					"timestamp": entry.timestamp,
					"lat": entry.lat,
					"lng": entry.lng
				});
			}
		}
	}
});

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 41.878159, lng: -87.629732},
	  zoom: 9
	});
}






