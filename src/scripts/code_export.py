import os

def export_files_content():
    # A megadott fájlok listája
    files_to_export = [
        "src/components/CartSidebar.js",
        "src/components/CategoryBar.js",
        "src/components/FullscreenExitButton.js",
        "src/components/OrderHistory.js",
        "src/components/PinScreen.js",
        "src/components/ProductGrid.js",
        "src/data/menu.js",
        "src/data/menu.json",
        "src/hooks/useFullscreen.js",
        "src/hooks/useFirebase.js",
        "src/hooks/useAuth.js",
        "src/services/firebaseService.js",
        "src/scripts/initFirebase.js",
        "src/utils/dataConverters.js",
        "src/utils/saveOrder.js",
        "src/App.css",
        "src/App.js",
        "src/App.tsx",
        "src/firebase.js",
        "src/index.css",
        "src/index.js",
        "tailwind.config.js"
    ]

    # Az export fájl útvonala
    export_path = "docs/code_export.txt"
    
    # Létrehozzuk a docs könyvtárat, ha még nem létezik
    os.makedirs("docs", exist_ok=True)

    # Megnyitjuk az export fájlt írásra
    with open(export_path, "w", encoding="utf-8") as export_file:
        for file_path in files_to_export:
            try:
                # Beolvassuk az aktuális fájl tartalmát
                with open(file_path, "r", encoding="utf-8") as source_file:
                    content = source_file.read()
                
                # Írjuk a fájl nevét és tartalmát az export fájlba
                export_file.write(f"\n{'='*80}\n")
                export_file.write(f"File: {file_path}\n")
                export_file.write(f"{'='*80}\n\n")
                export_file.write(content)
                export_file.write("\n\n")
                
                print(f"Sikeresen exportálva: {file_path}")
            
            except Exception as e:
                print(f"Hiba történt a {file_path} exportálása közben: {str(e)}")
    
    print(f"\nAz export sikeresen elkészült: {export_path}")

if __name__ == "__main__":
    export_files_content() 