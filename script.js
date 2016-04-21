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

	  osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
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
    var options = {
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
            shapeOptions: {
              color: 'purple'
            },
            allowIntersection: false,
            drawError: {
              color: 'orange',
              timeout: 1000
            }
          },
        },
    }

    drawControl = new L.Control.Draw(options);
    L.drawLocal.draw.handlers.polygon.tooltip.start = 'Plasser førse punkt';
    L.drawLocal.draw.handlers.polygon.tooltip.cont = 'Omring området med punkter';
    L.drawLocal.draw.handlers.polygon.tooltip.end = 'Når du er ferdig, avslutt i startpunktet';


    navigator.geolocation.getCurrentPosition(getUserPosition);
    manageUser('updateUserLocation');
      // tooltips
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();   
    });
    // Det som skjer når man har laget et polygon:
    map.on('draw:created', function (e) {
    var type = e.layerType;
    layer = e.layer;
    wkt = new Wkt.Wkt();
    wkt.fromObject(layer);
    console.log(wkt.components);
    // storeGeofence(wkt.write());
    drawnItems.addLayer(layer);
    $("#myLocation").modal();
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
  polygonDrawer = new L.Draw.Polygon(map, drawControl.options.draw.polygon).enable();
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

function logOutFunction() {
  localStorage.clear();
  window.open("startpage.html", "_self");
}

function openMainMenu() {
  window.open("mainmenu.html", "_self");
}

function openMapPage() {
  window.open("mapPage.html", "_self")
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
function showMyGroups(){
  manageGroup('getFriendLocations');
  var response = JSON.parse(localStorage.getItem("FriendLocations"));
  var myGroups = new Array();

  if(!(response.length > 0)) {
    alert("Du har ingen venner å vise!");
  }
  for(var i = 0; i < response.length; i++){
      var group_name = response[i].group_name;
      if(!(myGroups.indexOf(group_name) > -1)) {
          myGroups.push(group_name);
      }
  }

  for (var i = 0; i < myGroups.length; i++) {
      var membersArray = new Array();
      for (var j = 0; j < response.length; j++) {
          if(response[j].group_name == myGroups[i]) {
            var user_name = response[j].user_name;
            var location_name = response[j].location_name;
            // if(location_name == null) {
            //   location_name = "Ikke delt";
            // }
            membersArray.push([user_name, location_name]);
          }
      };
      document.getElementById("groupName".concat(i)).innerHTML = myGroups[i];
      generateTable(membersArray, "table".concat(i));
  };
  // generateTable([["Lars", "Skole"], ["Adrian", "Hjemme"], ["David", "Hjemme"]], "table1");
  // generateTable([["Øystein", "Skole"], ["Tormod", "Jobb"], ["Herman", "Hjemme"]], "table2");
  // generateTable([["Eivind", "Trening"], ["Sindre", "Skole"], ["Elias", "Hjemme"]], "table3");
}

function showMembersInGroup(group_id) {
  return manageGroup("getGroupMembers");
}

function generateTable(groupArray, chosen_table) {
   //Create a HTML Table element.
  var table = document.createElement("table");
  table.style.width='100%';
  var columnCount = groupArray[0].length; //det er to kolonner
  //Add the header row.
  var row = table.insertRow(-1);
  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "User";
  row.appendChild(headerCell);
  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "Location";
  row.appendChild(headerCell);  
  //Add the data rows.
  for (var i = 0; i < groupArray.length; i++) {
      row = table.insertRow(-1);
      for (var j = 0; j < columnCount; j++) {
          var cell = row.insertCell(-1);
          cell.innerHTML = groupArray[i][j];
      }
  }
  var dvTable = document.getElementById(chosen_table);
  dvTable.innerHTML = "";
  dvTable.appendChild(table);
  // return table;

}

function joinGroup(){
  localStorage.setItem("group_id", document.getElementById("check_group_name").value);
  manageGroup('joinGroup');
}

//------------------------------------------------------------//