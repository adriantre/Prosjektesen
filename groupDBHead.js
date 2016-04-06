function manageGroup(operation) {

    var xmlhttp = new XMLHttpRequest();
    var url = 'http://folk.ntnu.no/adrianto/prosjektesen/pushToDB.php/';
    
    var group_name;
    var group_id;
    var table = 'group';

    xmlhttp.open('POST', url, true);
 
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
 
    xmlhttp.onreadystatechange = function()
    {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        try{
            switch(operation) {
                case 'newGroup':
                    alert(xmlhttp.responseText);
                    // var jsonData = JSON.parse(xmlhttp.responseText);
                    // user_id = jsonData.currval;
                    // alert('user_id = ' + user_id);
                    // window.open("mapPage.html", "_self");
                    break;
                case 'getGroup':
                    var jsonData = JSON.parse(xmlhttp.responseText);
                    group_id = jsonData.group_id;
                    //current_location_id = jsonData.current_location_id;
                    //geomessage = jsonData.geomessage;  
                    // alert('user_id = ' + user_id + ' current_location_id = ' + current_location_id + 'geomessage = ' + geomessage);                    
                    //window.open("mainmenu.html", "_self");
                    alert(group_id);
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
        case 'newGroup':
            group_name = document.getElementById("new_group_name").value;
            var group = {
                'sqlopt': 'insert',
                'table': table,
                'values': [
                    {
                        'column': 'group_name',
                        'data': "'" + group_name + "'"
                    }
                ]
            };
            break;
        case 'getGroup':
            group_name = document.getElementById("check_group_name").value;
            var group = {
                'sqlopt': 'select',
                'table': table,
                'to_select': [
                    {
                        'column': 'group_id'
                    }
                ],
                'conditions': [
                    {
                        'column': 'group_name',
                        'data': group_name
                    }
                ]
            };
            break;
        case 'deleteGroup':
            var group = {
                'sqlopt': 'delete',
                'table': table,
                'conditions': [
                    {
                        'column': 'group_id',
                        'data': group_id
                    }
                ]
            };
            break;
    }
    var grouptext = JSON.stringify(group);
    xmlhttp.send(grouptext);

}