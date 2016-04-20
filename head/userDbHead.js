function manageUser(operation) {

    var xmlhttp = new XMLHttpRequest();
    var url = 'http://folk.ntnu.no/adrianto/prosjektesen/pushToDB.php/';
    // var url = 'https://still-coast-34661.herokuapp.com/pushToDB.php/';
    var my_user_id;
    var user_id;
    var user_name;
    var email;
    var password;
    var current_location_id;
    var geomessage;
    var table = 'user';
    var current_location_id;

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
                    my_user_id = jsonData.currval;
                    localStorage.setItem("my_user_id", my_user_id);
                    window.open("mapPage.html", "_self");
                    break;
                case 'getUser':
                    var jsonData = JSON.parse(xmlhttp.responseText);
                    my_user_id = jsonData.user_id;
                    current_location_id = jsonData.current_location_id;
                    geomessage = jsonData.geomessage;
                    localStorage.setItem("my_user_id", my_user_id);
                    window.open("mapPage.html", "_self");
                    break;
                default:
                    var success = xmlhttp.responseText == "false" ? false : true;
                    // alert(success + " error?: [" + xmlhttp.responseText + "] userDbHead " + operation);
                    break;            
                }
        } catch(e) {
            alert('Kunne ikke evaluere svaret fra DB' + xmlhttp.responseText + ' user');
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
                'table': table,
                'values': [
                    {
                        'column': 'user_name',
                        'data': "'" + user_name + "'"
                    },
                    {
                        'column': 'email',
                        'data': "'" + email + "'"
                    },
                    {
                        'column': 'password',
                        'data': "'" + password + "'"
                    },
                ]
            };
            break;
        case 'getUser':
            user_name = document.getElementById("login_user_name").value;
            password = document.getElementById("login_pwd").value;
            var user = {
                'sqlopt': 'select',
                'table': table,
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
                        'data': "'" + user_name + "'"
                    },
                    {
                        'column': 'password',
                        'data': "'" + password + "'"
                    },
                ]
            };
            break;
        case 'deleteUser':
            var user = {
                'sqlopt': 'delete',
                'table': table,
                'to_select': [
                    {
                        'column': 'user_name'
                    },
                ],
                'conditions': [
                    {
                        'column': 'user_id',
                        'data': my_user_id
                    }
                ]
            };
            break;
        case 'getOtherUser':
            var user = {
                'sqlopt': 'select',
                'table': table,
                'to_select': [
                    {
                        'column': 'user_name'
                    },
                    {
                        'column': 'current_location_id'
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
        case 'updateUserLocation':
            //Bruker locationDbHead sin getCurrentLocation-funksjon
            my_user_id =localStorage.getItem("my_user_id");
            var check = function(){
            current_location_id = localStorage.getItem("current_location_id");
                if(current_location_id){
                    break;
                }
                else {
                    setTimeout(check, 1000); // check again in a second
                }
            }
            manageLocation('getCurrentLocation');
            check();
            var user = {
                'sqlopt': 'update',
                'table': table,
                'values': [
                    {
                        'column': 'current_location_id',
                        'data': current_location_id
                    }
                ],
                'conditions': [
                    {
                        'column': 'user_id',
                        'data': my_user_id
                    }
                ]
            };
            break;
        case 'updateUserGeomessage':
            var user = {
                'sqlopt': 'update',
                'table': table,
                'values': [
                    {
                        'column': 'geomessage',
                        'data': "'" + geomessage + "'"
                    }
                ],
                'conditions': [
                    {
                        'column': 'user_id',
                        'data': my_user_id
                    }
                ]
            };
            break;
    }
    var usertext = JSON.stringify(user);
    xmlhttp.send(usertext);

}