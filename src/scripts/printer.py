import os
import win32print
import win32api
from pathlib import Path
import subprocess

def get_all_files(root_dir):
    """Összegyűjti az összes fájlt a megadott könyvtárból."""
    files = []
    exclude_dirs = {'.git', 'node_modules', '__pycache__', 'build', 'dist'}
    exclude_extensions = {'.pyc', '.git', '.env'}
    
    for path in Path(root_dir).rglob('*'):
        if path.is_file():
            # Kihagyjuk a rejtett fájlokat és a kizárt kiterjesztéseket
            if not any(part.startswith('.') for part in path.parts) and \
               not any(path.parent.name in exclude_dirs for parent in path.parents) and \
               path.suffix not in exclude_extensions:
                files.append(str(path))
    return files

def print_files(files):
    """Kinyomtatja a megadott fájlokat."""
    printer_name = win32print.GetDefaultPrinter()
    print(f"Alapértelmezett nyomtató: {printer_name}")
    
    for file_path in files:
        try:
            # PDF és képfájlok közvetlen nyomtatása
            if file_path.lower().endswith(('.pdf', '.jpg', '.jpeg', '.png', '.bmp')):
                win32api.ShellExecute(0, "print", file_path, None, ".", 0)
            # Szöveges fájlok nyomtatása
            else:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Notepad használata a szöveges fájlok nyomtatásához
                    temp_file = os.path.join(os.environ['TEMP'], 'temp_print.txt')
                    with open(temp_file, 'w', encoding='utf-8') as temp:
                        temp.write(content)
                    win32api.ShellExecute(0, "print", temp_file, None, ".", 0)
            
            print(f"Nyomtatásra küldve: {file_path}")
            
        except Exception as e:
            print(f"Hiba történt a {file_path} nyomtatása közben: {str(e)}")

def main():
    # A projekt gyökérkönyvtárának meghatározása
    root_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    print(f"Projekt könyvtár: {root_dir}")
    
    # Fájlok összegyűjtése
    files = get_all_files(root_dir)
    print(f"Összesen {len(files)} fájl található")
    
    # Megerősítés kérése
    print("\nNyomtatandó fájlok:")
    for f in files:
        print(f"- {f}")
    
    response = input("\nElindítsuk a nyomtatást? (igen/nem): ")
    if response.lower() in ['igen', 'i', 'yes', 'y']:
        print_files(files)
        print("\nNyomtatás befejezve!")
    else:
        print("Nyomtatás megszakítva.")

if __name__ == "__main__":
    main() 