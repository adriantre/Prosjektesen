function manageGroup(operation) {

    var xmlhttp = new XMLHttpRequest();
    var url = 'http://folk.ntnu.no/adrianto/prosjektesen/pushToDB.php/';
    // var url = 'https://still-coast-34661.herokuapp.com/pushToDB.php/';
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
                    var jsonData = JSON.parse(xmlhttp.responseText);
                    new_group_id = jsonData.currval;
                    localStorage.setItem("group_id", new_group_id);
                    alert('The new group code is ' + new_group_id + '. Give it to your friends so they can join!')
                    manageGroup('joinGroup');
                    // alert(xmlhttp.responseText);
                    // var jsonData = JSON.parse(xmlhttp.responseText);
                    // user_id = jsonData.currval;
                    // alert('user_id = ' + user_id);
                    // window.open("mapPage.html", "_self");
                    break;
                case 'getGroup':
                    var jsonData = JSON.parse(xmlhttp.responseText);
                    group_id = jsonData.group_id;
                    alert(group_id);
                    break;
                case 'getFriendLocations':
                    localStorage.setItem("FriendLocations", xmlhttp.responseText);
                    break;
                default:
                    var success = xmlhttp.responseText == "true" ? true : false;
                    // alert(success + " group");
                    break;
            }
        } catch(e) {
            // alert('Kunne ikke evaluere svaret fra DB ' + xmlhttp.responseText + ' ' + e.message + ' group');

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
        case 'joinGroup':
            var group = {
                'sqlopt': 'insert',
                'table': table+'_user',
                'values': [
                    {
                        'column': 'group_id',
                        'data': "'" + localStorage.getItem("group_id") + "'"
                    },
                    {
                        'column': 'user_id',
                        'data': "'" + localStorage.getItem("my_user_id") + "'"
                    }
                ]
            };
            break;   
         case 'getFriendLocations':
            var group = {
                'sqlopt': 'sql',
                'sql':'select g.group_name, u.user_name, l.location_name \
                        from public.group as g \
                            inner join public.group_user as gu\
                                on gu.group_id = g.group_id\
                            inner join public.user as u\
                                on gu.user_id = u.user_id\
                            inner join public.location as l\
                                on u.current_location_id = l.location_id\
                        where g.group_id in (\
                            select group_id\
                            from public.group_user\
                            where user_id =' + localStorage.getItem("my_user_id") +')\
                            and u.user_id <> ' + localStorage.getItem("my_user_id") +'\
                        order by g.group_name asc;'
                    }
            break; 
        case 'deleteGroup':
            var group = {
                'sqlopt': 'delete',
                'table': table,
                'conditions': [
                    {
                        'column': 'group_id',
                        'data': "'" + group_id + "'"
                    }
                ]
            };
            break;
    }
    var grouptext = JSON.stringify(group);
    xmlhttp.send(grouptext);
}