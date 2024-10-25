import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage/HomePage.jsx';
import Header from './components/Header/Header.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import RecordPage from './pages/RecordPage/RecordPage.jsx';
import AnalysisPage from './pages/AnalysisPage/AnalysisPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/record" element={<RecordPage/>}/>
        <Route path="/analyze" element={<AnalysisPage/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
