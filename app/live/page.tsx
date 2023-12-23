'use client';
import { Layout, theme, Collapse, Input, Flex, Button } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { Sender } from '@ant-design/x';
import { Bubble } from '@ant-design/x';
import { UserOutlined, PauseCircleOutlined, PlayCircleOutlined, PauseCircleTwoTone, PlayCircleTwoTone } from '@ant-design/icons';
import MediaButtons from '@/components/media-buttons';
import { useLiveAPIContext } from "@/vendor/contexts/LiveAPIContext";
import { StreamingLog } from "@/vendor/multimodal-live-types";


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
	const videoRef = useRef<HTMLVideoElement>(null);
    // either the screen capture, the video or null, if null we hide it
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
	const { client, connected, connect, disconnect } = useLiveAPIContext();
	const [textInput, setTextInput] = useState("");
	const handleSubmit = () => {
		client.send([{ text: textInput }]);
		setTextInput("");
	};

	const log = ({ date, type, message }: StreamingLog) => {
		console.log('log', date, type, message)
	}
	useEffect(() => {
		client.on("log", log);
		return () => {
		  client.off("log", log);
		};
	}, [client, log]);

	console.log('video', !connected || !videoRef.current || !videoStream, 'connected', connected, 'videoStream', videoStream)

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
					position: 'relative'
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
				<Flex justify='center'>
					<Button
					    type={ connected ? 'primary': 'default' }
						onClick={connected ? disconnect : connect}
						icon={connected? <PauseCircleTwoTone /> : <PlayCircleTwoTone /> }
					/>
				</Flex>
				<div className='px-5 py-2' style={{ pointerEvents: !connected ? 'none' as any : ''}}>
					<Sender
						onSubmit={handleSubmit}
						value={textInput}
						onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							e.stopPropagation();
							handleSubmit();
						}
						}}
						disabled={!connected}
						prefix={
							<MediaButtons
								videoRef={videoRef}
								supportsVideo={true}
								onVideoStreamChange={setVideoStream}
							/>
						}
					/>
					<video
						style={{
							position: 'absolute',
							top: 70,
							right: 20,
							maxWidth: 300,
							borderRadius: 10,
							border: '1px solid #333',
							display: !videoStream ? 'none': 'auto'
						}}
						ref={videoRef}
						autoPlay
						playsInline
					/>
				</div>
			</Content>
		</Layout>
	);
};

export default LivePage;
