/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/live',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
