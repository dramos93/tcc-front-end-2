export const squades: { x: number, y: number, dimensionDefault: number; } = { x: 10, y: 17, dimensionDefault: 40 };
export const delay = 60;
export const delayShot = delay / 8;
export const delayBalloon = delay * 3;

export function createListWithOnBalloon(busyIndexes: number[]): number[] {
	let withOnBalloon = [];
	let aleatoryNumber: number = Math.floor(Math.random() * 10);

	for (let i = 0; i < 10; i++) {
		withOnBalloon[i] = 0;
	}
	// eslint-disable-next-line no-loop-func
	while (busyIndexes.some(i => i === aleatoryNumber)) {
		aleatoryNumber = Math.floor(Math.random() * 10);
	}

	withOnBalloon[aleatoryNumber] = ECanvas.BALLOON;

	return withOnBalloon;
}

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

export interface FloorBlackInterface {
	canvas: number | null;
	valueBalloon: number;
	canvasBalloonIndex: number;
}

export const FL: FloorBlackInterface = { canvas: ECanvas.FLOOR, valueBalloon: 0, canvasBalloonIndex: 0 };

export let initial: FloorBlackInterface[][] = [
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