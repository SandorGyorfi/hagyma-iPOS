import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const saveOrder = async (items, total) => {
  try {
    const orderData = {
      items: items.map(item => ({
        id: item.id,
        nev: item.nev,
        ar: item.ar,
        mennyiseg: item.mennyiseg
      })),
      total,
      status: 'new',
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'orders'), orderData);
    return { success: true, orderId: docRef.id };
  } catch (error) {
    console.error('Hiba a rendelés mentése közben:', error);
    return { success: false, error: error.message };
  }
}; 