import { Component } from 'react';

import { Form, Input, Button } from 'antd';

import { iForm } from './Types';

interface iProps {
	setInput: any;
}

interface iState {}

export default class InputForm extends Component<iProps, iState> {
	onSubmit = (values: iForm) => {
		this.props.setInput(values);
	};

	onSubmitFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	render() {
		return (
			<Form
				name='basic'
				labelCol={{ span: 9 }}
				wrapperCol={{ span: 7 }}
				initialValues={{ remember: true }}
				onFinish={this.onSubmit}
				onFinishFailed={this.onSubmitFailed}
				autoComplete='off'
			>
				<Form.Item
					label='Movie Name'
					name='movieName'
					rules={[{ required: true, message: 'Please input a Movie Name!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item label='Year' name='movieYear' rules={[{ message: 'Please input year of release!' }]}>
					<Input />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 15, span: 20 }}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
