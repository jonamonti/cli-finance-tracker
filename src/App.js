import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import TrxHistoryPage from "scenes/trxHistoryPage";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import { Toaster } from 'react-hot-toast';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff'
          }
        }}
      />
      <BrowserRouter>
        <ThemeProvider theme={theme}> 
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={ isAuth ? <HomePage /> : <Navigate to='/'/>} />
            <Route path="/profile/:userID" element={isAuth ? <ProfilePage /> : <Navigate to='/' />} />
            <Route path="/transactions" element={ isAuth ? <TrxHistoryPage /> : <Navigate to='/'/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
