
/*
 * 처음에 만들었던 array를 이용한 풀이.
 * 다 만들고 나서 생각해보니 굳이 array를 쓸 필요성을 못느꼈다.
 * 다양한 방법 중 하나로 남겨둔다.
 */
var targetNode = document.querySelector(".basket ol");
var liNode = targetNode.children;
var textContentArray = [];
var textLengthArray = [];
var arrayLength = 0;
var messageNode = document.querySelector(".message");

function setLength() {
  arrayLength = textContentArray.length;
}

function makeArray() {
  for(var i = 0; i < liNode.length; i++) {
    textContentArray.push(liNode[i].textContent);
    textLengthArray.push(liNode[i].textContent.length);
  }
  setLength();
}

function showError(errorText) {
  messageNode.innerHTML = errorText;
  messageNode.style.color= "red";
  setTimeout(function() {
    messageNode.innerHTML = "";
  }, 3000)
}

function addNode(nIndex, nText) {
  var newLi = document.createElement("li");
  var newText = document.createTextNode(nText);

  newLi.appendChild(newText);

  targetNode.insertBefore(newLi, liNode[nIndex]);
}

function removeNode(rIndex) {
  targetNode.removeChild(liNode[rIndex]);
}

function arraySplice(check, sIndex, sText) {
  switch(check) {
    case "add":
      textContentArray.splice(sIndex, 0, sText);
      textLengthArray.splice(sIndex, 0, sText.length);
      addNode(sIndex, sText);
      break;

    case "remove":
      textContentArray.splice(sIndex, 1);
      textLengthArray.splice(sIndex, 1);
      removeNode(sIndex);
      break;
  }
}

function addArray(todoString) {
  if(textContentArray.includes(todoString)) {
    showError("할 일이 이미 등록되어 있습니다.");
    return ;
  }
  else {
    var todoIndex = arrayLength;
    for(var i = 0; i < arrayLength; i++) {
      if(todoString.length < textLengthArray[i]) {
        todoIndex = i;
        break;
      }
    }

    arraySplice("add", todoIndex, todoString);
    setLength();
    return ;
  }
}

function removeArray(removeNumber) {
  if(isNaN(removeNumber)) {
    showError("숫자를 입력해주세요.")
    return ;
  }
  else if(removeNumber > arrayLength || removeNumber < 1) {
    showError("찾는 번호가 없습니다.")
    return ;
  }
  else {
    arraySplice("remove", removeNumber-1);
    setLength();
    return ;
  }
}


function doSomething(actionType, todoORnumber)  {

  switch(actionType) {
    case "add":
      addArray(todoORnumber);
    break;

    case "remove":
      removeArray(parseInt(todoORnumber));
    break;
  }
}


/*
 * 3번문제는 여기에 자세히 설명을 넣으시면 됩니다.
 *
 *
 *
 */

var controller = document.querySelector(".controller");

controller.addEventListener("click", function(evt) {
  var btn = evt.target;
  if(btn.tagName !== "BUTTON") return;
  var inputValue = btn.previousElementSibling.value;
  var actionType = btn.className;
  doSomething(actionType, inputValue);
  inputValue = "";
});

makeArray();
