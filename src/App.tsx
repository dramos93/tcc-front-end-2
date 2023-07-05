import './App.css';

// Reaproveitamento de estrutura;
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="App">
      <header>
        <p>
          Header
        </p>
      </header>
      <aside>
        <p>
          Aside
        </p>
      </aside>
      <Outlet />
      <footer>
        <p>
          Footer
        </p>
      </footer>
    </div>
  );
}

export default App;
