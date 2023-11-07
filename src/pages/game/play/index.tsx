import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, Box } from '@mui/material';
import './play.css';
import Game from '../game';
import { CanvasProps, useGameContext } from '../context/gameContext';
import { ECanvas, screenPlay, squades, updateMultiplicationTables } from '../utils/constants';


// No seu arquivo de tipos
declare global {
	namespace JSX {
		interface IntrinsicElements {
			div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
		}
	}
}

export const Play = () => {
	const [isInitialRender, setIsInitialRender] = useState<boolean>(true);
	const [clear, setClear] = useState<boolean>(false);
	const {
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
		updateTable,
		setUpdateTable
	} = useGameContext();




	useEffect(() => {
		if (isInitialRender) {
			setIsInitialRender(false);
			return;
		}
		console.log(multiplicationTablesList.length);
		return setUpdateTable(false);
	}, [updateTable]);

	console.log("Aqui um exemploe de baloonsHit");
	console.log(balloonsHit);

	useEffect(() => {
		if (multiplicationTablesList.length === 1) {
			setStart(false);
			setCanvas([{ canvas: ECanvas.AIRPLANE } as CanvasProps]);
			return setClear(true);
		}
	}, [multiplicationTablesList.length === 1]);

	useEffect(() => {
		if (isInitialRender) {
			setIsInitialRender(false);
			return;
		}
		if (multiplicationTablesList.length === 1) {
			setLives((v: number) => v += 3);
			setT((t >= 10) ? 2 : t + 1);
			setMultiplicationTablesList(updateMultiplicationTables((t >= 10) ? 2 : t + 1));
			setBalloonsHit([]);
			console.log({ 'tabuada': t });
		}
		return setClear(false);
	}, [clear && start]);

	document.addEventListener("DOMContentLoaded", function () {
		document.addEventListener("visibilitychange", function () {
			if (document.visibilityState === 'hidden') {
				// setStart(false)
			}
		});
	});

	return (
		// <GameContext.Provider
		// 	value={{ canvas, setCanvas, t, setT, start, setStart, lives, setLives, multiplicationTablesList, setMultiplicationTablesList, setBalloonsHit, map, setMap, setUpdateTable, updateTable }}
		// >
		<Grid container alignItems='center' justifyContent='center'>
			<Grid container style={{ width: 600 }}>
				<Grid
					style={{
						height: screenPlay.height + squades.dimensionDefault,
						backgroundColor: '#c1dacf'
					}}
					container
					item
					xs={8}>
					<div className='canvas'>
						{clear &&
							<div
								className='update-tab'
								style={{
									height: screenPlay.height + squades.dimensionDefault,
									width: screenPlay.width,
								}}>
								Parabéns! Você passou de nível. Agora sua tabuada será: {t < 10 ? t + 1 : 2}
							</div>}
						<Game />
					</div>
					<div className='cloud' style={{
						fill: "green",
						stroke: "orange",
						height: screenPlay.height + squades.dimensionDefault,
						width: screenPlay.width,
					}} />
				</Grid>
				<Grid
					container
					item
					direction="column"
					alignItems='center'
					justifyContent='center'
					xs={4}
				>
					<Paper
						sx={{
							my: 1,
							width: 140,
							height: 40,
							borderColor: 'primary.main',
							backgroundColor: 'background.default',
							display: 'flex',
							alignItems: 'center',
							color: 'secondary.main'
						}}
						variant='outlined'>
						Vidas: {lives}
					</Paper>
					<Paper
						sx={{
							my: 1,
							width: 140,
							height: 40,
							borderColor: 'primary.main',
							backgroundColor: 'background.default',
							display: 'flex',
							alignItems: 'center',
							color: 'secondary.main'
						}}
						variant='outlined'>
						Tabuada: {t}
					</Paper>
					{start ?
						<Button
							sx={{ width: 140 }}
							key={1}
							onClick={() => setStart((s: boolean) => !s)}
							variant='contained'
						>
							Pause
						</Button>
						:
						<Button
							sx={{ width: 140 }}
							key={2}
							onClick={() => setStart((s: boolean) => !s)}
							variant='contained'
						>
							Start
						</Button>
					}

				</Grid>
				<Grid container justifyContent='flex-start' alignContent='center' style={{ height: 50 }} xs={8} item>
					{[...new Set(Array.from(balloonsHit))].map((item, index) => (
						<Box
							alignItems="center"
							justifyContent="center"
							display="flex"
							width={squades.dimensionDefault}
							height={squades.dimensionDefault}
							key={index}
							sx={{
								backgroundColor: 'primary.main',
								color: 'primary.contrastText',
								borderColor: '#809D7F',
								borderRadius: '50%'
							}}>
							{item}
						</Box>
					))}
				</Grid>
			</Grid>
		</Grid >
		// </GameContext.Provider>
	);
};