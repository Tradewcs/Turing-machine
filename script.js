let TuringMachine = document.querySelector('.turing-machine');

for (let i = 0; i < 90; i++) {
	let newCell = document.createElement('td');
	newCell.id = `cell #${i}`;

	newCell.innerHTML = '123';


	TuringMachine.appendChild(newCell);
}


