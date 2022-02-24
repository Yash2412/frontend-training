import { FunctionComponent, useEffect, useState } from 'react';
import { FullMovieDetails } from './Types';

interface Iprops {
	imdbID: string;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: FunctionComponent<Iprops> = ({ imdbID, setShowModal }) => {
	const [movieDetails, setMovieDetails] = useState({} as FullMovieDetails);
	const getApiResponse = async () => {
		try {
			const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=375555b6`);
			const json: FullMovieDetails = await response.json();

			setMovieDetails(json);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getApiResponse();
	}, []);

	if (movieDetails.Response === 'True')
		return (
			<div className='custom-modal '>
				<div className='backdrop'></div>
				<div className='card col-md-8 border rounded'>
					<div className='row g-0'>
						<div className='col-md-4'>
							<img src={movieDetails.Poster} className='img-fluid w-100 rounded-start' alt='...' />
						</div>
						<div className='col-md-8'>
							<div className='card-body'>
								<div className='boxoffice'>
									<img
										src={
											+movieDetails.imdbRating >= 7
												? 'http://placehold.jp/13/447038/ffffff/120x60.png?text=Boxoffice%20Hit%20%3A)&css=%7B%22border-radius%22%3A%225px%22%7D'
												: 'http://placehold.jp/12/c74848/ffffff/120x60.png?text=Boxoffice%20Flop%20%3B)&css=%7B%22border-radius%22%3A%225px%22%7D'
										}
										alt='Boxoffice'
									/>
								</div>
								<h5 className='card-title'>{movieDetails.Title}</h5>
								<p className='card-text'>
									Released on <strong>{movieDetails.Released}</strong>
								</p>
								<p className='card-text'>
									IMDB Ratting - <strong>{movieDetails.imdbRating} / 10</strong>
								</p>
								<p className='card-text'>
									Genre - <strong>{movieDetails.Genre}</strong>
								</p>
								<p className='card-text'>
									Director - <strong>{movieDetails.Director}</strong>
								</p>
								<p className='card-text'>
									Writer - <strong>{movieDetails.Writer}</strong>
								</p>
								<p className='card-text'>
									Actors: <strong>{movieDetails.Actors}</strong>
								</p>
								<p className='card-text'>
									Plot - <strong>{movieDetails.Plot}</strong>
								</p>
								<p className='card-text'>
									<small className='text-muted'>Total {movieDetails.imdbVotes} IMDB Votes</small>
								</p>
							</div>
							<div className='card-footer bg-white '>
								<button className='btn btn-danger' onClick={() => setShowModal(false)}>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);

	return (
		<div className='custom-modal'>
			<div className='backdrop'></div>
			<div className='card col-md-8 border rounded'>
				<div className='row g-0'>
					<div className='col-md-4'>
						<img
							src='https://placehold.jp/30/868e96/ffffff/300x431.png?text=%20'
							className='img-fluid  w-100 rounded-start'
							alt='...'
						/>
					</div>
					<div className='col-md-8'>
						<div className='card-body'>
							<h5 className='card-title placeholder-glow'>
								<span className='placeholder col-8'></span>
							</h5>
							<p className='card-text placeholder-glow'>
								<span className='placeholder m-2 col-7'></span>
								<span className='placeholder m-2 col-4'></span>
								<span className='placeholder m-2 col-4'></span>
								<span className='placeholder m-2 col-6'></span>
							</p>
							<h2 className='card-text placeholder-glow'>
								<span className='placeholder m-2 col-7'></span>
								<span className='placeholder m-2 col-4'></span>
								<span className='placeholder m-2 col-4'></span>
								<span className='placeholder m-2 col-4'></span>
								<span className='placeholder m-2 col-6'></span>
							</h2>
							<h4 className='card-text placeholder-glow'>
								<span className='placeholder m-2 col-7'></span>
								<span className='placeholder m-2 col-4'></span>
								<span className='placeholder m-2 col-4'></span>
								<span className='placeholder m-2 col-4'></span>
								<span className='placeholder m-2 col-6'></span>
							</h4>
						</div>
						<div className='card-footer'>
							<button className='btn btn-danger' onClick={() => setShowModal(false)}>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
