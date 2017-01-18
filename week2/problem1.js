
/*
 * 1. executeItemNode 함수를 완성하세요
 * 이 함수의 actionType 매개변수는 'add' 또는 'remove'를 받습니다.  add를 받으면 추가하고, remove를 받으면 일을 삭제합니다.
 * todoORNumber 는 add일때는 새로운 일을 문자열로 받고, remove일때는 숫자를 받습니다.
 * 할일 목록은 할일의 문자열 길이 순으로 정렬됩니다. 목록이 추가될때마다 바로 정렬되야 합니다.(가장 긴 할일 내용이 뒤로 가야함)
 * 삭제하려는 경우 num과 일치하는 item번호가 없다면 'message' 영역에서 적당한 메시지를 붉은색으로 표시됐다 3초뒤 사라집니다.
 * 추가하려는 경우 이미 같은일이 있다면 message영역에서 적당한 메시지를 붉은색으로 표시했다 3초뒤 사라집니다.
 * 함수를 여러개로 나눠도 상관없습니다.
 * 참고로 1번을 풀기 위해서는 string조작과 setTimeout이라는 것을 공부해야 할 수도 있습니다.
 *
 * 2. 좀더 사용하기 쉬운 웹화면이 되도록, css에 다양한 스타일을 적용하면서 꾸며봅니다.
 *
 * 3. 아래 event 관련 코드를 학습해보고, 어떤 코드를 의미하는지 최대한 자세히 주석으로 설명을 넣어보세요.
 */
const targetNode = document.querySelector(".basket ol");
const liNode = targetNode.children;



function showError(errorText) {
  var messageNode = document.querySelector(".message");

  messageNode.innerHTML = errorText;
  messageNode.style.color= "red";
  setTimeout(function() {
    messageNode.innerHTML = "";
  }, 3000)
}

function addNode(nIndex, nText) {
  var newLi = document.createElement("li");
  var newText = document.createTextNode(nText);
  var deleteButton = document.createElement('button');

  var comCheckBox = document.createElement("input");
  comCheckBox.setAttribute("class", "completeCheck");
  comCheckBox.setAttribute("type", "checkbox");
  comCheckBox.setAttribute("value", "complete");

  newLi.appendChild(newText);
  deleteButton.innerHTML='X';
  deleteButton.classList.add('delete');
  newLi.appendChild(comCheckBox);
  newLi.appendChild(deleteButton);

  targetNode.insertBefore(newLi, liNode[nIndex]);
}

function removeNode(rIndex) {
  targetNode.removeChild(liNode[rIndex]);
}


function addCheck(todoString) {
  var todoIndex = liNode.length;

  for(var i = 0; i < liNode.length; i++) {
    if(todoString === liNode[i].textContent) {
      showError("할 일이 이미 등록되어 있습니다.");
      return ;
    }
    if(todoString.length < liNode[i].textContent.length) {
      todoIndex = i;
      break;
    }
  }

  addNode(todoIndex, todoString);
  return ;
}

function removeCheck(removeNumber) {
  if(isNaN(removeNumber)) {
    showError("숫자를 입력해주세요.")
    return ;
  }
  else if(removeNumber > liNode.length || removeNumber < 1) {
    showError("찾는 번호가 없습니다.")
    return ;
  }
  else {
    removeNode(removeNumber-1);
    return ;
  }
}


function doSomething(actionType, todoORnumber)  {

  switch(actionType) {
    case "add":
      addCheck(todoORnumber);
    break;

    case "remove":
      removeCheck(parseInt(todoORnumber));
    break;
  }
}


/*
 * 변수 controller는 querySelector를 통해 클래스명이 controller인 요소를 가져온다.
 * addEventListener 메서드는 지정된 요소에 이벤트 핸들러를 연결시키는 메서드이다.
 * 변수 controller에 이벤트 핸들러를 연결시켰으며, 'click' 이벤트가 발생할 때
 * function(evt) 함수를 실행하게 된다. 이때 매개변수 evt는 click 이벤트가 발생한 요소이다.
 * 변수 btn은 이벤트가 발생한 요소를 받고, btn의 태그이름이 BUTTON이 아니면 아무 실행 없이 끝난다.
 * btn의 태그이름이 BUTTON이면 변수 inputValue에는 btn의 전 형제요소인 우리가 입력한 input의 값을 받아오고
 * 변수 actionType에는 어느버튼을 눌렀는지 알기위해 btn의 클래스명을 받는다.
 * 이 두가지 변수를 doSomething함수에 전달하여 실행시키게 된다.
 */

document.addEventListener("click", function(evt) {
  var btn = evt.target;

  if(btn.className == "add"||btn.className=='remove') {
  var inputValue = btn.previousElementSibling.value;
  var actionType = btn.className;
  doSomething(actionType, inputValue);
  btn.previousElementSibling.value = "";
  }

  if(btn.className=='completeCheck') {
    var li =btn.parentElement;
    if(btn.checked==true){
      li.style.textDecoration='line-through';
    }
    else {
      li.style.textDecoration='none';
    }
  }

  if(btn.className == "delete") {
    var deleteEle=btn.parentElement;
    targetNode.removeChild(deleteEle);
  }
});

/*var controller = document.querySelector(".controller");

controller.addEventListener("click", function(evt) {
  var btn = evt.target;
  if(btn.tagName !== "BUTTON") return;
  var inputValue = btn.previousElementSibling.value;
  var actionType = btn.className;
  doSomething(actionType, inputValue);
  btn.previousElementSibling.value = "";
});

var deleteController = document.querySelector(".basket ol");

deleteController.addEventListener("click", function(deleteEvt) {
  var deleteBtn = deleteEvt.target;
  if(deleteBtn.className=='completeCheck'){
    var li =deleteBtn.parentElement;
    if(deleteBtn.checked==true){

      li.style.textDecoration='line-through';
    }
    else{
      li.style.textDecoration='none';
    }
  }
  if(deleteBtn.className !== "delete") return;
  var deleteEle=deleteBtn.parentElement;
  targetNode.removeChild(deleteEle);
});
*/
