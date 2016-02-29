var user_id;
var user_name;
var password;
var email;
var current_location_id;
var geomessage;

function User(user_name, password)
{
	this.user_name = user_name;
	this.password = password;
	manageUser('getUser', this);
}

function User(user_id)
{
	this.user_id = user_id;
}
