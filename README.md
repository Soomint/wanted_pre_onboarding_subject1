# wanted_pre_onboarding_subject1
원티드 프리온보딩 챌린지 7월 과제1

React와 History API 사용하여 SPA Router 기능 구현하기

src/Router.tsx에 해당 기능을 구현하였습니다.

1. Router관련 Context 정의
컴포넌트 간 데이터를 전달할 때, props가 아닌 다른 방법으로 사용할 객체를 만들었습니다.
Router 기능을 정의하기 위해 라우팅 경로와 라우팅 변경을 위한 함수를 추가하였습니다.

path: 현재 라우팅 경로 저장
goPath: 라우팅 변경함수, history API로직 반영

2. Router Node 정의
라우팅 경로를 상태관리 하기 위해 useState를 사용하였고, 기본값을 location.pathname 으로 세팅하였습니다. 그리고 라우팅 변경함수를 정의하였습니다. 
우선, history API를 사용(pushState)하여 history관리를 하였습니다.
그 후, 변경요청한 라우팅 경로를 useState의 setter함수를 통해 수정하였습니다.
반환값은 Context.provider로 value를 통해 하위 컴포넌트와 같이 사용할 Context객체를 선언하였습니다.

3. Route Node 정의
Interface로 화면에서 받은 props들을 세팅하였습니다. (path, component)
각 Route Node에 라우팅 경로마다 정의된 path와 component를 세팅하면
화면에서 현재 라우팅 경로와 path props를 비교하여, 동일하면 해당 component를, 아니면 null을 반환하도록 구현하였습니다.

4. useRouter Hook 정의
특정 라우팅 경로를 요청할 때, 해당 컴포넌트가 렌더링 처리되도록 도와주는 Hook을 추가하였습니다. (push)
파라미터로 변경요청 url를 담아서 호출하면, Context에 정의된 라우팅 변경함수를 호출하게끔 선언하였습니다.

기존에는 라이브러리를 활용하여 사용하다가 해당기능을 직접 구현하다보니 처음에는 어떻게 구현해야할지 막막했지만,
구글링과, 해당 라이브러리 소스코드를 참고하여 구현하였습니다.
저에게는 뜻깉은 과제였던 것 같습니다.