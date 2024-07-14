var load=document.getElementById("loading");

function loadfun(){
    load.style.display="none";
}

var hamburger=document.querySelector(".hamburger");
var nav_menu_list= document.querySelector(".nav_menu_list");
var arrows_cross= document.querySelector(".arrows-cross");

hamburger.onclick=function(){
    nav_menu_list.style.display="flex";
    hamburger.style.display="none";
    arrows_cross.style.display="block";
}

arrows_cross.onclick=function(){
    hamburger.style.display="block";
    arrows_cross.style.display="none";
    nav_menu_list.style.display="none";
}

var moon = document.querySelector(".moon");
var sun = document.querySelector(".sun");

moon.onclick=function() {
    document.body.style.backgroundColor = "#191a1a";
    document.body.style.color = "white";
    sun.style.display="block";
    moon.style.display="none";
}

sun.onclick=function() {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    sun.style.display="none";
    moon.style.display="block";
}