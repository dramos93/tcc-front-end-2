import Routes from './routes';
import { AuthProvider } from './hooks/useAuth';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
