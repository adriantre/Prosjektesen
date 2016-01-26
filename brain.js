function capsRage() {
	var text = document.getElementById('oppgave1').innerHTML;
	document.getElementById('oppgave1').innerHTML=text.toUpperCase();
}
function reverse() {
	var reversed ="";
	var text = document.getElementById('oppgave1').innerHTML;
	for (var i = text.length - 1; i >= 0; i--) {
		reversed = reversed.concat(text[i]);
	}
	document.getElementById('oppgave1').innerHTML=reversed;
}
function appendToText() {
	var text = document.getElementById('oppgave1').innerHTML.concat(document.getElementById('tekstfelt').value);
	document.getElementById('oppgave1').innerHTML=text;
}
function runTimer() {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	if (hours.length < 2) {
		hours = "0".concat(hours);
	}
	if (minutes < 2) {
		minutes = "0".concat(minutes);
	}
	document.getElementById('date').innerHTML = hours + ":" + minutes;
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("pos").innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    document.getElementById("pos").innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
    var latlon=position.coords.latitude+","+position.coords.longitude;

    var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("map").innerHTML="<img src='"+img_url+"'>";
}
function showError(error)
{
    switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      doc.innerHTML="Request for Geolocation denied by the user."
      break;
    case error.POSITION_UNAVAILABLE:
      doc.innerHTML="Unavailable location information."
      break;
    case error.TIMEOUT:
      doc.innerHTML="Location request timed out."
      break;
    case error.UNKNOWN_ERROR:
      doc.innerHTML="UNKNOWN_ERROR."
      break;
    }
}