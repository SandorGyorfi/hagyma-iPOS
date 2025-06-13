import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import {
  toFirebaseOrder,
  toUIOrder,
  toFirebaseItem,
  toUIItem
} from '../utils/dataConverters';

// Rendelés mentése
export const saveOrder = async (orderData) => {
  try {
    // Ellenőrizzük, hogy van-e termék a kosárban
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error('A kosár üres');
    }

    const ordersRef = collection(db, 'orders');
    const firebaseOrder = toFirebaseOrder({
      ...orderData,
      timestamp: serverTimestamp()
    });

    const docRef = await addDoc(ordersRef, firebaseOrder);
    return { 
      success: true, 
      orderId: docRef.id,
      message: 'Rendelés sikeresen mentve'
    };

  } catch (error) {
    console.error('Hiba a rendelés mentése során:', error);
    return { 
      success: false, 
      error: error.message || 'Ismeretlen hiba történt a rendelés mentése során',
      details: error
    };
  }
};

// Rendelések lekérése
export const getOrders = async () => {
  try {
    const q = query(
      collection(db, 'orders'),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => toUIOrder({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Hiba a rendelések lekérése során:', error);
    return [];
  }
};

// Rendelés státuszának frissítése
export const updateOrderStatus = async (orderId, status) => {
  // Ellenőrizzük, hogy érvényes státusz-e
  const validStatuses = ['new', 'processing', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return { 
      success: false, 
      error: 'Érvénytelen státusz. Lehetséges értékek: ' + validStatuses.join(', ')
    };
  }

  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });
    return { success: true };
  } catch (error) {
    console.error('Hiba a rendelés státuszának frissítése során:', error);
    return { success: false, error: error.message };
  }
};

// Rendelés törlése
export const deleteOrder = async (orderId) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await deleteDoc(orderRef);
    return { success: true };
  } catch (error) {
    console.error('Hiba a rendelés törlése során:', error);
    return { success: false, error: error.message };
  }
};

// Mai rendelések lekérése
export const getTodayOrders = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const q = query(
      collection(db, 'orders'),
      where('timestamp', '>=', today),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => toUIOrder({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Hiba a mai rendelések lekérése során:', error);
    return [];
  }
};

// Rendelés ellenőrzése duplikáció ellen
export const checkDuplicateOrder = async (orderData, timeWindow = 60000) => {
  try {
    const ordersRef = collection(db, 'orders');
    const timeThreshold = new Date(Date.now() - timeWindow); // 1 perces időablak

    const q = query(
      ordersRef,
      where('timestamp', '>=', timeThreshold),
      where('total', '==', orderData.total)
    );

    const querySnapshot = await getDocs(q);
    const possibleDuplicates = querySnapshot.docs.filter(doc => {
      const order = doc.data();
      // Ellenőrizzük a tételek egyezését
      return order.items.length === orderData.items.length &&
        order.items.every((item, index) => 
          item.id === orderData.items[index].id &&
          item.mennyiseg === orderData.items[index].mennyiseg
        );
    });

    return possibleDuplicates.length > 0;

  } catch (error) {
    console.error('Hiba a duplikáció ellenőrzése során:', error);
    return false; // Hiba esetén engedjük a mentést
  }
};

// Menü szinkronizálása
export const syncMenu = async (menuItems) => {
  try {
    const batch = writeBatch(db);
    const menuRef = collection(db, 'menu');

    // Konvertáljuk a tételeket Firebase formátumra
    const firebaseItems = menuItems.map(toFirebaseItem);

    // Töröljük a régi menüt
    const oldMenu = await getDocs(menuRef);
    oldMenu.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Új menü hozzáadása
    firebaseItems.forEach((item) => {
      const docRef = doc(menuRef);
      batch.set(docRef, item);
    });

    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error('Hiba a menü szinkronizálása során:', error);
    return { success: false, error: error.message };
  }
};

// Kategóriák lekérése
export const getCategories = async () => {
  try {
    const menuRef = collection(db, 'menu');
    const querySnapshot = await getDocs(menuRef);
    const categories = new Set();

    querySnapshot.forEach((doc) => {
      const item = doc.data();
      if (item.category) {
        categories.add(item.category);
      }
    });

    return Array.from(categories);
  } catch (error) {
    console.error('Hiba a kategóriák lekérése során:', error);
    throw error;
  }
}; 