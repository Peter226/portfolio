//project load queue

var projectQueue = [];
var loadingProject = false;

function downloadNextProject(){
  if(!loadingProject && projectQueue.length > 0){
    loadingProject = true;

    var nextProject = projectQueue[0];
    projectQueue.shift();
    var listItem = nextProject.anchor;
    projectName = nextProject.name;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const project = JSON.parse(this.responseText);
        
        listItem.className = "projectlistitem";
        projectItem = document.createElement("DIV");
        listItem.appendChild(projectItem);
        projectItem.className = "projectitem";
  
        projectLink = document.createElement("A");
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
      
      downloadNextProject();
    };
    xmlhttp.open("GET", "projects/"+projectName+"/config.json", true);
    xmlhttp.send();
  }
}


//load a project dynamically and append to the list
function loadProject(projectName, id){
  var appendToList = document.getElementById(id);
  listItem = document.createElement("LI");
  appendToList.appendChild(listItem);
  projectQueue.push({name: projectName, anchor: listItem});
  downloadNextProject();
}