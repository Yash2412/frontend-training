import React from "react";
import MovieCard from "./MovieCard";
import { MovieInfo } from "./Types";

type IProps = {
  moviesList: MovieInfo[];
};

const MovieList: React.FunctionComponent<IProps> = ({ moviesList }) => {
  console.log("first");
  return (
    <div>
      {moviesList.map((movie: MovieInfo) => {
        return <MovieCard key={movie.imdbID} movie={movie} />;
      })}
    </div>
  );
};

export default MovieList;
