import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const CartSidebar = ({ items, onQuantityChange, onRemove, onPayment, onClear }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const total = items.reduce((sum, item) => sum + item.ar * item.mennyiseg, 0);

  const handlePayment = async () => {
    if (items.length === 0) {
      setError('A kosár üres!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onPayment();
    } catch (error) {
      setError('Hiba történt a fizetés során!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-csarda-feher-alap shadow-xl z-50 overflow-hidden flex flex-col">
      <div className="p-4 bg-csarda-barna-sotet text-csarda-feher-alap">
        <h2 className="font-bree text-2xl">Kosár</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {items.map((item) => (
          <div key={item.id} className="mb-4 p-3 bg-white rounded-lg border-2 border-csarda-barna-vilagos">
            <div className="flex justify-between items-center">
              <h3 className="font-lora text-csarda-barna-sotet">{item.nev}</h3>
              <div className="font-bree text-csarda-piros-mely">
                £{(item.ar * item.mennyiseg).toFixed(2)}
              </div>
            </div>
            <div className="flex items-center mt-2">
              <button
                onClick={() => onQuantityChange(item.id, item.mennyiseg - 1)}
                className="px-3 py-1 bg-csarda-feher-tort text-csarda-barna-sotet rounded-lg border-2 border-csarda-barna-kozep hover:bg-csarda-barna-vilagos"
              >
                -
              </button>
              <span className="mx-4 font-lora text-csarda-barna-sotet">{item.mennyiseg}</span>
              <button
                onClick={() => onQuantityChange(item.id, item.mennyiseg + 1)}
                className="px-3 py-1 bg-csarda-feher-tort text-csarda-barna-sotet rounded-lg border-2 border-csarda-barna-kozep hover:bg-csarda-barna-vilagos"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-csarda-feher-tort border-t-2 border-csarda-barna-kozep">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bree text-xl text-csarda-barna-sotet">Összesen:</span>
          <span className="font-bree text-xl text-csarda-piros-mely">£{total.toFixed(2)}</span>
        </div>
        <button
          onClick={handlePayment}
          className="w-full py-3 bg-csarda-zold-palack text-csarda-feher-alap rounded-xl font-bree text-xl uppercase tracking-wider border-2 border-csarda-barna-kozep hover:bg-csarda-zold-kakukkfu transition-colors duration-300"
        >
          FIZETÉS
        </button>
      </div>
    </div>
  );
};

export default CartSidebar; 