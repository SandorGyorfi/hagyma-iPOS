import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GiGarlic } from 'react-icons/gi';
import './App.css';
import CategoryBar from './components/CategoryBar';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import { menu } from './data/menu';
import { saveOrder } from './services/firebaseService';
import { toUIItem } from './utils/dataConverters';
import { Toaster } from 'react-hot-toast';
import { useFullscreen } from './hooks/useFullscreen';
import FullscreenToggleButton from './components/FullscreenToggleButton';
import BevetelOsszegzes from './components/BevetelOsszegzes';
import PasswordProtected from './components/PasswordProtected';

// Google Fonts betöltése
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Bree+Serif:wght@400;700&family=Lora:wght@400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const PosApp = () => {
  const { isFullscreen, retryFullscreen } = useFullscreen();
  const [selectedCategory, setSelectedCategory] = useState('langos');
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Toast megjelenítése
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Mindig próbáljuk meg a teljes képernyőt, ha nincs
  useEffect(() => {
    if (!isFullscreen) {
      const timer = setTimeout(() => {
        retryFullscreen();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen, retryFullscreen]);

  // Szűrt termékek a kiválasztott kategória alapján
  const filteredProducts = menu.filter(
    (item) => item.kategoria === selectedCategory
  ).map(toUIItem);

  // Kosárba helyezés kezelése
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, mennyiseg: cartItem.mennyiseg + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, mennyiseg: 1 }];
    });
    showToast(`${item.nev} a kosárba került!`);
  };

  // Mennyiség módosítás kezelése
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, mennyiseg: newQuantity } : item
      )
    );
  };

  // Tétel törlése a kosárból
  const handleRemoveFromCart = (id) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    if (itemToRemove) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      showToast(`${itemToRemove.nev} törölve a kosárból!`, 'warning');
    }
  };

  // Kosár ürítése
  const handleClearCart = () => {
    setCartItems([]);
    showToast('A kosár kiürítve!', 'warning');
  };

  // Fizetés kezelése
  const handlePayment = async () => {
    if (cartItems.length === 0) {
      showToast('A kosár üres!', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const total = cartItems.reduce((sum, item) => sum + (item.ar * item.mennyiseg), 0);
      const orderData = {
        items: cartItems,
        total,
        status: 'new',
        paymentMethod: 'cash',
        timestamp: new Date(),
        createdAt: new Date()
      };

      const result = await saveOrder(orderData);
      
      if (result.success) {
        setCartItems([]);
        showToast('Rendelés sikeresen elmentve!');
      } else {
        throw new Error(result.error || 'Hiba történt a mentés során');
      }
    } catch (error) {
      console.error('Hiba a rendelés mentésekor:', error);
      showToast('Hiba történt a rendelés mentésekor!', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col font-lora bg-csarda-feher-alap overflow-hidden">
      {/* Fejléc */}
      <header className="bg-csarda-barna-sotet text-csarda-feher-alap py-4 border-b-3 border-csarda-piros-mely relative">
        <div className="absolute inset-0 bg-csarda-pattern opacity-10 mix-blend-overlay"></div>
        <h1 className="text-4xl text-center font-bree tracking-wide relative flex items-center justify-center gap-3">
          <span className="text-csarda-sarga-szalma">Hagyma</span>
          <GiGarlic className="text-csarda-feher-alap" />
          <span className="text-csarda-piros-vilagos">iPOS</span>
        </h1>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <FullscreenToggleButton />
        </div>
      </header>

      {/* Fő tartalom */}
      <main className="flex flex-1 overflow-hidden">
        {/* Bal oldali panel: Kategóriák és termékek */}
        <div className="flex-1 flex flex-col h-full max-w-[calc(100%-24rem)] bg-csarda-feher-tort relative">
          {/* Kategória sáv */}
          <div className="h-16 border-b-2 border-csarda-barna-vilagos bg-csarda-feher-alap">
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          
          {/* Termékek rács */}
          <div className="flex-1 overflow-hidden p-4 bg-csarda-feher-tort">
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
        
        {/* Jobb oldali kosár */}
        <div className="w-96 bg-fa-pattern bg-csarda-barna-vilagos bg-opacity-10 border-l-2 border-csarda-barna-vilagos flex flex-col">
          <CartSidebar
            items={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveFromCart}
            onClear={handleClearCart}
            onPayment={handlePayment}
            isLoading={isLoading}
          />
        </div>
      </main>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PosApp />} />
        <Route 
          path="/admin-hagyma-bevetel" 
          element={
            <PasswordProtected>
              <BevetelOsszegzes />
            </PasswordProtected>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App; 