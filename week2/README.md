## 2주차 숙제입니다.

```
초보적인 실수 : 함수에 string 바로 넣지 말것!
변수가 대문자이면 const 방식인듯(?)
var MESSAGE_LIST = {
  "aaa" = {"ok"},
  "bbb" = {"no"}
}

showError(MESSAGE_LIST.aaa);


오브젝트 함수 선언
var actions = {
  "add" : function() {

  },
  "remove" : function() {

  }.
}

actions[actionType]();

함수의 재사용성을 높이기 위해 (계획된 노드가 아니라 다른 특정 노드에도 메시지를 띄워주기 위해)
그럴 경우 messageNode의 값을 매개변수의 엘리먼트를 쿼리셀렉터로 받아서 재사용성을 높일수 있겠다.
function showError(targetElement, errorText)
var messageNode = document.querySelector(targetElement);
```
