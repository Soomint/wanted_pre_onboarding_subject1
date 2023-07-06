import { useState, createContext, useContext, useEffect } from "react";

// Router Node Interface
interface RouterProps {
    path: string;               // 라우팅 경로
}

// Router Context
const RouterContext = createContext<RouterProps>({
    path: "/",
});

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

/////////////////////////////////// Hooks ///////////////////////////////////

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

/////////////////////////////////// Hooks ///////////////////////////////////

export { Router, Route, useRouter };