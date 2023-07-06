# wanted_pre_onboarding_subject1
## 원티드 프리온보딩 챌린지 7월 과제1  

Next.js 프로젝트에서 yarn start(or npm run start) 스크립트를 실행했을 때 실행되는 코드를 Next.js Github 레포지토리에서 찾은 뒤, 해당 파일에 대한 간단한 설명을 첨부해주세요.  

cli에서 yarn start 실행 시, https://github.com/vercel/next.js/blob/canary/packages/next/src/cli/next-start.ts 파일이 실행됩니다.  
기타 arguments에 대한 로직을 제외한 실제 핵심로직은 다음과 같습니다.  
-> server/config.ts로부터 서버세팅 함수를 import하고, server/lib/start-server.ts로부터 서버start 함수를 import를 합니다.  

1. local 서버 config 세팅
```javascript
const config = await loadConfig(
    PHASE_PRODUCTION_SERVER,
    resolve(dir || '.'),
    undefined,
    undefined,
    true
)
```

2. local 서버 start
```javascript
await startServer({
    dir,
    isDev: false,
    hostname: host,
    port,
    keepAliveTimeout,
    useWorkers: !!config.experimental.appDir,
})
```


## 원티드 프리온보딩 챌린지 7월 과제2  

React와 History API 사용하여 SPA Router 기능 구현하기  

src/Router.tsx에 해당 기능을 구현하였습니다.  

1. Router관련 Context 정의  
컴포넌트 간 데이터를 전달할 때, props가 아닌 다른 방법으로 사용할 객체를 만들었습니다.  
라우팅 경로인 path props를 추가하였습니다.  

```javascript
// Router Node Interface
interface RouterProps {
    path: string;               // 라우팅 경로
}

// Router Context
const RouterContext = createContext<RouterProps>({
    path: "/",
});
```

2. Router Node 정의  
라우팅 경로를 상태관리 하기 위해 useState를 사용하였고, 기본값을 location.pathname 으로 세팅하였습니다.  
useEffect로 첫 렌더링 시 popstate 이벤트를 추가하였습니다.  
반환값은 Context.provider로 value를 통해 하위 컴포넌트와 같이 사용할 Context객체를 세팅하였습니다.  

```javascript
// Router Node 정의
const Router = ({ children }: { children: React.ReactNode }) => {
    const [path, setPath] = useState(location.pathname);

    useEffect(() => {
        const handlePopstate = () => {
            setPath(location.pathname);
        };
        // history entry 등록
        addEventListener('popstate', handlePopstate);
    }, []);

    return (
        <>
            <RouterContext.Provider value={{ path }}>
                {children}
            </RouterContext.Provider>
        </>
    );
};
```

3. Route Node 정의  
Interface로 화면에서 받은 props들을 세팅하였습니다. (path, component)  
각 Route Node에 라우팅 경로마다 정의된 path와 component를 세팅하면  
화면에서 현재 라우팅 경로와 path props를 비교하여, 동일하면 해당 component를, 아니면 null을 반환하도록 구현하였습니다.  

```javascript
// Route Interface
interface RouteProps {
    path: string;               // url경로
    component: React.ReactNode; // component
}

// Route Node 정의
const Route = ({ path, component }: RouteProps) => {
    const { path: contextPath } = useContext(RouterContext);
    return path === contextPath ? component : null;
};
```

4. useRouter Hook 정의  
특정 라우팅 경로를 요청할 때, 해당 컴포넌트가 렌더링 처리되도록 도와주는 Hook을 추가하였습니다. (push)  
파라미터로 변경요청 url를 담아서 호출하면, history API를 사용(pushState)하여 history관리를 하였습니다.  
그리고 popstate 이벤트도 추가하였습니다.  

```javascript
// useRouter Hooks Interface
interface UseRouterProps {
    push(url: string): void;    // url이동
}

// useRouter Hooks
const useRouter = () => {
    const router: UseRouterProps = {
        // push 요청 시, 기존에 저장된 path를 수정한다.
        push(url) {
            // history entry 등록
            history.pushState(null, "", url);
            dispatchEvent(new PopStateEvent('popstate'));
        },
    };

    return router;
};
```

Conclusion  
  기존에는 라이브러리를 활용하여 사용하다가 해당기능을 직접 구현하다보니 처음에는 어떻게 구현해야할지 막막했지만,  
  구글링과, 해당 라이브러리 소스코드를 참고하여 구현하였습니다.  
  이번 과제로 인해, 리액트의 Context, History API에 대해 다시 공부하게 되었습니다.  