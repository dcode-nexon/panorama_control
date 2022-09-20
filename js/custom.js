let timer = null;

const frame = document.querySelector('#circle');
const boxs = frame.querySelectorAll('article');
const btnMode = document.querySelectorAll('.mode li');
const info = document.querySelector('.status');
const navi = document.querySelector('.navi');
const btnNavi = navi.querySelectorAll('li');

startRolling();

btnMode[0].addEventListener('click', modePanorama);
btnMode[1].addEventListener('click', modeControl);
btnNavi.forEach((el, idx) => el.addEventListener('click', () => rotation(idx)));

function startRolling() {
	let deg = 0;
	timer = setInterval(() => {
		deg += 0.2;
		if (deg >= 360) i = 0;
		frame.style.transform = `rotateY(${deg}deg)`;
	}, 20);
}

function stopRolling() {
	clearInterval(timer);
}

function modePanorama() {
	if (btnMode[0].classList.contains('on')) return;
	btnMode[0].classList.add('on');
	btnMode[1].classList.remove('on');
	info.classList.add('on');
	navi.classList.remove('on');

	frame.style.transform = 'rotateY(0deg)';
	setTimeout(() => {
		frame.style.transitionDuration = '0s';
		startRolling();
	}, 600);
}

function modeControl() {
	if (btnMode[1].classList.contains('on')) return;
	num = 0;
	btnMode[0].classList.remove('on');
	btnMode[1].classList.add('on');
	info.classList.remove('on');
	navi.classList.add('on');
	frame.style.transitionDuration = '0.5s';
	frame.style.transform = 'rotateY(0deg)';
	boxs[0].classList.add('on');

	stopRolling();
}

function rotation(index) {
	frame.style.transform = `rotateY(${45 * index}deg)`;
	activation(index);
}

function activation(index) {
	for (el of btnNavi) el.classList.remove('on');
	btnNavi[index].classList.add('on');
}
