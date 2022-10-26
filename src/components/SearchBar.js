import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";

import style from "./SearchBar.module.scss";
import SearchBarMovieCard from "./SearchBarMovieCard";

const movieEndpoint = (title) =>
    `https://api.themoviedb.org/3/search/movie?api_key=4a4b5c127a8a8a9e929a3212eda8101c&language=en-US&query=${title}&page=1&include_adult=false`;

function SearchBar({ setMoviesArr, isPreviewPressed }) {
    const [searchField, setSearchField] = useState("");
    const [debounceValue, setDebounceValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [moviesList, setMoviesList] = useState([]);

    const [isVisible, setIsVisible] = useState(false);

    const toggleContainer = useRef(null);
    const w = useRef(null);

    const [, cancel] = useDebounce(
        () => {
            setDebounceValue(inputValue);
        },
        1000,
        [inputValue]
    );

    useEffect(() => {
        // CHECK IF ONLY WHITE SPACES ARE ADDED AFTER INPUT TEXT
        // IF SO THEN SKIP THE FETCH PART
        if (inputValue.length === 0) {
            setMoviesList([]);
            return;
        }
        if (searchField === inputValue) return;
        if (inputValue.replace(searchField, "").trim().length === 0) return;
        setSearchField(inputValue);

        fetch(movieEndpoint(inputValue))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const movies = data.results;

                setMoviesList(movies);
            });
    }, [debounceValue]);

    const onInputChangeHandler = (e) => {
        setInputValue(e.target.value);
    };

    const renderedMoviesList = moviesList.map((movie) => {
        return (
            <li key={movie.id}>
                <SearchBarMovieCard movie={movie} setMoviesArr={setMoviesArr} />
            </li>
        );
    });

    const onClickHandler = () => {
        setIsVisible(true);
    };

    const onClickOutsideHandler = (event) => {
        if (!toggleContainer.current.contains(event.target)) {
            setIsVisible(false);
        }
    };
    useEffect(() => {
        window.addEventListener("click", onClickOutsideHandler);

        return () => {
            window.removeEventListener("click", onClickOutsideHandler);
        };
    }, []);

    return (
        <div className={style["search-bar-container"]} ref={toggleContainer}>
            <input
                type="text"
                name="searchField"
                id="searchField"
                placeholder="Search"
                className={style["input"]}
                value={inputValue}
                onChange={onInputChangeHandler}
                onClick={onClickHandler}
                disabled={!isPreviewPressed}
            />
            <ul
                className={
                    isVisible
                        ? `${style["search-list"]} ${style["visible"]}`
                        : `${style["search-list"]}`
                }
            >
                {moviesList.length > 0 ? (
                    renderedMoviesList
                ) : (
                    <li className={"no-content"}>NO CONTENT TO SHOW!</li>
                )}
            </ul>
        </div>
    );
}

export default SearchBar;
