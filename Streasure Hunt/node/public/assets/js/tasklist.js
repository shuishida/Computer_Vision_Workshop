// Create a "close" button and append it to each list item
var taskcontainer = document.getElementById("myUL");
var titlelist;
var gameStartBtn = document.getElementById("gameStartBtn");
var processImageBtn = document.getElementById("processImageBtn");
var gameResetBtn = document.getElementById("gameResetBtn");
var mytasklist;
var myNodelist;
var duringGame;

gameReset();

function setTaskTitle(){
    taskcontainer.innerHTML = "<li class='bg-success task-title'>Begin your treasure hunt!</li>";
    return taskcontainer.getElementsByTagName("LI")[0];
}

function gameStart() {
    var inittasklist = ["bus", "house"];
    var i;
    for(i = 0; i < inittasklist.length; i++){
        addTaskElement(inittasklist[i]);
    }
    processImageBtn.classList.remove("d-none");
    gameStartBtn.classList.add("d-none");
    duringGame = true;

    titlelist.classList.remove("bg-succeess");
    titlelist.classList.add("bg-warning");
    titlelist.innerHTML = "Keys you found so far: 0";

    var additionaltasklist = ["traffic", "taxi", "church", "school"];
    var id = setInterval(addMoreTasks, 10000);

    function addMoreTasks(){
        if(!duringGame || additionaltasklist.length == 0){
            clearInterval(id);
        } else {
            addTaskElement(additionaltasklist.shift());
            console.log(additionaltasklist);
        }
    }
}

// Create a new list item when clicking on the "Add" button
function addTaskElement(str) {
    var li = document.createElement("LI");
    li.innerHTML = str+"<div class='bar bg-success'></div>";
    taskcontainer.appendChild(li);
    mytasklist.push(str);
    myNodelist.push(li);
    movebar(li);
}

function findMatch(keys, imageUrl){
    var i;
    for(i = 0; i < mytasklist.length; i++){
        if(keys.indexOf(mytasklist[i])!=-1){
            foundkey(i, imageUrl);
        }
    }
}

function foundkey(i, imageUrl){
    var foundkeys = parseInt(titlelist.innerHTML.split(":")[1].trim());
    titlelist.innerHTML = "Keys you found so far: " + (foundkeys + 1);
    myNodelist[i].classList.add('checked');
    addToGallery(mytasklist[i], imageUrl);
    taskcontainer.removeChild(myNodelist[i]);
    mytasklist.splice(i,1);
    myNodelist.splice(i,1);
    if(mytasklist.length == 0){
        gameComplete();
    }
}


async function movebar(li) {
    var elem = li.getElementsByClassName("bar")[0]; 
    var width = 0;
    var id = setInterval(frame, 600);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            gameOver();
        } else if (!duringGame){
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%';
            if(width == 50){
                elem.classList.remove("bg-success");
                elem.classList.add("bg-warning");
            } else if(width == 80){
                elem.classList.remove("bg-warning");
                elem.classList.add("bg-danger");
            }
        }
    }
}

function gameOver(){
    var titlelist = taskcontainer.getElementsByTagName("LI")[0];
    titlelist.classList.remove("bg-warning");
    titlelist.classList.add("bg-danger");
    titlelist.innerHTML = "Game Over!";
    processImageBtn.classList.add("d-none");
    gameResetBtn.classList.remove("d-none");
    duringGame = false;
}

function gameComplete(){
    titlelist.classList.remove("bg-warning");
    titlelist.classList.add("bg-success");
    titlelist.innerHTML = "Mission Complete!";
    processImageBtn.classList.add("d-none");
    gameResetBtn.classList.remove("d-none");
    duringGame = false;
}

function gameReset(){
    
    mytasklist = [];
    myNodelist = [];
    duringGame = false;

    gameResetBtn.classList.add("d-none");
    gameStartBtn.classList.remove("d-none");
    titlelist = setTaskTitle();
}