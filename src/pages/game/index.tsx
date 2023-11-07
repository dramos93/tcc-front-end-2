import React from 'react';
import { Play } from './play';
import { GameProvider } from './context/gameContext';

export default function Dashboard() {
    return <GameProvider>
        <Play />;
    </GameProvider>;
}