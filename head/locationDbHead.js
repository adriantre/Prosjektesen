function manageLocation(operation) {

    var xmlhttp = new XMLHttpRequest();
    var url = 'http://folk.ntnu.no/adrianto/prosjektesen/pushToDB.php/';
    // var location_name = document.getElementById("location_name").value;
    // var geofence = wkt.write();
    // var creator_id = this.user_id;
    // document.getElementById('polygonCoords').innerHTML=geofence;
    var table = 'location';
    var location_name;

    xmlhttp.open('POST', url, true);
 
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
 
    xmlhttp.onreadystatechange = function()
    {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        try{
            switch(operation) {
                case 'newLocation':
                    var jsonData = JSON.parse(xmlhttp.responseText);
                    location_id = jsonData.currval;
                    alert('location_id = ' + location_id);
                    break;
                case 'getLocation':
                    var jsonData = JSON.parse(xmlhttp.responseText);
                    location_id = jsonData.location_id;
                    // current_location_id = jsonData.current_location_id;
                    // geomessage = jsonData.geomessage;  
                    alert('location_id = ' + location_id);                    
                    break;
                default:
                    var success = xmlhttp.responseText == "true" ? true : false;
                    alert(success);
                    break;
            }
        } catch(e) {
            alert('Kunne ikke evaluere svaret fra DB' + xmlhttp.responseText);

        }
      }
    }
    switch(operation) {
        case 'newLocation':
            location_name = document.getElementById("location_name").value;
            var location = {
                'sqlopt': 'insert',
                'table': table,
                'values': [
                    {
                        'column': 'location_name',
                        'data': "'" + location_name + "'"
                    },
                    {
                        'column': 'geofence',
                        'data': 'ST_GeomFromText(' + "'" + geofence + "'" + ')'
                    },
                    {
                        'column': 'creator_id',
                        'data': 195
                    },
                ]
            };
            break;
        case 'getLocation':
            var location = {
                'sqlopt': 'select',
                'table': table,
                'to_select': [
                    {
                        'column': 'location_name'
                    }
                ],
                'conditions': [
                    {
                        'column': 'location_name',
                        'data': "'" + location_name + "'"
                    },
                    {
                        'column': 'creator_id',
                        'data': creator_id
                    },
                ]
            };
            //return user_id, current_location_id, 
            break;
        case 'deleteLocation':
            var location = {
                'sqlopt': 'delete',
                'table': table,
                'conditions': [
                    {
                        'column': 'location_id',
                        'data': location_id
                    }
                ]
            };
            break;
        case 'updateLocation':
            var location = {
                'sqlopt': 'update',
                'table': table,
                'values': [
                    {
                        'column': 'location_name',
                        'data': "'" + location_name + "'"
                    }
                ],
                'conditions': [
                    {
                        'column': 'location_id',
                        'data': location_id
                    }
                ]
            };
            break;
    }
    var locationText = JSON.stringify(location);
    // document.getElementById('polygonCoords').innerHTML=locationText;
    xmlhttp.send(locationText);

    // document.location.href = "http://folk.ntnu.no/adrianto/prosjektesen/mapPage.html";
}