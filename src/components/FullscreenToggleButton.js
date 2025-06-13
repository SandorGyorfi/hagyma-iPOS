import React from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';
import { useFullscreen } from '../hooks/useFullscreen';

const FullscreenToggleButton = () => {
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  // Teljes képernyő váltása
  const handleToggleFullscreen = async () => {
    try {
      if (isFullscreen) {
        await exitFullscreen();
      } else {
        await enterFullscreen();
      }
    } catch (error) {
      console.error('Hiba a teljes képernyő váltásakor:', error);
    }
  };

  return (
    <button
      onClick={handleToggleFullscreen}
      className="
        w-10 
        h-10 
        flex 
        items-center 
        justify-center 
        text-csarda-feher-alap 
        hover:bg-csarda-barna-vilagos/20 
        rounded-lg 
        transition-all 
        duration-200
        absolute
        right-[318px]
        top-1/2
        -translate-y-1/2
      "
      title="Teljes képernyő be/ki"
    >
      {isFullscreen ? (
        <FaCompress className="w-5 h-5" />
      ) : (
        <FaExpand className="w-5 h-5" />
      )}
    </button>
  );
};

export default FullscreenToggleButton; 