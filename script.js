let alphabethTable = document.querySelector('.alphabet-symbols-choise');
let machineStrip = document.querySelector('.machine-strip');
let machineHead = document.querySelector('.machine-head');
let machineState = document.querySelector('.machine-state');
let nullSymbolChoice = document.getElementById('nullSymbolChoice');
let addStateButton = document.querySelector('.addStateButton');
let deleteStateButton = document.querySelector('.deleteStateButton');
let programTable = document.querySelector('.machineProgram');
let symbolChangePanel = document.querySelector('.symbolChangePanel');
let stripSymbolSelect = document.getElementById('stripSymbolSelect');
let statesManager = document.querySelector('.statesManager');
let doCommand = document.getElementById('doCommand');



const cells_count = 57;
let Alpabeth = ['0', '1'];
let nullSymbol = '0';
let HeadCurrentPosition = 0;
let statesCount = 2;
let currentState = 1;


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


alphabethTable.onclick = reloadNullSymbolChoice;

function reloadNullSymbolChoice(event) {
	let target = event.target;
	
	if (target.type == 'checkbox') {
		if (target.checked) {
			Alpabeth.push(target.name);

			addSymbol(target.name);
		} else {
			Alpabeth = Alpabeth.filter(element => element != target.name);

			deleteSymbol(target.name);
		}

		nullSymbol = nullSymbolChoice.value;
		nullSymbolChoice_addOptions(Alpabeth);
		stripSymbolSelect.innerHTML = nullSymbolChoice.innerHTML;

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

function addSymbol(c) {
	let th = document.createElement('th');
	th.id = 'h-' + c;
	th.innerHTML = c;
	document.getElementById('hri').appendChild(th);

	for (let i = 0; i < statesCount; i++) {
		let td = document.createElement('td');
		td.id = i + '-' + c;
		document.getElementById(`${i}ri`).appendChild(td);
	}
}

function deleteSymbol(c) {
	document.getElementById(`h-${c}`).remove();

	for (let i = 0; i < statesCount; i++) {
		document.getElementById(`${i}-${c}`).remove();
	}
}


function setHead(position) {
		let cell      = document.getElementById(`${HeadCurrentPosition}c`);
		let cellHead  = document.getElementById(`${HeadCurrentPosition}h`);
		let cellState = document.getElementById(`${HeadCurrentPosition}s`);
		cell.classList.remove('yellow');
		cellHead.innerHTML = '';
		cellState.innerHTML = '';

		
		HeadCurrentPosition = position < cells_count ? position : cells_count - 1;

		cell      = document.getElementById(`${HeadCurrentPosition}c`);
		cellHead  = document.getElementById(`${HeadCurrentPosition}h`);
		cellState = document.getElementById(`${HeadCurrentPosition}s`);

		cell.classList.add('yellow');
		cellHead.innerHTML = '↑';
		cellState.innerHTML = `q${currentState}`;

}

addStateButton.onclick = () => {
	let statesList = document.querySelector('.statesList');
	statesList.innerHTML += `<li>q${statesCount}</li>`;
	
	let tr = document.createElement('tr');
	tr.id = statesCount + 'ri';

	let th = document.createElement('th');
	th.innerHTML = 'q' + statesCount;

	tr.appendChild(th);
	for (let i = 0; i < Alpabeth.length; i++) {
		let td = document.createElement('td');
		td.id = statesCount + '-' + i;

		tr.appendChild(td);
	}

	programTable.appendChild(tr);
	statesCount++;
}

deleteStateButton.onclick = () => {
	if (statesCount > 2) {
		let statesList = document.querySelector('.statesList');
		statesList.innerHTML = '';
		
		for (let i = 0; i < statesCount - 1; i++) {
			statesList.innerHTML += `<li>q${i}</li>`
		}

		document.getElementById(`${--statesCount}ri`).remove();

		// reloadStateChoice(prev_event);
	}
}


let selectedValueIndex;
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
		currentCell.innerHTML = Alpabeth[++selectedValueIndex % Alpabeth.length];

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


let machineProgram = document.querySelector('.machineProgram');

machineProgram.onclick = reloadStateChoice;

let prev_event;
function reloadStateChoice(event) {
	if (event.target.id) {
		if (prev_event !== undefined) {prev_event.target.classList.remove('yellow');}

		let commandCell = event.target;
		commandCell.classList.add('yellow');

		statesManager.classList.remove('invisible');
		let machineRunPanel = document.querySelector('.machineRunPanel');
		machineRunPanel.classList.remove('invisible');

		let commandFrom = document.getElementById('commandFrom');
		let id = commandCell.id;
		commandFrom.innerHTML = `q${id.split('-')[0]}, ${id.split('-')[1]} -->`;

		let selectState = document.getElementById('selectState');
		selectState.innerHTML = '';
		for (let i = 0; i < statesCount; i++) {
			selectState.innerHTML += `<option>${i}</option>`;
		}

		let selectSymbol = document.getElementById('selectSymbol');
		selectSymbol.innerHTML = nullSymbolChoice.innerHTML;

		document.getElementById('enterCommandButton').onclick = () => {
			commandCell.innerHTML = `q${selectState.value}, ${selectSymbol.value}, ${document.getElementById('selectDirection').value}`;
		}

		let cancelCommandButton = document.getElementById('cancelCommandButton');
		cancelCommandButton.onclick = () => {
			statesManager.classList.add('invisible');
			machineRunPanel.classList.add('invisible');
			commandCell.classList.remove('yellow');
		}

		doCommand.onclick = () => {
			commandCell.classList.remove('yellow')
			doOneCommand();
		}

		let doAll = document.getElementById('doAll');
		doAll.onclick = () => {
			commandCell.classList.remove('yellow')

			while (true) {
				
				await (async () => {setTimeout(()=>1, Number(document.getElementById('selectSpeed').value) * 1000);})
				doOneCommand()

				// if ()
			}
		}
		
		prev_event = event;
	}
}

function doOneCommand() {
	let currentCell = document.getElementById(`${HeadCurrentPosition}c`);
	let command = document.getElementById(`${currentState}-${currentCell.innerHTML}`).innerHTML.split(', ');
	
	if (command[2]) {
		command[0] = command[0][1];
		console.log(command);

		currentState = command[0];
		currentCell.innerHTML = command[1];

		if (command[2] == 'R') {
			setHead(HeadCurrentPosition + 1)
		}

		if (command[2] == 'L') {
			setHead(HeadCurrentPosition - 1);
		}
	}
	if (document.getElementById(`${currentState}-${currentCell.innerHTML}`).innerHTML) {
		console.log(123);
	} else {console.log('no');}
	console.log(document.getElementById(`${currentState}-${currentCell.innerHTML}`).innerHTML.split(', '));
	

	return command[2];
}

function is_machineWork() {
	
}

