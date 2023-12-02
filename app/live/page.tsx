'use client';
import { Layout, theme } from 'antd';
import React, { useState, useEffect } from 'react';
import { Sender } from '@ant-design/x';

const { Header, Content } = Layout;

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
				}}
			>
				<div
					className='messages'
					style={{
						flex: 1,
						padding: 24,
						borderRadius: 20,
						overflowY: 'auto',
					}}
				>
					{Array.from({ length: 100 }).map((_, index) => (
						<div key={index} style={{ marginBottom: 16 }}>
							{index + 1}
						</div>
					))}
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
