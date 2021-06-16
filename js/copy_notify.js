let start;
let copy_notify_ticking = false;
const copyNoti = document.getElementById('copyMessage');
function revealCopyNotify(){
  copyNoti.style.opacity = "1";
  copyNoti.style.display = "block";

start = null;
  if(!copy_notify_ticking){
  window.requestAnimationFrame(animateCopyNotify);
  }
    copy_notify_ticking = true;

}
function animateCopyNotify(timestamp){

  if (start === undefined || start === null)
      start = timestamp;
      const elapsed = timestamp - start;
copyNoti.style.opacity = copyNoti.style.opacity - elapsed * 0.00004;
  if(copyNoti.style.opacity > 0){
    window.requestAnimationFrame(animateCopyNotify);

  }else{
    start = null;
    copyNoti.style.display = "none";
    copy_notify_ticking = false;
  }
}
