import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InstructionsPage from './pages/IntructionsPage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';
import { MusicProvider } from './utils/MusicContext';

const App: React.FC = () => {
  return (
    <MusicProvider>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/instructions" element={<InstructionsPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
    </MusicProvider>
  );
};

export default App;
