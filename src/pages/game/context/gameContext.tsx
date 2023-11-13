import React, { createContext, useCallback, useContext, useState } from 'react';
import { ECanvas, initial, updateMultiplicationTables } from '../utils/constants';

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
    map: any; // Defina o tipo apropriado para 'map' se possível
    setMap: React.Dispatch<React.SetStateAction<any>>;
    deadBalloon: (itemMap: any, index: number) => void;
    randomNumberToBaloonAleatory: () => number;
    setMultiplication: (valueBalloon: number) => void;
    showMessage: boolean;
    setShowMessage: (showMessage: boolean) => void;
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
                console.log(t, multiplicationTablesList);
                if (newMultiplicationTablesList.length === 0) {
                    setStart(false);
                    setLives((v: number) => v += 3);
                    setT((t >= 10) ? 2 : t + 1);
                    setMultiplicationTablesList(updateMultiplicationTables((t >= 10) ? 2 : t + 1));
                    setShowMessage(true);
                } else {

                    setMultiplicationTablesList(newMultiplicationTablesList);
                }
            } else {
                console.log("Não encontrou o valor do balão.");
            }
        }
    };


    const randomNumberToBaloonAleatory = useCallback((): number => {
        // console.log('randomNumberToBaloonAleatory');
        // Aqui um número aleatório da tabuada.
        const numberAleatoryList: number[] = [
            Math.floor(Math.random() * t * 10) + 1,
            Math.floor(Math.random() * t * 10) + 1
        ];
        numberAleatoryList.push(multiplicationTablesList[Math.floor(Math.random() * multiplicationTablesList.length)]);
        const numberAleatory: number = numberAleatoryList[Math.floor(Math.random() * numberAleatoryList?.length)];

        if (multiplicationTablesList === undefined) {
            console.info('multiplicationTablesList is undefined');
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

    function deadBalloon(itemMap: any, index: number) {
        const canvasBalloonIndex = itemMap.canvasBalloonIndex;
        const canvasShotIndex = index;
        setCanvas((c: CanvasProps[]) => {
            c[canvasShotIndex].canvas = null;
            c[canvasBalloonIndex].canvas = null;
            return [...c];
        });
    }

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
                map,
                setMap,
                deadBalloon,
                randomNumberToBaloonAleatory,
                setMultiplication,
                showMessage,
                setShowMessage
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext<GameContextType>(GameContext);