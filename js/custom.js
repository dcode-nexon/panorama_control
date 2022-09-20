let timer = null;
let rotateNum = 0;
let activeNum = 0;

const frame = document.querySelector('#circle');
const boxs = frame.querySelectorAll('article');
const btnMode = document.querySelectorAll('.mode li');
const info = document.querySelector('.status');
const navi = document.querySelector('.navi');
const btnNavi = navi.querySelectorAll('li');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

startRolling();

btnMode[0].addEventListener('click', modePanorama);
btnMode[1].addEventListener('click', modeControl);
btnNavi.forEach((el, idx) => el.addEventListener('click', () => rotation(idx)));
btnPrev.addEventListener('click', prev);
btnNext.addEventListener('click', next);

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
	btnPrev.classList.remove('on');
	btnNext.classList.remove('on');
	boxs[0].classList.remove('on');

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
	btnPrev.classList.add('on');
	btnNext.classList.add('on');

	frame.style.transitionDuration = '0.5s';
	frame.style.transform = 'rotateY(0deg)';
	for (el of btnNavi) el.classList.remove('on');
	btnNavi[0].classList.add('on');
	boxs[0].classList.add('on');

	stopRolling();
}

function rotation(index) {
	frame.style.transform = `rotateY(${45 * index}deg)`;
	activation(index);

	activeNum = index;
	rotateNum = index;
}

function activation(index) {
	let boxNum = 0;
	index === 0 ? (boxNum = 8) : (boxNum = index);
	for (el of btnNavi) el.classList.remove('on');
	btnNavi[index].classList.add('on');

	for (el of boxs) el.classList.remove('on');
	boxs[8 - boxNum].classList.add('on');
}

function prev() {
	let deg = 45 * --rotateNum;
	frame.style.transform = `rotateY(${deg}deg)`;

	activeNum === 0 ? (activeNum = 7) : --activeNum;
	activation(activeNum);
}

function next() {
	let deg = 45 * ++rotateNum;
	frame.style.transform = `rotateY(${deg}deg)`;

	activeNum === 7 ? (activeNum = 0) : ++activeNum;
	activation(activeNum);
}
