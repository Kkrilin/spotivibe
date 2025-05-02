import { Outlet } from 'react-router-dom';
import Library from '../components/Library/Library';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SideBar from '../components/SideBar/SideBar.jsx';
import { useTheme } from '../components/Context/ThemeProvider.jsx';

function HomePage() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className="main_container"
      style={{
        backgroundColor: `${isDarkMode ? '#000' : '#a8dbb3'}`,
        color: `${isDarkMode ? '#fff' : '#000'}`,
      }}
    >
      <Header />
      <div style={{ display: 'flex', gap: '10px' }}>
        <Library />
        <Outlet />
        <SideBar />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
