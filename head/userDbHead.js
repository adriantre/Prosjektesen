function manageUser(operation) {

    var xmlhttp = new XMLHttpRequest();
    var url = 'http://folk.ntnu.no/adrianto/prosjektesen/pushToDB.php/';
    var user_id;
    var user_name = document.getElementById("user_name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pwd").value;
    var current_location_id;
    var geomessage;

    xmlhttp.open('POST', url, true);
 
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
 
    xmlhttp.onreadystatechange = function()
    {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        // var array = JSON.parse(xmlhttp.responseText);
        document.getElementById("errormessage") = xmlhttp.responseText;
      }
    }
    
    switch(operation) {
        case 'newUser':
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
            var user = {
                'sqlopt': 'select',
                'table': 'public.user',
                'to_select': [
                    {
                        'column': 'user_id'
                    },
                    {
                        'column': 'current_location_id'
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
            //return user_id, current_location_id, 
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