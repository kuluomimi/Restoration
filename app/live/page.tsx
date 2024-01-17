'use client';
import {
	Layout,
	theme,
	Collapse,
	Input,
	Flex,
	Select,
	Tag,
	Checkbox,
} from 'antd';
import React, { useState } from 'react';
import { Sender, Bubble } from '@ant-design/x';
import { UserOutlined } from '@ant-design/icons';
import { useLocalStorageState } from 'ahooks';
import FieldItem from '@/components/field-item';
import GeminiIcon from '@/app/icon/google-gemini-icon.svg';
import Image from 'next/image';

const fooAvatar: React.CSSProperties = {
	color: '#f56a00',
	backgroundColor: '#fde3cf',
};

const barAvatar: React.CSSProperties = {
	color: '#fff',
	backgroundColor: '#87d068',
};

const hideAvatar: React.CSSProperties = {
	visibility: 'hidden',
};
const { Header, Content } = Layout;

interface ToolsState {
	codeExecution: boolean;
	functionCalling: boolean;
	automaticFunctionResponse: boolean;
	grounding: boolean;
}

const LivePage = () => {
	const {
		token: {
			colorBgLayout,
			colorFillAlter,
			borderRadiusLG,
			colorBgContainer,
		},
	} = theme.useToken();
	const [recording, setRecording] = useState(false);
	const [model, setModel] = useLocalStorageState('model', {
		defaultValue: 'gemini-2.0-flash-exp',
	});
	const [outPut, setOutPut] = useLocalStorageState('output', {
		defaultValue: 'audio',
	});

	const [tools, setTools] = useLocalStorageState<ToolsState>('tools', {
		defaultValue: {
			codeExecution: false,
			functionCalling: false,
			automaticFunctionResponse: false,
			grounding: false,
		},
	});

	const [toolsPaneActive, setToolsPaneActive] = useLocalStorageState<
		string[]
	>('tools-pane-active', {
		defaultValue: [],
	});

	const panelStyle: React.CSSProperties = {
		background: colorFillAlter,
		borderRadius: borderRadiusLG,
		border: 'none',
	};

	return (
		<Layout
			style={{
				height: '100vh',
			}}
		>
			<Header
				style={{
					padding: '0 12px 0 24px',
					background: colorBgLayout,
					fontSize: 22,
					fontWeight: 500,
				}}
			>
				Stream Realtime
			</Header>

			<Content
				style={{
					height: '100%',
				}}
			>
				<Flex style={{ height: '100%' }}>
					<Flex
						vertical
						flex={1}
						style={{
							borderRadius: 20,
							background: '#fff',
						}}
					>
						<div className='px-5 py-2'>
							<Collapse
								bordered={false}
								style={{ background: colorBgContainer }}
								items={[
									{
										key: 'prompts',
										label: 'Prompts',
										children: (
											<Input placeholder='Enter your prompt here' />
										),
										style: panelStyle,
									},
								]}
							/>
						</div>
						<div
							className='messages'
							style={{
								flex: 1,
								padding: 24,
								overflowY: 'auto',
								boxSizing: 'border-box',
								borderRadius: 20,
							}}
						>
							<Flex gap='middle' vertical>
								<Bubble
									placement='start'
									content='Good morning, how are you?'
									avatar={{
										icon: <UserOutlined />,
										style: fooAvatar,
									}}
								/>
								<Bubble
									placement='start'
									content='What a beautiful day!'
									styles={{ avatar: hideAvatar }}
									avatar={{}}
								/>
								<Bubble
									placement='end'
									content="Hi, good morning, I'm fine!"
									avatar={{
										icon: <UserOutlined />,
										style: barAvatar,
									}}
								/>
								<Bubble
									placement='end'
									content='Thank you!'
									styles={{ avatar: hideAvatar }}
									avatar={{}}
								/>
							</Flex>
						</div>
						<div className='px-5 py-2'>
							<Sender
								onSubmit={() => {}}
								allowSpeech={{
									recording,
									onRecordingChange: (nextRecording) => {
										console.log(
											'Dogtiti ~ Page ~ nextRecording:',
											nextRecording
										);

										setRecording(nextRecording);
									},
								}}
							/>
						</div>
					</Flex>
					<Flex
						vertical
						gap={32}
						style={{
							width: 250, // 修改为标准的 Sider 宽度
							padding: '10px',
							overflowY: 'auto',
							background: colorBgLayout,
						}}
					>
						<div
							style={{
								fontSize: 16,
								fontWeight: 500,
							}}
						>
							Run settings
						</div>
						<FieldItem
							label='Model'
							icon={<Image src={GeminiIcon} alt={'Model'} />}
						>
							<Select
								popupMatchSelectWidth={false}
								onChange={setModel}
								value={model}
								options={[
									{
										value: 'gemini-2.0-flash-exp',
										label: (
											<span>
												<span
													style={{
														marginRight: 8,
													}}
												>
													Gemini 2.0 Flash
													Experimental
												</span>
												<Tag
													style={{
														marginRight: 0,
													}}
													color='#87d068'
												>
													New
												</Tag>
											</span>
										),
									},
								]}
							/>
						</FieldItem>
						<FieldItem label='Output format'>
							<Select
								onChange={setOutPut}
								value={outPut}
								options={[
									{
										value: 'audio',
										label: <span>Audio</span>,
									},
									{
										value: 'text',
										label: <span>Text</span>,
									},
								]}
							/>
						</FieldItem>
						<FieldItem label='Voice'>
							<Select
								onChange={setOutPut}
								value={outPut}
								options={[
									{
										value: 'audio',
										label: <span>Audio</span>,
									},
									{
										value: 'text',
										label: <span>Text</span>,
									},
								]}
							/>
						</FieldItem>
						<Collapse
							bordered={false}
							style={{ background: colorBgContainer }}
							activeKey={toolsPaneActive}
							onChange={(keys) =>
								setToolsPaneActive(keys as string[])
							}
							items={[
								{
									key: 'tools',
									label: 'Tools',
									children: (
										<Flex
											vertical
											gap={8}
											style={{
												paddingInlineStart: 24,
											}}
										>
											<FieldItem label='Code Execution'>
												<Checkbox
													onChange={(e) => {
														if (tools) {
															setTools({
																...tools,
																codeExecution:
																	e.target
																		.checked,
															});
														}
													}}
													checked={
														tools?.codeExecution
													}
												/>
											</FieldItem>
											<FieldItem label='Function calling'>
												<Checkbox
													onChange={(e) => {
														if (tools) {
															setTools({
																...tools,
																functionCalling:
																	e.target
																		.checked,
															});
														}
													}}
													checked={
														tools?.functionCalling
													}
												/>
											</FieldItem>
											<FieldItem label='Automatic Function Response'>
												<Checkbox
													onChange={(e) => {
														if (tools) {
															setTools({
																...tools,
																automaticFunctionResponse:
																	e.target
																		.checked,
															});
														}
													}}
													checked={
														tools?.automaticFunctionResponse
													}
												/>
											</FieldItem>
											<FieldItem label='Grounding'>
												<Checkbox
													onChange={(e) => {
														if (tools) {
															setTools({
																...tools,
																grounding:
																	e.target
																		.checked,
															});
														}
													}}
													checked={tools?.grounding}
												/>
											</FieldItem>
										</Flex>
									),
									style: panelStyle,
								},
							]}
						/>
					</Flex>
				</Flex>
			</Content>
		</Layout>
	);
};

export default LivePage;
