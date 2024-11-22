import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ECanvas, FL, FloorBlackInterface, initial, updateMultiplicationTables } from '../utils/constants';
import { getGameAPI, PostGame, postGameAPI } from '../../../services/api';
import { AuthContext } from '../../../hooks/useAuth';

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
    round: number;
    setRound: React.Dispatch<React.SetStateAction<number>>;
    errors: number;
    setErrors: React.Dispatch<React.SetStateAction<number>>;
    load: boolean;
}

const GameContext = createContext<GameContextType>({} as GameContextType);

interface childrenGameContextProps {
    children: React.ReactNode;
}

export const GameProvider = ({ children }: childrenGameContextProps) => {
    const { classUser, userId, token } = useContext(AuthContext);

    // Estados iniciais
    const [start, setStart] = useState<boolean>(false);
    const [t, setT] = useState<number>(2);
    const [lives, setLives] = useState<number>(10);
    const [multiplicationTablesList, setMultiplicationTablesList] = useState<number[]>(() => updateMultiplicationTables(2));
    const [balloonsHit, setBalloonsHit] = useState<number[]>([]);
    const [map, setMap] = useState<FloorBlackInterface[][]>(initial);
    const [canvas, setCanvas] = useState<CanvasProps[]>([{
        canvas: ECanvas.AIRPLANE,
        result: null,
        marginTop: 0,
        marginLeft: 0,
        position: 5
    }]);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [positionAirplane, setPositionAirplane] = useState<number>(5);
    const [round, setRound] = useState<number>(1);
    const [errors, setErrors] = useState<number>(0);
    const [load, setLoad] = useState<boolean>(false);

    // Funções de API
    const sendDataToServer = async () => {
        const postData: PostGame = {
            user_id: userId,
            class_id: classUser,
            multiplication_table: t,
            round: round,
            errors: errors,
        };

        try {
            const response = await postGameAPI(postData, token);
            console.log('Dados enviados com sucesso!', response);
        } catch (error) {
            console.error('Erro ao enviar os dados para o servidor:', error);
        }
    };

    const getDataToServer = async () => {
        try {
            const dataGame = await getGameAPI(token, userId, classUser);
            if (!dataGame || dataGame.length === 0) return null;
            return dataGame[dataGame.length - 1];
        } catch (error) {
            console.error('Erro ao pegar os dados do servidor:', error);
            return null;
        }
    };

    // Efeitos
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const lastDataGame = await getDataToServer();
                if (lastDataGame) {
                    const newT = lastDataGame.multiplication_table < 10
                        ? lastDataGame.multiplication_table + 1
                        : 2;
                    setT(newT);
                    setMultiplicationTablesList(updateMultiplicationTables(newT));
                    setRound(lastDataGame.multiplication_table < 10
                        ? lastDataGame.round
                        : lastDataGame.round + 1);
                }
            } catch (error) {
                console.error('Erro ao carregar dados iniciais:', error);
            } finally {
                setLoad(true);
            }
        };

        loadInitialData();
    }, []);

    // Funções de lógica do jogo
    const numberOfBalloonIsInMultiplicationTables = useCallback((numberOfBalloon: number): boolean => {
        return multiplicationTablesList.includes(numberOfBalloon);
    }, [multiplicationTablesList]);

    const setMultiplication = useCallback((valueBalloon: number): void => {
        if (!numberOfBalloonIsInMultiplicationTables(valueBalloon)) return;

        const updateGame = () => {
            setCanvas([{
                canvas: ECanvas.AIRPLANE,
                result: null,
                marginTop: 0,
                marginLeft: 0,
                position: positionAirplane
            }]);
            setMap(initial);
            setStart(false);
            setLives(v => v + 3);
            const newT = t >= 10 ? 2 : t + 1;
            setT(newT);
            setMultiplicationTablesList(updateMultiplicationTables(newT));
            setShowMessage(true);
            setRound(r => t >= 10 ? r + 1 : r);
            setErrors(0);
            sendDataToServer();
        };

        setBalloonsHit(prev => {
            if (!prev.includes(valueBalloon)) {
                return [...prev, valueBalloon];
            }
            return prev;
        });

        setMultiplicationTablesList(prev => {
            const index = prev.indexOf(valueBalloon);
            if (index === -1) return prev;

            const newList = [...prev];
            newList.splice(index, 1);

            if (newList.length === 0) {
                updateGame();
            }

            return newList;
        });
    }, [numberOfBalloonIsInMultiplicationTables, t, positionAirplane, initial]);

    const randomNumberToBaloonAleatory = useCallback((): number => {
        if (!multiplicationTablesList || multiplicationTablesList.length === 0) {
            return Math.floor(Math.random() * t * 10) + 1;
        }

        const numberAleatoryList = [
            Math.floor(Math.random() * t * 10) + 1,
            Math.floor(Math.random() * t * 10) + 1,
            multiplicationTablesList[Math.floor(Math.random() * multiplicationTablesList.length)]
        ];

        const numberAleatory = numberAleatoryList[Math.floor(Math.random() * numberAleatoryList.length)];

        if (numberOfBalloonIsInMultiplicationTables(numberAleatory)) {
            return numberAleatory;
        }

        if (numberAleatory % t !== 0) {
            return numberAleatory;
        }

        return randomNumberToBaloonAleatory();
    }, [t, multiplicationTablesList, numberOfBalloonIsInMultiplicationTables]);

    const deadBalloon = useCallback((up: number, side: number, index: number) => {
        if (!map[up] || !map[up][side]) return;

        const balloonValue = map[up][side].valueBalloon;
        if (balloonValue !== 0 && balloonValue % t !== 0) {
            setLives(x => x - 1);
            setErrors(error => error + 1);
        }

        const canvasBalloonIndex = map[up][side].canvasBalloonIndex;
        const canvasShotIndex = index;

        setCanvas(prev => {
            const newCanvas = [...prev];

            if (newCanvas[canvasShotIndex]) {
                newCanvas[canvasShotIndex].canvas = null;
            }

            if (balloonValue && newCanvas[canvasBalloonIndex]) {
                newCanvas[canvasBalloonIndex] = {
                    ...newCanvas[canvasBalloonIndex],
                    canvas: ECanvas.MESSAGE,
                    result: '',
                    marginTop: up,
                    marginLeft: side - 1
                };
            } else if (newCanvas[canvasBalloonIndex]) {
                newCanvas[canvasBalloonIndex].canvas = ECanvas.FLOOR;
            }

            return newCanvas;
        });
    }, [map, t]);

    const moveShot = useCallback((side: number, up: number, setY: React.Dispatch<React.SetStateAction<number>>, index: number) => {
        const nextUp = up - 1;

        if (up === 1) {
            setCanvas(prev => {
                const newCanvas = [...prev];
                if (newCanvas[index]) {
                    newCanvas[index].canvas = ECanvas.FLOOR;
                }
                return newCanvas;
            });
        }

        if (map[nextUp] && map[nextUp][side].canvas === ECanvas.BALLOON) {
            deadBalloon(nextUp, side, index);
        }

        if (map[up][side].canvas === ECanvas.BALLOON) {
            deadBalloon(up, side, index);
        }

        setMap(prev => {
            const newMap = [...prev];
            newMap[up][side] = FL;
            if (up !== 0 && newMap[nextUp]) {
                newMap[nextUp][side] = { canvas: ECanvas.SHOT } as FloorBlackInterface;
            }
            return newMap;
        });

        setY(nextUp);
    }, [setCanvas, setMap, map, deadBalloon, FL]);

    const value = {
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
        round,
        setRound,
        errors,
        setErrors,
        load
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext<GameContextType>(GameContext);