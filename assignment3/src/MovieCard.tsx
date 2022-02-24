import { Component } from 'react';

import { Card } from 'antd';

import { iMovieInfo } from './Types';

interface iProps {
	pMovie: iMovieInfo;
}

interface iState {}

export default class MovieCard extends Component<iProps, iState> {
	render() {
		return (
			<Card
				hoverable
				style={{ margin: '10px' }}
				cover={<img style={{ height: '437px' }} alt={this.props.pMovie.Title} src={this.props.pMovie.Poster} />}
			>
				<Card.Meta title={this.props.pMovie.Title} description={`Released on ${this.props.pMovie.Year}`} />
			</Card>
		);
	}
}
