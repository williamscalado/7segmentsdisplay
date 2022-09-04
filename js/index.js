/**
 * Para  display, foi criado  estrutura que faço a integração do css com javascript, no javascript quando
 * recebo a Palpite transformo em uma string e separa os número realizando um loop para cada buscando em displayConfig a configuração que
 * cada numero tem para o display de 7 segmentos. após digitar o palpite realizo uma chamada assíncrona para o endpoint informado recebendo o valor
 * e realizando as tratativas para sucesso ou error.
 *
 * Williams Calado
 */

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
		return await (
			await fetch(
				"https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300"
			)
		).json();
	} catch (error) {
	} finally {
		info.innerHTML = "";
	}
};

const startGame = async () => {
	displayNumber("0");
	guess.value = "";
	info.innerHTML = "";
	butNewGame.style.display = "none";
	colorVar.style.setProperty("--bg-segment", "#000");
	enabledButSendNumber();
};

const verifyResult = async () => {
	if (!guess.value || guess.value < 1 || guess.value > 300) {
		info.innerHTML = "Escolha um valor entre 1 a 300.";
		return;
	}
	resultRequest = await getNumber();

	if (resultRequest.StatusCode) {
		displayNumber(resultRequest.StatusCode);
		info.classList.add("danger");
		info.innerHTML = "";
		info.innerHTML = "Erro";
		colorVar.style.setProperty("--bg-segment", "#CC3300");
		disabledButSendNumber();
		displayButNewGame();
		guess.value = "";
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
		info.innerHTML = guess.value > resultRequest ? "É menor" : "É maior";
	}
	guess.value = "";
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
	const segment = [
		{ seg: "segment-a", direction: "segment-x" },
		{ seg: "segment-b", direction: "segment-y" },
		{ seg: "segment-c", direction: "segment-y" },
		{ seg: "segment-d", direction: "segment-x" },
		{ seg: "segment-e", direction: "segment-y" },
		{ seg: "segment-f", direction: "segment-y" },
		{ seg: "segment-g", direction: "segment-x" },
	];

	const newNumber = String(number);
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
