import React from 'react';
import MovieCard from './MovieCard';
import { MovieInfo } from './Types';

type IProps = {
	moviesList: MovieInfo[];
};

const MovieList: React.FunctionComponent<IProps> = ({ moviesList }) => {
	return (
		<div>
			{moviesList.map((movie: MovieInfo) => {
				return <MovieCard key={movie.imdbID} movie={movie} />;
			})}
		</div>
	);
};

export default MovieList;
