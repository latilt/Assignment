### 중첩된 DOM에 이벤트가 여러개 있을 때

```html
<div id="div1">
  <div id="div2">
    <div id="div3">
      <div id="div4">
      </div>
    </div>
  </div>
</div>
```
###### 1. 일반적인 경우

```js
var evt1 = document.querySelector("#div4");

evt1.addEventListener("click", function(ev) {
  alert("center");
});

var evt = document.querySelector("#div1");

evt.addEventListener("click", function(evnt) {
  alert(evnt.target.id);
});
```
이벤트가 발생된 해당 엘리먼트의 이벤트가 먼저 실행되고
다음 이벤트가 실행된다.
div4의 이벤트가 실행되고 div1의 이벤트가 실행된다.

###### 2. true를 넣었을 때
```js
var evt1 = document.querySelector("#div4");

evt1.addEventListener("click", function(ev) {
  alert("center");
}, true);

var evt = document.querySelector("#div1");

evt.addEventListener("click", function(evnt) {
  alert(evnt.target.id);
}, true);
```
div1의 이벤트가 먼저 실행되고 div4의 이벤트가 실행된다.
###### 3. false를 넣었을 때
```js
var evt1 = document.querySelector("#div4");

evt1.addEventListener("click", function(ev) {
  alert("center");
}, false);

var evt = document.querySelector("#div1");

evt.addEventListener("click", function(evnt) {
  alert(evnt.target.id);
}, false);
```
div4의 이벤트가 먼저 실행되고 dvi1의 이벤트가 실행된다.

## 왜그럴까?
