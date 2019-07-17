const settings = {
	defaults: {
		kind: 'frame',
		displayTime: 10,
		width: 1920,
		height: 1200,
	},
	views: [
		{
			kind: 'text',
			textBig: 'Lorem ipsum dolor sit amet',
			textSmall: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			width: 1000,
			height: 300,
			displayTime: 5,
		},
		{
			kind: 'image',
			src: 'res/img1.jpg',
			displayTime: 5,
			width: 769,
			height: 960,
		},
		{
			src: 'http://caniuse.com',
			displayTime: 5,
		},
		{
			src: 'https://www.caniuse.com/#search=grid',
			displayTime: 5,
		},
	]
};
