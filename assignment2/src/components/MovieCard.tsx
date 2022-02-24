import React, { useState } from 'react';
import { MovieInfo } from './Types';
import { ModalPortal } from './ModalPortal';
import { Modal } from './Modal';

type IProps = { movie: MovieInfo };
const MovieCard: React.FunctionComponent<IProps> = ({ movie }) => {
	const { Title, Year, imdbID, Type, Poster } = movie;

	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<div className='movie-info row'>
				<div className='movie-poster col-md-2'>
					<img src={Poster} alt={`${Title} movie poster`} />
				</div>
				<div className='movie-details col-md-10'>
					<div>
						<h4 className='movie-title'>{Title}</h4>
						<p className='year'>{Year}</p>
						<p className='content-type'>{Type === 'movie' ? 'Movie' : 'TV Series'}</p>
					</div>
					<div className='more-details'>
						<button type='button' className='btn btn-primary' onClick={() => setShowModal(true)}>
							More Details
						</button>
					</div>
				</div>
			</div>
			<hr />

			{showModal ? (
				<ModalPortal>
					<Modal imdbID={imdbID} setShowModal={setShowModal} />
				</ModalPortal>
			) : null}
		</>
	);
};

export default MovieCard;
