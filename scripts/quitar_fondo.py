from PIL import Image
import os

def make_transparent():
    base_path = "/Users/juanchi/Desktop/RE.VIVE/assets"
    source_path = os.path.join(base_path, "revive-logo-3.png")
    dest_path = os.path.join(base_path, "revive-logo-transparent.png")
    
    if not os.path.exists(source_path):
        print(f"Error: No se encuentra {source_path}")
        return

    img = Image.open(source_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    # Umbral para el blanco (ajustable si el fondo no es blanco puro)
    threshold = 240 
    
    for item in datas:
        # Si el pixel es muy cercano al blanco, hacerlo transparente
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(dest_path, "PNG")
    print(f"Logo transparente guardado en: {dest_path}")

if __name__ == "__main__":
    make_transparent()
