var navMenuVisible = false;


function toggleNavMenu(){
  if(portraitMode){
  if(navMenuVisible){
    navMenu.style.display = "none";
    navMenuVisible = false;
  }else{
      navMenu.style.display = "block";
      navMenuVisible = true;
  }
}
}


function scrollToElement(element){
  let elem = document.getElementById(element);
  elem.scrollIntoView({ behavior: 'smooth'});
  toggleNavMenu();
}
function updateDisplays(){

  let i = 0;
  let halfdocheight = $(window).height() / 3;
  let found = false;
  for(i = 0;i < navbuttons.length;i++){
    if(!found){
    if(pagecontents[i].getBoundingClientRect().bottom > halfdocheight){
      if(navbuttons[i].className != "activebutton"){
        navbuttons[i].className = "activebutton";
      }
      found = true;
    }else {
      if(navbuttons[i].className != "button"){
        navbuttons[i].className = "button";
      }
    }
  }else{
    if(navbuttons[i].className != "button"){
      navbuttons[i].className = "button";
    }
  }
  }
}



document.addEventListener('onThrottledScroll',function(e) {
  updateDisplays();
}
);
