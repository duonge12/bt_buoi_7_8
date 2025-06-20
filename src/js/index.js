window.selected = "1";
window.integerArr = [];
const arr = document.getElementById("numberInput");
const integerCard = document.getElementsByClassName("integerCard")[0];
const submittedArr = document.getElementsByClassName("submittedArrValue")[0];

const execButton = document.getElementById("executeFunction");
const bai6Card = document.getElementsByClassName("bai6Card")[0];
const result = document.getElementById("resultOutput");

const selections = document.getElementById("functionSelect");
const integerInput = document.getElementById("numberInput");
const floatInput = document.getElementById("floatInput");
const index1 = document.getElementById("extraInput1");
const index2 = document.getElementById("extraInput2");
const submitArrayButton = document.getElementById("submitArrayButton");
const clearButton = document.getElementById("clearArray");
const executeButton = document.getElementById("executeFunction");

const floatArr = document.getElementById("floatInput");
const submitFloatArrayButton = document.getElementById(
	"submitFloatArrayButton"
);
const clearFloatArrayButton = document.getElementById("clearFloatArray");
const submitedFloatArr = document.getElementsByClassName(
	"submittedFloatArrValue"
)[0];
const bai9Card = document.getElementsByClassName("bai9Card")[0];

function bai1(arr) {
	const res = arr.reduce((pre, curr) => {
		if (curr >= 0) return pre + curr;
		return pre;
	}, 0);
	return res;
}
function bai2(arr) {
	const res = arr.reduce((pre, curr) => {
		if (curr >= 0) return pre + 1;
		return pre;
	}, 0);
	return res;
}
function bai3(arr) {
	const res = arr.reduce((pre, curr) => {
		if (curr <= pre) return curr;
		return pre;
	}, arr[0]);
	return res;
}
function bai4(arr) {
	const filtered = arr.filter((item) => item >= 0);
	const res = filtered.reduce((pre, curr) => {
		if (curr <= pre) return curr;
		return pre;
	}, filtered[0]);
	return res;
}
function bai5(arr) {
	const filtered = arr.filter((item) => item % 2 === 0);
	return filtered.length > 0 ? filtered[filtered.length - 1] : -1;
}
function bai6(arr, swap1, swap2) {
	const temp = arr[swap2];
	arr[swap2] = arr[swap1];
	arr[swap1] = temp;
	return arr;
}
function bai7(arr) {
	const res = arr.sort((a, b) => a - b);
	return res;
}

function bai8(arr) {
	let res = undefined;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === 0) continue;
		const absoluteValue = Math.abs(arr[i]);
		for (let y = absoluteValue - 1; y > 0; y--) {
			if (y === 1) {
				res = arr[i];
				break;
			}
			if (arr[i] % y === 0) {
				break;
			}
		}
		if (res) break;
	}
	return res ? res : -1;
}
function bai9(arr, additionalArr) {
	const floatParsed = arr.map((item) => parseFloat(item));
	const newArr = [...floatParsed, ...additionalArr];
	const filterInteger = newArr.filter((item) => item - parseInt(item) === 0);
	return filterInteger.length;
}
function bai10(arr) {
	const filterNegative = arr.filter((item) => item < 0);
	const filterPositive = arr.filter((item) => item >= 0);
	return filterPositive.length > filterNegative.length
		? "Positive"
		: "Negative";
}
function restrictToDigits(e) {
	const allowedChars = "0123456789";
	if (!allowedChars.includes(e.key)) {
		e.preventDefault();
	}
}
function updateExecButtonState() {
	if (!index1.value || !index2.value) {
		if (window.selected === "6") setErrorState([execButton], true);
	} else {
		setErrorState([execButton], false);
	}
}
function isValidateIntegerArray(str) {
	if (!str) return false;
	else if (str) {
		const arr = str.split(",");
		const isValid = arr.every((item) => !isNaN(item));
		if (isValid) {
			window.integerArr = arr.map((item) => parseInt(item));
			return true;
		}
		return false;
	}
}
function isValidateFloatArray(str) {
	if (!str) return false;
	else if (str) {
		const arr = str.split(",");
		const isValid = arr.every((item) => !isNaN(item));
		if (isValid) {
			window.floatArr = arr.map((item) => parseFloat(item));
			return true;
		}
		return false;
	}
}
function setErrorState(elements, isError) {
	if (isError) {
		elements.forEach((element) => {
			element.classList.add("error");
			element.disabled = true;
		});
	} else {
		elements.forEach((element) => {
			element.classList.remove("error");
			element.disabled = false;
		});
	}
}
/////////////////////////////
selections.addEventListener("change", function () {
	const selectedValue = this.value;
	window.selected = selectedValue;
	if (selectedValue === "6") {
		bai6Card.classList.add("active");
		setErrorState([execButton], true);
	} else {
		bai6Card.classList.remove("active");
	}
	if (selectedValue === "9") {
		bai9Card.classList.add("active");
		setErrorState([execButton], true);
	} else {
		bai9Card.classList.remove("active");
	}
	if (!["9", "6"].includes(selectedValue)) {
		setErrorState([execButton], false);
	}
});
integerInput.addEventListener("keypress", (e) => {
	const allowedChars = "0123456789,-+";

	if (!allowedChars.includes(e.key)) {
		e.preventDefault();
	}
});
index1.addEventListener("keypress", restrictToDigits);
index2.addEventListener("keypress", restrictToDigits);
index1.addEventListener("input", updateExecButtonState);
index2.addEventListener("input", updateExecButtonState);

floatInput.addEventListener("keypress", (e) => {
	const allowedChars = "0123456789,.-+";

	if (!allowedChars.includes(e.key)) {
		e.preventDefault();
	}
});
submitArrayButton.addEventListener("click", () => {
	const res = isValidateIntegerArray(arr.value);
	if (!res) {
		setErrorState([integerCard, execButton, selections], true);
		return;
	} else {
		setErrorState([integerCard, execButton, selections], false);
		submittedArr.innerHTML = window.integerArr;
	}
});
submitFloatArrayButton.addEventListener("click", () => {
	const res = isValidateFloatArray(floatArr.value);
	if (!res) {
		setErrorState([bai9Card, execButton], true);
		return;
	} else {
		setErrorState([bai9Card, execButton], false);
		submitedFloatArr.innerHTML = window.floatArr;
	}
});
clearButton.addEventListener("click", () => {
	setErrorState([integerCard], false);
	setErrorState([selections, execButton], true);

	window.integerArr = undefined;
	arr.value = "";
	submittedArr.innerHTML = "";
	result.innerHTML = "Chưa có kết quả.";
});
clearFloatArrayButton.addEventListener("click", () => {
	setErrorState([bai9Card], false);
	setErrorState([execButton], true);

	window.floatArr = undefined;
	floatArr.value = "";
	submitedFloatArr.innerHTML = "";
});
executeButton.addEventListener("click", () => {
	if (window.integerArr.length === 0) {
		alert("Vui lòng nhập mảng");
		return;
	}
	switch (window.selected) {
		case "1": {
			result.innerHTML = bai1(window.integerArr);
			return;
		}
		case "2": {
			result.innerText = bai2(window.integerArr);
			return;
		}
		case "3": {
			result.innerText = bai3(window.integerArr);
			return;
		}
		case "4": {
			result.innerText = bai4(window.integerArr);
			return;
		}
		case "5": {
			result.innerText = bai5(window.integerArr);
			return;
		}
		case "6": {
			result.innerText = bai6(
				window.integerArr,
				index1.value,
				index2.value
			);
			return;
		}
		case "7": {
			result.innerText = bai7(window.integerArr);
			return;
		}
		case "8": {
			result.innerText = bai8(window.integerArr);
			return;
		}
		case "9": {
			result.innerText = bai9(window.integerArr, window.floatArr);
			return;
		}
		case "10": {
			result.innerText = bai10(window.integerArr);
			return;
		}
		default: {
			result.innerText = "default";
		}
	}
});
