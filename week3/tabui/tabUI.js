document.addEventListener("DOMContentLoaded", function() {
  tabUi.init();
});

var tabUi = {
  URL_LIST : {"position" : "http://jsonplaceholder.typicode.com/posts/1",
              "friend" : "http://jsonplaceholder.typicode.com/posts/2",
              "theme" : "http://jsonplaceholder.typicode.com/posts/3",
              "news" : "http://jsonplaceholder.typicode.com/posts/4"},

  SWAP_LIST : {"nav" : "selectedTab",
               "section" : "eleDisplayShow"},

  clickedNodeCheck : function(nodeObj) {
    if(nodeObj.classList.contains("tab")) {
      return nodeObj;
    } else {
      return clickedNodeCheck(nodeObj.parentElement);
    }
  },

  swapClass : function(swapObj, targetClass) {
    var preObj = swapObj.parentElement.querySelector("."+targetClass);
    preObj.classList.remove(targetClass);
    swapObj.classList.add(targetClass);
  },

  clickTab : function(evt) {
    var clickedNode = this.clickedNodeCheck(evt.target);

    this.swapClass(clickedNode, this.SWAP_LIST.nav);

    var url = clickedNode.id;
    var sectionNode = document.querySelector("#my_" + url);

    this.swapClass(sectionNode, this.SWAP_LIST.section);

    if(sectionNode.children.length === 0) {
      var ajax = new XMLHttpRequest();
      ajax.addEventListener("load", this.ajaxCall);
      ajax.open("GET", this.URL_LIST[url]);
      ajax.send();
    }
  },

  ajaxCall : function(res) {
    var resObj = JSON.parse(res.target.responseText);
    var displayNode = document.querySelector(".eleDisplayShow");

    displayNode.innerHTML = "<ul><li><div class='myName'>" + resObj.title + "</div><div class='myDesc'>" + resObj.body + "</div></li></ul>";
  },

  init : function () {
    var selectedTab = document.querySelector("nav");
    selectedTab.addEventListener("click", this.clickTab.bind(tabUi));
  }
};
