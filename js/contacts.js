function clickContact(contactType, contact){
  if(contactType == "copy"){
    let clipboardHelper = document.getElementById(contact);
    let copyNoti = document.getElementById("copyMessage");

    var body = document.body;
        var docEl = document.documentElement;
revealCopyNotify();
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    copyNoti.style.transform =
    "translate("+ (event.clientX) +"px ,"+(event.clientY + scrollTop - copyNoti.offsetHeight)+"px)";

    clipboardHelper.select();
    clipboardHelper.setSelectionRange(0, 99999);
    document.execCommand("copy");
    clipboardHelper.setSelectionRange(0, 0);
console.log("copied");
  }
  if(contactType == "link"){
    window.open("https://" + document.getElementById(contact).value);
console.log("opened link");
  }
}
