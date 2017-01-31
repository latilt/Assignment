아직 미완성입니다.

```js
node.nextElementSibling.offsetWidth;
```

```
새로 알게된 방법
display : none 으로 숨겨져 있던 노드를
display : block 으로 다시 등장 시켰을때
그 이후의 css 변경으로 인한 transition이 화면에 처리되지 않는다. (뿅하고 생기기만 한다)
그럴 경우 위와 같이 offsetWidth를 block 다음에 불러주면
노드가 block 이후 자기 위치를 먼저 인식하게 되고 transition이 작동한다.
```

```
어떤 동작을 연속적으로 실행할때 할 수 있는 방법

setInterval 은 연속적으로 불러올때 콜백함수라 밀리거나 사라질 위험이 있다.
setTimeout 를 끝낸 시점에 정확히 또 불러오는게 타이밍적으로 더 좋다
request animation frame을 사용하는것도 좋은 방법.
css : keyframe 규칙적으로 발생하는 애니메이션

```

```
data-attribute
엘리먼트에 데이타를 숨겨 놓을 수 있는 것.
```

```
array.slice는 배열에만 동작하지만
array.slice.call()을 사용하면 배열이 아닌 것도 동작시킬수 있다.
context 변경을 통해서
```

```
코드 검사기
es 린트? lint? rint?
```

```
모바일 용도
touch 이벤트
스와이핑 플리킹?????
```

```
gulp
자바스크립트 자동화 빌드 시스템

```

awwwwward.com
