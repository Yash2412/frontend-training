export interface MovieInfo {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface ApiResponseType {
  Search: MovieInfo[];
  Response: string;
  totalResults?: string;
  Error?: string;
}

export interface FullMovieDetails {
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
