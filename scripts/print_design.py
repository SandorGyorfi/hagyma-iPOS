import json
import sys
from typing import Dict

# UTF-8 kódolás beállítása
sys.stdout.reconfigure(encoding='utf-8')

def print_header(text: str) -> None:
    print("\n" + "=" * 80)
    print(text.center(80))
    print("=" * 80 + "\n")

def document_design_system() -> None:
    design_system = {
        "colors": {
            "primary": {
                "main": "#1a73e8",  # Kék
                "light": "#4285f4",
                "dark": "#0d47a1"
            },
            "secondary": {
                "main": "#34a853",  # Zöld
                "light": "#66bb6a",
                "dark": "#2e7d32"
            },
            "error": {
                "main": "#ea4335",  # Piros
                "light": "#ef5350",
                "dark": "#c62828"
            },
            "warning": {
                "main": "#fbbc04",  # Sárga
                "light": "#ffee58",
                "dark": "#f9a825"
            },
            "grey": {
                "50": "#fafafa",
                "100": "#f5f5f5",
                "200": "#eeeeee",
                "300": "#e0e0e0",
                "400": "#bdbdbd",
                "500": "#9e9e9e",
                "600": "#757575",
                "700": "#616161",
                "800": "#424242",
                "900": "#212121"
            }
        },
        "typography": {
            "fontFamily": "'Roboto', 'Helvetica', 'Arial', sans-serif",
            "variants": {
                "h1": {"fontSize": "2.5rem", "fontWeight": 300},
                "h2": {"fontSize": "2rem", "fontWeight": 300},
                "h3": {"fontSize": "1.75rem", "fontWeight": 400},
                "h4": {"fontSize": "1.5rem", "fontWeight": 400},
                "h5": {"fontSize": "1.25rem", "fontWeight": 400},
                "h6": {"fontSize": "1rem", "fontWeight": 500},
                "body1": {"fontSize": "1rem", "fontWeight": 400},
                "body2": {"fontSize": "0.875rem", "fontWeight": 400},
                "button": {"fontSize": "0.875rem", "fontWeight": 500},
                "caption": {"fontSize": "0.75rem", "fontWeight": 400}
            }
        },
        "spacing": {
            "unit": 8,  # px
            "scale": [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]
        },
        "breakpoints": {
            "xs": "0px",
            "sm": "600px",
            "md": "960px",
            "lg": "1280px",
            "xl": "1920px"
        },
        "shadows": {
            "none": "none",
            "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
        },
        "borderRadius": {
            "none": "0px",
            "sm": "0.125rem",
            "md": "0.375rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
        },
        "transitions": {
            "default": "all 0.2s ease-in-out",
            "fast": "all 0.1s ease-in-out",
            "slow": "all 0.3s ease-in-out"
        }
    }

    print_header("Hagyma iPOS Design Rendszer")

    # Színek
    print("Színpaletta")
    print("-" * 40)
    for category, values in design_system["colors"].items():
        print(f"\n{category}:")
        if isinstance(values, dict):
            for name, color in values.items():
                print(f"  {name}: {color}")
    
    # Tipográfia
    print("\nTipográfia")
    print("-" * 40)
    print(f"\nAlapértelmezett betűtípus: {design_system['typography']['fontFamily']}")
    print("\nSzövegtípusok:")
    for variant, props in design_system["typography"]["variants"].items():
        print(f"  {variant}:")
        for prop, value in props.items():
            print(f"    {prop}: {value}")
    
    # Térközök
    print("\nTérközök")
    print("-" * 40)
    print(f"\nAlapegység: {design_system['spacing']['unit']}px")
    print("Szorzók:", ", ".join(map(str, design_system["spacing"]["scale"])))
    
    # Töréspontok
    print("\nTöréspontok")
    print("-" * 40)
    for size, value in design_system["breakpoints"].items():
        print(f"  {size}: {value}")
    
    # Árnyékok
    print("\nÁrnyékok")
    print("-" * 40)
    for name, value in design_system["shadows"].items():
        print(f"  {name}: {value}")
    
    # Lekerekítések
    print("\nLekerekítések")
    print("-" * 40)
    for name, value in design_system["borderRadius"].items():
        print(f"  {name}: {value}")
    
    # Animációk
    print("\nAnimációk")
    print("-" * 40)
    for name, value in design_system["transitions"].items():
        print(f"  {name}: {value}")

if __name__ == "__main__":
    document_design_system() 