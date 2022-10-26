import { v4 as uuidv4 } from "uuid";
import SearchBar from "./SearchBar";

import style from "./Form.module.scss";

function Form({ setMoviesArr, setIsFileSelected, isPreviewPressed }) {
    async function onChangeHandler(e) {
        const file = e.target.files[0];
        if (file) {
            const content = await getFileText(file);
            const titles = content.split(", ").map((title) => {
                return { id: uuidv4(), title };
            });
            setMoviesArr(titles);
            setIsFileSelected(true);
        } else {
            setMoviesArr([]);
            setIsFileSelected(false);
        }
    }

    function getFileText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    return (
        <form className={style["form"]} autoComplete="off">
            <input
                type="file"
                name="movieTitlesFile"
                onChange={onChangeHandler}
            />
            <SearchBar
                setMoviesArr={setMoviesArr}
                isPreviewPressed={isPreviewPressed}
            />
        </form>
    );
}

export default Form;
