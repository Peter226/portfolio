var last_vh = window.innerHeight * 0.01;
var last_vw = window.innerWidth * 0.01;
document.documentElement.style.setProperty('--vh', `${last_vh}px`);

var portraitMode = false;
if(window.innerHeight < window.innerWidth && window.innerWidth > 925){
    portraitMode = false;
}else{
  portraitMode = true;
}
window.addEventListener('resize', () => {
navMenuVisible = false;
if(window.innerHeight < window.innerWidth && window.innerWidth > 925){
    navMenu.style.display = "block";
    portraitMode = false;
}else{
  portraitMode = true;
  if(navMenuVisible){
    navMenu.style.display = "block";
  }else{
    navMenu.style.display = "none";
  }
}


  let vh = window.innerHeight * 0.01;
  let vw = window.innerWidth * 0.01;
  if((Math.abs(last_vh - vh) / last_vh) > 0.3 || vw != last_vw){
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    last_vh = vh;
    last_vw = vw;
  }
});
