const clickOutside = (elemSelector, callBack) => {
	const elem = document.querySelector(elemSelector);

	window.addEventListener('click', (e) => {
		if (!elem.contains(e.target)) {
			callBack();
		}
	});

	return () =>
		window.removeEventListener('click', (e) => {
			if (!elem.contains(e.target)) {
				callBack();
			}
		});
};
