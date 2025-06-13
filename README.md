# Hagyma iPOS

Modern, magyar nyelvű Point of Sale (POS) rendszer éttermek és büfék számára.

## Funkciók

- Kategóriákba rendezett termékkezelés
- Intuitív kosár felület
- Egyszerű mennyiség módosítás
- Bevétel összesítő oldal jelszavas védelemmel
- Reszponzív dizájn
- Teljes képernyős mód támogatás

## Technológiák

- React 18
- React Router v7
- Firebase
- Tailwind CSS
- React Icons
- React Hot Toast

## Telepítés

1. Klónozza le a repository-t:
```bash
git clone https://github.com/SandorGyorfi/hagyma-iPOS.git
```

2. Telepítse a függőségeket:
```bash
cd hagyma-iPOS
npm install
```

3. Indítsa el a fejlesztői szervert:
```bash
npm start
```

## Környezeti változók

A Firebase konfiguráció beállításához hozzon létre egy `.env` fájlt a következő változókkal:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Használat

- A főoldalon (`/`) található a POS felület
- A bevétel összesítő oldal az `/admin-hagyma-bevetel` útvonalon érhető el
- A bevétel oldal jelszava: "Luna351"

## Licenc

MIT 