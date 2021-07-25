var skillmasonry;
window.onload = (event) => {
const skillgrid = document.getElementById('skillgrid');
    loadMasonry();
};
//init masonry or refresh it when portrait mode changes to landscape
function loadMasonry(){
  if(skillmasonry != null){
    skillmasonry.destroy();
  }
  skillmasonry = new Masonry(skillgrid, {
  fitWidth: true
});
}
