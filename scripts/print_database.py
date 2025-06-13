import json
import sys
from typing import Dict

# UTF-8 kódolás beállítása
sys.stdout.reconfigure(encoding='utf-8')

def print_header(text: str) -> None:
    print("\n" + "=" * 80)
    print(text.center(80))
    print("=" * 80 + "\n")

def document_database_structure() -> None:
    database = {
        "collections": {
            "orders": {
                "description": "Rendelések gyűjtemény",
                "fields": {
                    "id": {
                        "type": "string",
                        "description": "Egyedi azonosító (automatikusan generált)",
                        "required": True
                    },
                    "items": {
                        "type": "array",
                        "description": "Rendelt tételek listája",
                        "required": True,
                        "items": {
                            "id": "string - Tétel azonosító",
                            "name": "string - Tétel neve",
                            "price": "number - Egységár",
                            "quantity": "number - Mennyiség"
                        }
                    },
                    "total": {
                        "type": "number",
                        "description": "Végösszeg",
                        "required": True
                    },
                    "status": {
                        "type": "string",
                        "description": "Rendelés állapota",
                        "required": True,
                        "enum": ["new", "processing", "completed", "cancelled"]
                    },
                    "timestamp": {
                        "type": "timestamp",
                        "description": "Létrehozás időpontja",
                        "required": True
                    },
                    "table": {
                        "type": "string",
                        "description": "Asztal azonosító",
                        "required": False
                    },
                    "notes": {
                        "type": "string",
                        "description": "Megjegyzések",
                        "required": False
                    }
                },
                "indexes": [
                    "timestamp DESC",
                    "status",
                    "table"
                ]
            },
            "menu": {
                "description": "Menü tételek gyűjtemény",
                "fields": {
                    "id": {
                        "type": "string",
                        "description": "Egyedi azonosító",
                        "required": True
                    },
                    "name": {
                        "type": "string",
                        "description": "Tétel neve",
                        "required": True
                    },
                    "price": {
                        "type": "number",
                        "description": "Ár",
                        "required": True
                    },
                    "category": {
                        "type": "string",
                        "description": "Kategória",
                        "required": True
                    },
                    "description": {
                        "type": "string",
                        "description": "Leírás",
                        "required": False
                    },
                    "image": {
                        "type": "string",
                        "description": "Kép URL",
                        "required": False
                    },
                    "allergens": {
                        "type": "array",
                        "description": "Allergének listája",
                        "required": False
                    },
                    "available": {
                        "type": "boolean",
                        "description": "Elérhető-e",
                        "required": True,
                        "default": True
                    }
                },
                "indexes": [
                    "category",
                    "available"
                ]
            }
        },
        "security_rules": {
            "orders": {
                "read": "auth != null",
                "write": "auth != null && hasRequiredFields(['items', 'total'])"
            },
            "menu": {
                "read": "true",
                "write": "auth != null && auth.token.admin == true"
            }
        }
    }

    print_header("Hagyma iPOS Adatbázis Struktúra")

    # Gyűjtemények dokumentálása
    for collection_name, collection in database["collections"].items():
        print(f"\n{collection_name}")
        print("=" * len(collection_name))
        print(f"\nLeírás: {collection['description']}")
        
        print("\nMezők:")
        for field_name, field in collection["fields"].items():
            required = "kötelező" if field.get("required", False) else "opcionális"
            default = f", alapértelmezett: {field['default']}" if "default" in field else ""
            print(f"- {field_name}:")
            print(f"  Típus: {field['type']}")
            print(f"  Leírás: {field['description']}")
            print(f"  {required}{default}")
            
            if "enum" in field:
                print(f"  Lehetséges értékek: {', '.join(field['enum'])}")
            elif "items" in field:
                print("  Elemek struktúrája:")
                for item_field, item_desc in field["items"].items():
                    print(f"    - {item_field}: {item_desc}")
        
        if "indexes" in collection:
            print("\nIndexek:")
            for index in collection["indexes"]:
                print(f"- {index}")
    
    # Biztonsági szabályok dokumentálása
    print("\nBiztonsági szabályok")
    print("=" * 20)
    for collection_name, rules in database["security_rules"].items():
        print(f"\n{collection_name}:")
        print(f"- Olvasás: {rules['read']}")
        print(f"- Írás: {rules['write']}")

if __name__ == "__main__":
    document_database_structure() 