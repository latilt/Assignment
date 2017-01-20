var URL_LIST = {
  "position" : "http://jsonplaceholder.typicode.com/posts/1",
  "friend" : "http://jsonplaceholder.typicode.com/posts/2",
  "theme" : "http://jsonplaceholder.typicode.com/posts/3",
  "news" : "http://jsonplaceholder.typicode.com/posts/4"
};

var SWAP_LIST = {
  "nav" : "selectedTab",
  "section" : "eleDisplayShow"
};

function clickedNodeCheck(nodeObj) {
  if(nodeObj.classList.contains("tab")) {
    return nodeObj;
  } else {
    return clickedNodeCheck(nodeObj.parentElement);
  }
}

function swapClass(swapObj, targetClass) {
  swapObj.parentElement.querySelector("."+targetClass).classList.remove(targetClass);
  swapObj.classList.add(targetClass);
}

var selectedTab = document.querySelector("nav");
selectedTab.addEventListener("click", function(evt) {

  var clickedNode = clickedNodeCheck(evt.target);

  swapClass(clickedNode, SWAP_LIST.nav);

  var url = clickedNode.id;
  var sectionNode = document.querySelector("#my_" + url);

  swapClass(sectionNode, SWAP_LIST.section);

  if(!!!(sectionNode.children.length)) {
    ajax.open("GET", URL_LIST[url]);
    ajax.send();
  }
});

var ajax = new XMLHttpRequest();
ajax.addEventListener("load", function(res) {

  var resObj = JSON.parse(res.target.responseText);
  var displayNode = document.querySelector(".eleDisplayShow");

  displayNode.innerHTML = "<ul><li><div class='myName'>" + resObj.title + "</div><div class='myDesc'>" + resObj.body + "</div></li></ul>";
});
