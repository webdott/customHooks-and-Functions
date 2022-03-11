import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
	typeof window === 'undefined'
		? Buffer.from(str).toString('base64')
		: window.btoa(str);

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1, e2, e3) =>
	keyStr.charAt(e1 >> 2) +
	keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
	keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
	keyStr.charAt(e3 & 63);

const rgbDataURL = (r, g, b) =>
	`data:image/gif;base64,R0lGODlhAQABAPAA${
		triplet(0, r, g) + triplet(b, 255, 255)
	}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const CustomImage = ({
	src,
	alt,
	width,
	height,
	effect,
	fromCloudinary,
	color,
}) => {
	let blurDataURL;
	switch (effect) {
		case 'shimmer':
			blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;
			break;
		case 'color':
			blurDataURL = rgbDataURL(...color);
			break;
		default:
			blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;
			break;
	}

	const urlBlurred = buildUrl(src, {
		cloud: {
			cloudName: 'webdot',
		},
		transformations: {
			effect: 'blur:1200',
			quality: 1,
		},
	});

	return fromCloudinary ? (
		<Image
			src={src}
			alt={alt}
			placeholder='blur'
			blurDataURL={effect ? blurDataURL : urlBlurred}
			width={width}
			height={height}
			unoptimized={true}
		/>
	) : (
		<Image
			src={src}
			alt={alt}
			placeholder='blur'
			blurDataURL={blurDataURL}
			width={width}
			height={height}
		/>
	);
};

export default CustomImage;
