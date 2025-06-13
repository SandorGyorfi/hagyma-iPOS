import json
import sys
from typing import Dict, List

# UTF-8 kódolás beállítása
sys.stdout.reconfigure(encoding='utf-8')

def print_header(text: str) -> None:
    print("\n" + "=" * 80)
    print(text.center(80))
    print("=" * 80 + "\n")

def document_components() -> None:
    components = {
        "CartSidebar": {
            "leírás": "Kosár oldalsáv komponens",
            "props": {
                "items": "array - Kosár tételek listája",
                "onChangeQuantity": "function - Mennyiség módosítás kezelő",
                "onRemove": "function - Tétel törlés kezelő",
                "onClear": "function - Kosár ürítés kezelő"
            },
            "állapotok": [
                "loading - Betöltés alatt",
                "error - Hiba történt",
                "success - Sikeres művelet"
            ],
            "funkciók": [
                "Tételek listázása",
                "Mennyiség módosítás",
                "Tétel törlés",
                "Kosár ürítés",
                "Végösszeg számítás",
                "Rendelés feladás"
            ]
        },
        "MenuGrid": {
            "leírás": "Menü rács komponens",
            "props": {
                "items": "array - Menü tételek listája",
                "onAddToCart": "function - Kosárba helyezés kezelő",
                "category": "string? - Szűrés kategóriára"
            },
            "funkciók": [
                "Tételek rácsos megjelenítése",
                "Kategória szűrés",
                "Kosárba helyezés",
                "Részletek megjelenítése"
            ]
        },
        "OrderList": {
            "leírás": "Rendelések lista komponens",
            "props": {
                "orders": "array - Rendelések listája",
                "onStatusChange": "function - Státusz módosítás kezelő"
            },
            "állapotok": [
                "new - Új rendelés",
                "processing - Feldolgozás alatt",
                "completed - Teljesítve",
                "cancelled - Törölve"
            ],
            "funkciók": [
                "Rendelések listázása",
                "Státusz kezelés",
                "Részletek megjelenítése",
                "Időrendi rendezés"
            ]
        },
        "CategoryFilter": {
            "leírás": "Kategória szűrő komponens",
            "props": {
                "categories": "array - Kategóriák listája",
                "selectedCategory": "string - Kiválasztott kategória",
                "onChange": "function - Kategória választás kezelő"
            },
            "funkciók": [
                "Kategóriák listázása",
                "Aktív kategória kiemelése",
                "Kategória választás"
            ]
        },
        "StatusBadge": {
            "leírás": "Státusz jelző komponens",
            "props": {
                "status": "string - Státusz azonosító",
                "text": "string? - Egyedi szöveg"
            },
            "színek": {
                "new": "kék",
                "processing": "sárga",
                "completed": "zöld",
                "cancelled": "piros"
            }
        }
    }

    print_header("Hagyma iPOS Komponensek")
    
    for name, details in components.items():
        print(f"\n{name}")
        print("-" * len(name))
        
        print(f"\nLeírás: {details['leírás']}")
        
        print("\nProps:")
        for prop, desc in details["props"].items():
            print(f"- {prop}: {desc}")
        
        if "állapotok" in details:
            print("\nÁllapotok:")
            for state in details["állapotok"]:
                print(f"- {state}")
        
        print("\nFunkciók:")
        for func in details["funkciók"]:
            print(f"- {func}")
        
        if "színek" in details:
            print("\nSzínek:")
            for status, color in details["színek"].items():
                print(f"- {status}: {color}")
        
        print("\n" + "-" * 40)

if __name__ == "__main__":
    document_components() 