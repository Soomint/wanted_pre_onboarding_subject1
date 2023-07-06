import { useState, createContext, useContext, useEffect } from "react";

// Router Node Interface
interface RouterProps {
    path: string;
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

// useRouter Hooks Interface
interface UseRouterProps {
    push(url: string): void;    // url이동
}

// useRouter Hooks
const useRouter = () => {
    const router: UseRouterProps = {
        // push 요청 시, 기존에 저장된 path를 수정한다.
        push(url) {
            history.pushState(null, "", url);
            dispatchEvent(new PopStateEvent('popstate'));
        },
    };

    return router;
};

export { Router, Route, useRouter };