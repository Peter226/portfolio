var writinw = false;

function sleep(ms) {
  return new Promise(function (resolve){
     setTimeout(resolve, ms);
   }
 );
}

animateWelcome();

async function animateWelcome(){

var witer = 0;
var updater = setInterval(update, 500);

var s = document.getElementById("welcometxt").innerHTML;
document.getElementById("welcometxt").innerHTML = '_';
document.getElementById("welcometxt").style.visibility = "visible";

await sleep(1000);
for(var wchar = 1;wchar <= s.length;wchar++){
  if(s.charAt(wchar - 2) == '!'){
    writinw = false;
    await sleep(1000);
  }
  if(s.charAt(wchar) + "" + s.charAt(wchar+1) == "😄"){
    writinw = false;
    await sleep(1250);
  }
  if(s.charAt(wchar-1) + "" + s.charAt(wchar) == "😄"){
    wchar++;
  }
  writinw = true;
  if(s.charAt(wchar - 1) != '<'){
  document.getElementById("welcometxt").innerHTML = s.substring(0,wchar) + '_';
  }
  await sleep(Math.random() * 60 + 50);
}
writinw = false;




function update() {
if(!writinw){
var currentws = document.getElementById("welcometxt").innerHTML;
let sslen = currentws.length - 1;
if(witer % 2 == 1){
if(currentws.charAt(sslen) != '_'){
document.getElementById("welcometxt").innerHTML = currentws.substring(0,sslen - 1) + "_";
}
}else{
document.getElementById("welcometxt").innerHTML = currentws.substring(0,sslen) + ' \u200b';
}
witer++;
}
}




}
