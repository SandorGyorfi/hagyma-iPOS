import os
import json
from typing import Dict, List, Optional

def print_header(text: str, level: int = 1) -> None:
    """Fejléc formázott kiírása"""
    symbol = "=" if level == 1 else "-"
    print(f"\n{text}")
    print(symbol * len(text))
    print()

def print_color_palette() -> None:
    """Színpaletta dokumentálása"""
    print_header("Színpaletta", 2)
    colors = {
        "primary": {
            "main": "#1a73e8",  # Kék - fő szín
            "light": "#4285f4",
            "dark": "#0d47a1"
        },
        "secondary": {
            "main": "#34a853",  # Zöld - másodlagos szín
            "light": "#66bb6a",
            "dark": "#2e7d32"
        },
        "error": {
            "main": "#ea4335",  # Piros - hibajelzés
            "light": "#ef5350",
            "dark": "#c62828"
        },
        "warning": {
            "main": "#fbbc04",  # Sárga - figyelmeztetés
            "light": "#ffee58",
            "dark": "#f9a825"
        },
        "success": {
            "main": "#34a853",  # Zöld - sikeres művelet
            "light": "#66bb6a",
            "dark": "#2e7d32"
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
    }
    
    for category, values in colors.items():
        print(f"{category}:")
        for name, color in values.items():
            print(f"  {name}: {color}")
        print()

def print_typography() -> None:
    """Tipográfia dokumentálása"""
    print_header("Tipográfia", 2)
    typography = {
        "fontFamily": "'Roboto', 'Helvetica', 'Arial', sans-serif",
        "variants": {
            "h1": {"fontSize": "2.5rem", "fontWeight": 300, "lineHeight": 1.2},
            "h2": {"fontSize": "2rem", "fontWeight": 300, "lineHeight": 1.2},
            "h3": {"fontSize": "1.75rem", "fontWeight": 400, "lineHeight": 1.2},
            "h4": {"fontSize": "1.5rem", "fontWeight": 400, "lineHeight": 1.2},
            "h5": {"fontSize": "1.25rem", "fontWeight": 400, "lineHeight": 1.2},
            "h6": {"fontSize": "1rem", "fontWeight": 500, "lineHeight": 1.2},
            "body1": {"fontSize": "1rem", "fontWeight": 400, "lineHeight": 1.5},
            "body2": {"fontSize": "0.875rem", "fontWeight": 400, "lineHeight": 1.5},
            "button": {"fontSize": "0.875rem", "fontWeight": 500, "lineHeight": 1.75},
            "caption": {"fontSize": "0.75rem", "fontWeight": 400, "lineHeight": 1.66},
        }
    }
    
    print(f"Alapértelmezett betűtípus: {typography['fontFamily']}\n")
    print("Szövegtípusok:")
    for variant, props in typography["variants"].items():
        print(f"  {variant}:")
        for prop, value in props.items():
            print(f"    {prop}: {value}")
        print()

def print_spacing() -> None:
    """Térközök dokumentálása"""
    print_header("Térközök", 2)
    spacing = {
        "unit": 8,  # alapegység pixelben
        "multipliers": [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48]
    }
    
    print(f"Alapegység: {spacing['unit']}px\n")
    print("Szorzók és értékek:")
    for multiplier in spacing["multipliers"]:
        value = spacing["unit"] * multiplier
        print(f"  {multiplier}x: {value}px")

def print_components() -> None:
    """Komponensek dokumentálása"""
    print_header("Komponensek", 2)
    components = {
        "Gomb": {
            "variánsok": ["contained", "outlined", "text"],
            "méretek": ["small", "medium", "large"],
            "állapotok": ["default", "hover", "active", "disabled"],
            "példa": 'Button variant="contained" size="medium">Mentés</Button'
        },
        "Beviteli mező": {
            "típusok": ["text", "number", "password", "email"],
            "állapotok": ["default", "focus", "error", "disabled"],
            "variánsok": ["outlined", "filled", "standard"],
            "példa": 'TextField variant="outlined" type="text" label="Név"'
        },
        "Kártya": {
            "részek": ["header", "content", "actions"],
            "variánsok": ["elevated", "outlined"],
            "példa": 'Card variant="outlined"><CardContent>Tartalom</CardContent></Card'
        },
        "Lista": {
            "típusok": ["simple", "nested", "interactive"],
            "elemek": ["ListItem", "ListItemText", "ListItemIcon"],
            "példa": 'List><ListItem><ListItemText primary="Lista elem" /></ListItem></List'
        },
        "Dialógus": {
            "részek": ["title", "content", "actions"],
            "méret": ["xs", "sm", "md", "lg", "xl"],
            "példa": 'Dialog open={open}><DialogTitle>Cím</DialogTitle></Dialog'
        }
    }
    
    for name, details in components.items():
        print(f"{name}:")
        for key, value in details.items():
            if isinstance(value, list):
                print(f"  {key}: {', '.join(value)}")
            else:
                print(f"  {key}: {value}")
        print()

def print_layout_grid() -> None:
    """Elrendezési rács dokumentálása"""
    print_header("Elrendezési rács", 2)
    grid = {
        "columns": 12,
        "gutters": {
            "xs": 8,
            "sm": 16,
            "md": 24,
            "lg": 32,
            "xl": 40
        },
        "breakpoints": {
            "xs": "0px",
            "sm": "600px",
            "md": "960px",
            "lg": "1280px",
            "xl": "1920px"
        }
    }
    
    print(f"Oszlopok száma: {grid['columns']}\n")
    print("Térközök méretenként:")
    for size, value in grid["gutters"].items():
        print(f"  {size}: {value}px")
    print("\nTöréspontok:")
    for size, value in grid["breakpoints"].items():
        print(f"  {size}: {value}")

def main():
    """Fő függvény a design rendszer dokumentálásához"""
    print_header("Hagyma iPOS Design Rendszer", 1)
    
    # Design elemek kiírása
    print_color_palette()
    print_typography()
    print_spacing()
    print_layout_grid()
    print_components()

if __name__ == "__main__":
    main() 