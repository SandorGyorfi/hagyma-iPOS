import menuData from './menu.json';

// Exportáljuk az eredeti magyar mezőnevekkel
export const menu = menuData.termekek.map(item => ({
  id: item.id,
  nev: item.nev,
  ar: item.ar,
  kategoria: item.kategoria,
  leiras: item.leiras
}));

export default menu;

export const menuItems = menu; 