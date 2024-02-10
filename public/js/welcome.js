var writinw = false;
var lastChild;

function sleep(ms) {
  return new Promise(function (resolve){
     setTimeout(resolve, ms);
   }
 );
}

animateWelcome();

async function animateWelcome(){

var witer = 0;
var updater = setInterval(update, 200);


var welcomeText = document.getElementById("welcometxt");
var childContents = [];
var welcomeChildren = welcomeText.children;
for(var c = 0; c < welcomeChildren.length;c++){
  var child = welcomeChildren[c];
  childContents.push({div: child, text: child.innerHTML});
  child.innerHTML = "";
}


welcomeText.style.visibility = "visible";

for(var c = 0; c < welcomeChildren.length;c++){
  var childContent = childContents[c];
  var child = childContent.div;
  lastChild = child;
  var s = childContent.text;

  await sleep(100);
  for(var wchar = 1;wchar <= s.length;wchar++){
    if(s.charAt(wchar - 2) == '!'){
      writinw = false;
      await sleep(500);
    }
    if(s.charAt(wchar) + "" + s.charAt(wchar+1) == "😄"){
      writinw = false;
      await sleep(150);
    }
    if(s.charAt(wchar-1) + "" + s.charAt(wchar) == "😄"){
      wchar++;
    }
    writinw = true;
    if(s.charAt(wchar - 1) != '<'){
      child.innerHTML = s.substring(0,wchar) + '_';
    }
    await sleep(Math.random() * 30 + 20);
  }
  writinw = false;

  lastChild = null;
  child.innerHTML = childContent.text;
}
clearInterval(updater);

function update() {
  if(!writinw && lastChild != undefined && lastChild != null){
    var currentws = lastChild.innerHTML;
    let sslen = currentws.length - 1;
    if(witer % 2 == 1){
      if(currentws.charAt(sslen) != '_'){
        lastChild.innerHTML = currentws.substring(0,sslen - 1) + "_";
      }
    }else{
      lastChild.innerHTML = currentws.substring(0,sslen) + ' \u200b';
    }
    witer++;
  }
}




}
