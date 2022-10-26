import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faImage,
    faTrashCan,
    faStar as faStarEmpty,
    faStarHalfStroke as faStarHalf,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFull } from "@fortawesome/free-solid-svg-icons";

import style from "./MovieCard.module.scss";

const imgEndpoint = (path) => `https://image.tmdb.org/t/p/w154${path}`;

function MovieCard({ movie, index, onDeleteClickHandler }) {
    return (
        <div className={style["card-container"]}>
            <div className={style["image-container"]}>
                {movie["poster_path"] ? (
                    <img
                        src={imgEndpoint(movie["poster_path"])}
                        className={style["image"]}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faImage}
                        className={style["placeholder"]}
                    />
                )}
            </div>

            <div className={style["content-container"]}>
                <h3
                    className={`${style["movie-index"]} ${style["card-content-cell"]}`}
                >
                    {index}.
                </h3>
                <h3
                    className={`${style["movie-title"]} ${style["card-content-cell"]}`}
                >
                    {movie.title}{" "}
                    {movie["release_date"] && (
                        <span>({movie["release_date"].substring(0, 4)})</span>
                    )}
                </h3>
                <div
                    className={`${style["movie-delete"]} ${style["card-content-cell"]}`}
                >
                    <button onClick={(e) => onDeleteClickHandler(e, movie.id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>

                <Rating movieRating={movie["vote_average"]} />
                <div
                    className={`${style["movie-votes"]} ${style["card-content-cell"]}`}
                >
                    {movie["vote_count"] && <p>Votes: {movie["vote_count"]}</p>}
                </div>
                <div
                    className={`${style["movie-overview"]} ${style["card-content-cell"]}`}
                >
                    <p className={style["movie-overview-text"]}>
                        {movie.overview && movie.overview}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;

function Rating({ movieRating }) {
    const ratingStar =
        movieRating > 7.5 ? (
            <FontAwesomeIcon
                icon={faStarFull}
                className={style["rating-star"]}
            />
        ) : movieRating > 3.5 ? (
            <FontAwesomeIcon
                icon={faStarHalf}
                className={style["rating-star"]}
            />
        ) : (
            <FontAwesomeIcon
                icon={faStarEmpty}
                className={style["rating-star"]}
            />
        );

    return (
        <div
            className={`${style["movie-rating"]} ${style["card-content-cell"]}`}
        >
            {movieRating && (
                <p>
                    {ratingStar} <span>{movieRating} / 10</span>
                </p>
            )}
        </div>
    );
}
