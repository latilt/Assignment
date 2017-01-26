document.addEventListener("DOMContentLoaded", function() {
  carousel.init();
});

var carousel = {

  firstPoint : "0",
  lastPoint : "",
  container : null,
  containerWidth : null,
  contentNumber : null,
  contentWidth : null,
  direction : null,
  flag: null,
  pointX : 0,
  i : 0,
  moving : 0,

  constructor : function() {
    this.container = document.querySelector(".container");
    this.contentNumber = this.container.children.length;
    this.contentWidth = parseInt(getComputedStyle(this.container.firstElementChild).width);
    this.containerWidth = this.contentWidth * this.contentNumber;
    this.lastPoint = "" + (this.containerWidth - this.contentWidth);
    this.pointX = 10*this.contentNumber;
  },

  makeIndicator : function() {
    var indicator = document.querySelector(".indicatorContainer");
    var indicatorWidth = 10 * this.contentNumber + 6 * (this.contentNumber+1);
    indicator.style.left = (this.contentWidth - indicatorWidth)/2 + "px";
    for(var i = 0; i < this.contentNumber; i++) {
      indicator.insertAdjacentHTML("beforeend", "<li id='id" + i + "' class='indicator'></li>")
    }
  },

  moveIndicator : function(evt) {
    if(this.moving === 1) return;
    if(evt.target.className !== "indicator") return;
    var number = evt.target.id.match(/\d+/);
    var a = this.i - number;

    if(a > 0) {
      for(var i = a; i > 0; i--) {
        var node = this.container.lastElementChild;
        this.container.insertBefore(node, this.container.firstElementChild);
        this.pointX = this.pointX -1;
      }
    }
    if(a < 0) {
      for(var i = a; i < 0; i++) {
        var node = this.container.firstElementChild;
        this.container.appendChild(node);
        this.pointX = this.pointX + 1;
      }
    }

    this.pointIndicator();
    this.flag = 1;
  },

  pointIndicator: function() {
    var point = document.querySelector(".indicatorContainer");
    var pointCheck = point.children;

    if(this.pointX === 0) {
      this.pointX = 10 * this.contentNumber;
    }
    this.i = Math.abs(this.pointX % this.contentNumber);

    var remove = point.querySelector(".point");
    if(remove !== null) {
        remove.classList.toggle("point");
    }
    pointCheck[this.i].classList.add("point");
  },

  moveContainer : function(evt) {

    if(evt.target.className !== "arrow") return null;
    this.moving = 1;
    var hidden = document.querySelectorAll(".arrow");
    hidden[0].style.display = "none";
    hidden[1].style.display = "none";

    this.direction = evt.target.id;
    var transX = this.container.style.transform;
    var locationX = transX.match(/\d+/);

    if(this.direction === "next") {
      locationX[0] = locationX[0]*1 + this.contentWidth;
      this.pointX = this.pointX + 1;
    }
    if(this.direction === "prev") {
      locationX[0] = locationX[0]*1 - this.contentWidth;
      this.pointX = this.pointX - 1;
    }

    transX = transX.replace(/\-*\d+/, "-" + locationX[0]);
    this.container.style.transition = "transform 1.5s";
    this.container.style.transform = transX;

    this.pointIndicator();
    this.flag = 0;
  },

  backMove : function(evt) {

    var hidden = document.querySelectorAll(".arrow");
    hidden[0].style.display = "block";
    hidden[1].style.display = "block";

    if(this.flag === 1) {
      this.flag = 0;
      return;
    }

    this.container.style.transition = "none";
    this.container.style.transform = "translateX(-" + 600 + "px)";

    if(this.direction === "prev") {
      var node = this.container.lastElementChild;
      this.container.insertBefore(node, this.container.firstElementChild);
    }
    if(this.direction === "next") {
      var node = this.container.firstElementChild;
      this.container.appendChild(node);
    }
    this.flag = 0;
    this.moving = 0;
  },

  init : function() {
    this.constructor();
    this.makeIndicator();
    this.pointIndicator(this.i);
    var view = document.querySelector(".view");
    view.addEventListener("click", this.moveContainer.bind(carousel));

    var indicator = document.querySelector(".indicatorContainer");
    indicator.addEventListener("click", this.moveIndicator.bind(carousel));

    var node = this.container.lastElementChild;
    this.container.insertBefore(node, this.container.firstElementChild);

    this.container.addEventListener("transitionend", this.backMove.bind(carousel));

  }
};
