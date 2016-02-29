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
        alert("hei");
        document.getElementById('errormessage').innerHTML = xmlhttp.responseText;
      }
    }
    
    switch(operation) {
        case 'newUser':
            alert("Success");
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
        case 'verifyUser':
            alert("Success 2");
            alert("Success 1");
            if (user_name == ""){
                alert("Success4");
            }
            var user = {
                'sqlopt': 'select',
                'table': 'public.user',
                'to_select': [
                    {
                        'column': 'user_id'
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
            
            if (user_id == null){
                alert("DBFailure")
            }
            else{
                (window.open("mainmenu.html","_self"))
            }
            alert("Success 3");

            break;
        case 'getUser':
            alert("Success 1");
            if (user_name == ""){
                alert("Success4");
            }
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
            if (user_id == null){
                alert("DBFailure")
            }
            else{
                (window.open("mainmenu.html","_self"))
            }
            alert("Success 3");
            //return user_id, current_location_id,
            return user_id;
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