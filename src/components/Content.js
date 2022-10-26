import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import style from "./Content.module.scss";

const movieEndpoint = (title) =>
    `https://api.themoviedb.org/3/search/movie?api_key=4a4b5c127a8a8a9e929a3212eda8101c&language=en-US&query=${title}&page=1&include_adult=false`;

function Content({
    moviesArr,
    setMoviesArr,
    isFileSelected,
    isPreviewPressed,
    setIsPreviewPressed,
}) {
    const titlesList = moviesArr.map((movie, idx) => {
        return (
            <li key={uuidv4()}>
                <MovieCard
                    movie={movie}
                    index={idx + 1}
                    onDeleteClickHandler={onDeleteClickHandler}
                />
            </li>
        );
    });

    function onDeleteClickHandler(e, id) {
        setMoviesArr((oldState) => {
            return oldState.filter((movie) => movie.id != id);
        });
    }

    function onPreviewClickHandler() {
        moviesArr.forEach((movie) => {
            fetch(movieEndpoint(movie.title))
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const currentMovie = data.results[0];

                    setMoviesArr((oldState) => {
                        let movie = oldState.find(
                            (movie) =>
                                movie.title.includes(currentMovie.title) ||
                                currentMovie.title.includes(movie.title)
                        );

                        Object.entries(currentMovie).forEach(([key, value]) => {
                            movie[key] = value;
                        });

                        return [...oldState];
                    });
                });
        });

        setIsPreviewPressed(true);
    }

    function onSaveClickHandler(moviesArray) {
        // SENDING EACH MOVIE SEPARATELY DUE TO LACK OF INFORMATION
        // WHETHER THEY NEED TO BE PACKED OR SENT SEPARATELY
        moviesArray.forEach((movie) => {
            // USING DUMMY API DUE TO LACKING A REAL ONE :/
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(movie),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("successfully sent");
                    console.log(data);
                });
        });
    }

    function isButtonDisabled() {
        return moviesArr.length == 0;
    }

    function isButtondDisabledStyle() {
        return isButtonDisabled()
            ? `${style["button"]} ${style["disabled"]}`
            : style["button"];
    }

    return (
        <div className={style["content-container"]}>
            {moviesArr.length > 0 ? (
                <ul className={style["movie-list"]}>{titlesList}</ul>
            ) : (
                <h1>NO MOVIES TO SHOW!</h1>
            )}
            {isPreviewPressed && isFileSelected ? (
                <button
                    onClick={() => onSaveClickHandler(moviesArr)}
                    disabled={isButtonDisabled()}
                    className={isButtondDisabledStyle()}
                >
                    Save
                </button>
            ) : (
                <button
                    onClick={onPreviewClickHandler}
                    disabled={isButtonDisabled()}
                    className={isButtondDisabledStyle()}
                >
                    Preview
                </button>
            )}
        </div>
    );
}

export default Content;
