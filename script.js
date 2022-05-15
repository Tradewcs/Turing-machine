let alphabeth_table = document.querySelector('.alphabet-symbols-choise');
let machineStrip = document.querySelector('.machine-strip');
let machineHead = document.querySelector('.machine-head');
let machineState = document.querySelector('.machine-state');
let nullSymbolChoice = document.getElementById('nullSymbolChoice');
let addStateButton = document.querySelector('.addStateButton');
let deleteStateButton = document.querySelector('.deleteStateButton');
let programTable = document.querySelector('.machineProgram');
let symbolChangePanel = document.querySelector('.symbolChangePanel');
let stripSymbolSelect = document.getElementById('stripSymbolSelect');

const cells_count = 10;
let Alpabeth = ['0', '1'];
let nullSymbol = '0';
let HeadCurrentPosition = 0;
let statesCount = 2;
let currentState = 1;
let selectedValueIndex;


// addStateButton.addEventListener('click', function() {
	// 	ExternalAlphabet.innerHTML += 4;
	
	// 	// MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'machine-strip']);
	
	// 	console.log('123');
	// });
	
	
	window.onload = () => {
		fillStrip(cells_count);
		
		setHead(5);
		
		
		// MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'machine-strip']);
		
	}
	
	
function fillStrip(length) {
	machineStrip.innerHTML = '';
	machineHead.innerHTML = '';
	machineState.innerHTML = '';
	
	for (let i = 0; i < length; i++) {
		machineStrip.innerHTML += `<td id="${i}c">${nullSymbol}</td>`;
		machineHead.innerHTML  += `<td id="${i}h" class="td-invs"></td>`;
		machineState.innerHTML += `<td id="${i}s" class="td-invs"></td>`
	}
}


alphabeth_table.onclick = function reloadNullSymbolChoice(event) {
	let target = event.target;
	
	if (target.type == 'checkbox') {
		if (target.checked) {
			Alpabeth.push(target.name);
		} else {
			Alpabeth = Alpabeth.filter(element => element != target.name);
		}

		nullSymbol = nullSymbolChoice.value;
		nullSymbolChoice_addOptions(Alpabeth);
		stripSymbolSelect.innerHTML = nullSymbolChoice.innerHTML;
		BuildProgramTable();
	}
}

function nullSymbolChoice_addOptions(symbols_arr) {
	nullSymbolChoice.innerHTML = '';
	
	for (let i = 0; i < symbols_arr.length; i++) {
		nullSymbolChoice.innerHTML += `<option>${symbols_arr[i]}</option>`;
	}
}

nullSymbolChoice.onchange = function(event) {
	nullSymbol = event.target.value;
	fillStrip(100);
	setHead(HeadCurrentPosition);
}



function setHead(position) {
	let cell      = document.getElementById(`${HeadCurrentPosition}c`);
	let cellHead  = document.getElementById(`${HeadCurrentPosition}h`);
	let cellState = document.getElementById(`${HeadCurrentPosition}s`);
	cell.classList.remove('yellow');
	cellHead.innerHTML = '';
	cellState.innerHTML = '';
	
	HeadCurrentPosition = position;

	cell      = document.getElementById(`${HeadCurrentPosition}c`);
	cellHead  = document.getElementById(`${HeadCurrentPosition}h`);
	cellState = document.getElementById(`${HeadCurrentPosition}s`);

	cell.classList.add('yellow');
	cellHead.innerHTML = '↑';
	cellState.innerHTML = `q${currentState}`;
}

addStateButton.onclick = () => {
	let statesList = document.querySelector('.statesList');
	statesList.innerHTML += `<li>q${statesCount++}</li>`;

	BuildProgramTable();
}

deleteStateButton.onclick = () => {
	if (statesCount > 2) {
		let statesList = document.querySelector('.statesList');
		statesList.innerHTML = '';

		statesCount--;
		for (let i = 0; i < statesCount; i++) {
			statesList.innerHTML += `<li>q${i}</li>`
		}


		BuildProgramTable();
	}
}

function BuildProgramTable() {
	inner_str = '';
	
	Alpabeth.sort();
	
	inner_str += '<tr> <td></td> ';
	for (let i = 0; i < Alpabeth.length; i++) {
		inner_str += `<td> ${Alpabeth[i]} </td>`;
	}
	inner_str += '</tr>';
	
	for (let i = 0; i < statesCount; i++) {
		inner_str += `<tr> <td> q${i} </td>`;
		for (let j = 0; j < Alpabeth.length; j++) {
			inner_str += `<td id="${i}-${j}"></td>`;
		}
		inner_str += '</tr>';
	}
	
	programTable.innerHTML = inner_str;
}


let id_previous_green_cell = '0c';
machineStrip.onclick = (event) => {
	symbolChangePanel.classList.remove('invisible');

	
	let currentCell = event.target;
	if (!currentCell.classList.contains('green')) {
		selectedValueIndex = 0;

		document.getElementById(id_previous_green_cell).classList.remove('green');
		currentCell.classList.add('green');
		id_previous_green_cell = currentCell.id;

		let stripSymbolSelect = document.getElementById('stripSymbolSelect');
		
		stripSymbolSelect.onchange = () => {
			currentCell.innerHTML = stripSymbolSelect.value;
		};

	} else {
		if (selectedValueIndex >= Alpabeth.length) {
			selectedValueIndex = 0;
		}
		currentCell.innerHTML = Alpabeth[selectedValueIndex++];

	}

	stripSymbolSelect.value = currentCell.innerHTML;

	let exitChoiseButton = document.getElementById('exitChoiseButton');
	exitChoiseButton.onclick = () => {
		currentCell.classList.remove('green');
		symbolChangePanel.classList.add('invisible');
	}

	let setHeadButton = document.getElementById('setHeadButton');
	setHeadButton.onclick = (event) => {
		setHead(parseInt(currentCell.id));
	}

	let cleanStripButton = document.getElementById('cleanStripButton');
	cleanStripButton.onclick = () => {
		fillStrip(cells_count);
	}
}
