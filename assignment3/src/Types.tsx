export interface iForm {
	movieName: string;
	movieYear: string;
}

export interface iMovieInfo {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

export interface iApiResponseType {
	Search?: iMovieInfo[];
	Response: string;
	totalResults?: string;
	Error?: string;
}

export interface iFullMovieDetails {
	Title: string;
	Released: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	imdbRating: string;
	Response: string;
	Poster: string;
	imdbVotes: string;
}
