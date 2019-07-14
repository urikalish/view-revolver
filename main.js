const getFrame = (frameIndex) => {
	return document.getElementById(`frame${frameIndex}`);
};
const loadFrame = (frameIndex, viewIndex) => {
	const frame = getFrame(frameIndex);
	frame.src = settings.views[viewIndex].src;
};
const hideFrame = (frameIndex) => {
	const frame = getFrame(frameIndex);
	frame.classList.remove('show');
	frame.classList.add('hide');
};
const showFrame = (frameIndex) => {
	const frame = getFrame(frameIndex);
	frame.classList.remove('hide');
	frame.classList.add('show');
};
const toggleFrame = (frameIndex, viewIndex) => {
	const otherFrameIndex = frameIndex === 0 ? 1 : 0;
	const otherViewIndex = (viewIndex + 1) % settings.views.length;
	showFrame(frameIndex);
	hideFrame(otherFrameIndex);
	setTimeout(() => {
		loadFrame(otherFrameIndex, otherViewIndex)},
		1000);
	setTimeout(() => {
		toggleFrame(otherFrameIndex, otherViewIndex)},
		(settings.views[viewIndex].displayTime || settings.defaultViewDisplayTime) * 1000);
};
loadFrame(0, 0);
setTimeout(() => {toggleFrame(0, 0);}, 0);
