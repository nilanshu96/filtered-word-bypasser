if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js', { scope: './' })
        .then(function (reg) {
            if (reg.installing) {
                console.log('service worker is installing');
            } else if (reg.waiting) {
                console.log('service worker has installed');
            } else if (reg.active) {
                console.log('service worker is active');
            }
        }).catch(function (err) {
            console.log('registration failed with ' + err);
        })
}

const inputTxt = document.getElementById("input-txt");
const resultTxt = document.getElementById("result-txt");
const convertBtn = document.getElementById("convert-btn");
const successNotif = document.getElementById("success");
const failNotif = document.getElementById("failed");
const options = document.getElementById("options");

const bypassMap = new Map();

//substitute English letters with same looking Cyrillic letters
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

function convertIdentical(inputStr) {
    let result = "";
	
	for(let letter of inputStr) {
		if(bypassMap.has(letter)) {
			result += bypassMap.get(letter);
		} else {
			result += letter;
		}
	}

    return result;
}

function convert() {

    successNotif.style.setProperty("display", "none");
    failNotif.style.setProperty("display", "none");

	let inputStr = inputTxt.value.trim();
    let result = inputStr;

    if(!inputStr) {
        resultTxt.value = "";
        failNotif.textContent = NO_INPUT_ERROR;
        failNotif.style.setProperty("display", "block");
        return;
    }
	
    if(options.value === "iden") {
        result = convertIdentical(inputStr);
    } else if(options.value === "mdsc") {
        result = XfyString(inputStr);
    }

    if (inputStr !== result) {
        successNotif.style.setProperty("display", "block");
    } else {
        failNotif.textContent = GENERAL_FAIL;
        failNotif.style.setProperty("display", "block");
    }
	
	resultTxt.value = result;
}

convertBtn.addEventListener("click", convert);