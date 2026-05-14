import os

def main():
    file_path = 'index.html'
    old_text = "No vendemos rutinas genéricas. Construimos un sistema vivo, hecho a tu medida, que evoluciona contigo cada semana."
    new_text = "No trabajamos con rutinas genéricas. Construimos un sistema a tu medida que evoluciona contigo y te enseña a crear hábitos que puedas mantener toda la vida."

    if not os.path.exists(file_path):
        print(f"Error: {file_path} no encontrado.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if old_text in content:
        new_content = content.replace(old_text, new_text)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Éxito: Texto actualizado correctamente.")
    elif new_text in content:
        print("Aviso: El texto ya ha sido actualizado anteriormente.")
    else:
        print("Error: No se encontró el texto original en el archivo.")

if __name__ == "__main__":
    main()
