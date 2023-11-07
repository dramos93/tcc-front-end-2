export const squades = { x: 10, y: 17, dimensionDefault: 40 };

export const screenPlay = {
	width: squades.x * squades.dimensionDefault,
	height: squades.y * squades.dimensionDefault
};

export const ECanvas = {
	FLOOR: 0,
	SHOT: 1,
	BALLOON: 2,
	MESSAGE: 3,
	AIRPLANE: 4
};

interface FloorBlackINterface {
	canvas: number;
	valueBalloon: null;
}

export const FL: FloorBlackINterface = { canvas: ECanvas.FLOOR, valueBalloon: null };

export let initial: FloorBlackINterface[][] = [
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
	[FL, FL, FL, FL, FL, FL, FL, FL, FL, FL],
];

export function updateMultiplicationTables(tab: number): number[] {
	// Retorna 30 números da tabuada apontada
	// É a partir dessa tabuada que é verificado se o número já saiu.
	let multiplicationTables = [];
	for (let i = 1; i <= 20; i++) {
		multiplicationTables.push(Math.ceil(i / 2) * tab);
	}
	return multiplicationTables;
}

export function numberOfBalloonIsInMultiplicationTables(numberOfBalloon: number, multiplicationTablesList: number[]) {
	// Verifica se o número do balão faz parte tabuada atual.
	return multiplicationTablesList.indexOf(numberOfBalloon) === -1 ? false : true;
}