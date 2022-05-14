let alphabeth_arr = ['0'];
let alphabeth_table = document.querySelector('.alphabet-symbols-choise');
let machineStrip = document.querySelector('.machine-strip');
let machineHead = document.querySelector('.machine-head');
let machineState = document.querySelector('.machine-state');
let nullSymbolChoice = document.getElementById('nullSymbolChoice');
let addState = document.querySelector('.addState');
let deleteState = document.querySelector('.deleteState');
let programTable = document.querySelector('.machineProgram');



let nullSymbol = '0';
let HeadCurrentPosition = 0;
let statesCount = 2;
let currentState = 1;



// addState.addEventListener('click', function() {
	// 	ExternalAlphabet.innerHTML += 4;
	
	// 	// MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'machine-strip']);
	
	// 	console.log('123');
	// });
	
	
	window.onload = () => {
		fillStrip(100);
		
		
		
		setHead(3);
		
		
		// MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'machine-strip']);
		
	}
	
	
function fillStrip(length) {
	machineStrip.innerHTML = '';
	machineHead.innerHTML = '';
	machineState.innerHTML = '';
	
	for (let i = 0; i < length; i++) {
		machineStrip.innerHTML += `<td id="c#${i}">${nullSymbol}</td>`;
		machineHead.innerHTML  += `<td id="h#${i}" class="td-invs"></td>`;
		machineState.innerHTML += `<td id="s#${i}" class="td-invs"></td>`
	}
}
	
	
function nullSymbolChoice_addOptions(symbols_arr) {
	nullSymbolChoice.innerHTML = '';
	
	for (let i = 0; i < symbols_arr.length; i++) {
		nullSymbolChoice.innerHTML += `<option>${symbols_arr[i]}</option>`;
	}
}


alphabeth_table.onclick = function reloadNullSymbolChoice(event) {
	let target = event.target;
	
	if (target.type == 'checkbox') {
		if (target.checked) {
			alphabeth_arr.push(target.name);
		} else {
			alphabeth_arr = alphabeth_arr.filter(element => element != target.name);
		}
	}
	
	nullSymbol = nullSymbolChoice.value;
	nullSymbolChoice_addOptions(alphabeth_arr);
	BuildProgramTable();
}

nullSymbolChoice.onchange = function(event) {
	nullSymbol = event.target.value;
	fillStrip(100);
	setHead(HeadCurrentPosition);
}

function setHead(position) {
	let cell = document.getElementById(`c#${HeadCurrentPosition}`);
	let cellHead = document.getElementById(`h#${HeadCurrentPosition}`);
	let cellState = document.getElementById(`s#${HeadCurrentPosition}`);
	cellHead.innerHTML = '';
	cell.classList.remove('yellow');
	
	HeadCurrentPosition = position;

	cell = document.getElementById(`c#${HeadCurrentPosition}`);
	cellHead = document.getElementById(`h#${HeadCurrentPosition}`);
	cellState = document.getElementById(`s#${HeadCurrentPosition}`);
	cell.classList.add('yellow');
	cellHead.innerHTML = '↑';
	
}

addState.onclick = () => {
	let statesList = document.querySelector('.statesList');
	statesList.innerHTML += `<li>q${statesCount++}</li>`;

	BuildProgramTable();
}

deleteState.onclick = () => {
	if (statesCount > 2) {
		let statesList = document.querySelector('.statesList');
		statesList.innerHTML = '';

		statesCount--;
		for (let i = 0; i < statesCount; i++) {
			statesList.innerHTML += `<li>q${i}</li>`
		}
	}

	
	BuildProgramTable();
}

function BuildProgramTable() {
	inner_str = '';
	
	alphabeth_arr.sort();
	
	inner_str += '<tr> <td></td> ';
	for (let i = 0; i < alphabeth_arr.length; i++) {
		inner_str += `<td> ${alphabeth_arr[i]} </td>`;
	}
	inner_str += '</tr>';
	
	for (let i = 0; i < statesCount; i++) {
		inner_str += `<tr> <td> q${i} </td>`;
		for (let j = 0; j < alphabeth_arr.length; j++) {
			inner_str += '<td></td>';
		}
		inner_str += '</tr>';
	}
	
	programTable.innerHTML = inner_str;
}
