'use client';
import { Layout, theme, Collapse, Input, Flex } from 'antd';
import React, { useState, useEffect } from 'react';
import { Sender } from '@ant-design/x';
import { Bubble } from '@ant-design/x';
import { UserOutlined } from '@ant-design/icons';
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
const { Panel } = Collapse;

const LivePage = () => {
	const {
		token: { colorBgContainer, colorBgLayout },
	} = theme.useToken();
	const [recording, setRecording] = useState(false);

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
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					background: colorBgContainer,
					borderRadius: 20,
				}}
			>
				<div className='px-5 py-2'>
					<Collapse>
						<Panel header='Prompts' key='1'>
							<Input placeholder='Enter your prompt here' />
						</Panel>
					</Collapse>
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
							// When setting `recording`, the built-in speech recognition feature will be disabled
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
			</Content>
		</Layout>
	);
};

export default LivePage;
