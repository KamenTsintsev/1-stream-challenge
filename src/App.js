import { useEffect, useState } from "react";
import Content from "./components/Content";
import Form from "./components/Form";
import style from "./app.module.scss";

function App() {
    const [moviesArr, setMoviesArr] = useState([]);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [isPreviewPressed, setIsPreviewPressed] = useState(false);

    // useEffect(() => {
    //     console.log(moviesArr);
    // }, [moviesArr.length]);

    return (
        <div className={style["app"]}>
            <Form
                setMoviesArr={setMoviesArr}
                setIsFileSelected={setIsFileSelected}
                isPreviewPressed={isPreviewPressed}
            />
            <Content
                moviesArr={moviesArr}
                setMoviesArr={setMoviesArr}
                isFileSelected={isFileSelected}
                isPreviewPressed={isPreviewPressed}
                setIsPreviewPressed={setIsPreviewPressed}
            />
        </div>
    );
}

export default App;
