const initViews = () => {
	settings.views.forEach(v => {
		v.kind = v.kind || settings.defaults.kind;
		v.displayTime = v.displayTime || settings.defaults.displayTime;
		v.width = v.width || settings.defaults.width;
		v.height = v.height || settings.defaults.height;
	});
};
const loadText = (view) => {
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
	document.getElementById('main').appendChild(elm);
	return elm;
};
const loadImage = (view) => {
	const elm = document.createElement('img');
	elm.style.width = view.width + 'px';
	elm.style.height = view.height + 'px';
	elm.src = view.src;
	document.getElementById('main').appendChild(elm);
	return elm;
};
const loadFrame = (view) => {
	const elm = document.createElement('iframe');
	const w = view.width;
	const h = view.height;
	elm.setAttribute('width', w + 'px');
	elm.setAttribute('height', h + 'px');
	elm.setAttribute('scrolling', 'no');
	elm.setAttribute('frameborder', '0');
	elm.setAttribute('allowfullscreen', 'true');
	elm.src = view.src || 'about:blank';
	document.getElementById('main').appendChild(elm);
	return elm;
};
const loadView = (ind) => {
	const obj = {
		ind: ind,
		view: settings.views[ind]
	};
	switch (obj.view.kind) {
		case 'text': {
			obj.elm = loadText(obj.view);
			break;
		}
		case 'image': {
			obj.elm = loadImage(obj.view);
			break;
		}
		case 'frame':
		default: {
			obj.elm = loadFrame(obj.view);
			break;
		}
	}
	obj.elm.classList.add('hide');
	obj.elm.classList.add('view');
	obj.elm.classList.add('view-' + obj.view.kind);
	const w = obj.view.width;
	const h = obj.view.height;
	obj.elm.style['left'] = `calc(50vw - ${w/2}px`;
	obj.elm.style['top'] = `calc(50vh - ${h/2}px`;
	return obj;
};
const toggleView = (oldView, newView) => {
	newView.elm.classList.remove('hide');
	newView.elm.classList.add('show');
	if (oldView) {
		oldView.elm.classList.remove('show');
		oldView.elm.classList.add('hide');
		setTimeout(() => {
			oldView.elm.parentNode.removeChild(oldView.elm);
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
toggleView(null, loadView(0));
