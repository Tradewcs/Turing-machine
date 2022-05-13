let alphabeth_arr = ['0'];
let alphabeth_table = document.querySelector('.alphabet-symbols-choise');
let machineStrip = document.querySelector('.machine-strip');
let machineHead = document.querySelector('.machine-head');
let nullSymbolChoice = document.getElementById('nullSymbolChoice');
let nullSymbol = '0';
let MachineHead_currentPosition = 0;
let HeadCurrentPosition = 0;


window.onload = () => {
	fillStrip(nullSymbol, 100);

	let test1 = document.getElementById('test1');
	console.log(test1);

	setMachineHead(3);
}


function fillStrip(nullSymbol, length) {
	machineStrip.innerHTML = '';
	machineHead.innerHTML = '';

	for (let i = 0; i < length; i++) {
		machineStrip.innerHTML += `<td id="cell#${i}">${nullSymbol}</td>`;
		machineHead.innerHTML  += `<td id="h#${i}" class="td-invs"></td>`;
	}
}


function loadNullSymbolChoice(symbols_arr) {
	nullSymbolChoice.innerHTML = '';

	for (let i = 0; i < symbols_arr.length; i++) {
		nullSymbolChoice.innerHTML += `<option>${symbols_arr[i]}</option>`;
	}
}


alphabeth_table.onclick = function(event) {
	let target = event.target;

	if (target.type == 'checkbox') {
		if (target.checked) {
			alphabeth_arr.push(target.name);
		} else {
			console.log('not CHECKED');
			alphabeth_arr = alphabeth_arr.filter(element => element != target.name);
		}
	}

	console.log(nullSymbolChoice.value);
	nullSymbol = nullSymbolChoice.value;
	loadNullSymbolChoice(alphabeth_arr);
}

nullSymbolChoice.onchange = function(event) {
	nullSymbol = event.target.value;
	fillStrip(nullSymbol, 100);
}

function setMachineHead(position) {
	let cell = document.getElementById(`cell#${HeadCurrentPosition}`);
	let cellHead = document.getElementById(`h#${HeadCurrentPosition}`);
	cellHead.innerHTML = '';
	cell.classList.remove('yellow');

	HeadCurrentPosition = position;
	cell = document.getElementById(`cell#${HeadCurrentPosition}`);
	cell.classList.add('yellow');
	cellHead = document.getElementById(`h#${HeadCurrentPosition}`);
	cellHead.innerHTML = '↑';


}

