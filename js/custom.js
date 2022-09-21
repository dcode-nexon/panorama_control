let timer = null;
let rotateNum = 0; //좌우 버튼 클릭시 rotate각도에 적용될 카운트값
let activeNum = 0; //네이버튼 활성화 시킬 순번

const frame = document.querySelector('#circle');
const boxs = frame.querySelectorAll('article');
const btnMode = document.querySelectorAll('.mode li');
const info = document.querySelector('.status');
const navi = document.querySelector('.navi');
const btnNavi = navi.querySelectorAll('li');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
//파노라마, 컨트롤 모드시 보이고 안보일 요소 배열로 그룹핑
const activeEl = [btnMode[0], info];
const resetEl = [btnMode[1], navi, btnPrev, btnNext];

//로딩시 롤링시작
startRolling();

//모드버튼 클릭시 파노라마, 컨트롤 모드 변경 이벤트
btnMode[0].addEventListener('click', modePanorama);
btnMode[1].addEventListener('click', modeControl);

//네비버튼 클릭시 전체박스 회전 및 네비버튼 활성화함수 호출 이벤트
btnNavi.forEach((el, idx) => el.addEventListener('click', () => rotation(idx)));

//좌우 버튼 클릭시 좌우회전 및 네비버튼 활성화 함수 호출 이벤트
btnPrev.addEventListener('click', prev);
btnNext.addEventListener('click', next);

//패널 롤링시작함수
function startRolling() {
	let deg = 0;
	timer = setInterval(() => {
		deg += 0.2;
		if (deg >= 360) i = 0;
		frame.style.transform = `rotateY(${deg}deg)`;
	}, 20);
}

//패널 롤링정지함수
function stopRolling() {
	clearInterval(timer);
}

//파노라마 모드 함수
function modePanorama() {
	//이미 해당 버튼이 활성화 되어있으면 함수 중지
	if (btnMode[0].classList.contains('on')) return;

	//파노라마 모드에 맞게 버튼 및 메뉴 활성화 및 비활성화
	for (el of activeEl) el.classList.add('on');
	for (el of resetEl) el.classList.remove('on');

	//첫번째 박스 비활성화하여 패널위에 제목 사라지게 하고 frame 회전각을 0으로 초기화
	boxs[0].classList.remove('on');
	frame.style.transform = 'rotateY(0deg)';

	//0.5초 동안 0도 위치로 초기화 되는 모션 기다린후, 다시 transitionDuration값 없애고 롤링시작
	setTimeout(() => {
		frame.style.transitionDuration = '0s';
		startRolling();
	}, 600);
}

//컨트롤 모드 함수
function modeControl() {
	//이미 해당 버튼이 활성화 되어있으면 함수 중지
	if (btnMode[1].classList.contains('on')) return;

	//컨트롤 모드드에 맞게 버튼 및 메뉴 활성화 및 비활성화
	for (el of activeEl) el.classList.remove('on');
	for (el of resetEl) el.classList.add('on');

	//frame에 다시 transitionDuration값 설정하고 0도로 프레임 각도 초기화
	frame.style.transitionDuration = '0.5s';
	frame.style.transform = 'rotateY(0deg)';

	//일단 모든 네비버튼  초기화했다가 첫번째 네비버튼과 첫번쨰 박스만 활성화
	for (el of btnNavi) el.classList.remove('on');
	btnNavi[0].classList.add('on');
	boxs[0].classList.add('on');

	//롤링 정지
	stopRolling();
}

//프레임 회전 함수
function rotation(index) {
	//각 순번의 위치에 맞게 frame 회전 (45 = 360 / 패널갯수 )
	frame.style.transform = `rotateY(${45 * index}deg)`;

	//네비버튼과 박스 활성화 함수 호출
	activation(index);

	//네비버튼 클릭해서 roateion이 실행되면 인수로 들어온 현재 순번으로 전역 activeNum, rotateNum값 갱신
	activeNum = index;
	rotateNum = index;
}

//네비, 박스 활성화 함수
function activation(index) {
	//네비버튼 활성화
	for (el of btnNavi) el.classList.remove('on');
	btnNavi[index].classList.add('on');

	//박스 활성화
	//박스의 위치가 원통 회전각도에 따라 활성화 되기 때문에 네비버튼의 활성화 순번과 연관이 없음.
	//때문에 boxNum값을 담을 변수를 만들어 박스 활성화 순번을 구하는 로직처리
	//만약 index값이 영이면 boxNum값은 그래도 0, 그렇지 않으면 전체 갯수에 index값을 뺀값을 지정
	let boxNum = 0;
	index === 0 ? (boxNum = 0) : (boxNum = 8 - index);

	for (el of boxs) el.classList.remove('on');
	boxs[boxNum].classList.add('on');
}

//prev회전 함수
function prev() {
	let deg = 45 * --rotateNum;
	frame.style.transform = `rotateY(${deg}deg)`;

	//prev회전시 navi버튼 순번 계산후 활성화
	activeNum === 0 ? (activeNum = 7) : --activeNum;
	activation(activeNum);
}

//next회전 함수
function next() {
	let deg = 45 * ++rotateNum;
	frame.style.transform = `rotateY(${deg}deg)`;

	//next회전시 navi버튼 순번 계산후 활성화
	activeNum === 7 ? (activeNum = 0) : ++activeNum;
	activation(activeNum);
}
