import os
import json
from typing import Dict, Any

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

def document_firebase_config() -> None:
    """Firebase konfiguráció dokumentálása"""
    config = {
        "apiKey": "YOUR_API_KEY",
        "authDomain": "hagyma-ipos.firebaseapp.com",
        "projectId": "hagyma-ipos",
        "storageBucket": "hagyma-ipos.appspot.com",
        "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
        "appId": "YOUR_APP_ID"
    }
    
    print_section("Firebase Konfiguráció")
    print("Alapértelmezett konfiguráció:")
    print(json.dumps(config, indent=2, ensure_ascii=False))
    print("\nMegjegyzések:")
    print("- Az API kulcsot és egyéb bizalmas adatokat környezeti változókból kell betölteni")
    print("- A projektazonosító: hagyma-ipos")
    print("- A tárhely bucket: hagyma-ipos.appspot.com")

def document_security_rules() -> None:
    """Biztonsági szabályok dokumentálása"""
    print_section("Firestore Biztonsági Szabályok")
    rules = {
        "rules_version": "2",
        "service": "cloud.firestore",
        "match": {
            "/databases/{database}/documents": {
                "match": {
                    "/orders/{orderId}": {
                        "allow": {
                            "read": "request.auth != null",
                            "write": "request.auth != null && request.resource.data.keys().hasAll(['items', 'total', 'timestamp'])"
                        }
                    },
                    "/menu/{itemId}": {
                        "allow": {
                            "read": "true",
                            "write": "request.auth != null && request.auth.token.admin == true"
                        }
                    }
                }
            }
        }
    }
    
    print("Alapértelmezett biztonsági szabályok:")
    print(json.dumps(rules, indent=2, ensure_ascii=False))
    print("\nMagyarázat:")
    print("- A rendeléseket csak bejelentkezett felhasználók olvashatják/írhatják")
    print("- Új rendelésnél kötelező mezők: items, total, timestamp")
    print("- A menüt bárki olvashatja, de csak admin módosíthatja")

def document_data_structure() -> None:
    """Adatstruktúra dokumentálása"""
    print_section("Firestore Adatstruktúra")
    
    collections = {
        "orders": {
            "description": "Rendelések gyűjtemény",
            "fields": {
                "items": "array - Rendelt tételek listája",
                "total": "number - Végösszeg",
                "timestamp": "timestamp - Rendelés időpontja",
                "status": "string - Rendelés állapota (new, processing, completed, cancelled)",
                "table": "string? - Asztal azonosító (opcionális)",
                "notes": "string? - Megjegyzések (opcionális)"
            }
        },
        "menu": {
            "description": "Menü tételek gyűjtemény",
            "fields": {
                "name": "string - Tétel neve",
                "price": "number - Ár",
                "category": "string - Kategória",
                "description": "string? - Leírás (opcionális)",
                "image": "string? - Kép URL (opcionális)",
                "allergens": "array? - Allergének listája (opcionális)"
            }
        }
    }
    
    for collection, details in collections.items():
        print(f"\n{collection}:")
        print(f"  {details['description']}")
        print("\n  Mezők:")
        for field, desc in details["fields"].items():
            print(f"    - {field}: {desc}")

def main():
    """Fő függvény"""
    print_header("Hagyma iPOS Firebase Dokumentáció")
    document_firebase_config()
    document_security_rules()
    document_data_structure()

if __name__ == "__main__":
    main() 