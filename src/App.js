import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import CategoryBar from './components/CategoryBar';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import PinScreen from './components/PinScreen';
import { termekek } from './data/menu';
import { saveOrder } from './utils/saveOrder';

// Google Fonts betöltése
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Bree+Serif&family=Karantina:wght@400;700&family=Lora:wght@400;700&family=Rubik:wght@400;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 perc milliszekundumban

function App() {
  const [selectedCategory, setSelectedCategory] = useState('langos');
  const [cartItems, setCartItems] = useState([]);
  const [isLocked, setIsLocked] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState(null);
  const [toast, setToast] = useState(null);

  // Toast megjelenítése
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Inaktivitás figyelő visszaállítása
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    
    const newTimer = setTimeout(() => {
      setCartItems([]); // Kosár ürítése
      setIsLocked(true); // PIN képernyő megjelenítése
    }, INACTIVITY_TIMEOUT);
    
    setInactivityTimer(newTimer);
  }, [inactivityTimer]);

  // Eseményfigyelők beállítása
  useEffect(() => {
    const events = ['click', 'touchstart', 'keydown'];
    
    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    // Kezdeti időzítő beállítása
    resetInactivityTimer();

    // Cleanup
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [resetInactivityTimer]);

  // Szűrt termékek a kiválasztott kategória alapján
  const filteredProducts = termekek.filter(
    (termek) => termek.kategoria === selectedCategory
  );

  // Kosárba helyezés kezelése
  const handleAddToCart = (termek) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === termek.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === termek.id
            ? { ...item, mennyiseg: item.mennyiseg + 1 }
            : item
        );
      }
      return [...prevItems, { ...termek, mennyiseg: 1 }];
    });
  };

  // Mennyiség módosítás kezelése
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, mennyiseg: newQuantity } : item
      )
    );
  };

  // Tétel törlése a kosárból
  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Kosár ürítése
  const handleClearCart = () => {
    setCartItems([]);
    showToast('Rendelés törölve!', 'warning');
  };

  // Fizetés kezelése
  const handlePayment = async () => {
    try {
      await saveOrder(cartItems);
      setCartItems([]);
      showToast('Rendelés mentve!', 'success');
    } catch (error) {
      console.error('Hiba történt a rendelés mentése során:', error);
      showToast('Mentés sikertelen!', 'error');
    }
  };

  if (isLocked) {
    return <PinScreen onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className="
      h-screen
      flex
      flex-col
      font-lora
      bg-csarda-feher-alap
      overflow-hidden
    ">
      {/* Fejléc */}
      <header className="
        bg-csarda-barna-sotet
        text-csarda-feher-alap
        py-4
        border-b-3
        border-csarda-piros-mely
        relative
      ">
        <div className="
          absolute
          inset-0
          bg-csarda-pattern
          opacity-10
          mix-blend-overlay
        "></div>
        <h1 className="
          text-4xl
          text-center
          font-bree
          tracking-wide
          relative
          flex
          items-center
          justify-center
          gap-3
        ">
          <span className="text-csarda-sarga-szalma">Hagyma</span>
          <span className="text-csarda-piros-vilagos">iPOS</span>
        </h1>
      </header>

      {/* Fő tartalom */}
      <main className="flex flex-1 overflow-hidden">
        {/* Bal oldali panel: Kategóriák és termékek */}
        <div className="
          flex-1
          flex
          flex-col
          h-full
          max-w-[calc(100%-24rem)]
          bg-csarda-feher-tort
        ">
          {/* Kategória sáv */}
          <div className="
            h-16
            border-b-2
            border-csarda-barna-vilagos
            bg-csarda-feher-alap
          ">
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          
          {/* Termékek rács */}
          <div className="
            flex-1
            overflow-y-auto
            p-4
            bg-csarda-feher-tort
          ">
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        {/* Jobb oldali kosár */}
        <div className="
          w-96
          bg-fa-pattern
          bg-csarda-barna-vilagos
          bg-opacity-10
          border-l-2
          border-csarda-barna-vilagos
          flex
          flex-col
        ">
          <CartSidebar
            items={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveFromCart}
            onClear={handleClearCart}
            onPayment={handlePayment}
          />
        </div>
      </main>

      {/* Toast üzenetek */}
      {toast && (
        <div className={`
          fixed
          bottom-4
          right-4
          px-6
          py-3
          rounded-lg
          font-bree
          border-2
          ${
            toast.type === 'success' 
              ? 'bg-csarda-zold-palack text-white border-csarda-zold-kakukkfu'
              : toast.type === 'error'
              ? 'bg-csarda-piros-mely text-white border-csarda-piros-vilagos'
              : 'bg-csarda-barna-sotet text-white border-csarda-barna-vilagos'
          }
        `}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default App; 