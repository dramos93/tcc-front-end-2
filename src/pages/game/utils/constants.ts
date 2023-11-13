export const squades: { x: number, y: number, dimensionDefault: number; } = { x: 10, y: 17, dimensionDefault: 40 };
export const delay = 100;
export const delayShot = delay / 8;
export const delayBalloon = delay * 14;

export const criar = () => {
    let l = [];
    for (let i = 0; i < 10; i++) {
        l.push(Math.floor(Math.random() * 4));
    }
    return l;
};

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