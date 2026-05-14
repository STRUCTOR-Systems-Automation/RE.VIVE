import os

def update_logo_transparency():
    base_path = "/Users/juanchi/Desktop/RE.VIVE"
    assets_path = os.path.join(base_path, "assets")
    
    new_logo_name = "revive-logo-transparent.png"
    new_logo_path = os.path.join(assets_path, new_logo_name)
    
    index_html = os.path.join(base_path, "index.html")

    print(f"Verificando el logo transparente en: {new_logo_path}")
    
    if not os.path.exists(new_logo_path):
        print(f"ERROR: No se encontró {new_logo_name} en {assets_path}.")
        return

    # 2. Actualizar index.html
    if os.path.exists(index_html):
        with open(index_html, 'r', encoding='utf-8') as f:
            content = f.read()

        # Reemplazar la versión anterior (con fondo o la original) por la transparente
        # Varias posibilidades de lo que hay ahora:
        # 1. assets/revive-logo-3.png (la que puse antes)
        # 2. assets/re · vive 2.png (la original)
        
        old_refs = ['assets/revive-logo-3.png', 'assets/re · vive 2.png']
        new_ref = 'assets/revive-logo-transparent.png'
        
        updated = False
        new_content = content
        for old_ref in old_refs:
            if old_ref in new_content:
                new_content = new_content.replace(old_ref, new_ref)
                updated = True
        
        if updated:
            with open(index_html, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("index.html actualizado con la versión transparente.")
        else:
            if new_ref in content:
                print("La referencia ya es transparente.")
            else:
                print("No se encontraron referencias para actualizar en index.html.")
    else:
        print("ERROR: No se encontró index.html.")

if __name__ == "__main__":
    update_logo_transparency()
