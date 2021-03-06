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

let data = [];
let map;

ref.once('value', function(snapshot) {
	console.log(snapshot.val());
	for (var user in snapshot.val()) {
		var posts = snapshot.val()[user];

		// data[user] = []; 
		var first = posts.first_name;
		var last = posts.last_name;
		
		for (var time in posts.posts) {
			var entry = posts.posts[time];
			// console.log(time);
			if (entry.url){
				data.push({
					"user_id": user,
					"post_id": time,
					"first_name": first,
					"last_name": last,
					"timestamp": entry.timestamp,
					"img_url": entry.url,
					"lat": entry.lat,
					"lng": entry.lng
				});
			} else {
				data.push({
					"user_id": user,
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
}).then(function(res) {
	console.log(res.val());

	var bounds = new google.maps.LatLngBounds();
	var infoWindow = new google.maps.InfoWindow(), marker;

	for (var i = 0; i < data.length; i++) {
		console.log(data[i]);
		var position = new google.maps.LatLng(data[i].lat, data[i].lng);
		bounds.extend(position);
		marker = new google.maps.Marker({
			position: position,
			map: map,
			title: data[i].first_name
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				if (data[i].img_url) {
					infoWindow.setContent("<img src='"+data[i].img_url+"' height=100px width=100px>");
					infoWindow.open(map, marker);
				}
			}
		}) (marker, i));

		map.fitBounds(bounds);
	}

	// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(9);
        google.maps.event.removeListener(boundsListener);
    });
});

ref.on('value', function(snapshot) {
	var added = [];
	// console.log(snapshot.val());
	for (var user in snapshot.val()) {
		var posts = snapshot.val()[user];

		var first = posts.first_name;
		var last = posts.last_name;
		
		for (var time in posts.posts) {
			var entry = posts.posts[time];
			// console.log(time);
			if (entry.url){
				added.push({
					"user_id": user,
					"post_id": time,
					"first_name": first,
					"last_name": last,
					"timestamp": entry.timestamp,
					"img_url": entry.url,
					"lat": entry.lat,
					"lng": entry.lng
				});
			} else {
				added.push({
					"user_id": user,
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
	arraydiff(data, added);
})
// .then(function(res) {
// 	console.log(res);
// });

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 41.878159, lng: -87.629732},
	  zoom: 9
	});
}

function compare(a, b) {
	if (a && a.timestamp && b && b.timestamp) {
		if (a.timestamp < b.timestamp) {
			return -1;
		}
		if (a.timestamp > b.timestamp) {
			return 1;
		}
	}
	return 0;
}

function arraydiff(a, b) {
	var old = a.sort(compare);
	var diff = b.sort(compare);
	var res = diff.splice(0, old.length);
	if (res.length == 0) {
		return [];
	}
	else {
		console.log(res);
		data.push(res[0]);

		var bounds = new google.maps.LatLngBounds();
		var infoWindow = new google.maps.InfoWindow(), marker;

		for (var i = 0; i < res.length; i++) {
			console.log(res[i]);
			var position = new google.maps.LatLng(res[i].lat, res[i].lng);
			bounds.extend(position);
			marker = new google.maps.Marker({
				position: position,
				map: map,
				title: res[i].first_name
			});

			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					if (res[i].img_url) {
						infoWindow.setContent("<img src='"+res[i].img_url+"' height=100px width=100px>");
						infoWindow.open(map, marker);
					}
				}
			}) (marker, i));

			// map.fitBounds(bounds);
		}

		// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
	    // var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
	    //     //this.setZoom(9);
	        // google.maps.event.removeListener(boundsListener);
	    // });
	}
}





