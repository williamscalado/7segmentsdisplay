let resultRequest;
const info = document.querySelector(".result-message");
const butNewGame = document.querySelector(".but-new-game");
const butSend = document.getElementById("but-send");
const guess = document.getElementById("number");
let colorVar = document.querySelector(":root");

const displayButNewGame = () => (butNewGame.style.display = "block");
const disabledButSendNumber = () => {
	butSend.disabled = true;
	butSend.classList.add("disabled-but");
};
const enabledButSendNumber = () => {
	butSend.disabled = false;
	butSend.classList.remove("disabled-but");
};

const getNumber = async () => {
	try {
		info.innerHTML = "Carregando...";
		return await fetch(
			"https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300"
		)
			.then((response) => response.json())
			.then((data) => data);
	} catch (error) {
	} finally {
		info.innerHTML = "";
	}
};

const startGame = async () => {
	displayNumber("0");
	const result = await getNumber();

	if (result.StatusCode) {
		displayNumber(result.StatusCode);
		info.classList.add("danger");
		info.innerHTML = "";
		info.innerHTML = result.Error;
		colorVar.style.setProperty("--bg-segment", "#CC3300");
		disabledButSendNumber();
		displayButNewGame();
		return;
	}
	displayNumber("0");
	guess.value = "";
	info.innerHTML = "";
	resultRequest = result.value;
	butNewGame.style.display = "none";
	colorVar.style.setProperty("--bg-segment", "#000");
	enabledButSendNumber();
};

const verifyResult = () => {
	if (!guess.value || guess.value < 1 || guess.value > 300) {
		info.innerHTML = "Escolha um valor entre 1 a 300.";
		return;
	}
	info.innerHTML = "";

	disabledButSendNumber();
	displayNumber(guess.value);

	if (guess.value == resultRequest) {
		info.classList.remove("danger");
		info.classList.add("success");
		info.innerHTML = "Você acertou!!!!";
		colorVar.style.setProperty("--bg-segment", "#32BF00");
	} else {
		info.classList.add("danger");
		info.innerHTML = guess.value > resultRequest ? "É maior" : "É menor";
	}

	displayButNewGame();
};

const displayConfig = (number) => {
	const resultNumber = {
		null: [true, true, true, true, true, true, true],
		0: [false, false, false, false, false, false, true],
		1: [true, false, false, true, true, true, true],
		2: [false, false, true, false, false, true, false],
		3: [false, false, false, false, true, true, false],
		4: [true, false, false, true, true, false, false],
		5: [false, true, false, false, true, false, false],
		6: [false, true, false, false, false, false, false],
		7: [false, false, false, true, true, true, true],
		8: [false, false, false, false, false, false, false],
		9: [false, false, false, false, true, false, false],
	};
	return resultNumber[number];
};
const displayNumber = (number) => {
	//if (number > 300 || !number) return;

	const segment = [
		{ seg: "segment-a", direction: "segment-x" },
		{ seg: "segment-b", direction: "segment-y" },
		{ seg: "segment-c", direction: "segment-y" },
		{ seg: "segment-d", direction: "segment-x" },
		{ seg: "segment-e", direction: "segment-y" },
		{ seg: "segment-f", direction: "segment-y" },
		{ seg: "segment-g", direction: "segment-x" },
	];

	const newNumber = String(number).padStart(2, "0");
	if (newNumber.length > 3) return;

	const divDisplayNumber = document.getElementById("clock-container");
	divDisplayNumber.innerHTML = "";

	for (n = 0; n < newNumber.length; n++) {
		const verify =
			(n == 0 && newNumber[n] == "0") || number == 0 ? "null" : newNumber[n];

		const configSegment = displayConfig(verify);

		const divMain = document.createElement("div");
		divMain.classList.add("display-container", "display-size-12");

		for (i = 0; i < configSegment.length; i++) {
			const div = document.createElement("div");
			div.classList.add(
				segment[i].direction,
				segment[i].seg,
				configSegment[i] ? "disabled-segmento" : "enabled-segmento"
			);

			const divIn = document.createElement("span");
			divIn.classList.add("segment-border");

			div.appendChild(divIn);
			divMain.appendChild(div);
		}

		divDisplayNumber.appendChild(divMain);
	}
};
