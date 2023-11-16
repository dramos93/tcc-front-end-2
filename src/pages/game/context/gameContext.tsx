import React, { createContext, useCallback, useContext, useState } from 'react';
import { ECanvas, FL, FloorBlackInterface, initial, updateMultiplicationTables } from '../utils/constants';

export interface CanvasProps {
    canvas: number | null,
    result: string | null,
    marginTop: number,
    marginLeft: number,
    position: number;
}

export interface GameContextType {
    canvas: CanvasProps[];
    setCanvas: React.Dispatch<React.SetStateAction<CanvasProps[]>>;
    t: number;
    start: boolean;
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
    lives: number;
    setLives: React.Dispatch<React.SetStateAction<number>>;
    multiplicationTablesList: number[];
    balloonsHit: number[];
    setBalloonsHit: React.Dispatch<React.SetStateAction<number[]>>;
    setMap: React.Dispatch<React.SetStateAction<FloorBlackInterface[][]>>;
    deadBalloon: (y: number, x: number, index: number) => void;
    randomNumberToBaloonAleatory: () => number;
    setMultiplication: (valueBalloon: number) => void;
    showMessage: boolean;
    setShowMessage: (showMessage: boolean) => void;
    positionAirplane: number;
    setPositionAirplane: React.Dispatch<React.SetStateAction<number>>;
    moveShot: (x: number, y: number, setY: React.Dispatch<React.SetStateAction<number>>, index: number) => void;
    lineBusy: number[];
    setLineBusy: React.Dispatch<React.SetStateAction<number[]>>;
}

const GameContext = createContext<GameContextType>({} as GameContextType);

interface childrenGameContextProps {
    children: React.ReactNode;
}

export const GameProvider = ({ children }: childrenGameContextProps) => {
    const [start, setStart] = useState<boolean>(false);
    const [t, setT] = useState<number>(2);
    const [lives, setLives] = useState<number>(10);
    const [multiplicationTablesList, setMultiplicationTablesList] = useState<number[]>(updateMultiplicationTables(t));
    const [balloonsHit, setBalloonsHit] = useState<number[]>([]);
    const [map, setMap] = useState(initial);
    const [canvas, setCanvas] = useState<CanvasProps[]>([{ canvas: ECanvas.AIRPLANE } as CanvasProps]);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [positionAirplane, setPositionAirplane] = useState<number>(5);
    const [lineBusy, setLineBusy] = useState<number[]>([]);


    const numberOfBalloonIsInMultiplicationTables = useCallback((numberOfBalloon: number): boolean => {
        return multiplicationTablesList.indexOf(numberOfBalloon) === -1 ? false : true;
    }, [multiplicationTablesList]);

    const setMultiplication = (valueBalloon: number): void => {
        if (numberOfBalloonIsInMultiplicationTables(valueBalloon)) {
            let index: number = multiplicationTablesList.indexOf(valueBalloon);
            multiplicationTablesList.filter((value: number) => value === valueBalloon).length === 1 && setBalloonsHit(b => [...b, valueBalloon]);
            if (index !== -1) {
                const newMultiplicationTablesList: number[] = multiplicationTablesList;
                newMultiplicationTablesList.splice(index, 1);
                if (newMultiplicationTablesList.length === 0) {
                    setCanvas([{ canvas: ECanvas.AIRPLANE, position: positionAirplane } as CanvasProps]);
                    setMap(initial);
                    setStart(false);
                    setLives((v: number) => v += 3);
                    setT((t >= 10) ? 2 : t + 1);
                    setMultiplicationTablesList(updateMultiplicationTables((t >= 10) ? 2 : t + 1));
                    setShowMessage(true);
                } else {
                    setMultiplicationTablesList(newMultiplicationTablesList);
                }
            }
        }
    };


    const randomNumberToBaloonAleatory = useCallback((): number => {
        const numberAleatoryList: number[] = [
            Math.floor(Math.random() * t * 10) + 1,
            Math.floor(Math.random() * t * 10) + 1
        ];
        numberAleatoryList.push(multiplicationTablesList[Math.floor(Math.random() * multiplicationTablesList.length)]);
        const numberAleatory: number = numberAleatoryList[Math.floor(Math.random() * numberAleatoryList?.length)];

        if (multiplicationTablesList === undefined) {
            return randomNumberToBaloonAleatory();
        }
        else if (numberOfBalloonIsInMultiplicationTables(numberAleatory)) {
            return numberAleatory;
        }
        else if (numberAleatory % t)
            return numberAleatory;
        else {
            // Não é um número da tabela e não é um número divisível(aleatório)
            return randomNumberToBaloonAleatory();
        }
    }, [t, multiplicationTablesList, numberOfBalloonIsInMultiplicationTables]);

    const deadBalloon = useCallback((up: number, side: number, index: number) => {
        const canvasBalloonIndex = map[up][side].canvasBalloonIndex;
        const canvasShotIndex = index;
        setCanvas((c: CanvasProps[]) => {
            c[canvasShotIndex] && (c[canvasShotIndex].canvas = null);
            c[canvasBalloonIndex] && (c[canvasBalloonIndex].canvas = null);
            return [...c];
        });
    }, [map]);

    const moveShot = useCallback((side: number, up: number, setY: React.Dispatch<React.SetStateAction<number>>, index: number) => {
        const nextUp: number = up - 1;

        if (up === 1) {
            setCanvas(c => {
                c[index].canvas = ECanvas.FLOOR;
                return c;
            });
        }
        if (!!map[nextUp]) {
            if (map[nextUp][side].canvas === ECanvas.BALLOON) {
                deadBalloon(nextUp, side, index);
            }
        }
        if (map[up][side].canvas === ECanvas.BALLOON) {
            deadBalloon(up, side, index);
        }
        setMap((m: FloorBlackInterface[][]) => {
            m[up][side] = FL;
            if (up !== 0) {
                m[nextUp][side] = { 'canvas': ECanvas.SHOT } as FloorBlackInterface;
            }
            return m;
        });
        setY(nextUp);
    }, [setCanvas, setMap, map, deadBalloon]);

    return (
        <GameContext.Provider
            value={{
                canvas,
                setCanvas,
                t,
                start,
                setStart,
                lives,
                setLives,
                multiplicationTablesList,
                balloonsHit,
                setBalloonsHit,
                setMap,
                deadBalloon,
                randomNumberToBaloonAleatory,
                setMultiplication,
                showMessage,
                setShowMessage,
                positionAirplane,
                setPositionAirplane,
                moveShot,
                setLineBusy,
                lineBusy
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext<GameContextType>(GameContext);