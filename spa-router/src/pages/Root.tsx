import { useRouter } from "../Router";

export default function Root() {

    // useRouter hook
    const { push } = useRouter();

    // 어바웃 페이지 이동버튼 클릭 함수
    const handleClick = () => {
        push("/about");
    }

    return (
        <>
            <h1> Root Page </h1>
            <button type="button" onClick={handleClick}> Go To About </button>
        </>
    )
}