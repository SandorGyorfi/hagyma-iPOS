// Magyar-angol konverzió a Firebase-hez
export const toFirebaseItem = (magyarItem) => ({
  id: magyarItem.id,
  name: magyarItem.nev,
  price: magyarItem.ar,
  quantity: magyarItem.mennyiseg,
  category: magyarItem.kategoria,
  description: magyarItem.leiras
});

// Angol-magyar konverzió a felhasználói felülethez
export const toUIItem = (firebaseItem) => ({
  id: firebaseItem.id,
  nev: firebaseItem.name || firebaseItem.nev, // Visszafelé kompatibilitás
  ar: firebaseItem.price || firebaseItem.ar,   // Visszafelé kompatibilitás
  mennyiseg: firebaseItem.quantity || firebaseItem.mennyiseg,
  kategoria: firebaseItem.category || firebaseItem.kategoria,
  leiras: firebaseItem.description || firebaseItem.leiras
});

// Rendelés konvertálása Firebase formátumra
export const toFirebaseOrder = (magyarOrder) => ({
  items: magyarOrder.items.map(toFirebaseItem),
  total: magyarOrder.total,
  status: 'new',
  timestamp: magyarOrder.timestamp,
  paymentMethod: magyarOrder.paymentMethod
});

// Rendelés konvertálása UI formátumra
export const toUIOrder = (firebaseOrder) => ({
  items: firebaseOrder.items.map(toUIItem),
  total: firebaseOrder.total,
  status: firebaseOrder.status,
  timestamp: firebaseOrder.timestamp,
  paymentMethod: firebaseOrder.paymentMethod
});

// Státusz fordítások
export const statusTranslations = {
  new: 'Új',
  processing: 'Feldolgozás alatt',
  completed: 'Teljesítve',
  cancelled: 'Törölve'
};

// Kategória fordítások
export const categoryTranslations = {
  langos: 'Lángos',
  szendvics: 'Szendvicsek',
  foetel: 'Főételek',
  desszert: 'Desszertek',
  ital: 'Italok'
}; 