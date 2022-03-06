import TodoList from './TodoList';
import 'antd/dist/antd.css';
import '../App.css';
import { Layout, Button, Space } from 'antd';
import { FunctionComponent, useState } from 'react';
import AddTodoModal from './AddTodoModal';
import { useQuery } from 'react-query';
const { Header, Content } = Layout;

const App: FunctionComponent = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isLoading, data, refetch } = useQuery('getAllTask', () => localStorage.getItem('allTasks'));
	const allTasks: ITodo[] = data ? JSON.parse(data) : [];

	return (
		<Layout className='layout'>
			<Header>
				<Space align='end' direction='vertical' style={{ width: '100%' }}>
					<Button type='primary' onClick={() => setIsModalOpen(true)}>
						Add Todos
					</Button>
				</Space>
			</Header>
			<Content>
				<div className='main-content'>
					<TodoList allTasks={allTasks} isLoading={isLoading} refetch={refetch} />
				</div>
			</Content>
			<AddTodoModal
				allTasks={allTasks}
				refetch={refetch}
				isModalOpen={isModalOpen}
				modalToggle={(v: boolean) => setIsModalOpen(v)}
			/>
		</Layout>
	);
};

export default App;
