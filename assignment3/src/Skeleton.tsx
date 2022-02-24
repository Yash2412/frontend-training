import { Component } from 'react';

import { List, Card, Skeleton } from 'antd';

interface iProps {
	pListSize: number;
}

interface iState {}

export default class MovieListSkeleton extends Component<iProps, iState> {
	defaultArray = new Array(this.props.pListSize).fill(0).map((_, i) => ++i);

	render() {
		return (
			<List
				grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }}
				dataSource={this.defaultArray}
				renderItem={(item) => (
					<Card
						key={item}
						style={{ margin: '10px' }}
						cover={<img src='https://placehold.jp/30/dddddd/ffffff/300x431.png?text=%20' alt='Placeholder' />}
					>
						<Card.Meta
							title={<Skeleton.Input style={{ width: 200 }} active={true} size='default' />}
							description={<Skeleton.Input style={{ width: 150 }} active={true} size='small' />}
						/>
					</Card>
				)}
			/>
		);
	}
}
