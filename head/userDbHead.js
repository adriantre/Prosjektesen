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
        try{
            //var jsonData = JSON.parse(xmlhttp.responseText);
            document.getElementById('errormessage').innerHTML = jsonData;
        } catch(e) {
            document.getElementById('errormessage').innerHTML = "unable to fetch data from DB";

        }
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
        case 'verifyUser':
            if (user_name == ""){
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
                alert("no user_id")
            }
            else{
                (window.open("mainmenu.html","_self"))
            }

            break;
        case 'getUser':
            if (user_name == ""){
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
                alert("no user_id")
            }
            else{
                (window.open("mainmenu.html","_self"))
            }
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
function formatResponse(xmlhttp) {
    var xmlDoc = xmlhttp.responseXML;
    document.getElementById("errormessage").innerHTML = xmlDoc;

}