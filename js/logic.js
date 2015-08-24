/* We should draw the house only once, so we better use MODULE pattern and create anonymous function to isolate the scope */
(function() {
	/* Class for describing house parts like a basement, a roof, a window(if any) etc. Each part can be drawn as polygon */ 
	function HousePart(options) {
		/* Color of the polygon */
		this.strokeColor = options.strokeColor || "black";
		/* Coordinates of the polygon */
		this.coords = options.coords || [];
		/* Map to draw new object */
		this.map = options.map || null;
		/* The polygon object. May be used in future if where will be a requirement to change the object */
		this.polygon = null;
	};

	/* Method to draw an object. The same for all polygons */
	HousePart.prototype.draw = function() {
		/* Construct the polygon. The polygon should not be filled */
		this.polygon = new google.maps.Polygon({
			paths: this.coords,
			strokeColor: this.strokeColor,
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillOpacity: 0
		});
		/* Place the polygon to the selected map */
		this.polygon.setMap(this.map);
	};

	/* Class for describing a house, can be defined as a set of house parts */
	function House(options) {
		/* Bounds and center of active viewport */
		var bounds = options.map.getBounds();
		var viewCenter = options.map.getCenter();
		/* Calculate values to draw the house right in the middle of the viewport */
		var viewWidth = Math.abs(bounds.getNorthEast().lat() - bounds.getSouthWest().lat());
		var viewHeight = Math.abs(bounds.getSouthWest().lng() - bounds.getNorthEast().lng());
		var wStep = Math.min(viewWidth, viewHeight) / 4;
		var hStep = wStep * 2;
		/* Create a roof of the house */
		var roof = new HousePart({
			strokeColor: "green",
			coords: [
			{lat: viewCenter.lat() + wStep, lng: viewCenter.lng() - hStep},
			{lat: viewCenter.lat() + hStep * 0.8, lng: viewCenter.lng()},
			{lat: viewCenter.lat() + wStep, lng: viewCenter.lng() + hStep},
			{lat: viewCenter.lat() + wStep, lng: viewCenter.lng() - hStep}
			],
			map: options.map
		});
		/* Create a basement of the house */
		var basement = new HousePart({
			strokeColor: "#A52A2A",
			coords: [
			{lat: viewCenter.lat() - wStep, lng: viewCenter.lng() - hStep},
			{lat: viewCenter.lat() - wStep, lng: viewCenter.lng() + hStep},
			{lat: viewCenter.lat() + wStep, lng: viewCenter.lng() + hStep},
			{lat: viewCenter.lat() + wStep, lng: viewCenter.lng() - hStep},
			{lat: viewCenter.lat() - wStep, lng: viewCenter.lng() - hStep}
			],
			map: options.map
		});

		/* To draw a house, draw all it's components */
		this.draw = function() {
			/* Draw the basement */
			basement.draw();
			/* And draw the roof */
			roof.draw();
		};
	};

	/* Initialize the map in the centre of Moscow */
	function initialize() {
		var mapCanvas = document.getElementById("map");
		var mapOptions = {
			center: new google.maps.LatLng(55.749792, 37.632495),
			zoom: 10
		}
		var gmap = new google.maps.Map(mapCanvas, mapOptions);
		/* Draw a house after the map was loaded */
		google.maps.event.addListenerOnce(gmap, "idle", function(){
			var house = new House({
				map: gmap
			}).draw();
		});
	};

	/* Prepare the map when scripts are ready */
	google.maps.event.addDomListener(window, "load", initialize);

})();
