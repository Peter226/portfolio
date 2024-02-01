const throttledScrollEvent = document.createEvent('Event');
throttledScrollEvent.initEvent('onThrottledScroll', true, true);

let ticking = false;
var navMenu;
$( document ).ready(function() {

  var boxhome = document.getElementById("boxhome");
  var boxabout = document.getElementById("boxabout");
  var boxskills = document.getElementById("boxskills");
  var boxprojects = document.getElementById("boxprojects");
  var boxcontact = document.getElementById("boxcontact");

  var navbuttonhome = document.getElementById("navbuttonhome");
  var navbuttonabout = document.getElementById("navbuttonabout");
  var navbuttonskills = document.getElementById("navbuttonskills");
  var navbuttonprojects = document.getElementById("navbuttonprojects");
  var navbuttoncontact = document.getElementById("navbuttoncontact");
  navMenu = document.getElementById("navitems");

  pagecontents = [boxhome,boxabout,boxskills,boxprojects,boxcontact];
  navbuttons = [navbuttonhome,navbuttonabout,navbuttonskills,navbuttonprojects,navbuttoncontact];

  document.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        document.dispatchEvent(throttledScrollEvent);
        ticking = false;
      });
      ticking = true;
    }
  });
  document.dispatchEvent(throttledScrollEvent);
});
