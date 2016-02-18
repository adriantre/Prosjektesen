function createNewUser(operation) {

    var xmlhttp = new XMLHttpRequest();
    var url = 'http://folk.ntnu.no/adrianto/prosjektesen/pushToDB.php/';

    var user_id;
    var user_name = document.getElementById("user_name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pwd").value;
    var current_location_id;
    var geomessage;
    //validering

    xmlhttp.open('POST', url, true);
 
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
 
    xmlhttp.onreadystatechange = function()
    {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        document.getElementById("errormessage").innerHTML = xmlhttp.responseText;
        // Denne koden kalles når xmlhttp.send() er ferdig med å jobbe. Dette er en sånn fancy callback-funksjon.
        // Hvis fila "insertIntoDB.php" skriver ut noe etter at den er ferdig med å oppdatere databasen, kan dere lese ut det her f.eks.
        // Men dere trenger i utgangspunktet ikke å gjøre noe her.
      }
    }
    
    switch(operation) {}
        case 'newUser':
            var user = {
                'sqlopt': insert,
                'table': 'public.user',
                'data': [
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
            var usertext = JSON.stringify(user);
            xmlhttp.send(usertext);
            break;
        case 'getUser':
            var user = {
                'sqlopt': select,
                'table': 'public.user',
                'data': [
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
            //return user_id
            break;
        case 'deleteUser':
            var user = {
                'sqlopt': delete,
                'table': 'public.user',
                'data': [
                    {
                        'column': 'user_id',
                        'data': user_id
                    },
                ]
            };
            break;
        case 'updateUserLocation':
            var user = {
                'sqlopt': select,
                'table': 'public.user',
                'data': [
                    {
                        'column': 'user_id',
                        'data': user_id
                    },
                    {
                        'column': 'current_location_id',
                        'data': location
                    },
                ]
            };
            break;
        }
        case 'updateUserGeomessage':
        var user = {
                'sqlopt': select,
                'table': 'public.user',
                'data': [
                    {
                        'column': 'user_id',
                        'data': user_id
                    },
                    {
                        'column': 'geomessage',
                        'data': geomessage
                    },
                ]
            };
            break;
    }
    var usertext = JSON.stringify(user);
    xmlhttp.send(usertext);

    // document.location.href = "http://folk.ntnu.no/adrianto/prosjektesen/mapPage.html";
}