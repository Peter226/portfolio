//project load queue
var projectQueue = [];
var loadingProject = false;


//load a project dynamically and append to the list
function loadProject(projectName){
  if(!loadingProject){
  loadingProject = true;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const project = JSON.parse(this.responseText);
      var appendToList = document.getElementById("projectlisting");
      listItem = document.createElement("LI");
      appendToList.appendChild(listItem);
      listItem.className = "projectlistitem";
      projectItem = document.createElement("DIV");
      listItem.appendChild(projectItem);
      projectItem.className = "projectitem";

      projectLink =document.createElement("A");
      projectLink.setAttribute("href",project.url);
      projectItem.appendChild(projectLink);
      projectLink.className = "projectlink";

      projectName = document.createElement("DIV");
      projectItem.appendChild(projectName);
      projectName.className = "projectname";
      projectName.innerHTML = project.title;
      projectImage = document.createElement("IMG");
      projectItem.appendChild(projectImage);
      projectImage.className = "projpic";
      projectImage.setAttribute("src",project.thumb);
      projectDesc = document.createElement("DIV");
      projectItem.appendChild(projectDesc);
      projectDesc.className = "projectdesc";
      projectDesc.innerHTML = project.desc;
    }
    loadingProject = false;
    if(projectQueue.length > 0){
      var nextProject = projectQueue[0];
      projectQueue.shift();
      loadProject(nextProject);
    }
  };
  xmlhttp.open("GET", "projects/"+projectName+"/config.json", true);
  xmlhttp.send();
  }else{
    projectQueue.push(projectName);
  }
}
