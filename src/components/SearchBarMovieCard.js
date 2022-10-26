import React from "react";
import style from "./SearchBarMovieCard.module.scss";

const imgEndpoint = (path) => `https://image.tmdb.org/t/p/w92${path}`;

function SearchBarMovieCard({ movie, setMoviesArr }) {
    function onAddButtonClick(e) {
        e.preventDefault();
        setMoviesArr((oldState) => {
            return [...oldState, movie];
        });
    }

    return (
        <div className={style["movie-card"]}>
            <div className={style["image-container"]}>
                <img src={imgEndpoint(movie["poster_path"])} alt="" />
            </div>
            <div className={style["content-container"]}>
                <p>
                    {movie.title}{" "}
                    {movie["release_date"] && (
                        <span>({movie["release_date"].substring(0, 4)})</span>
                    )}
                </p>
                <button
                    onClick={onAddButtonClick}
                    className={style["add-movie-button"]}
                >
                    ADD MOVIE
                </button>
            </div>
        </div>
    );
}

export default SearchBarMovieCard;
