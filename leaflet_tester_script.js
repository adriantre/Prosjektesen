var latitude, longitude;
var coords;
var map;
var popup = L.popup();

function initialize() {
	var osmLayer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {subdomains: "abc", maxZoom: 20});
    var mapSettings = {layers: [osmLayer], attributionControl: false};
    map = L.map('map',mapSettings);
  	var baseMaps =
    	{
  	    "OpenStreetMap": osmLayer
      };
    // L.control.layers(baseMasps).addTo(map);

    map.on('click', onMapClick);

    // Initialise the FeatureGroup to store editable layers
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
          edit: false
        },
        draw: {
          polyline: false,
          rectangle: false,
          circle: false,
          marker: false,
          polygon: {
            allowIntersection: false,
            showArea: true
          }
        }
    });
    L.drawLocal.draw.toolbar.buttons.polygon = 'Avgrens et område med punkter';
    // L.drawLocal.draw.handlers.polygon.tooltip.start = 'Sett førse punkt';
    map.addControl(drawControl);
  	navigator.geolocation.getCurrentPosition(getUserPosition)


}

function getUserPosition(position) {
    coords =[];
    coords.push(position.coords.latitude);
    coords.push(position.coords.longitude);
  	
    L.marker(coords).addTo(map).bindPopup('Du er her!').openPopup();
    map.setView(coords, 13);
 }

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        // .setContent("You clicked the map at " + e.latlng.toString())
        // .openOn(map);
}