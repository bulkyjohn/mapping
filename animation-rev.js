function initMap() {
	
	document.getElementById('carrier-start-desktop').readOnly = true;
	document.getElementById('carrier-start-mobile').readOnly = true;
	document.getElementById('shipper-start-desktop').readOnly = true;
	document.getElementById('shipper-start-mobile').readOnly = true;

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
		var address = document.getElementById('carrier-end-desktop').value;
		geocoder.geocode({'address': address}, function(results, status) {
			if (status === 'OK') {
				document.getElementById('carrier-submit-desktop').click();
				var map = new google.maps.Map(document.getElementById("map-desktop"), mapOptions);
				directionsDisplay.setMap(map, address);
				searchingAnimation(map, address);
				setTimeout(func, 10000);
				function func() {
					getDirections(map, directionsService, directionsDisplay, address, route_details, loaded_total, unloaded_total);
				}
			} else if (status === "INVALID_REQUEST") {
				swal("Invalid Location","Please enter a different destination.","warning");
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	});

	document.getElementById('shipper-trigger-desktop').addEventListener('click', function() {
		var geocoder = new google.maps.Geocoder();
		var result_details = document.getElementById('result-details-desktop');
		var number_of_carriers = document.getElementById('number-of-carriers-desktop');
		var estimated_total = document.getElementById('estimated-total-desktop');
		var address = document.getElementById('shipper-end-desktop').value;
		geocoder.geocode({'address': address}, function(results, status) {
			if (status === 'OK') {
				document.getElementById('shipper-submit-desktop').click();
				var map = new google.maps.Map(document.getElementById("map-desktop"), mapOptions);
				directionsDisplay.setMap(map, address);
				searchingAnimation(map, address);
				setTimeout(func, 10000);
				function func() {
					getShipperDirections(map, directionsService, directionsDisplay, address, result_details, number_of_carriers, estimated_total);
				}
			} else if (status === "INVALID_REQUEST") {
				swal("Invalid Location","Please enter a different destination.","warning");
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	});

	document.getElementById('carrier-trigger-mobile').addEventListener('click', function() {
		var geocoder = new google.maps.Geocoder();
		var route_details = document.getElementById('route-details-mobile');
		var loaded_total = document.getElementById('loaded-total-c-mobile');
		var unloaded_total = document.getElementById('unloaded-total-c-mobile');
		var address = document.getElementById('carrier-end-mobile').value;
		geocoder.geocode({'address': address}, function(results, status) {
			if (status === 'OK') {
				document.getElementById('carrier-submit-mobile').click();
				var map = new google.maps.Map(document.getElementById("map-c-mobile"), mapOptions);
				directionsDisplay.setMap(map, address);
				searchingAnimation(map, address);
				setTimeout(func, 10000);
				function func() {
					getDirections(map, directionsService, directionsDisplay, address, route_details, loaded_total, unloaded_total);
				}
			} else if (status === "INVALID_REQUEST") {
				swal("Invalid Location","Please enter a different destination.","warning");
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	});

	document.getElementById('shipper-trigger-mobile').addEventListener('click', function() {
		var geocoder = new google.maps.Geocoder();
		//var route_details = document.getElementById('route-details-mobile');
		var number_of_carriers = document.getElementById('number-of-carriers-mobile');
		var estimated_total = document.getElementById('estimated-total-mobile');
		var address = document.getElementById('shipper-end-mobile').value;
		geocoder.geocode({'address': address}, function(results, status) {
			if (status === 'OK') {
				document.getElementById('shipper-submit-mobile').click();
				var map = new google.maps.Map(document.getElementById("map-s-mobile"), mapOptions);
				directionsDisplay.setMap(map, address);
				searchingAnimation(map, address);
				setTimeout(func, 10000);
				function func() {
					getShipperDirections(map, directionsService, directionsDisplay, address, number_of_carriers, estimated_total);
				}
			} else if (status === "INVALID_REQUEST") {
				swal("Invalid Location","Please enter a different destination.","warning");
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	});

	activatePlacesSearch();
}

function activatePlacesSearch(){
	var CarrierInputDesktop = document.getElementById('carrier-end-desktop');
	var ShipperInputDesktop = document.getElementById('shipper-end-desktop');
	var CarrierInputMobile = document.getElementById('carrier-end-mobile');
	var ShipperInputMobile = document.getElementById('shipper-end-mobile');
	var options = {
		types: ['(cities)'],
		componentRestrictions: {country: "us"}
	};
	var autocompleteCarrier = new google.maps.places.Autocomplete(CarrierInputDesktop, options);
	var autocompleteShipper = new google.maps.places.Autocomplete(ShipperInputDesktop, options);
	var autocompleteCarrier = new google.maps.places.Autocomplete(CarrierInputMobile, options);
	var autocompleteShipper = new google.maps.places.Autocomplete(ShipperInputMobile, options);
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

function searchingAnimation(map, address){
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			destination = results[0].address_components[0].short_name + ", " + results[0].address_components[2].short_name;
			endHubReq = false;
			startLat = 36.1699;
			startLng = -115.1398;
			endLat = results[0].geometry.location.lat();
			endLng = results[0].geometry.location.lng();
			
			middleLat = (startLat + endLat)/2
			middleLng = (startLng + endLng)/2
			
			setTimeout(function() { newZoom(map, 3); }, 1000);
			setTimeout(function() { moveToLocation(map, startLat, startLng); }, 2500);
			setTimeout(function() { newZoom(map, 5); }, 4000);
			setTimeout(function() { moveToLocation(map, middleLat, middleLng); }, 5500);
			setTimeout(function() { newZoom(map, 4); }, 7000);
			setTimeout(function() { moveToLocation(map, endLat, endLng); }, 8500);
			setTimeout(function() { moveToLocation(map, middleLat, middleLng); }, 10000);

		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
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

function getDist(startLat,startLng,endLat,endLng) {
	var pi = Math.PI;
	var R = 6371; //equatorial radius

	var chLat = endLat-startLat;
	var chLng = endLng-startLng;

	var dLat = chLat*(pi/180);
	var dLng = chLng*(pi/180);

	var rLat1 = startLat*(pi/180);
	var rLat2 = endLat*(pi/180);

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

function getDirections(map, directionsService, directionsDisplay, address, route_details, loaded_total, unloaded_total) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			destination = results[0].address_components[0].short_name + ", " + results[0].address_components[2].short_name;
			endHubReq = false;
			startLat = 36.1699;
			startLng = -115.1398;
			endLat = results[0].geometry.location.lat();
			endLng = results[0].geometry.location.lng();
			
			startHub = find_closest_hub(startLat, startLng); //returns nearest Hub to origin
			endHub = find_closest_hub(endLat, endLng); //returns nearest Hub to destination

			var waypts = [];

			waypts.push({
				location: startHub.name,
				stopover: true
			});
		
			d = getDist(startLat,startLng,endLat,endLng)
			if (d > 1200 && d <= 2400) {
				endHubReq = true;
				middleLat = (startLat + endLat)/2;
				middleLng = (startLng + endLng)/2;

				waypts.push({
					location: find_closest_hub(middleLat,middleLng).name,
					stopover: true
				});
				waypts.push({
					location: find_second_closest_hub(middleLat,middleLng).name,
					stopover: true
				});
			} else if (d > 2400) {
				endHubReq = true;
				firstMidLat = (startLat*2 + endLat)/3;
				firstMidLng = (startLng*2 + endLng)/3;
				secondMidLat = (startLat + endLat*2)/3;
				secondMidLng = (startLng + endLng*2)/3;

				waypts.push({
					location: find_closest_hub(firstMidLat,firstMidLng).name,
					stopover: true
				});
				waypts.push({
					location: find_second_closest_hub(firstMidLat,firstMidLng).name,
					stopover: true
				});

				waypts.push({
					location: find_closest_hub(secondMidLat,secondMidLng).name,
					stopover: true
				});
				waypts.push({
					location: find_second_closest_hub(secondMidLat,secondMidLng).name,
					stopover: true
				});
			}

			addressComponents = results[0].address_components;
			enteredCity = "";
			addressComponents.forEach(addrComp => {
				if (addrComp.types[0] == "locality") {
					enteredCity += addrComp.long_name;
				}
				if (addrComp.types[0] == "administrative_area_level_1") {
					enteredCity += ", " + addrComp.short_name;
				}
			});

			if (endHub.name != enteredCity) {
				if (endHubReq == true) {
					waypts.push({
						location: endHub.name,
						stopover: true
					});
				}
			}	
			
			var request = {
				origin: new google.maps.LatLng(startLat,startLng),
				destination: address,
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
					for (var k = 0; k < waypts.length; k++) {
						if (k == 0 && k == ((waypts.length)-1)) {
							innerHTML += "Deadhead from Las Vegas, NV to " + waypts[k].location + " <span class=\"text-bulky-red text-semi-bold\">("+result.routes[0].legs[k].distance.text+")"+"</span><br>"
							innerHTML += "Loaded from "+ waypts[k].location +" to " + destination  + " <span class=\"text-bulky-blue text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
							unloadedTotal += result.routes[0].legs[k].distance.value;
							loadedTotal += result.routes[0].legs[k+1].distance.value;
						} else if (k == 0) {
							unloadedTotal += result.routes[0].legs[k].distance.value;
							innerHTML += "Deadhead from Las Vegas, NV to " + waypts[k].location + " <span class=\"text-bulky-red text-semi-bold\">("+result.routes[0].legs[k].distance.text+")"+"</span><br>"
							innerHTML += "Loaded from "+ waypts[k].location +" to " + waypts[k+1].location + " <span class=\"text-bulky-blue text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
						} else if (k == ((waypts.length)-1)) {
							if (Math.round(k/2)==k/2) {
								unloadedTotal += result.routes[0].legs[k].distance.value;
								loadedTotal += result.routes[0].legs[k+1].distance.value;
								innerHTML += "Loaded from " + waypts[k].location +" to " + destination + " <span class=\"text-bulky-blue text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
							} else {
								loadedTotal += result.routes[0].legs[k].distance.value;
								unloadedTotal += result.routes[0].legs[k+1].distance.value;
								innerHTML += "Deadhead from "+ waypts[k].location +" to " + destination + " <span class=\"text-bulky-red text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
							}
						} else if (Math.round(k/2)!=k/2) {
							loadedTotal += result.routes[0].legs[k].distance.value;
							innerHTML += "Deadhead from " + waypts[k].location +" to " + waypts[k+1].location + " <span class=\"text-bulky-red text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
						} else {
							unloadedTotal += result.routes[0].legs[k].distance.value;
							innerHTML += "Loaded from "+ waypts[k].location +" to " + waypts[k+1].location + " <span class=\"text-bulky-blue text-semi-bold\">("+result.routes[0].legs[k+1].distance.text+")"+"</span><br>"
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

		} else {

			alert('Geocode was not successful for the following reason: ' + status);

		}

		return endLocation = results[0].geometry.location.lat()+","+results[0].geometry.location.lng();

	});	
}

function getShipperDirections(map, directionsService, directionsDisplay, address, result_details, number_of_carriers, estimated_total) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			destination = results[0].address_components[0].short_name + ", " + results[0].address_components[2].short_name;
			endHubReq = false;
			startLat = 36.1699;
			startLng = -115.1398;
			endLat = results[0].geometry.location.lat();
			endLng = results[0].geometry.location.lng();
		
			d = getDist(startLat,startLng,endLat,endLng);

			num_carriers = Math.floor(Math.random() * 3) + 1

			low_cost_mile = Math.random()/2 + 2.01

			high_cost_mile = Math.random()/2 + 2.61
			
			var request = {
				origin: new google.maps.LatLng(startLat,startLng),
				destination: address,
				travelMode: google.maps.TravelMode.DRIVING
			};
		
			directionsService.route(request, function(result, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(result);
					computeTotalDistance(result);

					number_of_carriers.innerHTML = "<div id=\"number-of-carriers-desktop\" class=\"number-of-carriers text-bulky-blue\">" + num_carriers + "</div>"
					estimated_total.innerHTML = "<div id=\"estimated-total-desktop\" class=\"estimated-total text-bulky-blue\">$" + round(d*est_total_low) + " - $"+round(d*est_total_high)+"</div>"
					result_details.innerHTML = "<div id=\"result-details-desktop\" data-w-id=\"af6a265f-5d07-8ee6-961c-2794bb2d18b6\" class=\"shipper-result-details text-body text-left margin-top-15\">Total Distance: " + d + " mi<br><br>" + "Low $/mi: " + round(est_total_low,2) + "<br>High $/mi: " + round(est_total_high,2) + "</div>"

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

		} else {

			alert('Geocode was not successful for the following reason: ' + status);

		}

		return endLocation = results[0].geometry.location.lat()+","+results[0].geometry.location.lng();

	});	
}

//google.maps.event.addDomListener(window, 'load', initMap);
