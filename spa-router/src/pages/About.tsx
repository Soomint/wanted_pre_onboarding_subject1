import { useRouter } from "../Router";

export default function About() {

    // useRouter hook
    const { push } = useRouter();

    // 루트 페이지 이동버튼 클릭 함수
    const handleClick = () => {
        push("/");
    }

    return (
        <>
            <h1> About Page </h1>
            <button type="button" onClick={handleClick}> Go To Root </button>
        </>
    )
}