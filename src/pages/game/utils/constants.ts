export const squades: { x: number, y: number, dimensionDefault: number; } = { x: 10, y: 17, dimensionDefault: 40 };
export const delay = 400;
export const delayShot = delay / 8;
export const delayBalloon = delay * 4;

export const criar = () => {
    let l = [];
    let hasNumber2 = false;

    for (let i = 0; i < squades.x; i++) {
        const randomNumber = Math.floor(Math.random() * 10);
        l.push(randomNumber);

        if (randomNumber === 2) {
            if (hasNumber2) {
                // Remove outros números 2, mantendo apenas o primeiro
                const indexToRemove = l.indexOf(2, 0);
                if (indexToRemove !== -1) {
                    l.splice(indexToRemove, 1);
                }
            } else {
                hasNumber2 = true;
            }
        }
    }

    // Adiciona o número 2 se não estiver presente na lista
    if (!hasNumber2) {
        const randomIndex = Math.floor(Math.random() * squades.x);
        l[randomIndex] = 2;
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