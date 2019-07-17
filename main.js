const initViews = () => {
	settings.views.forEach(v => {
		v.kind = v.kind || settings.defaults.kind;
		v.displayTime = v.displayTime || settings.defaults.displayTime;
		v.width = v.width || settings.defaults.width;
		v.height = v.height || settings.defaults.height;
	});
};
const showView = (view) => {
	view.containerElm.classList.remove('hide');
	view.containerElm.classList.add('show');
};
const hideView = (view) => {
	view.containerElm.classList.remove('show');
	view.containerElm.classList.add('hide');
};
const createTextElm = (view) => {
	const elm = document.createElement('div');
	elm.style.width = view.width + 'px';
	elm.style.height = view.height + 'px';
	if (view.textBig) {
		const textBigElm = document.createElement('div');
		textBigElm.classList.add('big');
		textBigElm.innerText = view.textBig;
		elm.appendChild(textBigElm);
	}
	if (view.textSmall) {
		const textSmallElm = document.createElement('div');
		textSmallElm.classList.add('small');
		textSmallElm.innerText = view.textSmall;
		elm.appendChild(textSmallElm);
	}
	return elm;
};
const createImageElm = (view) => {
	const elm = document.createElement('img');
	elm.style.width = view.width + 'px';
	elm.style.height = view.height + 'px';
	elm.src = view.src;
	return elm;
};
const createFrameElm = (view) => {
	const elm = document.createElement('iframe');
	const w = view.width;
	const h = view.height;
	elm.setAttribute('width', w + 'px');
	elm.setAttribute('height', h + 'px');
	elm.setAttribute('scrolling', 'no');
	elm.setAttribute('frameborder', '0');
	elm.setAttribute('allowfullscreen', 'true');
	elm.src = view.src || 'about:blank';
	return elm;
};
const loadView = (ind) => {
	const obj = {
		ind: ind,
		view: settings.views[ind]
	};
	switch (obj.view.kind) {
		case 'text': {
			obj.elm = createTextElm(obj.view);
			break;
		}
		case 'image': {
			obj.elm = createImageElm(obj.view);
			break;
		}
		case 'frame':
		default: {
			obj.elm = createFrameElm(obj.view);
			break;
		}
	}
	obj.elm.classList.add('view');
	obj.elm.classList.add('view-' + obj.view.kind);
	const w = obj.view.width;
	const h = obj.view.height;
	obj.elm.style['left'] = `calc(50vw - ${w/2}px`;
	obj.elm.style['top'] = `calc(50vh - ${h/2}px`;
	obj.containerElm = document.createElement('div');
	obj.containerElm.classList.add('view-container');
	obj.containerElm.classList.add('view-container-' + obj.view.kind);
	obj.containerElm.classList.add('hide');
	obj.containerElm.appendChild(obj.elm);
	document.getElementById('main').appendChild(obj.containerElm);
	return obj;
};
const toggleView = (oldView, newView) => {
	showView(newView);
	if (oldView) {
		hideView(oldView);
		setTimeout(() => {
			oldView.containerElm.parentNode.removeChild(oldView.containerElm);
		}, 2000);
	}
	setTimeout(() => {
		const nextView = loadView((newView.ind + 1) % settings.views.length);
		setTimeout(() => {
			toggleView(newView, nextView)},
			newView.view.displayTime * 1000);
	}, 1000);
};
initViews();
const firstView = loadView(0);
toggleView(null, firstView);
