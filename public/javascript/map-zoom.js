var serpsmap;
var markersarray=[];
var serpsbounds;

var southWest;
var northEast;
var minLat;
var maxLat;
var minLon;
var maxLon;

var pointstoplot = [];
  
// FUNCTION    insertBubble
// DESCRIPTION create a bubble on a Google Map
// PARAMETERS  HTML for inside of bubble
// AUTHOR      Martin Little
// DATE        September 2011
insertBubble = function(bubbleHTML) {
	var infowindow = new google.maps.InfoWindow({
		content: bubbleHTML
	});	
	return infowindow;
}
  
// FUNCTION    insertMarker
// DESCRIPTION render marker on Google Map
// PARAMETERS  map - map object, long/lat - position, title, draggable - should this marker be draggable?
// AUTHOR      Martin Little
// DATE        September 2011
insertMarker = function(map, long, lat, title, draggable) {		
	var latLng = new google.maps.LatLng(lat, long);			
	if(draggable) {
		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			title: title
		});		
	} else {			
		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			title: title
		});
	}
	return marker;
}
  
// FUNCTION    insertMarkerWithBubble
// DESCRIPTION create marker with bubble etc.
// PARAMETERS  map - map object, long/lat - position, title & bubble HTML
// AUTHOR      Martin Little
// DATE        September 2011
insertMarkerWithBubble = function(map, long, lat, title, bubbleHTML) {
	var marker = insertMarker(map,long,lat,title,false);
	var infowindow = insertBubble(bubbleHTML);		
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
	return marker;
}
  
  // FUNCTION    initializeSerpsMap
// DESCRIPTION Render the SERPS overview map, and mark as rendered.
// PARAMETERS  none - various variables should already have been defined in calling code (e.g array of points to plot etc.)
// AUTHOR      Martin Little
// DATE        September 2011
initializeSerpsMap = function() {

	serpsmaploaded = true;

	serpsbounds = new google.maps.LatLngBounds();

	var mapOptions = {
		zoom: 20,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};
	
	var mapDiv = document.getElementById("mapresult");
	
	serpsmap = new google.maps.Map(mapDiv, mapOptions);		
	
	if(typeof pointstoplot == "undefined" || pointstoplot.length == 0) {
		
		// No points? Just show the UK
		var myLatLng = new google.maps.LatLng(53.3435233,-6.2840577);
		serpsmap.setCenter(myLatLng);

	} else {
       putPointsOnMap();
	}
	
}

var zoomedMapSearch = function(){

	 var bounds = serpsmap.getBounds();
	
	 southWest = bounds.getSouthWest();
	 northEast = bounds.getNorthEast();
	 minLat = southWest.lat();
	 maxLat = northEast.lat();
	 minLon = southWest.lng();
	 maxLon = northEast.lng();
			
	
	$.ajax({
    url: '/search/location/twolatlongs',
    type: 'GET',
    data: {"swlat": minLat, "swlong":minLon, "nelat":maxLat, "nelong":maxLon}
  }).done(function(data) { 
     
    	mapResults = JSON.stringify(data);
     
     	mapResults = JSON.parse(mapResults);
     	
     	// Clear out  the pointstoplot array.
     	pointstoplot = [];
		
		for (var i=0; i< mapResults.data.rows.length; i++) {
		 
			 Geopoints = mapResults.data.rows[i].doc.geopoint;
			 
			 Name = mapResults.data.rows[i].doc.name;
		 
			 // Create an array to store our lat/longs
			 var latlong = [];
			 
			 // Add to the latlong array
			 latlong.push(Geopoints.longitude, Geopoints.latitude, Name.formal_name);
			 
			 
			 // Add the array of lat longs to the points to plot array
			 pointstoplot.push(latlong);
			 
		}
	
	// Inititlize the map again
	initializeSerpsMap();
        
  }).fail(function(data) {
   		alert('fail');    
  });

}	

var whereMapSearch = function() {  
  
  var where = document.searchform.where.value;
  
  var apitype = document.searchform.apitype.value;
    
  var url = '/search/location/boundingbox';
  
  if (apitype=='usesearchable') {
     var url = 'search/location/string';
  }
    
  if (where) {
  
    $.ajax({
    url: url,
    type: 'GET',
    data: {"where": where}
  }).done(function(data) { 
     
    	mapResults = JSON.stringify(data);
     
     	mapResults = JSON.parse(mapResults);
     	
     	// Clear out  the pointstoplot array.
     	pointstoplot = [];
		
		for (var i=0; i< mapResults.data.rows.length; i++) {
		 
			 Geopoints = mapResults.data.rows[i].doc.geopoint;
			 
			 Name = mapResults.data.rows[i].doc.name;
		 
			 // Create an array to store our lat/longs
			 var latlong = [];
			 
			 // Add to the latlong array
			 latlong.push(Geopoints.longitude, Geopoints.latitude, Name.name);
			 
			 
			 // Add the array of lat longs to the points to plot array
			 pointstoplot.push(latlong);
			 
		}
	
	// Inititlize the map again
	initializeSerpsMap();
        
  }).fail(function(data) {
   		alert('fail');    
  });
  
  } else {
     alert("Please Enter a Search Location");
    
  } 

}

function putPointsOnMap() {
	
	// Clear any exiting pointers to stop the map zooming back into original position	
	clearMap();
	
	if (typeof pointstoplot != "undefined") {	
		for (var i=0; i<pointstoplot.length; i++) {
			var point = pointstoplot[i];
			var myLatLng = new google.maps.LatLng(point[1], point[0]);
			
			console.log(point);
						
			var marker = insertMarker(serpsmap,point[0],point[1],point[2]+" (Latitude : "+point[1]+" Longitude : " + point[0]+")",false);
			markersarray.push(marker); 	
			serpsbounds.extend(myLatLng);	      	
			if(pointstoplot.length == 1) {
				serpsmap.setCenter(myLatLng);		
			}    	
		}
		if(pointstoplot.length > 1) {
			serpsmap.fitBounds(serpsbounds);
		}
	}
}

function clearMap() {
 
 if (markersarray) {
    
    for (i in markersarray) {
        
        markersarray[i].setMap(null);
    }
    markersarray.length = 0;
  }
}