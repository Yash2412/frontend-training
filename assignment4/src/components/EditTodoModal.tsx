import { Button, Input, Modal } from 'antd';
import { FunctionComponent, useState } from 'react';

interface IProps {
	isModalOpen: boolean;
	modalToggle: any;
	index: number;
	allTasks: ITodo[];
   refetchData: any;
}

const EditTodoModal: FunctionComponent<IProps> = ({ isModalOpen, modalToggle, allTasks, index, refetchData }) => {
	const [task, setTask] = useState('');

	const editTask = () => {
		if (index < allTasks.length) {
			allTasks[index].title = task;
			localStorage.setItem('allTasks', JSON.stringify(allTasks));
         refetchData();
		}
		modalToggle(false);
	};
	return (
		<Modal
			title='Edit Task'
			style={{ top: 20 }}
			visible={isModalOpen}
			// onOk={}
			onCancel={() => modalToggle(false)}
			footer={[
				<Button key='back' onClick={() => modalToggle(false)}>
					Cancel
				</Button>,
				<Button key='add' type='primary' loading={false} onClick={editTask}>
					Edit
				</Button>,
			]}
		>
			<Input placeholder='Enter the task!' value={task} onChange={(e) => setTask(e.target.value)} />
		</Modal>
	);
};

export default EditTodoModal;
