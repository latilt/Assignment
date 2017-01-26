var node = document.querySelector(".container");
node.insertBefore(node.lastElementChild, node.firstElementChild);

document.addEventListener("DOMContentLoaded", function() {
  carousel.init();
});

var carousel = {
  transition : { none : "none",
                 on : "transform 1.5s"
  },
  indicatorWidth : 10,
  indicatorMargin : 6,
  container : null,
  containerWidth : null,
  contentNumber : null,
  contentWidth : null,
  moveFlag : 0,
  auto : null,

  /* constructor || 필요한 변수들 설정(content 갯수, 넓이)*/
  constructor : function() {
    this.container = document.querySelector(".container");
    this.contentNumber = this.container.children.length;
    this.contentWidth = parseInt(getComputedStyle(this.container.firstElementChild).width);
    //this.containerWidth = this.contentWidth * this.contentNumber;
  },
  /* makeIndicator 함수 || html 문서의 content 갯수에 따라 indicator 생성 */
  makeIndicator : function() {
    var indicator = document.querySelector(".indicatorContainer");
    var indicatorWidth = this.indicatorWidth * this.contentNumber + this.indicatorMargin * (this.contentNumber+1);
    indicator.style.left = (this.contentWidth - indicatorWidth)/2 + "px";
    for(var i = 0; i < this.contentNumber; i++) {
      indicator.insertAdjacentHTML("beforeend", "<li id='id" + i + "' class='indicator'></li>")
    }
    indicator.firstElementChild.classList.add("on");
  },
  /* moveIndicator 함수 || indicator를 클릭하면 해당하는 content로 이동한다. */
  moveIndicator : function(evt) {
    if(this.moveFlag === 1) return;
    if(evt.target.className !== "indicator") return;
    //this.moveFlag = 1;
    var afterPoint = evt.target.id.match(/\d+/);
    var beforePoint = document.querySelector(".on").id.match(/\d+/);
    var middle = Math.floor(this.contentNumber / 2);
    var direction;
    var movePoint = afterPoint - beforePoint;

    if(movePoint > 0) {
      if(movePoint <= middle) {
        direction = "next";
      }
      if(movePoint > middle) {
        direction = "prev";
        movePoint = this.contentNumber - movePoint;
      }
    }
    else if(movePoint < 0) {
      movePoint = Math.abs(movePoint);
      if(movePoint < middle) {
        direction = "prev";
      }
      if(movePoint >= middle) {
        direction = "next";
        movePoint = this.contentNumber - movePoint;
      }
    }

    this.setTransition(this.transition.none);

    for(var i = 0; i < movePoint; i++) {
        this.moveContent(direction);
        this.onIndicator(direction);
    }
  },
  /* onIndicator 함수 || content가 움직이면 indicator의 on표시도 같이 움직인다.*/
  onIndicator: function(direction) {
    var on = document.querySelector(".on");

    on.classList.remove("on");
    if(direction === "prev") {
      if(on.previousElementSibling === null) {
        on.parentElement.lastElementChild.classList.add("on");
      }
      else {
        on.previousElementSibling.classList.add("on");
      }
    }
    if(direction === "next") {
      if(on.nextElementSibling === null) {
        on.parentElement.firstElementChild.classList.add("on");
      }
      else {
        on.nextElementSibling.classList.add("on");
      }
    }
  },
  /* clickArrow 함수 || 화살표 클릭 체크, id값(움직일 방향)을 넘겨준다. */
  clickArrow : function(evt) {
    if(evt.target.className !== "arrow") return null;
    if(this.moveFlag === 1) return;
    this.moveFlag = 1;
    var direction = evt.target.id;

    this.setTransition(this.transition.on);

    this.moveContent(direction);
    this.onIndicator(direction);

  },
  /* moveContent 함수 || 클릭된 방향에 따라 contents 엘리먼트를 옮김 */
  moveContent : function(direction) {
    if(direction === "prev") {
      var node = this.container.lastElementChild;
      this.container.insertBefore(node, this.container.firstElementChild);
    }
    if(direction === "next") {
      var node = this.container.firstElementChild;
      this.container.appendChild(node);
    }
  },
  /* 복수 클릭 방지 함수 */
  clickPause : function() {
    this.moveFlag = 0;
  },
  /* transition 세팅 */
  setTransition : function(value) {
    for(var j = 0; j < this.contentNumber; j++) {
      this.container.children[j].style.transition = value;
    }
  },
  /* setInterval 설정 함수 || 3초 마다 넘어감 */
  setinterval : function() {
    var time = 3000;
    carousel.setTransition(carousel.transition.on);
    return setInterval(function() {
      carousel.moveContent("next");
      carousel.onIndicator("next");
    }, time);
  },
  /* 시작 */
  init : function() {
    /* 변수 설정과 인디케이터 생성 */
    this.constructor();
    this.makeIndicator();

    /* view에 click이벤트 생성 */
    var view = document.querySelector(".view");
    view.addEventListener("click", this.clickArrow.bind(carousel));
    /* inciator에 click이벤트 생성 */
    var indicator = document.querySelector(".indicatorContainer");
    indicator.addEventListener("click", this.moveIndicator.bind(carousel));
    /* 복수 클릭 방지 */
    view.addEventListener("transitionend", this.clickPause.bind(carousel));

    /* 자동으로 돌아가기 */
    this.auto = this.setinterval();
    view.addEventListener("mouseenter", function() {
      clearInterval(carousel.auto);
    });
    view.addEventListener("mouseleave", function() {
      carousel.auto = carousel.setinterval();
    });
  }
};
