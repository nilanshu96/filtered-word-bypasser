let inputTxt = document.getElementById("input-txt");
let resultTxt = document.getElementById("result-txt");
let convertBtn = document.getElementById("convert-btn");

const bypassMap = new Map();

bypassMap.set("A", "А");
bypassMap.set("a", "а");
bypassMap.set("B", "В");
bypassMap.set("E", "Е");
bypassMap.set("e", "е");
bypassMap.set("K", "К");
bypassMap.set("M", "М");
bypassMap.set("H", "Н");
bypassMap.set("O", "О");
bypassMap.set("o", "о");
bypassMap.set("P", "Р");
bypassMap.set("p", "р");
bypassMap.set("C", "С");
bypassMap.set("c", "с");
bypassMap.set("T", "Т");
bypassMap.set("y", "y");
bypassMap.set("X", "Х");
bypassMap.set("x", "х");
bypassMap.set("U", "U");
bypassMap.set("u", "u");

function convert() {
	let inputStr = inputTxt.value;
	let result = "";
	
	for(let letter of inputStr) {
		if(bypassMap.has(letter)) {
			result += bypassMap.get(letter);
		} else {
			result += letter;
		}
	}
	
	resultTxt.value = result;
}

convertBtn.addEventListener("click", convert);