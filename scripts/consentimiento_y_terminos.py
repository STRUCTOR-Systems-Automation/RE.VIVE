import os

GA_BLOCK = """<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-864XC1WLKF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-864XC1WLKF');
</script>"""

META_BLOCK = """<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1314889470815389');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1314889470815389&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->"""

OLD_IDENTIFICATIVOS = """      <ul>
        <li><strong>Titular:</strong> Valeria Cardellini</li>
        <li><strong>Actividad:</strong> Servicios de entrenamiento personal online y asesoramiento nutricional para mujeres bajo la marca Re·vive.</li>
      </ul>"""

NEW_IDENTIFICATIVOS = """      <ul>
        <li><strong>Titular:</strong> Valeria Cardellini</li>
        <li><strong>Nombre comercial:</strong> Re•Vive</li>
        <li><strong>NIE:</strong> Z0556971-P</li>
        <li><strong>Correo electrónico:</strong> valeriagymcontact@gmail.com</li>
        <li><strong>Actividad:</strong> Servicios de entrenamiento personal online y asesoramiento nutricional para mujeres bajo la marca Re·vive.</li>
      </ul>"""

OLD_LEGISLACION = """      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>El presente aviso legal se rige por la legislación española. Para la resolución de cualquier controversia derivada del uso del Sitio, las partes se someten a los Juzgados y Tribunales del domicilio del usuario, cuando este actúe como consumidor.</p>"""

NEW_LEGISLACION_WITH_TERMS = """      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>El presente aviso legal se rige por la legislación española. Para la resolución de cualquier controversia derivada del uso del Sitio, las partes se someten a los Juzgados y Tribunales del domicilio del usuario, cuando este actúe como consumidor.</p>

      <hr style="margin: 40px 0; border: 0; border-top: 1px solid rgba(0,0,0,0.08);" />

      <h2 id="terminos-contratacion">Términos y condiciones de contratación</h2>
      <p>A continuación se detallan los términos y condiciones que regulan la contratación de los servicios de asesoramiento ofrecidos por Re·vive:</p>

      <h3>1. Objeto del servicio</h3>
      <p>Re·vive ofrece servicios de asesoramiento online personalizados en entrenamiento y nutrición.</p>

      <h3>2. Funcionamiento del servicio</h3>
      <p>El servicio incluye el seguimiento personalizado según el plan contratado, así como el acceso a las herramientas y recursos necesarios para el desarrollo del programa.</p>

      <h3>3. Pagos</h3>
      <p>El importe del servicio será el correspondiente al plan seleccionado por el cliente.</p>
      <p>Los pagos realizados mediante suscripción se renovarán automáticamente al finalizar cada período contratado, salvo cancelación previa por parte del cliente.</p>

      <h3>4. Cancelaciones</h3>
      <p>El cliente podrá cancelar su suscripción en cualquier momento.</p>
      <p>Para evitar la renovación automática, la cancelación deberá solicitarse con un mínimo de 10 días de antelación a la fecha de renovación.</p>

      <h3>5. Reembolsos</h3>
      <p>Debido al carácter personalizado del servicio y a la reserva de plazas limitadas, no se realizarán reembolsos totales ni parciales una vez efectuado el pago o iniciado el período contratado.</p>
      <p>La falta de utilización del servicio, la ausencia de comunicación o el abandono voluntario del programa no darán derecho a reembolso.</p>

      <h3>6. Responsabilidad del cliente</h3>
      <p>El cliente declara que la información facilitada sobre su estado de salud es veraz y se compromete a informar de cualquier cambio relevante.</p>

      <h3>7. Exención de responsabilidad médica</h3>
      <p>Los servicios prestados por Re·vive tienen carácter educativo y de asesoramiento. No sustituyen el diagnóstico, tratamiento o seguimiento realizado por profesionales sanitarios.</p>
      <p>Ante cualquier condición médica, lesión o patología, el cliente deberá consultar previamente con su médico.</p>

      <h3>8. Protección de datos</h3>
      <p>Los datos personales serán tratados conforme a la Política de Privacidad publicada en el sitio web.</p>

      <h3>9. Aceptación</h3>
      <p>La contratación de cualquiera de los servicios ofrecidos implica la aceptación íntegra de los presentes términos y condiciones.</p>"""

def clean_tracking(file_path):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} no encontrado.")
        return False

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Normalizar retornos de carro para comparación robusta
    normalized_content = content.replace('\r\n', '\n')
    normalized_ga = GA_BLOCK.replace('\r\n', '\n')
    normalized_meta = META_BLOCK.replace('\r\n', '\n')

    # Intentar eliminar GA_BLOCK
    ga_found = normalized_ga in normalized_content
    if ga_found:
        # Reemplazar con salto de línea vacío o nada
        # Para mantener el formato limpio, removemos el bloque y los saltos de línea adicionales
        normalized_content = normalized_content.replace(normalized_ga + '\n', '')
        normalized_content = normalized_content.replace(normalized_ga, '')
        print(f"[{file_path}] Google Analytics removido con éxito.")
    else:
        # Verificar si ya se removió
        if "googletagmanager.com" not in normalized_content:
            print(f"[{file_path}] Google Analytics ya estaba ausente.")
            ga_found = True
        else:
            print(f"[{file_path}] Advertencia: Google Analytics encontrado pero no coincidía con el bloque exacto.")

    # Intentar eliminar META_BLOCK
    meta_found = normalized_meta in normalized_content
    if meta_found:
        normalized_content = normalized_content.replace(normalized_meta + '\n', '')
        normalized_content = normalized_content.replace(normalized_meta, '')
        print(f"[{file_path}] Meta Pixel removido con éxito.")
    else:
        if "connect.facebook.net" not in normalized_content:
            print(f"[{file_path}] Meta Pixel ya estaba ausente.")
            meta_found = True
        else:
            print(f"[{file_path}] Advertencia: Meta Pixel encontrado pero no coincidía con el bloque exacto.")

    # Guardar cambios
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(normalized_content)

    return ga_found and meta_found

def update_aviso_legal(file_path):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} no encontrado.")
        return False

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    normalized_content = content.replace('\r\n', '\n')
    normalized_old_id = OLD_IDENTIFICATIVOS.replace('\r\n', '\n')
    normalized_new_id = NEW_IDENTIFICATIVOS.replace('\r\n', '\n')
    normalized_old_leg = OLD_LEGISLACION.replace('\r\n', '\n')
    normalized_new_leg = NEW_LEGISLACION_WITH_TERMS.replace('\r\n', '\n')

    # Actualizar datos identificativos
    id_found = False
    if normalized_old_id in normalized_content:
        normalized_content = normalized_content.replace(normalized_old_id, normalized_new_id)
        print(f"[{file_path}] Datos identificativos actualizados con éxito.")
        id_found = True
    elif normalized_new_id in normalized_content:
        print(f"[{file_path}] Datos identificativos ya actualizados.")
        id_found = True
    else:
        print(f"[{file_path}] Error: No se encontró la sección de datos identificativos antigua.")

    # Actualizar términos de contratación
    terms_found = False
    if normalized_old_leg in normalized_content:
        normalized_content = normalized_content.replace(normalized_old_leg, normalized_new_leg)
        print(f"[{file_path}] Términos y condiciones de contratación añadidos con éxito.")
        terms_found = True
    elif normalized_new_leg in normalized_content:
        print(f"[{file_path}] Términos y condiciones de contratación ya añadidos.")
        terms_found = True
    else:
        print(f"[{file_path}] Error: No se encontró la sección de legislación antigua para posicionar los términos.")

    # Guardar cambios
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(normalized_content)

    return id_found and terms_found

def main():
    files_to_clean = ['cookies.html', 'privacidad.html', 'aviso-legal.html']
    
    print("--- Iniciando proceso de limpieza de cookies estáticas ---")
    all_clean = True
    for f in files_to_clean:
        success = clean_tracking(f)
        if not success:
            all_clean = False
            
    print("\n--- Iniciando actualización de Aviso Legal ---")
    aviso_ok = update_aviso_legal('aviso-legal.html')
    
    if all_clean and aviso_ok:
        print("\n¡Proceso completado con éxito absoluto!")
    else:
        print("\nEl proceso finalizó con algunas advertencias o errores. Por favor revise el output anterior.")

if __name__ == "__main__":
    main()
