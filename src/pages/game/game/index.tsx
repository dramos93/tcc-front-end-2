import React, { useCallback, useEffect, useState } from 'react';
import { CanvasProps, useGameContext } from '../context/gameContext';
import { ECanvas, FL, squades, delay, delayShot, delayBalloon, createListWithOnBalloon, FloorBlackInterface } from '../utils/constants';
import useInterval from '@use-it/interval';
import './game.css';

const Airplane: React.FC<{ positionAirplane: number; }> = (props: { positionAirplane: number; }) => {
    const { positionAirplane } = props;

    return <div
        style={{
            marginLeft: positionAirplane * squades.dimensionDefault,
            marginTop: squades.y * squades.dimensionDefault,
            width: squades.dimensionDefault,
            height: squades.dimensionDefault
        }}
        className='airplane'
    />;
};

const Shot: React.FC<{ index: number; }> = (props: { index: number; }) => {
    const { index } = props;
    const { start, positionAirplane, moveShot } = useGameContext();
    const [up, setUp] = useState<number>(squades.y - 1);
    const [x] = useState<number>(positionAirplane);

    useInterval(() => {
        moveShot(x, up, setUp, index);
    }, (start && up !== 0) ? delayShot : null);

    return (
        <div
            className='shot'
            style={
                {
                    marginLeft: x * (squades.dimensionDefault) + (squades.dimensionDefault - 9) / 2,
                    marginTop: up * squades.dimensionDefault,
                    transition: `margin ${delayShot}ms linear`
                }
            }
        />
    );
};

const Balloon: React.FC<{ marginLeft: number, index: number; }> = (props: { marginLeft: number, index: number; }) => {
    const { marginLeft, index } = props;
    const { setCanvas, t, start, setLives, setMap, setMultiplication, randomNumberToBaloonAleatory, setErrors } = useGameContext();
    const [side] = useState(marginLeft + 1);
    const [down, setDown] = useState(0);
    const [valueBalloon] = useState<number>(randomNumberToBaloonAleatory());
    const [result, setResult] = useState<string>("");
    const nextDown: boolean = down < (squades.y - 1);
    const prevDown: number = down - 1;
    const [firstChange, setFirstChange] = useState(true);

    useEffect(() => {
        if (firstChange) {
            setMap(map => {
                map[down][side] = { canvas: ECanvas.BALLOON, valueBalloon: valueBalloon, canvasBalloonIndex: index };
                return map;
            });
        }
        return setFirstChange(false);
    }, [down, firstChange, index, setMap, side, valueBalloon]);

    useInterval(() => {
        if (nextDown) {
            if (down > 0) {
                setMap((prevMap: FloorBlackInterface[][]) => {
                    const newMap = [...prevMap];
                    newMap[down][side] = { canvas: ECanvas.BALLOON, valueBalloon: valueBalloon, canvasBalloonIndex: index };
                    if (!!newMap[prevDown]) {
                        newMap[prevDown][side] = FL;
                    }
                    return newMap;
                });
            }
            setDown(y => y + 1);
        } else {
            setMap((prevMap: FloorBlackInterface[][]) => {
                const newMap = [...prevMap];
                newMap[prevDown][side] = FL;
                newMap[down][side] = FL;
                return newMap;
            });
            setCanvas(c => {
                c[index].canvas = ECanvas.MESSAGE;
                c[index].result = valueBalloon % t ? 'Errou' : 'Acertou';
                c[index].marginTop = down;
                c[index].marginLeft = marginLeft;
                return [...c];
            });
            let condition = ((valueBalloon % t) !== 0) 
            console.log(condition)
            condition && setLives((x: number) => x - 1);
            condition && setErrors(error => error += 1);
            setResult(condition ? 'Errou' : 'Acertou');
            setMultiplication(valueBalloon);
        }
    }, start ? delay : null);

    return (
        <div
            key={index}
            className='balloon'
            style={{
                marginTop: down * squades.dimensionDefault,
                marginLeft: marginLeft * squades.dimensionDefault + squades.dimensionDefault,
                width: squades.dimensionDefault,
                height: squades.dimensionDefault * 2,
                transitionDuration: `${delay}ms`,
            }}
        >
            <div className='balloon-text'>
                {valueBalloon}
            </div>
            {result && <div className='result-balloon'></div>}
        </div>
    );
};

function Game() {
    const { canvas, setCanvas, start, positionAirplane, setPositionAirplane } = useGameContext();
    const [lineBusy, setLineBusy] = useState<number[]>([]);
    const getKey = useCallback((event: any) => {
        if (event.keyCode === 32) {
            start && setCanvas(c => [...c, { canvas: ECanvas.SHOT } as CanvasProps]);
        } else if (event.keyCode === 37) { //left
            start && setPositionAirplane((x) => (x > 0) ? x - 1 : x);
        } else if (event.keyCode === 39) {
            start && setPositionAirplane((x) => (x < (squades.x - 1)) ? x + 1 : x);
        }
    }, [setCanvas, setPositionAirplane, start]);

    useEffect(() => {
        window.addEventListener('keydown', getKey);
        return () => {
            window.removeEventListener('keydown', getKey);
        };
    }, [getKey]);

    useInterval(() => {
        createListWithOnBalloon(lineBusy).forEach((i: number, index: number) => {
            if (i === ECanvas.BALLOON) {
                setCanvas(c => [...c, { canvas: ECanvas.BALLOON, position: index } as CanvasProps]);
                setLineBusy(l => {
                    const nl = [...l];
                    return [...nl.splice(-6), index];
                });
            }
        });
    }, start ? delayBalloon : null);

    return (
        <div>
            {canvas?.map((element: CanvasProps, index: number) => {
                if (element.canvas === ECanvas.SHOT) {
                    return <Shot key={index} index={index} />;
                } else if (element.canvas === ECanvas.BALLOON) {
                    return <Balloon key={index} marginLeft={element.position - 1} index={index} />;
                } else if (element.canvas === ECanvas.AIRPLANE) {
                    return <Airplane key={index} positionAirplane={positionAirplane} />;
                } else if ((element.canvas === ECanvas.MESSAGE) && (element.result === 'Errou')) {
                    return (
                        <div
                            key={index}
                            className='result-balloon'
                            style={{
                                marginLeft: element.marginLeft * squades.dimensionDefault + squades.dimensionDefault,
                                marginTop: element.marginTop * squades.dimensionDefault + (squades.dimensionDefault / 2),
                                width: squades.dimensionDefault,
                                height: squades.dimensionDefault
                            }}
                        >
                            Errou
                        </div>
                    );
                } else {
                    return <div key={index}></div>
                }
            })}
        </div>
    );
}

export default Game;
