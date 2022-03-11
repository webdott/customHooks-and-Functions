import { useState, useEffect } from 'react';
import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';

const CustomImage = ({ src, alt, width, height, fromCloudinary }) => {
	const [image, setImage] = useState();

	useEffect(() => {
		setTimeout(() => {
			setImage(src);
		}, 2000);
	}, []);

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
		<div
			style={{
				position: 'relative',
				width: width,
				height: height,
				backgroundImage: `url(${urlBlurred})`,
				backgroundPosition: 'center center',
				backgroundSize: `cover`,
			}}
		>
			<div
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					top: 0,
					left: 0,
					zIndex: 2,
				}}
			>
				{/* {image && (
					<Image
						src={image}
						alt={alt}
						width={width}
						height={height}
						unoptimized={true}
					/>
				)} */}
			</div>
		</div>
	) : (
		<Image
			src={src}
			alt={alt}
			placeholder='blur'
			width={width}
			height={height}
		/>
	);
};

export default CustomImage;
