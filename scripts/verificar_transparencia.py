from PIL import Image
import os

def check_transparency():
    img_path = "/Users/juanchi/Desktop/RE.VIVE/assets/revive-logo-transparent.png"
    if not os.path.exists(img_path):
        print("File not found")
        return
    
    img = Image.open(img_path)
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        print(f"La imagen tiene canal alpha (transparencia). Mode: {img.mode}")
    else:
        print(f"La imagen NO tiene transparencia. Mode: {img.mode}")

if __name__ == "__main__":
    check_transparency()
