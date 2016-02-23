var latitude, longitude;
var coords;
var map;
var popup = L.popup();
var layer;
var wkt;


function initialize() {
  // $("#success-alert").hide();
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

    // Det som skjer når man har laget et polygon:
    map.on('draw:created', function (e) {
    var type = e.layerType;
    layer = e.layer;

    wkt = new Wkt.Wkt();
    wkt.fromObject(layer);
    console.log(wkt.components);
    // storeGeofence(wkt.write());
    $("#myLocation").modal();
    drawnItems.addLayer(layer);
});


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

function cancelLocation() {
   map.removeLayer(this.layer);
}

function submitLocation() {
  map.removeLayer(this.layer);
  var location_name = document.getElementById("location_name").value;
  var geofence = wkt.write();
  var newLocation = new Location(location_name, geofence);
  localStorage.setItem("location_name", newLocation.getName());
  manageLocation('newLocation', newLocation);
  // document.getElementById('polygonCoords').innerHTML=wkt.write();
   // $("#success-alert").alert();
   // $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
   //    $("#success-alert").alert('close');
   // });
// setTimeout(function() {
//         $(".alert").alert('close');
//     }, 2000);
}