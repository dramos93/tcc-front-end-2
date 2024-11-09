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
    const [start, setStart] = useState<boolean>(false);
    const [t, setT] = useState<number>(2);
    const [lives, setLives] = useState<number>(10);
    const [multiplicationTablesList, setMultiplicationTablesList] = useState<number[]>(updateMultiplicationTables(t));
    const [balloonsHit, setBalloonsHit] = useState<number[]>([]);
    const [map, setMap] = useState(initial);
    const [canvas, setCanvas] = useState<CanvasProps[]>([{ canvas: ECanvas.AIRPLANE } as CanvasProps]);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [positionAirplane, setPositionAirplane] = useState<number>(5);
    const [round, setRound] = useState<number>(1);
    const [errors, setErrors] = useState<number>(0);
    const [load, setLoad] = useState<boolean>(false);
    const { classUser, userId, token } = useContext(AuthContext);

    const postData: PostGame = {
        user_id: userId,
        class_id: classUser,
        multiplication_table: t,
        round: round,
        errors: errors,
    };
    const sendDataToServer = async () => {
        try {
            const response = await postGameAPI(postData, token);
            console.log('Dados enviados com sucesso!', response);
            // Faça algo com a resposta, se necessário
        } catch (error) {
            console.error('Erro ao enviar os dados para o servidor:', error);
            // Trate o erro conforme necessário
        }
    };

    const getDataToServer = async () => {
        try {
            const dataGame = await getGameAPI(token, userId, classUser);
            const lastDataGame = dataGame[dataGame.length - 1];
            return lastDataGame;
        } catch (error) {
            console.error('Erro ao pegar os dados para o servidor:', error);
            // Trate o erro conforme necessário
            return {} as PostGame;
        }
    };

    useEffect(() => {
        const load = async () =>{
            const lastDataGame : PostGame = await getDataToServer();
            console.table(lastDataGame.multiplication_table);
            setT(lastDataGame.multiplication_table < 10 ? lastDataGame.multiplication_table + 1 : 2);
            setRound(lastDataGame.multiplication_table < 10 ? lastDataGame.round : lastDataGame.round + 1);
            // setLives(lastDataGame.);
            setLoad(true);
        }
        load()
    }, []);

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
                    setRound(round => (t >= 10) ? round += 1 : round);
                    setErrors(0);
                    // console.table({ user_id: user.id, multiplication_table: t, round: round, errors: errors });
                    sendDataToServer();
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
        if (map[up][side].valueBalloon !== 0) {
            map[up][side].valueBalloon % t && setLives((x: number) => x - 1);
            map[up][side].valueBalloon % t && setErrors(error => error += 1);
        }

        const canvasBalloonIndex = map[up][side].canvasBalloonIndex;
        const canvasShotIndex = index;
        setCanvas((c: CanvasProps[]) => {
            c[canvasShotIndex] && (c[canvasShotIndex].canvas = null);
            if (map[up][side].valueBalloon && c[canvasBalloonIndex]) {
                c[canvasBalloonIndex].canvas = ECanvas.MESSAGE;
                c[canvasBalloonIndex].result = 'Errou';
                c[canvasBalloonIndex].marginTop = up;
                c[canvasBalloonIndex].marginLeft = side - 1;
            } else {
                c[canvasBalloonIndex] && (c[canvasBalloonIndex].canvas = ECanvas.FLOOR);
            }
            return [...c];
        });
    }, [map, setLives, setErrors, t]);

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
                round,
                setRound,
                errors,
                setErrors,
                load
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext<GameContextType>(GameContext);