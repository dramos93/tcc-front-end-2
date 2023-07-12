
// project import
import Routes from './routes';
import { AuthProvider } from './hooks/useAuth';
// import ThemeCustomization from 'themes';
// import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  return (
    // <ThemeCustomization>
    // <ScrollTop>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    // </ScrollTop>
    // </ThemeCustomization>
  )
};

export default App;
