import { Button, Input, Modal } from 'antd';
import { FunctionComponent, useState } from 'react';

interface IProps {
	isModalOpen: boolean;
	modalToggle: any;
	allTasks: ITodo[];
	refetch: any;
}

const TodoModal: FunctionComponent<IProps> = ({ isModalOpen, modalToggle, allTasks, refetch }) => {
	const [task, setTask] = useState('');

	const addTodo = () => {
		allTasks = [
			{
				title: task,
				isDone: false,
				timestamp: Date.now(),
			},
			...allTasks,
		];

		localStorage.allTasks = JSON.stringify(allTasks);
		setTask('');
		modalToggle(false);

		refetch();
	};
	return (
		<Modal
			title='Add Task'
			style={{ top: 20 }}
			visible={isModalOpen}
			// onOk={}
			onCancel={() => modalToggle(false)}
			footer={[
				<Button key='back' onClick={() => modalToggle(false)}>
					Cancel
				</Button>,
				<Button key='add' type='primary' loading={false} onClick={addTodo}>
					Add
				</Button>,
			]}
		>
			<Input placeholder='Enter the task!' value={task} onChange={(e) => setTask(e.target.value)} />
		</Modal>
	);
};

export default TodoModal;
