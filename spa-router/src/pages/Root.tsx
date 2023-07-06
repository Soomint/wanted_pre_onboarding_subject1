import { useRouter } from "../Router";

export default function Root() {

    // useRouter hook
    const { push } = useRouter();

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