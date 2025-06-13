import { useState, useEffect } from 'react';
import { 
  saveOrder, 
  getTodayOrders, 
  syncProducts, 
  getCategories 
} from '../services/firebaseService';

export const useFirebase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todayOrders, setTodayOrders] = useState([]);
  const [categories, setCategories] = useState([]);

  // Rendelés mentése
  const handleSaveOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await saveOrder(orderData);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.orderId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mai rendelések betöltése
  const loadTodayOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const orders = await getTodayOrders();
      setTodayOrders(orders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Termékek szinkronizálása
  const handleSyncProducts = async (products) => {
    setLoading(true);
    setError(null);
    try {
      const result = await syncProducts(products);
      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Kategóriák betöltése
  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Komponens betöltésekor kategóriák lekérése
  useEffect(() => {
    loadCategories();
  }, []);

  return {
    loading,
    error,
    todayOrders,
    categories,
    saveOrder: handleSaveOrder,
    syncProducts: handleSyncProducts,
    loadTodayOrders,
    loadCategories
  };
}; 