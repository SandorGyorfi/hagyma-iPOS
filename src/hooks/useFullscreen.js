import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import screenfull from 'screenfull';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasShownWarning, setHasShownWarning] = useState(false);

  // Teljes képernyő állapot figyelése
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenActive = screenfull.isFullscreen;
      setIsFullscreen(fullscreenActive);
      
      // Csak egyszer mutatjuk a figyelmeztetést munkamenetenként
      if (!fullscreenActive && !hasShownWarning) {
        toast('Az alkalmazás teljes képernyőn is használható.', {
          duration: 3000,
          position: 'bottom-center',
          icon: '💡',
        });
        setHasShownWarning(true);
      }
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullscreenChange);
      return () => {
        if (screenfull.isEnabled) {
          screenfull.off('change', handleFullscreenChange);
        }
      };
    }
  }, [hasShownWarning]);

  // Belépés teljes képernyőbe
  const enterFullscreen = useCallback(async () => {
    try {
      if (screenfull.isEnabled && !screenfull.isFullscreen) {
        await screenfull.request();
      }
    } catch (error) {
      console.error('Hiba a teljes képernyőbe lépéskor:', error);
    }
  }, []);

  // Kilépés teljes képernyőből
  const exitFullscreen = useCallback(async () => {
    try {
      if (screenfull.isEnabled && screenfull.isFullscreen) {
        await screenfull.exit();
      }
    } catch (error) {
      console.error('Hiba a teljes képernyőből való kilépéskor:', error);
    }
  }, []);

  // Automatikus újrapróbálkozás teljes képernyővel - csak egyszer próbálkozunk
  const retryFullscreen = useCallback(async () => {
    if (screenfull.isEnabled && !screenfull.isFullscreen && !hasShownWarning) {
      await enterFullscreen();
    }
  }, [enterFullscreen, hasShownWarning]);

  // Ellenőrizzük, hogy az eszköz támogatja-e a teljes képernyőt
  const isFullscreenSupported = screenfull.isEnabled;

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    retryFullscreen,
    isFullscreenSupported
  };
}; 