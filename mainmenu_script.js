// var demo = "Logout";
var t1;
var linebreak;
var t2;
function myInnFunction() {
    document.getElementById("demo").innerHTML;
    demo.className ="text";
    t1 = document.createTextNode("Log");
    demo.appendChild(t1);
    linebreak = document.createElement('br');
    demo.appendChild(linebreak);
    t2 = document.createTextNode("out");
    demo.appendChild(t2);
}
function myOutFunction(){
    document.getElementById("demo").innerHTML;
   demo.removeChild(t1);
   demo.removeChild(t2);
   demo.removeChild(linebreak);
    demo.className ="glyphicon glyphicon-off";
}

