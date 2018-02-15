var gallery = document.getElementById("gallery");
var tags = [];

function addToGallery(key, imageUrl){
    var str = gallery.innerHTML;
    var newImg = "<div class='col-4'><a href='"+imageUrl+"'><img class='img-thumbnail' src='"+imageUrl+"'><div class='caption'>"+key+"</div></a></div>";
    gallery.innerHTML = str + newImg;
    classifyImage(imageUrl);
}

function addTag(tag){
    var ind = tags.length;
    tags.push(tag);
    console.log(tags);
    var modifyImg = gallery.getElementsByClassName("img-thumbnail")[ind];
    console.log(modifyImg);
    modifyImg.classList.add("img-"+tag);
}