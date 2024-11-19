/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: [
			'res.cloudinary.com',
			'avatars.githubusercontent.com',
			'firebasestorage.googleapis.com',
			'img.icons8.com',
			'raw.githubusercontent.com',
			'i.imgur.com',
			'img.freepik.com',
			'media.geeksforgeeks.org',
			'grpc.io',
			'rest-assured.io',
			'user-images.githubusercontent.com',
			'appium.io',
			'github.com',
			'gatling.io',
		],
	},
};

module.exports = nextConfig;
