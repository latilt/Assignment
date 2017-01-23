#### 오늘의 코드 리뷰는?

```
live server : 파일이 바뀌면 알아서 체크해줘서 리프레쉬 해주는 서버프로그램

1) ajax함수에서 콜백함수를 받는 형식으로 바꿔보자

엘리먼트들의 크기는 rem을 주로 사용하자

모듈패턴!
(function() {
  ...;
  })();


2) 이 프로그램은 어디서 부터 시작하는가 -> 초기화 시키자
document.addEventListener("DOMContentLoaded", function() {  // 돔이 로드되면 실행된다.
  init();  // 시작부분을 모아놓은 함수
  });

function init() {
  var selectedTab = ......;  // 변수 선언
  registEvents(selectedTab); // 시작되는 함수 선언
}

3) 객체화 하기
객체지향 프로그래밍을 해봅시다.
```
