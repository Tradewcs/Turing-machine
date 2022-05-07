let machineStrip = document.querySelector('.machine-strip');
let machineHead = document.querySelector('.machine-head');

for (let i = 0; i < 90; i++) {
	machineStrip.innerHTML += `<td id="cell#${i}"></td>`;
	machineHead.innerHTML  += `<td class="td-invs" id="h#${i}"></td>`;
}

