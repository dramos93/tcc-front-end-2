import React, { useCallback, useEffect, useState } from 'react';
import useInterval from '@use-it/interval';
import './game.css';
import { CanvasProps, useGameContext } from '../context/gameContext';
import {
    ECanvas,
    FL,
    squades,
    delay,
    delayShot,
    delayBalloon,
    criar
} from '../utils/constants';

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

const Shot: React.FC<{ index: number, positionAirplane: number; }> = (props: { index: number, positionAirplane: number; }) => {
    const { index, positionAirplane } = props;
    const { setCanvas, start, map, setMap, deadBalloon } = useGameContext();
    const [y, setY] = useState<number>(squades.y - 1); //pode tirar o -1
    const [x] = useState<number>(positionAirplane);

    useInterval(() => {
        if (y >= 0) {
            if (!!map[y - 1]) {
                if (map[y - 1][x].canvas === ECanvas.BALLOON) {
                    deadBalloon(map[y - 1][x], index);
                }
            }
            if (map[y][x].canvas === ECanvas.BALLOON) {
                deadBalloon(map[y][x], index);
            }
            if (y === 0) {
                setCanvas(c => {
                    c[index].canvas = null;
                    return [...c];
                });
            }
            setMap((m: any) => {
                m[y][x] = FL;
                if (y !== 0) {
                    m[y - 1][x] = { 'canvas': ECanvas.SHOT };
                }
                return m;
            });
            setY(y - 1);
        }
    }, start ? delayShot : null);

    return (
        <div className='shot'
            style={
                {
                    marginLeft: x * (squades.dimensionDefault) + (squades.dimensionDefault - 9) / 2,
                    marginTop: y * squades.dimensionDefault,
                    transition: `margin ${delayShot}ms linear`
                }
            }
        />
    );
};

const Balloon: React.FC<{ marginLeft: number, index: number; }> = (props: { marginLeft: number, index: number; }) => {
    const { marginLeft, index } = props;
    const { setCanvas, t, start, setLives, map, setMap, setMultiplication, randomNumberToBaloonAleatory } = useGameContext();
    const [x] = useState(marginLeft);
    const [y, setY] = useState(0);
    const [valueBalloon] = useState<number>(randomNumberToBaloonAleatory());
    const [result, setResult] = useState<string>("");

    useInterval(() => {
        if (y < (squades.y - 1)) {
            setMap([...map, map[y][x + 1] = { 'canvas': ECanvas.BALLOON, 'valueBalloon': valueBalloon, canvasBalloonIndex: index }]);
            if (!!map[y - 1]) {
                setMap([...map, map[y - 1][x + 1] = FL]);
            }
            setY(y => y + 1);
        } else {
            setMap([...map, map[y - 1][x + 1] = FL]);
            setCanvas(c => {
                c[index].canvas = ECanvas.MESSAGE;
                c[index].result = valueBalloon % t ? 'Errou' : 'Acertou';
                c[index].marginTop = y;
                c[index].marginLeft = x;
                return [...c];
            });
            valueBalloon % t && setLives((x: number) => x - 1);
            setResult(valueBalloon % t ? 'Errou' : 'Acertou');
            setMultiplication(valueBalloon);
        }
    }, start ? delay : null);

    return (
        <div
            key={index}
            className='balloon'
            style={{
                marginTop: y * squades.dimensionDefault,
                marginLeft: x * squades.dimensionDefault + squades.dimensionDefault,
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
    const { canvas, setCanvas, start } = useGameContext();
    const [positionAirplane, setPositionAirplane] = useState<number>(5);

    const getKey = useCallback((event: any) => {
        if (event.keyCode === 32) {
            start && setCanvas(c => [...c, { canvas: ECanvas.SHOT } as CanvasProps]);
        } else if (event.keyCode === 37) { //left
            start && setPositionAirplane((x: number) => (x > 0) ? x - 1 : x);
        } else if (event.keyCode === 39) {
            start && setPositionAirplane((x: number) => (x < (squades.x - 1)) ? x + 1 : x);
        }
    }, [setCanvas, setPositionAirplane, start]);

    useEffect(() => {
        window.addEventListener('keydown', getKey);
        return () => {
            window.removeEventListener('keydown', getKey);
        };
    }, [getKey]);

    useInterval(() => {
        criar().forEach((i, index) => {
            if (i === ECanvas.BALLOON) {
                setCanvas(c => {
                    return [...c, { canvas: ECanvas.BALLOON, position: index } as CanvasProps];
                });
            }
        }
        );
    }, start ? delayBalloon : null);

    return (
        <div>
            {canvas.map((element: CanvasProps, index: number) => {
                if (element.canvas === ECanvas.SHOT) {
                    return (
                        <Shot
                            key={index}
                            index={index}
                            positionAirplane={positionAirplane}
                        />
                    );
                } else if (element.canvas === ECanvas.BALLOON) {
                    return (
                        <Balloon
                            key={index}
                            marginLeft={element.position - 1}
                            index={index}
                        />
                    );
                } else if (element.canvas === ECanvas.AIRPLANE) {
                    return <Airplane key={index} positionAirplane={positionAirplane} />;
                }
                else if ((element.canvas === ECanvas.MESSAGE) && (element.result === 'Errou')) {
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
                }
                else {
                    return <div key={index}></div>;
                }
            })}
        </div>
    );
}

export default Game;
