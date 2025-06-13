import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  runTransaction
} from 'firebase/firestore';

// Rendelés mentése tranzakcióval
export const saveOrder = async (orderData) => {
  try {
    // Ellenőrizzük, hogy van-e termék a kosárban
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error('A kosár üres');
    }

    // Ellenőrizzük a kötelező mezőket minden tételnél
    orderData.items.forEach(item => {
      if (!item.id || !item.nev || !item.ar || !item.mennyiseg || !item.kategoria) {
        throw new Error('Hiányzó kötelező mezők a rendelési tételekben');
      }
    });

    // Tranzakció indítása
    const ordersRef = collection(db, 'orders');
    const orderDoc = await runTransaction(db, async (transaction) => {
      // Rendelés létrehozása
      const newOrder = {
        items: orderData.items,
        total: parseFloat(orderData.total.toFixed(2)), // Kerekítés 2 tizedesre
        status: 'paid',
        timestamp: serverTimestamp(),
        paymentMethod: orderData.paymentMethod || 'cash'
      };

      // Rendelés mentése
      const docRef = await addDoc(ordersRef, newOrder);
      return { id: docRef.id, ...newOrder };
    });

    return { 
      success: true, 
      orderId: orderDoc.id,
      message: 'Rendelés sikeresen mentve'
    };

  } catch (error) {
    console.error('Hiba a rendelés mentése során:', error);
    return { 
      success: false, 
      error: error.message || 'Ismeretlen hiba történt a rendelés mentése során',
      details: error // Fejlesztői információk
    };
  }
};

// Mai rendelések lekérése
export const getTodayOrders = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('timestamp', '>=', today),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Timestamp konvertálása dátummá
      timestamp: doc.data().timestamp?.toDate() || null
    }));

  } catch (error) {
    console.error('Hiba a rendelések lekérése során:', error);
    throw error;
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

// Termékek szinkronizálása Firestore-ral
export const syncProducts = async (products) => {
  try {
    const batch = db.batch();
    const productsRef = collection(db, 'products');

    // Töröljük a régi termékeket
    const oldProducts = await getDocs(productsRef);
    oldProducts.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Új termékek hozzáadása
    products.forEach((product) => {
      const docRef = doc(productsRef);
      batch.set(docRef, product);
    });

    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error('Hiba a termékek szinkronizálása során:', error);
    return { success: false, error: error.message };
  }
};

// Kategóriák lekérése
export const getCategories = async () => {
  try {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    const categories = new Set();

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      if (product.category) {
        categories.add(product.category);
      }
    });

    return Array.from(categories);
  } catch (error) {
    console.error('Hiba a kategóriák lekérése során:', error);
    throw error;
  }
}; 