function initMap() {

	var mapOptions = {
		center: {lat: 38.85, lng: -95.65},
		zoom: 1,
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		fullscreenControl: false,
		styles: styling
	};
	
	var directionsService = new google.maps.DirectionsService;

	var directionsDisplay = new google.maps.DirectionsRenderer({
		suppressPolylines: true,
		suppressMarkers: true
	});
	
	document.getElementById('carrier-trigger-desktop').addEventListener('click', function() {
		var geocoder = new google.maps.Geocoder();
		var route_details = document.getElementById('route-details-desktop');
		var loaded_total = document.getElementById('loaded-total-desktop');
		var unloaded_total = document.getElementById('unloaded-total-desktop');
		var start_address = document.getElementById('carrier-start-desktop').value;
		var end_address = document.getElementById('carrier-end-desktop').value;

		geocoder.geocode({'address': start_address}, function(start_results, start_status) {
			if (start_status === 'OK') {
				var start_lat = start_results[0].geometry.location.lat();
				var start_lng = start_results[0].geometry.location.lng();
				start_address = "";
				var startAddressComponents = start_results[0].address_components;
				startAddressComponents.forEach(addrComp => {
					if (addrComp.types[0] == "locality") {
						start_address += addrComp.long_name;
					}
					if (addrComp.types[0] == "administrative_area_level_1") {
						start_address += ", " + addrComp.short_name;
					}
				});

				geocoder.geocode({'address': end_address}, function(results, status) {
					if (status === 'OK') {
						var end_lat = results[0].geometry.location.lat();
						var end_lng = results[0].geometry.location.lng();
						end_address = "";
						addressComponents = results[0].address_components;
						addressComponents.forEach(addrComp => {
							if (addrComp.types[0] == "locality") {
								end_address += addrComp.long_name;
							}
							if (addrComp.types[0] == "administrative_area_level_1") {
								end_address += ", " + addrComp.short_name;
							}
						});

						document.getElementById('carrier-submit-desktop').click();
						var map = new google.maps.Map(document.getElementById("map-desktop"), mapOptions);
						directionsDisplay.setMap(map, start_address, end_address);
						searchingAnimation(map, start_lat, start_lng, end_lat, end_lng);
						setTimeout(func, 9000);
						function func() {
							getDirections(map, directionsService, directionsDisplay, start_address, start_lat, start_lng, end_address, end_lat, end_lng, route_details, loaded_total, unloaded_total);
						}
					} else if (status === "INVALID_REQUEST") {
						swal("Invalid End Location","Please enter a different destination.","warning");
					} else {
						alert('Geocode was not successful for the following reason: ' + status);
					}
				});
			} else if (start_status === "INVALID_REQUEST") {
				swal("Invalid Start Location","Please enter a different starting location.","warning");
			} else {
				alert('Geocode was not successful for the following reason: ' + start_status);
			}
		});
	});

	document.getElementById('shipper-trigger-desktop').addEventListener('click', function() {
		var geocoder = new google.maps.Geocoder();
		var result_details = document.getElementById('result-details-desktop');
		var number_of_carriers = document.getElementById('number-of-carriers-desktop');
		var estimated_total = document.getElementById('estimated-total-desktop');
		var start_address = document.getElementById('shipper-start-desktop').value;
		var end_address = document.getElementById('shipper-end-desktop').value;

		geocoder.geocode({'address': start_address}, function(start_results, start_status) {
			if (start_status === 'OK') {
				var start_lat = start_results[0].geometry.location.lat();
				var start_lng = start_results[0].geometry.location.lng();
				start_address = "";
				var startAddressComponents = start_results[0].address_components;
				startAddressComponents.forEach(addrComp => {
					if (addrComp.types[0] == "locality") {
						start_address += addrComp.long_name;
					}
					if (addrComp.types[0] == "administrative_area_level_1") {
						start_address += ", " + addrComp.short_name;
					}
				});

				geocoder.geocode({'address': end_address}, function(results, status) {
					if (status === 'OK') {
						var end_lat = results[0].geometry.location.lat();
						var end_lng = results[0].geometry.location.lng();
						end_address = "";
						addressComponents = results[0].address_components;
						addressComponents.forEach(addrComp => {
							if (addrComp.types[0] == "locality") {
								end_address += addrComp.long_name;
							}
							if (addrComp.types[0] == "administrative_area_level_1") {
								end_address += ", " + addrComp.short_name;
							}
						});

						document.getElementById('shipper-submit-desktop').click();
						var map = new google.maps.Map(document.getElementById("map-desktop"), mapOptions);
						directionsDisplay.setMap(map, start_address, end_address);
						searchingAnimation(map, start_lat, start_lng, end_lat, end_lng);
						setTimeout(func, 9000);
						function func() {
							getShipperDirections(map, directionsService, directionsDisplay, start_address, start_lat, start_lng, end_address, end_lat, end_lng, result_details, number_of_carriers, estimated_total);
						}
					} else if (status === "INVALID_REQUEST") {
						swal("Invalid End Location","Please enter a different destination.","warning");
					} else {
						alert('Geocode was not successful for the following reason: ' + status);
					}
				});
			} else if (start_status === "INVALID_REQUEST") {
				swal("Invalid Start Location","Please enter a different starting location.","warning");
			} else {
				alert('Geocode was not successful for the following reason: ' + start_status);
			}
		});
	});

	document.getElementById('carrier-trigger-mobile').addEventListener('click', function() {
		var geocoder = new google.maps.Geocoder();
		var route_details = document.getElementById('details-mobile');
		var loaded_total = document.getElementById('loaded-total-c-mobile');
		var unloaded_total = document.getElementById('unloaded-total-c-mobile');
		var start_address = document.getElementById('carrier-start-mobile').value;
		var end_address = document.getElementById('carrier-end-mobile').value;

		geocoder.geocode({'address': start_address}, function(start_results, start_status) {
			if (start_status === 'OK') {
				var start_lat = start_results[0].geometry.location.lat();
				var start_lng = start_results[0].geometry.location.lng();
				start_address = "";
				var startAddressComponents = start_results[0].address_components;
				startAddressComponents.forEach(addrComp => {
					if (addrComp.types[0] == "locality") {
						start_address += addrComp.long_name;
					}
					if (addrComp.types[0] == "administrative_area_level_1") {
						start_address += ", " + addrComp.short_name;
					}
				});

				geocoder.geocode({'address': end_address}, function(results, status) {
					if (status === 'OK') {
						var end_lat = results[0].geometry.location.lat();
						var end_lng = results[0].geometry.location.lng();
						end_address = "";
						addressComponents = results[0].address_components;
						addressComponents.forEach(addrComp => {
							if (addrComp.types[0] == "locality") {
								end_address += addrComp.long_name;
							}
							if (addrComp.types[0] == "administrative_area_level_1") {
								end_address += ", " + addrComp.short_name;
							}
						});
						
						document.getElementById('carrier-submit-mobile').click();
						var map = new google.maps.Map(document.getElementById("map-c-mobile"), mapOptions);
						directionsDisplay.setMap(map, start_address, end_address);
						searchingAnimation(map, start_lat, start_lng, end_lat, end_lng);
						setTimeout(func, 9000);
						function func() {
							getDirections(map, directionsService, directionsDisplay, start_address, start_lat, start_lng, end_address, end_lat, end_lng, route_details, loaded_total, unloaded_total);
						}
					} else if (status === "INVALID_REQUEST") {
						swal("Invalid End Location","Please enter a different destination.","warning");
					} else {
						alert('Geocode was not successful for the following reason: ' + status);
					}
				});
			} else if (start_status === "INVALID_REQUEST") {
				swal("Invalid Start Location","Please enter a different starting location.","warning");
			} else {
				alert('Geocode was not successful for the following reason: ' + start_status);
			}
		});
	});

	document.getElementById('shipper-trigger-mobile').addEventListener('click', function() {
		var geocoder = new google.maps.Geocoder();
		var result_details = document.getElementById('details-mobile');
		var number_of_carriers = document.getElementById('number-of-carriers-mobile');
		var estimated_total = document.getElementById('estimated-total-mobile');
		var start_address = document.getElementById('shipper-start-mobile').value;
		var end_address = document.getElementById('shipper-end-mobile').value;

		geocoder.geocode({'address': start_address}, function(start_results, start_status) {
			if (start_status === 'OK') {
				var start_lat = start_results[0].geometry.location.lat();
				var start_lng = start_results[0].geometry.location.lng();
				start_address = "";
				var startAddressComponents = start_results[0].address_components;
				startAddressComponents.forEach(addrComp => {
					if (addrComp.types[0] == "locality") {
						start_address += addrComp.long_name;
					}
					if (addrComp.types[0] == "administrative_area_level_1") {
						start_address += ", " + addrComp.short_name;
					}
				});

				geocoder.geocode({'address': end_address}, function(results, status) {
					if (status === 'OK') {
						var end_lat = results[0].geometry.location.lat();
						var end_lng = results[0].geometry.location.lng();
						end_address = "";
						addressComponents = results[0].address_components;
						addressComponents.forEach(addrComp => {
							if (addrComp.types[0] == "locality") {
								end_address += addrComp.long_name;
							}
							if (addrComp.types[0] == "administrative_area_level_1") {
								end_address += ", " + addrComp.short_name;
							}
						});

						document.getElementById('shipper-submit-mobile').click();
						var map = new google.maps.Map(document.getElementById("map-s-mobile"), mapOptions);
						directionsDisplay.setMap(map, start_address, end_address);
						searchingAnimation(map, start_lat, start_lng, end_lat, end_lng);
						setTimeout(func, 9000);
						function func() {
							getShipperDirections(map, directionsService, directionsDisplay, start_address, start_lat, start_lng, end_address, end_lat, end_lng, result_details, number_of_carriers, estimated_total);
						}
					} else if (status === "INVALID_REQUEST") {
						swal("Invalid End Location","Please enter a different destination.","warning");
					} else {
						alert('Geocode was not successful for the following reason: ' + status);
					}
				});
			} else if (start_status === "INVALID_REQUEST") {
				swal("Invalid Start Location","Please enter a different starting location.","warning");
			} else {
				alert('Geocode was not successful for the following reason: ' + start_status);
			}
		});
	});

	activatePlacesSearch();
}

function activatePlacesSearch(){
	var CarrierStartInputDesktop = document.getElementById('carrier-start-desktop');
	var ShipperStartInputDesktop = document.getElementById('shipper-start-desktop');
	var CarrierStartInputMobile = document.getElementById('carrier-start-mobile');
	var ShipperStartInputMobile = document.getElementById('shipper-start-mobile');

	var CarrierEndInputDesktop = document.getElementById('carrier-end-desktop');
	var ShipperEndInputDesktop = document.getElementById('shipper-end-desktop');
	var CarrierEndInputMobile = document.getElementById('carrier-end-mobile');
	var ShipperEndInputMobile = document.getElementById('shipper-end-mobile');
	var options = {
		types: ['(cities)'],
		componentRestrictions: {country: "us"}
	};
	var autocompleteCarrier = new google.maps.places.Autocomplete(CarrierStartInputDesktop, options);
	var autocompleteShipper = new google.maps.places.Autocomplete(ShipperStartInputDesktop, options);
	var autocompleteCarrier = new google.maps.places.Autocomplete(CarrierStartInputMobile, options);
	var autocompleteShipper = new google.maps.places.Autocomplete(ShipperStartInputMobile, options);

	var autocompleteCarrier = new google.maps.places.Autocomplete(CarrierEndInputDesktop, options);
	var autocompleteShipper = new google.maps.places.Autocomplete(ShipperEndInputDesktop, options);
	var autocompleteCarrier = new google.maps.places.Autocomplete(CarrierEndInputMobile, options);
	var autocompleteShipper = new google.maps.places.Autocomplete(ShipperEndInputMobile, options);
}

function getLatLng(addr, f){
	var geocoder = new google.maps.Geocoder();
	if(typeof addr != 'undefined' && addr != null) {
			geocoder.geocode( { address: addr, }, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					f(results);
				}
			});
	}
	return -1;
}

function searchingAnimation(map, start_lat, start_lng, end_lat, end_lng){
	middle_lat = (start_lat + end_lat)/2
	middle_lng = (start_lng + end_lng)/2
	
	setTimeout(function() { newZoom(map, 3); }, 1000);
	setTimeout(function() { moveToLocation(map, start_lat, start_lng); }, 2500);
	setTimeout(function() { newZoom(map, 5); }, 4000);
	setTimeout(function() { moveToLocation(map, middle_lat, middle_lng); }, 5500);
	setTimeout(function() { newZoom(map, 4); }, 7000);
	setTimeout(function() { moveToLocation(map, end_lat, end_lng); }, 8500);
	setTimeout(function() { moveToLocation(map, middle_lat, middle_lng); }, 10000);
}

function moveToLocation(map, lat, lng){
	var center = new google.maps.LatLng(lat, lng);
	// using global variable:
	map.panTo(center);
}

function newZoom(map, zoom){
	map.setZoom(zoom);
}

function moveMarker(map, marker, latlng) {
	marker.setPosition(latlng);
	map.panTo(latlng);
}

function find_closest_hub( lat1, lng1 ) {  
	var distances = [];
	var closest = -1;

	for( i=0;i<hubs.length; i++ ) {  
		var lat2 = hubs[i].lat;
		var lng2 = hubs[i].lng;

		d = getDist(lat1,lng1,lat2,lng2);

		distances[i] = d;

		if ( closest == -1 || d < distances[closest] ) {
				closest = i;
		}

	}
	
	return nearHub = hubs[closest];

}

function find_second_closest_hub( lat1, lng1 ) {  
	var distances = [];
	var closest = -1;
	var previousClosest = -1;

	for( i=0;i<hubs.length; i++ ) {  
		var lat2 = hubs[i].lat;
		var lng2 = hubs[i].lng;

		d = getDist(lat1,lng1,lat2,lng2);

		distances[i] = d;

		if ( closest == -1 || d < distances[closest] ) {
				previousClosest = closest;
				closest = i;
		}

	}
	
	return nearHub = hubs[previousClosest];

}

function getDist(start_lat,start_lng,end_lat,end_lng) {
	var pi = Math.PI;
	var R = 6371; //equatorial radius

	var chLat = end_lat-start_lat;
	var chLng = end_lng-start_lng;

	var dLat = chLat*(pi/180);
	var dLng = chLng*(pi/180);

	var rLat1 = start_lat*(pi/180);
	var rLat2 = end_lat*(pi/180);

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(rLat1) * Math.cos(rLat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;

	return d;
}

function computeTotalDistance(result) {
  var totalDist = 0;
  var myroute = result.routes[0];
  for (i = 0; i < myroute.legs.length; i++) {
    totalDist += myroute.legs[i].distance.value;
  }
  totalDist = Math.round(totalDist / 1601);
}

function round(value, precision) {
	var multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}

function getDirections(map, directionsService, directionsDisplay, start_address, start_lat, start_lng, end_address, end_lat, end_lng, route_details, loaded_total, unloaded_total) {
	endHubReq = false;
	
	startHub = find_closest_hub(start_lat, start_lng); //returns nearest Hub to origin
	endHub = find_closest_hub(end_lat, end_lng); //returns nearest Hub to destination

	var waypts = [];

	console.log(startHub.name)
	console.log(start_address)
	if (startHub.name != start_address) {
		waypts.push({
			location: startHub.name,
			stopover: true
		});
	} else {
		startHub = find_second_closest_hub(start_lat,start_lng)
		console.log(startHub.name)
		waypts.push({
			location: startHub.name,
			stopover: true
		});
	}

	d = getDist(start_lat,start_lng,end_lat,end_lng)
	if (d > 1200 && d <= 2400) {
		endHubReq = true;
		middle_lat = (start_lat + end_lat)/2;
		middle_lng = (start_lng + end_lng)/2;

		waypts.push({
			location: find_closest_hub(middle_lat,middle_lng).name,
			stopover: true
		});
		waypts.push({
			location: find_second_closest_hub(middle_lat,middle_lng).name,
			stopover: true
		});
	} else if (d > 2400) {
		endHubReq = true;
		first_middle_lat = (start_lat*2 + end_lat)/3;
		first_middle_lng = (start_lng*2 + end_lng)/3;
		second_middle_lat = (start_lat + end_lat*2)/3;
		second_middle_lng = (start_lng + end_lng*2)/3;

		waypts.push({
			location: find_closest_hub(first_middle_lat,first_middle_lng).name,
			stopover: true
		});
		waypts.push({
			location: find_second_closest_hub(first_middle_lat,first_middle_lng).name,
			stopover: true
		});

		waypts.push({
			location: find_closest_hub(second_middle_lat,second_middle_lng).name,
			stopover: true
		});
		waypts.push({
			location: find_second_closest_hub(second_middle_lat,second_middle_lng).name,
			stopover: true
		});
	}

	if (endHub.name != end_address) {
		if (endHubReq == true) {
			waypts.push({
				location: endHub.name,
				stopover: true
			});
		}
	}	
	
	var request = {
		origin: new google.maps.LatLng(start_lat,start_lng),
		destination: end_address,
		waypoints: waypts,
		optimizeWaypoints: true,
		travelMode: google.maps.TravelMode.DRIVING
	};

	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
			var innerHTML = "";
			var loadedTotal = 0;
			var unloadedTotal = 0;
			computeTotalDistance(result);
			

			if (route_details.id == "details-mobile") {
				for (var k = 0; k < waypts.length; k++) {
					if (k == 0 && k == ((waypts.length)-1)) {
						innerHTML += "Deadhead from " + start_address + " to " + waypts[k].location + " <span class=\"text-bulky-red text-semi-bold\"><br>("+result.routes[0].legs[k].distance.text+")"+"</span><br>"
						innerHTML += "Loaded from "+ waypts[k].location +" to " + end_address  + " <span class=\"text-bulky-blue text-semi-bold\"><br>("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
						unloadedTotal += result.routes[0].legs[k].distance.value;
						loadedTotal += result.routes[0].legs[k+1].distance.value;
					} else if (k == 0) {
						unloadedTotal += result.routes[0].legs[k].distance.value;
						innerHTML += "Deadhead from " + start_address + " to " + waypts[k].location + " <span class=\"text-bulky-red text-semi-bold\"><br>("+result.routes[0].legs[k].distance.text+")"+"</span><br>"
						innerHTML += "Loaded from "+ waypts[k].location +" to " + waypts[k+1].location + " <span class=\"text-bulky-blue text-semi-bold\"><br>("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
					} else if (k == ((waypts.length)-1)) {
						if (Math.round(k/2)==k/2) {
							unloadedTotal += result.routes[0].legs[k].distance.value;
							loadedTotal += result.routes[0].legs[k+1].distance.value;
							innerHTML += "Loaded from " + waypts[k].location +" to " + end_address + " <span class=\"text-bulky-blue text-semi-bold\"><br>("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
						} else {
							loadedTotal += result.routes[0].legs[k].distance.value;
							unloadedTotal += result.routes[0].legs[k+1].distance.value;
							innerHTML += "Deadhead from "+ waypts[k].location +" to " + end_address + " <span class=\"text-bulky-red text-semi-bold\"><br>("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
						}
					} else if (Math.round(k/2)!=k/2) {
						loadedTotal += result.routes[0].legs[k].distance.value;
						innerHTML += "Deadhead from " + waypts[k].location +" to " + waypts[k+1].location + " <span class=\"text-bulky-red text-semi-bold\"><br>("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
					} else {
						unloadedTotal += result.routes[0].legs[k].distance.value;
						innerHTML += "Loaded from "+ waypts[k].location +" to " + waypts[k+1].location + " <span class=\"text-bulky-blue text-semi-bold\"><br>("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
					}
				}
			} else {
				console.log(waypts)
				for (var k = 0; k < waypts.length; k++) {
					console.log(k)
					if (k == 0 && k == ((waypts.length)-1)) {
						console.log("Case 1")
						innerHTML += "Deadhead from " + start_address + " to " + waypts[k].location + " <span class=\"text-bulky-red text-semi-bold\">("+result.routes[0].legs[k].distance.text+")"+"</span><br>"
						innerHTML += "Loaded from "+ waypts[k].location +" to " + end_address  + " <span class=\"text-bulky-blue text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
						unloadedTotal += result.routes[0].legs[k].distance.value;
						loadedTotal += result.routes[0].legs[k+1].distance.value;
					} else if (k == 0) {
						console.log("Case 2")
						unloadedTotal += result.routes[0].legs[k].distance.value;
						innerHTML += "Deadhead from " + start_address + " to " + waypts[k].location + " <span class=\"text-bulky-red text-semi-bold\">("+result.routes[0].legs[k].distance.text+")"+"</span><br>"
						innerHTML += "Loaded from "+ waypts[k].location +" to " + waypts[k+1].location + " <span class=\"text-bulky-blue text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
					} else if (k == ((waypts.length)-1)) {
						if (Math.round(k/2)==k/2) {
							console.log("Case 3")
							unloadedTotal += result.routes[0].legs[k].distance.value;
							loadedTotal += result.routes[0].legs[k+1].distance.value;
							innerHTML += "Loaded from " + waypts[k].location +" to " + end_address + " <span class=\"text-bulky-blue text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
						} else {
							console.log("Case 4")
							loadedTotal += result.routes[0].legs[k].distance.value;
							unloadedTotal += result.routes[0].legs[k+1].distance.value;
							innerHTML += "Deadhead from "+ waypts[k].location +" to " + end_address + " <span class=\"text-bulky-red text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
						}
					} else if (Math.round(k/2)!=k/2) {
						console.log("Case 5")
						loadedTotal += result.routes[0].legs[k].distance.value;
						innerHTML += "Deadhead from " + waypts[k].location +" to " + waypts[k+1].location + " <span class=\"text-bulky-red text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
					} else {
						console.log("Case 6")
						unloadedTotal += result.routes[0].legs[k].distance.value;
						innerHTML += "Loaded from "+ waypts[k].location +" to " + waypts[k+1].location + " <span class=\"text-bulky-blue text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
					}
				}
			}

			route_details.innerHTML = "<div data-w-id=\"34af2989-14bc-d845-b530-a2bd6b6af1d9\" class=\"text-body text-left margin-top-15\">"+innerHTML+"</div>"
			loaded_total.innerHTML = "<h4 class=\"subheading margins-0 text-bulky-blue\">"+round(loadedTotal*0.000621371192, 1)+" mi</h4>"
			unloaded_total.innerHTML = "<div class=\"loading-total-distance text-bulky-red\">"+round(unloadedTotal*0.000621371192,1)+" mi</div>"

			var my_route = result.routes[0];

			for (var i = 0; i < my_route.legs.length; i++) {
				var marker = new google.maps.Marker({
					animation: google.maps.Animation.DROP,
					position: my_route.legs[i].start_location,
					label: "",
					map: map
				});
			}

			var marker = new google.maps.Marker({
				position: my_route.legs[i-1].end_location,
				label: "",
				map: map
			});

			// autoRefresh(map, result);

			var colors = ["#f37b6e", "#32aef2", "#f37b6e", "#32aef2", "#f37b6e", "#32aef2"];
			var strokeWeight = [6,2,6,2,6,2]
			var polylines = [];
			var bounds = new google.maps.LatLngBounds();
			for (var i = 0; i < polylines.length; i++) {
				polylines[i].setMap(null);
			}
			var legs = result.routes[0].legs;
			for (i = 0; i < legs.length; i++) {
				var steps = legs[i].steps;
				for (j = 0; j < steps.length; j++) {
					var nextSegment = steps[j].path;
					
						var stepPolyline = new google.maps.Polyline({
							path: [],
							geodesic : true,
							strokeColor: colors[i],
							strokeOpacity: 1.0,
							strokeWeight: strokeWeight[i],
							editable: false,
							map:map
					});

						var stepPolylineGlow = new google.maps.Polyline({
							path: [],
							geodesic : true,
							strokeColor: '#FFFFFF',
							strokeOpacity: 0.4,
							strokeWeight: (strokeWeight[i]+1),
							editable: false,
							map:map
						});
					
					for (k = 0; k < nextSegment.length; k++) {
						stepPolyline.getPath().push(nextSegment[k]);
						bounds.extend(nextSegment[k]);
					}
					polylines.push(stepPolyline);
					stepPolyline.setMap(map);
				}
			}
			map.fitBounds(bounds);

		}
	});
}

function getShipperDirections(map, directionsService, directionsDisplay, start_address, start_lat, start_lng, end_address, end_lat, end_lng, result_details, number_of_carriers, estimated_total) {
	d = getDist(start_lat,start_lng,end_lat,end_lng);

	num_carriers = Math.floor(Math.random() * 3) + 1

	low_cost_mile = Math.random()/2 + 2.01

	high_cost_mile = Math.random()/2 + 2.61
	console.log('1')
	var request = {
		origin: new google.maps.LatLng(start_lat,start_lng),
		destination: end_address,
		travelMode: google.maps.TravelMode.DRIVING
	};
	console.log('2')
	directionsService.route(request, function(result, status) {
		console.log('3')
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
			computeTotalDistance(result);

			document.getElementById('label-mobile').innerHTML = "<div id=\"label-mobile\" class=\"text-body text-large\">Match Details</div>"
			number_of_carriers.innerHTML = "<div id=\"number-of-carriers-desktop\" class=\"number-of-carriers text-bulky-blue\">" + num_carriers + "</div>"
			estimated_total.innerHTML = "<div id=\"estimated-total-desktop\" class=\"estimated-total text-bulky-blue\">$" + round(d*low_cost_mile) + " - $"+round(d*high_cost_mile)+"</div>"
			result_details.innerHTML = "<div data-w-id=\"34af2989-14bc-d845-b530-a2bd6b6af1d9\" class=\"text-body text-left margin-top-15\">Total Distance: " + round(d/1.60934,1) + " mi<br><br>" + "Low cost/mile: $" + parseFloat(round(low_cost_mile,2).toFixed(2))  + "<br>High cost/mile: $" + parseFloat(round(high_cost_mile,2).toFixed(2)) + "</div>"

			var my_route = result.routes[0];

			for (var i = 0; i < my_route.legs.length; i++) {
				var marker = new google.maps.Marker({
					animation: google.maps.Animation.DROP,
					position: my_route.legs[i].start_location,
					label: "",
					map: map
				});
			}

			var marker = new google.maps.Marker({
				position: my_route.legs[i-1].end_location,
				label: "",
				map: map
			});

			// autoRefresh(map, result);

			var colors = ["#32aef2", "#f37b6e", "#32aef2", "#f37b6e", "#32aef2"];
			var strokeWeight = [6,2,6,2,6,2]
			var polylines = [];
			var bounds = new google.maps.LatLngBounds();
			for (var i = 0; i < polylines.length; i++) {
				polylines[i].setMap(null);
			}
			var legs = result.routes[0].legs;
			for (i = 0; i < legs.length; i++) {
				var steps = legs[i].steps;
				for (j = 0; j < steps.length; j++) {
					var nextSegment = steps[j].path;
					
						var stepPolyline = new google.maps.Polyline({
							path: [],
							geodesic : true,
							strokeColor: colors[i],
							strokeOpacity: 1.0,
							strokeWeight: strokeWeight[i],
							editable: false,
							map:map
					});

						var stepPolylineGlow = new google.maps.Polyline({
							path: [],
							geodesic : true,
							strokeColor: '#FFFFFF',
							strokeOpacity: 0.4,
							strokeWeight: (strokeWeight[i]+1),
							editable: false,
							map:map
						});
					
					for (k = 0; k < nextSegment.length; k++) {
						stepPolyline.getPath().push(nextSegment[k]);
						bounds.extend(nextSegment[k]);
					}
					polylines.push(stepPolyline);
					stepPolyline.setMap(map);
				}
			}
			map.fitBounds(bounds);

		}
	});
}

//google.maps.event.addDomListener(window, 'load', initMap);
