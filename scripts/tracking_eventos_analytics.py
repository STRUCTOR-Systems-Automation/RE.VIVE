import os

def update_script_js():
    file_path = "script.js"
    if not os.path.exists(file_path):
        print(f"Error: {file_path} no encontrado.")
        return False

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Normalizar saltos de línea
    normalized_content = content.replace("\r\n", "\n")

    # 1. Parchear formulario de contacto (lead)
    old_form_tracking = """        if (res.ok) {
          if (typeof fbq === "function") {
            fbq("track", "Lead");
            fbq("track", "Contact");
          }
          btnLabel.textContent = "¡Enviado!";"""

    new_form_tracking = """        if (res.ok) {
          if (typeof fbq === "function") {
            fbq("track", "Lead");
            fbq("track", "Contact");
          }
          if (typeof gtag === "function") {
            gtag("event", "generate_lead", {
              event_category: "engagement",
              event_label: "Formulario de Contacto"
            });
          }
          btnLabel.textContent = "¡Enviado!";"""

    if old_form_tracking in normalized_content:
        normalized_content = normalized_content.replace(old_form_tracking, new_form_tracking)
        print("Trackeo de leads de GA4 añadido a script.js")
    elif new_form_tracking in normalized_content:
        print("Trackeo de leads de GA4 ya existía en script.js")
    else:
        print("Error: No se encontró el bloque del formulario de contacto para parchear.")
        return False

    # 2. Parchear burbuja de WhatsApp (click)
    old_wa_tracking = """    waBubble.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof fbq === "function") fbq("trackCustom", "WhatsAppChat");
      const url = "https://api.whatsapp.com/send?phone=" + WA_PHONE +"""

    new_wa_tracking = """    waBubble.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof fbq === "function") fbq("trackCustom", "WhatsAppChat");
      if (typeof gtag === "function") {
        gtag("event", "contact", {
          method: "WhatsApp"
        });
      }
      const url = "https://api.whatsapp.com/send?phone=" + WA_PHONE +"""

    if old_wa_tracking in normalized_content:
        normalized_content = normalized_content.replace(old_wa_tracking, new_wa_tracking)
        print("Trackeo de WhatsApp de GA4 añadido a script.js")
    elif new_wa_tracking in normalized_content:
        print("Trackeo de WhatsApp de GA4 ya existía en script.js")
    else:
        print("Error: No se encontró el bloque de WhatsApp para parchear.")
        return False

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(normalized_content)

    return True

def update_documentation():
    file_path = "directivas/analytics_search_console_SOP.md"
    if not os.path.exists(file_path):
        print(f"Error: {file_path} no encontrado.")
        return False

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    normalized_content = content.replace("\r\n", "\n")

    old_config_section = """## 4. Configuración de GA4

| Ajuste | Estado |
|---|---|
| Misurazione avanzata | Activada |
| Eventos automáticos | Páginas vistas, scroll, clics de salida, búsquedas internas |
| Vinculación con Search Console | Activa desde 21 jun 2026 |
| IPs anonimizadas | Sí (comportamiento por defecto en GA4) |

---"""

    new_config_section = """## 4. Configuración de GA4

| Ajuste | Estado |
|---|---|
| Misurazione avanzata | Activada |
| Eventos automáticos | Páginas vistas, scroll, clics de salida, búsquedas internas |
| Vinculación con Search Console | Activa desde 21 jun 2026 |
| IPs anonimizadas | Sí (comportamiento por defecto en GA4) |

### Eventos personalizados configurados

| Evento | Cuándo se dispara | Cómo está implementado |
|---|---|---|
| `generate_lead` | Al enviar el formulario de contacto con éxito | `gtag('event', 'generate_lead', ...)` en `script.js` |
| `contact` | Al hacer clic en el botón de WhatsApp | `gtag('event', 'contact', { method: 'WhatsApp' })` en `script.js` |

---"""

    if old_config_section in normalized_content:
        normalized_content = normalized_content.replace(old_config_section, new_config_section)
        print("Documentación de eventos de GA4 añadida a analytics_search_console_SOP.md")
    elif new_config_section in normalized_content:
        print("Documentación de eventos de GA4 ya existía en analytics_search_console_SOP.md")
    else:
        print("Advertencia: No se encontró la sección exacta de GA4 en la documentación para actualizar.")
        return False

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(normalized_content)

    return True

def main():
    print("--- Iniciando proceso de actualización de eventos de Google Analytics ---")
    script_ok = update_script_js()
    doc_ok = update_documentation()

    if script_ok and doc_ok:
        print("\n¡Proceso completado con éxito absoluto!")
    else:
        print("\nEl proceso finalizó con algunas advertencias o errores.")

if __name__ == "__main__":
    main()
