import { Component } from 'react';

import { Row, Space, Divider } from 'antd';

import { iForm } from './Types';
import InputForm from './InputForm';
import MovieList from './MovieList';

interface iProps {}

interface iState {
	sMovieName: string;
	sMovieYear: string;
}

export default class App extends Component<iProps, iState> {
	state = { sMovieName: 'marvel', sMovieYear: '' };

	setInput = (values: iForm) => {
		this.setState({
			sMovieName: values.movieName,
			sMovieYear: values.movieYear,
		});
	};

	render() {
		return (
			<Row justify='center'>
				<Space direction='vertical' style={{ width: '80%', marginTop: '30px' }}>
					<InputForm setInput={this.setInput} />
					<Divider />
					<MovieList pMovieName={this.state.sMovieName} pMovieYear={this.state.sMovieYear} />
					<Divider />
				</Space>
			</Row>
		);
	}
}
