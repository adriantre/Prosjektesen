function manageUser(operation) {

    var xmlhttp = new XMLHttpRequest();
    var url = 'http://folk.ntnu.no/adrianto/prosjektesen/pushToDB.php/';
    
    var user_id;
    var user_name;
    var email;
    var password;
    var current_location_id;
    var geomessage;

    xmlhttp.open('POST', url, true);
 
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
 
    xmlhttp.onreadystatechange = function()
    {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        try{
            switch(operation) {
                case 'newUser':
                    var jsonData = JSON.parse(xmlhttp.responseText);
                    user_id = jsonData.currval;
                    alert('user_id = ' + user_id);
                     break;
                case 'getUser':
                    var jsonData = JSON.parse(xmlhttp.responseText);
                    alert(jsonData);
                    user_id = jsonData.user_id;
                    current_location_id = jsonData.current_location_id;
                    geomessage = jsonData.geomessage;  
                    alert('user_id = ' + user_id);                    
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
        case 'newUser':
            user_name = document.getElementById("new_user_name").value;
            email = document.getElementById("new_email").value;
            password = document.getElementById("new_pwd").value;
            var user = {
                'sqlopt': 'insert',
                'table': 'public.user',
                'values': [
                    {
                        'column': 'user_name',
                        'data': user_name
                    },
                    {
                        'column': 'email',
                        'data': email
                    },
                    {
                        'column': 'password',
                        'data': password
                    },
                ]
            };
            break;
        case 'getUser':
            user_name = document.getElementById("login_user_name").value;
            password = document.getElementById("login_pwd").value;
            var user = {
                'sqlopt': 'select',
                'table': 'public.user',
                'to_select': [
                    {
                        'column': 'user_id'
                    },
                    {
                        'column': 'current_location_id'
                    },
                    {
                        'column': 'geomessage',
                    }
                ],
                'conditions': [
                    {
                        'column': 'user_name',
                        'data': user_name
                    },
                    {
                        'column': 'password',
                        'data': password
                    },
                ]
            };
            break;
        case 'deleteUser':
            var user = {
                'sqlopt': 'delete',
                'table': 'public.user',
                'conditions': [
                    {
                        'column': 'user_id',
                        'data': user_id
                    }
                ]
            };
            break;
        case 'updateUserLocation':
            var user = {
                'sqlopt': 'update',
                'table': 'public.user',
                'values': [
                    {
                        'column': 'current_location_id',
                        'data': current_location_id
                    }
                ],
                'conditions': [
                    {
                        'column': 'user_id',
                        'data': user_id
                    }
                ]
            };
            break;
        case 'updateUserGeomessage':
            var user = {
                'sqlopt': 'update',
                'table': 'public.user',
                'values': [
                    {
                        'column': 'geomessage',
                        'data': geomessage
                    }
                ],
                'conditions': [
                    {
                        'column': 'user_id',
                        'data': user_id
                    }
                ]
            };
            break;
    }
    var usertext = JSON.stringify(user);
    xmlhttp.send(usertext);

}