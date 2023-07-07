import { Link } from 'react-router-dom';
import './App.css';

// Reaproveitamento de estrutura;
import { Outlet } from 'react-router';
import Navbar from './pages/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
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
