import { useState, createContext, useContext } from "react";

// Router Node Interface
interface RouterProps {
    path: string;                   // 현재경로
    goPath: (url: string) => void;  // 경로이동함수
}

// Router Context
const RouterContext = createContext<RouterProps>({
    path: "/",
    goPath: () => null,
});

// Router Node 정의
const Router = ({ children }: { children: React.ReactNode }) => {
    const [path, setPath] = useState(location.pathname);

    const goPath = (path: string) => {
        history.pushState(null, "", path);
        setPath(path);
    }

    return (
        <>
            <RouterContext.Provider value={{ path, goPath }}>
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

// useRouter Hooks Interface
interface UseRouterProps {
    push(url: string): void;    // url이동
}

// useRouter Hooks
const useRouter = () => {
    // url 경로 변경함수를 가져온다.
    const { goPath } = useContext(RouterContext);

    const router: UseRouterProps = {
        // push 요청 시, 기존에 저장된 path를 수정한다.
        push(url) {
            goPath(url);
        },
    };

    return router;
};

export { Router, Route, useRouter };