'use client';
import React, { useState, useEffect } from 'react';
import { AudioOutlined, LeftOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, ConfigProvider } from 'antd';
import clsx from 'clsx';
import { useRouter, usePathname } from 'next/navigation';
import { LiveAPIProvider } from "@/vendor/contexts/LiveAPIContext";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem('Stream Realtime', '/live', <AudioOutlined />),
];

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string || '';
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_APIK_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

const GlobalLayout: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgLayout },
	} = theme.useToken();
	const [mounted, setMounted] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const handleMenuClick: MenuProps['onClick'] = (e) => {
		router.push(e.key);
	};

	return (
		<ConfigProvider
			theme={{
				algorithm: theme.defaultAlgorithm,
			}}
		>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					width={250}
					trigger={null}
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
					style={{ background: colorBgLayout, padding: '0 10px' }}
				>
					<div
						className='h-8 m-4 rounded-lg text-lg font-medium text-center overflow-hidden relative'
						style={{ background: colorBgLayout }}
					>
						<div
							className={clsx(
								'transition-transform duration-500 ease-in-out absolute w-full left-0 top-0 overflow-hidden font-medium text-2xl',
								{
									'translate-x-full': collapsed,
									'translate-x-0': !collapsed,
								}
							)}
						>
							Google AI Studio
						</div>
						<div
							className={clsx(
								'transition-transform duration-500 ease-in-out absolute w-full left-0 top-0 flex justify-center',
								{
									'translate-x-0': collapsed,
									'-translate-x-full': !collapsed,
								}
							)}
						>
							<svg
								width='29'
								height='30'
								viewBox='0 0 29 30'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M18.1591 17.0322C18.1163 17.5027 18.2662 17.9782 18.5859 18.326C18.9055 18.6737 19.357 18.8578 19.7673 19.0214C20.2154 19.1987 20.6027 19.3436 21.0212 19.5941C21.4199 19.8328 21.7725 20.1294 22.0675 20.4958C23.2802 21.9941 23.1681 24.1929 21.8121 25.5566C20.456 26.9202 18.3057 26.9935 16.864 25.727C16.4966 25.4032 16.1703 24.9873 15.9017 24.5799C15.4931 21.8697 16.2857 19.0299 18.1591 17.0322Z'
									fill='#87A9FF'
								></path>
								<path
									d='M19.886 15.6415C20.3358 15.3756 20.756 15.1881 21.2453 15.0142C21.7166 14.8472 22.196 14.7091 22.6805 14.5847C23.1633 14.4603 23.651 14.3546 24.1387 14.2489C24.6264 14.1432 25.1108 14.041 25.5821 13.8586C27.8905 12.962 29.2878 10.5535 28.95 8.04954C28.6122 5.54559 26.63 3.61436 24.17 3.39106C23.0529 3.2905 21.9736 3.55981 20.9751 4.03197C19.9799 4.50242 19.0687 5.17059 18.2761 5.93592C16.6746 7.47852 15.4915 9.45918 14.7698 11.5677C14.0432 13.6898 13.7713 15.9722 13.9427 18.2102C14.0284 19.325 14.2261 20.4466 14.5424 21.5187C14.8522 22.5704 15.3004 23.6562 15.9034 24.5766C15.6431 22.8534 15.8672 21.0721 16.5609 19.4767C17.2529 17.8847 18.3997 16.521 19.886 15.6415Z'
									fill='#0057CE'
								></path>
								<path
									d='M9.62059 17.1674C9.46241 16.9867 9.29764 16.8145 9.11474 16.6611C9.34212 17.06 9.36519 17.5117 9.26962 17.9463C9.17406 18.3793 8.96315 18.7799 8.69622 19.1242C8.42105 19.477 8.0981 19.7583 7.74714 20.0242C7.44067 20.256 6.99414 20.5526 6.71732 20.8304C5.90335 21.6486 5.73693 22.927 6.31363 23.9326C6.89033 24.94 8.06021 25.4173 9.15593 25.09C9.76064 24.9093 10.2731 24.502 10.6801 24.0366C11.092 23.5662 11.4265 23.0071 11.6901 22.4412C11.6226 20.4895 10.891 18.6247 9.62059 17.1674Z'
									fill='#87A9FF'
								></path>
								<path
									d='M4.45504 6.30371C6.13076 6.30201 7.75705 7.25484 8.93516 8.32358C10.1858 9.45879 11.1546 10.9042 11.7923 12.4758C12.4332 14.0559 12.7414 15.7638 12.7298 17.4701C12.7183 19.1286 12.3986 20.9251 11.6901 22.4405C11.6226 20.4888 10.891 18.6223 9.62061 17.165C9.39817 16.911 9.16584 16.6809 8.88902 16.4866C8.61221 16.2922 8.32056 16.1491 8.00585 16.0349C7.39455 15.8133 6.70416 15.7093 6.06815 15.6377C5.41236 15.5627 4.75327 15.5184 4.09913 15.4195C3.42687 15.3173 2.8238 15.1673 2.22404 14.811C0.477466 13.7781 -0.369457 11.6747 0.152867 9.68379C0.675191 7.6912 2.43989 6.30542 4.45504 6.30371Z'
									fill='#0057CE'
								></path>
							</svg>
						</div>
					</div>
					<Menu
						mode='inline'
						items={items}
						onClick={handleMenuClick}
						selectedKeys={[pathname]}
						style={{
							background: colorBgLayout,
							borderInlineEnd: 'none',
						}}
					/>
					<div
						onClick={() => setCollapsed(!collapsed)}
						className='ant-layout-sider-trigger'
						style={{
							width: collapsed ? 60 : 230,
							color: '#000',
							background: colorBgLayout,
							padding: '0 10px',
							boxSizing: 'border-box',
						}}
					>
						<LeftOutlined rotate={collapsed ? 180 : 0} />
					</div>
				</Sider>
				<LiveAPIProvider url={uri} apiKey={API_KEY}>
					{children}
				</LiveAPIProvider>
			</Layout>
		</ConfigProvider>
	);
};

export default GlobalLayout;
