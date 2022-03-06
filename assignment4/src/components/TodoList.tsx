import { FunctionComponent } from 'react';
import { List, Col, Row } from 'antd';
import TodoCard from './TodoCard';

interface IProps {
	allTasks: ITodo[];
	isLoading: boolean;
	refetch: any;
}

const TodoList: FunctionComponent<IProps> = ({ allTasks, isLoading, refetch }) => {
	return (
		<Row justify='center'>
			<Col xs={20} sm={16} md={10} lg={12} xl={12}>
				<List
					className='demo-loadmore-list'
					loading={isLoading}
					bordered
               
					itemLayout='horizontal'
					dataSource={allTasks}
					renderItem={(todo: ITodo, index: number) => (
						<TodoCard
							todo={todo}
							index={index}
							refetchData={() => refetch()}
							allTasks={allTasks}
							isLoading={isLoading}
							key={todo.timestamp}
						/>
					)}
				/>
			</Col>
		</Row>
	);
};

export default TodoList;
