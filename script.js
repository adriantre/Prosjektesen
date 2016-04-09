//---------------------MAP PAGE----------------------//
var latitude, longitude;
var coords;
var coordsString;
var map;
var popup = L.popup();
var layer;
var wkt;
var geofence;
var location_name;

var drawControl;
var drawnItems;
var baseMaps;
var mapSettings;
var osmLayer;

var polygonDrawer;

function initializeMapPage() {

    initSideMenu();

	  osmLayer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {subdomains: "abc", maxZoom: 20});
    mapSettings = {layers: [osmLayer], attributionControl: false};
    map = L.map('map',mapSettings);
  	baseMaps =
    	{
  	    "OpenStreetMap": osmLayer
      };
    // L.control.layers(baseMasps).addTo(map);

    map.on('click', onMapClick);

    // Initialise the FeatureGroup to store editable layers
    drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    drawControl = new L.Control.Draw({
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
            drawError: {
            color: 'orange',
            timeout: 1000
          },
            showArea: true
          }
        }
    }).addTo(map);
    // L.drawLocal.draw.toolbar.buttons.polygon = 'Avgrens et område med punkter';
    L.drawLocal.draw.handlers.polygon.tooltip.start = 'Sett førse punkt';
    // map.addControl(drawControl);
  	navigator.geolocation.getCurrentPosition(getUserPosition)
    manageUser('updateUserLocation');
    // Det som skjer når man har laget et polygon:
    map.on('draw:created', function (e)) {
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
    coordsString = position.coords.longitude + " " + position.coords.latitude;

  	
    L.marker(coords).addTo(map).bindPopup('Du er her!' + coords).openPopup();
    map.setView(coords, 13);
    localStorage.setItem("myCurrentCoords", coordsString);
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
  // location_name = document.getElementById("location_name").value;
  geofence = wkt.write();
  document.getElementById('polygonCoords').innerHTML=geofence;
  // $("#myModal").modal();
  // var newLocation = new Location(location_name, geofence);
  // localStorage.setItem("location_name", location_name);
  manageLocation('newLocation');
   // $("#success-alert").alert();
   // $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
   //    $("#success-alert").alert('close');
   // });
// setTimeout(function() {
//         $(".alert").alert('close');
//     }, 2000);
}

function drawPolygon() {
  polygonDrawer = new L.Draw.Polygon(map, drawControl.options.polygon).enable();
}

function viewPolygons() {
    var geoPoly = Terraformer.WKT.parse(geofence); //Create Polygon from WKT
    if (geoPoly.type != "Polygon") {
        throw "Not a Polygon";
        return "";
    }
}

//--------------------SIDE MENU---------------------------//

function initSideMenu() {
// $(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    // overlay.click(function () {
    //   overlay_click();
    // });

    // function overlay_click() {
    //   if(isClosed == true) {
    //     overlay.hide();
    //     trigger.removeClass('is-open');
    //     trigger.addClass('is-closed');
    //     isClosed = false;
        
    //   }
    // }

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  

}

function getLogOutModal() {
    $("#logOutModal").modal();
}

//--------------------MAIN MENU---------------------------//

// var demo = "Logout";
var t1;
var linebreak;
var t2;
function myInnFunction() {
    document.getElementById("demo").innerHTML;
    demo.className ="text";
    t1 = document.createTextNode("Log");
    demo.appendChild(t1);
    linebreak = document.createElement('br');
    demo.appendChild(linebreak);
    t2 = document.createTextNode("out");
    demo.appendChild(t2);
}
function myOutFunction(){
    document.getElementById("demo").innerHTML;
   demo.removeChild(t1);
   demo.removeChild(t2);
   demo.removeChild(linebreak);
    demo.className ="glyphicon glyphicon-off";
}



//------------------------------------------------------------//