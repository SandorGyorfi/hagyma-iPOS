import os
import datetime

def get_file_content(file_path):
    """Beolvassa a fájl tartalmát és visszaadja azt."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Hiba a fájl olvasásakor: {str(e)}"

def should_include_file(file_name):
    """Ellenőrzi, hogy a fájlt bele kell-e venni az exportba."""
    # Kihagyandó fájlok és mappák
    exclude = [
        '.git', 'node_modules', '__pycache__',
        '.env', '.DS_Store', '.gitignore',
        '.vscode', '.idea'
    ]
    
    # Elfogadott kiterjesztések
    include_extensions = [
        '.js', '.jsx', '.ts', '.tsx', '.css',
        '.html', '.py', '.json', '.md'
    ]
    
    # Ellenőrzések
    for excluded in exclude:
        if excluded in file_name:
            return False
            
    _, ext = os.path.splitext(file_name)
    return ext.lower() in include_extensions

def create_code_export():
    """Létrehozza a kód exportot."""
    # Az aktuális dátum a fájlnévhez
    current_date = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"code_export_{current_date}.txt"
    
    # A projekt gyökérkönyvtára (egy szinttel feljebb a scripts mappától)
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    with open(output_file, 'w', encoding='utf-8') as f:
        # Fejléc
        f.write("=" * 80 + "\n")
        f.write(f"HAGYMA-iPOS KÓD EXPORT - {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("=" * 80 + "\n\n")
        
        # Rekurzívan bejárjuk a könyvtárakat
        for root, dirs, files in os.walk(root_dir):
            # Relatív útvonal a projekt gyökeréhez képest
            rel_path = os.path.relpath(root, root_dir)
            
            # Fájlok feldolgozása
            for file in sorted(files):
                if should_include_file(file):
                    full_path = os.path.join(root, file)
                    file_path = os.path.join(rel_path, file)
                    
                    # Fájl fejléc
                    f.write("-" * 80 + "\n")
                    f.write(f"Fájl: {file_path}\n")
                    f.write("-" * 80 + "\n\n")
                    
                    # Fájl tartalom
                    content = get_file_content(full_path)
                    f.write(content)
                    f.write("\n\n")

if __name__ == "__main__":
    try:
        create_code_export()
        print("A kód export sikeresen elkészült!")
    except Exception as e:
        print(f"Hiba történt az export során: {str(e)}") 