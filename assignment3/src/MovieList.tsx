import { Component } from 'react';

import { List, Result } from 'antd';

import { iMovieInfo, iApiResponseType } from './Types';
import MovieListSkeleton from './Skeleton';
import MovieCard from './MovieCard';

interface iProps {
	pMovieName: string;
	pMovieYear: string;
}

interface iState {
	sMovieList: iMovieInfo[];
	sPageNumber: number;
	sTotalResults: number;
	sLoading: boolean;
	sError: {
		errorMessage: string;
		errorCode: string;
	};
}

export default class MovieList extends Component<iProps, iState> {
	state = {
		sMovieList: [] as iMovieInfo[],
		sPageNumber: 1,
		sTotalResults: 0,
		sLoading: false,
		sError: { errorMessage: '', errorCode: '404' },
	};

	getApiData = async () => {
		this.setState({ sLoading: true });

		try {
			const response = await fetch(
				`https://www.omdbapi.com/?s=${this.props.pMovieName}&y=${this.props.pMovieYear}&page=${this.state.sPageNumber}&plot&apikey=375555b6`
			);

			const json: iApiResponseType = await response.json();

			if (json.Response === 'True' && json.Search && json.totalResults) {
				this.setState({
					sMovieList: json.Search,
					sTotalResults: +json.totalResults,
					sError: { errorMessage: '', errorCode: '200' },
					sLoading: false,
				});
			} else if (json.Error) {
				this.setState({
					sMovieList: [] as iMovieInfo[],
					sTotalResults: 0,
					sError: { errorMessage: json.Error, errorCode: '404' },
					sLoading: false,
				});
			}
		} catch (error: any) {
			this.setState({
				sMovieList: [] as iMovieInfo[],
				sTotalResults: 0,
				sError: { errorMessage: error.message, errorCode: '500' },
				sLoading: false,
			});
		}
	};
	componentDidMount() {
		this.getApiData();
	}

	componentDidUpdate(prevProps: iProps, prevState: iState) {
		if (prevProps.pMovieName !== this.props.pMovieName || prevProps.pMovieYear !== this.props.pMovieYear) {
			this.setState({ sPageNumber: 1 }, () => this.getApiData());
		} else if (prevState.sPageNumber !== this.state.sPageNumber) {
			this.getApiData();
		}
	}

	render() {
		if (this.state.sLoading) {
			return <MovieListSkeleton pListSize={10} />;
		}

		if (this.state.sError.errorCode != '200') {
			return (
				<Result
					status={this.state.sError.errorCode as any}
					title={this.state.sError.errorCode}
					subTitle={this.state.sError.errorMessage}
				/>
			);
		}

		return (
			<List
				grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }}
				pagination={{
					onChange: (page) => {
						this.setState({ sPageNumber: page });
					},
					pageSize: 10,
					current: this.state.sPageNumber,
					total: +this.state.sTotalResults,
					showSizeChanger: false,
				}}
				dataSource={this.state.sMovieList}
				renderItem={(item, index) => <MovieCard pMovie={item} key={index} />}
			/>
		);
	}
}
