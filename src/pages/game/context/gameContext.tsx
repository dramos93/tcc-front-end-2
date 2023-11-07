import React, { createContext, useContext, useState } from 'react';
// import { CanvasProps } from '../play';
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
    setT: React.Dispatch<React.SetStateAction<number>>;
    start: boolean;
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
    lives: number;
    setLives: React.Dispatch<React.SetStateAction<number>>;
    multiplicationTablesList: number[];
    setMultiplicationTablesList: React.Dispatch<React.SetStateAction<number[]>>;
    balloonsHit: number[];
    setBalloonsHit: React.Dispatch<React.SetStateAction<number[]>>;
    map: any; // Defina o tipo apropriado para 'map' se possível
    setMap: React.Dispatch<React.SetStateAction<any>>;
    updateTable: boolean;
    setUpdateTable: ((updateTable: boolean) => void);
}

const GameContext = createContext<GameContextType>({} as GameContextType);


interface childrenGameContextProps {
    children: React.ReactNode;
}
export const GameProvider = ({ children }: childrenGameContextProps) => {
    const [start, setStart] = useState<boolean>(false);
    const [t, setT] = useState<number>(2);
    const [lives, setLives] = useState<number>(3);
    const [multiplicationTablesList, setMultiplicationTablesList] = useState<number[]>(updateMultiplicationTables(t));
    const [balloonsHit, setBalloonsHit] = useState<number[]>([]);
    const [map, setMap] = useState(initial);
    const [updateTable, setUpdateTable] = useState<boolean>(false);
    const [canvas, setCanvas] = useState<CanvasProps[]>([{ canvas: ECanvas.AIRPLANE } as CanvasProps]);

    return (
        <GameContext.Provider
            value={{
                canvas,
                setCanvas,
                t,
                setT,
                start,
                setStart,
                lives,
                setLives,
                multiplicationTablesList,
                setMultiplicationTablesList,
                balloonsHit,
                setBalloonsHit,
                map,
                setMap,
                updateTable,
                setUpdateTable,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};


export const useGameContext = () => useContext<GameContextType>(GameContext);