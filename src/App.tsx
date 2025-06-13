import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useFullscreen } from './hooks/useFullscreen';
import FullscreenToggleButton from './components/FullscreenToggleButton';

const App: React.FC = () => {
  const { enterFullscreen } = useFullscreen();

  return (
    <div className="app-container">
      <header className="relative">
        <FullscreenToggleButton />
      </header>
      
      <Toaster />
    </div>
  );
};

export default App; 