import React from 'react';
import { Button, Grid, Paper, Box } from '@mui/material';
import './play.css';
import Game from '../game';
import { useGameContext } from '../context/gameContext';
import { screenPlay, squades } from '../utils/constants';


// No seu arquivo de tipos
declare global {
	namespace JSX {
		interface IntrinsicElements {
			div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
		}
	}
}

export const Play = () => {
	const {
		t,
		start,
		setStart,
		lives,
		multiplicationTablesList,
		balloonsHit,
		setBalloonsHit,
		showMessage,
		setShowMessage,
		errors,
		round
	} = useGameContext();

	// se sair do jogo o jogo para.
	document.addEventListener("DOMContentLoaded", function () {
		document.addEventListener("visibilitychange", function () {
			if (document.visibilityState === 'hidden') {
				// setStart(false)
			}
		});
	});

	return (
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
						{showMessage &&
							<div
								className='update-tab'
								style={{
									height: screenPlay.height + squades.dimensionDefault,
									width: screenPlay.width,
								}}>
								Parabéns! Você passou de nível. Agora sua tabuada será: {t}
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
						Rodada: {round}
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
						Erros: {errors}
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
							onClick={() => {
								setShowMessage(false);
								setStart((s: boolean) => !s);
								multiplicationTablesList.length === 20 && setBalloonsHit([]);
							}}
							variant='contained'
						>
							Start
						</Button>
					}

				</Grid>
				<Grid container justifyContent='flex-start' alignContent='center' style={{ height: 50 }} xs={8} item>
					{balloonsHit.sort((a, b) => a - b).map((item, index) => (
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
	);
};