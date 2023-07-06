import { useRouter } from "../Router";

export default function About() {
    const { push } = useRouter();

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