import React from 'react';
import './App.css';

// Reaproveitamento de estrutura;
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Outlet />
      </header>
    </div>
  );
}

export default App;
