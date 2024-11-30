// src/App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage/HomePage.jsx';
import Header from './components/Header/Header.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import RecordPage from './pages/RecordPage/RecordPage.jsx';
import AnalysisPage from './pages/AnalysisPage/AnalysisPage.jsx';
import TutorialPage from './pages/TutorialPage/TutorialPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import Footer from './components/Footer/Footer.jsx';
import ConnectPage from './pages/ConnectPage/ConnectPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import './App.scss'; // Import the stylesheet here

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/record" element={<PrivateRoute><RecordPage /></PrivateRoute>} />
            <Route path="/analyze" element={<AnalysisPage />} />
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path="/contact" element={<ConnectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
