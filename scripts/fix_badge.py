import os
import re

def fix_mindset_badge():
    file_path = "/Users/juanchi/Desktop/RE.VIVE/index.html"
    if not os.path.exists(file_path):
        print("Error: index.html no encontrado")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Definimos el texto exacto en mayúsculas para evitar sorpresas y con espaciado claro
    # He añadido espacios extra alrededor de los puntos para separar bien las palabras
    new_badge_text = "· RE.VIVE · MÉTODO PROPIO · ENTRENAMIENTO · NUTRICIÓN · MINDSET · "
    
    badge_pattern = re.compile(r'(<textPath href="#circlePath" startOffset="0">).*?(</textPath>)', re.DOTALL)
    
    def badge_replace(match):
        return f"{match.group(1)}\n                {new_badge_text}\n              {match.group(2)}"

    new_content = badge_pattern.sub(badge_replace, content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("index.html actualizado con el texto del badge corregido y en mayúsculas.")
    else:
        print("No se detectaron cambios necesarios en el badge.")

if __name__ == "__main__":
    fix_mindset_badge()
