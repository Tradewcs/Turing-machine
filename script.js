let machineStrip = document.querySelector('.machine-strip');
let machineHead = document.querySelector('.machine-head');

for (let i = 0; i < 90; i++) {
	let newCell = document.createElement('td');
	newCell.id = `cell #${i}`;

	newCell.innerHTML = i;


	machineStrip.appendChild(newCell);

	newCell.id = 'head ' + newCell.id;
	machineHead.appendChild(newCell);
}


// document.getElementById('cell #5').innerHTML = 'a'