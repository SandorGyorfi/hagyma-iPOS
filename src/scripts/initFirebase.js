import { db } from '../firebase';
import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';
import { menuItems } from '../data/menu';

const initializeFirebase = async () => {
  try {
    const batch = writeBatch(db);
    const productsRef = collection(db, 'products');

    // Termékek feltöltése
    for (const item of menuItems) {
      const docRef = doc(productsRef);
      batch.set(docRef, {
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        description: item.description
      });
    }

    // Minta rendelések létrehozása
    const ordersRef = collection(db, 'orders');
    const sampleOrder = {
      items: [
        {
          id: 'langos-1',
          name: 'Sima lángos',
          price: 800,
          quantity: 2
        },
        {
          id: 'szendvics-1',
          name: 'Sonkás szendvics',
          price: 1200,
          quantity: 1
        }
      ],
      total: 2800,
      status: 'new',
      createdAt: new Date(),
      paymentMethod: 'cash'
    };

    await addDoc(ordersRef, sampleOrder);
    await batch.commit();

    console.log('Firebase adatbázis sikeresen inicializálva!');
  } catch (error) {
    console.error('Hiba az adatbázis inicializálása során:', error);
  }
};

// Script futtatása
initializeFirebase(); 