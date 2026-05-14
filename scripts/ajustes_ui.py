import re
import os

def apply_ui_fixes():
    file_path = "/Users/juanchi/Desktop/RE.VIVE/index.html"
    if not os.path.exists(file_path):
        print("Error: index.html no encontrado")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Eliminar el elemento scroll
    # Buscamos el bloque completo: <a href="#manifiesto" class="hero__scroll" ... > ... </a>
    # Usamos regex para atrapar el bloque multilínea
    scroll_pattern = re.compile(r'<a href="#manifiesto" class="hero__scroll".*?</a>', re.DOTALL)
    
    if scroll_pattern.search(content):
        new_content = scroll_pattern.sub('', content)
        print("Elemento scroll eliminado.")
    else:
        new_content = content
        print("No se encontró el elemento scroll.")

    # 2. Corregir el Badge (mindset)
    # Buscamos el texto dentro de textPath
    # El usuario dice que falta la 't' en visualización. 
    # Añadiremos un punto al final y espacio para cerrar el círculo correctamente.
    
    badge_pattern = re.compile(r'(<textPath href="#circlePath" startOffset="0">)\s*(.*?)\s*(</textPath>)')
    
    def badge_fix(match):
        prefix = match.group(1)
        text = match.group(2).strip()
        suffix = match.group(3)
        # Si ya termina en mindset, le añadimos un punto al final para que sea un loop perfecto
        if "mindset" in text:
            # Aseguramos que termine con un separador para que no se pegue el inicio con el fin
            if not text.endswith('·'):
                text += " ·"
        return f"{prefix}\n                {text}\n              {suffix}"

    final_content = badge_pattern.sub(badge_fix, new_content)
    
    if final_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(final_content)
        print("index.html actualizado con las correcciones de UI.")
    else:
        print("No se realizaron cambios en index.html.")

if __name__ == "__main__":
    apply_ui_fixes()
