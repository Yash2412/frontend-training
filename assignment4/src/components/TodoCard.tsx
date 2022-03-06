import React, { FunctionComponent, useState } from 'react';
import { List, Skeleton, Typography, Checkbox, Button } from 'antd';
import EditTodoModal from './EditTodoModal';

interface IProps {
	todo: ITodo;
	index: number;
	isLoading: boolean;
	allTasks: ITodo[];
	refetchData: any;
}

const TodoCard: FunctionComponent<IProps> = ({ allTasks, index, isLoading, todo, refetchData }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const markAsDone = (e: any) => {
		if (index < allTasks.length) {
			allTasks[index].isDone = e.target.checked;
			localStorage.setItem('allTasks', JSON.stringify(allTasks));
			refetchData();
		}
		setIsModalOpen(false);
	};

	const deleteTask = () => {
		if (index < allTasks.length) {
			allTasks.splice(index, 1);

			localStorage.setItem('allTasks', JSON.stringify(allTasks));
			refetchData();
		}
	};
	if (todo.isDone) {
		return (
			<List.Item
				style={{ backgroundColor: '#ddd' }}
				actions={[
					<Button type='link' style={{ color: 'red' }} key='list-delete' onClick={deleteTask}>
						delete
					</Button>,
				]}
			>
				<Skeleton paragraph={false} loading={isLoading} active>
					<Checkbox checked={true} onChange={markAsDone}>
						<Typography.Text delete>{todo.title}</Typography.Text>
					</Checkbox>
				</Skeleton>
			</List.Item>
		);
	}
	return (
		<>
			<List.Item
				actions={[
					<Button type='link' key='list-edit' onClick={() => setIsModalOpen(true)}>
						edit
					</Button>,
					<Button type='link' style={{ color: 'red' }} key='list-delete' onClick={deleteTask}>
						delete
					</Button>,
				]}
			>
				<Skeleton paragraph={false} loading={isLoading} active>
					<Checkbox checked={todo.isDone} onChange={markAsDone}>
						{todo.title}
					</Checkbox>
				</Skeleton>
			</List.Item>
			<EditTodoModal
				allTasks={allTasks}
				index={index}
				isModalOpen={isModalOpen}
				modalToggle={(v: boolean) => setIsModalOpen(v)}
				refetchData={refetchData}
			/>
		</>
	);
};

export default TodoCard;
