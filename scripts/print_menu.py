import json
from typing import Dict, List, Any

def print_header(text: str) -> None:
    """Fejléc formázott kiírása"""
    print("\n" + "=" * 80)
    print(text.center(80))
    print("=" * 80 + "\n")

def print_section(title: str) -> None:
    """Szekció fejléc kiírása"""
    print("\n" + "-" * 40)
    print(title)
    print("-" * 40 + "\n")

def document_menu_structure() -> None:
    """Menü struktúra dokumentálása"""
    menu_item = {
        "id": "string - Egyedi azonosító",
        "nev": "string - Tétel neve",
        "ar": "number - Ár (decimális szám)",
        "kategoria": "string - Kategória azonosító",
        "leiras": "string? - Részletes leírás (opcionális)",
        "allergenek": "array? - Allergének listája (opcionális)",
        "kep": "string? - Kép URL (opcionális)",
        "elerheto": "boolean - Elérhető-e (alapértelmezett: true)"
    }
    
    print_section("Menü Tétel Struktúra")
    print("Kötelező és opcionális mezők:")
    for field, desc in menu_item.items():
        print(f"- {field}: {desc}")

def document_categories() -> None:
    """Kategóriák dokumentálása"""
    categories = {
        "langos": "Lángosok",
        "hamburger": "Hamburgerek",
        "pizza": "Pizzák",
        "ital": "Italok",
        "desszert": "Desszertek",
        "koret": "Köretek"
    }
    
    print_section("Kategóriák")
    print("Alapértelmezett kategóriák:")
    for key, value in categories.items():
        print(f"- {key}: {value}")

def document_sample_menu() -> None:
    """Minta menü dokumentálása"""
    sample_menu = [
        {
            "id": "langos-sajtos",
            "nev": "Sajtos lángos",
            "ar": 4.00,
            "kategoria": "langos",
            "leiras": "Frissen sütött lángos, bőséges reszelt sajttal",
            "allergenek": ["glutén", "laktóz"]
        },
        {
            "id": "hamburger-classic",
            "nev": "Classic Burger",
            "ar": 8.50,
            "kategoria": "hamburger",
            "leiras": "Marhahúspogácsa, saláta, paradicsom, hagyma, sajt",
            "allergenek": ["glutén", "laktóz"]
        },
        {
            "id": "pizza-margherita",
            "nev": "Pizza Margherita",
            "ar": 10.00,
            "kategoria": "pizza",
            "leiras": "Paradicsomos alap, mozzarella, bazsalikom",
            "allergenek": ["glutén", "laktóz"]
        }
    ]
    
    print_section("Minta Menü")
    print("Példa menütételek:")
    print(json.dumps(sample_menu, indent=2, ensure_ascii=False))

def document_validation_rules() -> None:
    """Validációs szabályok dokumentálása"""
    print_section("Validációs Szabályok")
    rules = [
        "Az 'id' mező csak alfanumerikus karaktereket és kötőjelet tartalmazhat",
        "Az 'ar' mező decimális szám, minimum 0.01",
        "A 'kategoria' mezőnek léteznie kell a kategóriák listájában",
        "A 'nev' mező nem lehet üres és minimum 3 karakter hosszú",
        "Az 'allergenek' lista csak előre definiált értékeket tartalmazhat",
        "A 'kep' URL-nek érvényes formátumúnak kell lennie"
    ]
    
    print("Adatvalidációs szabályok:")
    for rule in rules:
        print(f"- {rule}")

def main():
    """Fő függvény"""
    print_header("Hagyma iPOS Menü Dokumentáció")
    document_menu_structure()
    document_categories()
    document_sample_menu()
    document_validation_rules()

if __name__ == "__main__":
    main() 