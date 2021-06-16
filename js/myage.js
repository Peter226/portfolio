var dateNowAge = new Date();
let myAge = dateNowAge.getFullYear() - 2001;
if(dateNowAge.getMonth() > 4 || (dateNowAge.getMonth() == 4 && dateNowAge.getDate() >= 2)){
  myAge += 1;
}
document.write(myAge);
