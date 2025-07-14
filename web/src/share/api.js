async function loadComponent(rutaHTML, destino = "body") {
  try {
    const res = await fetch(rutaHTML);
    if (!res.ok) throw new Error(`No se pudo cargar ${rutaHTML}`);

    const html = await res.text();

    const contenedor = typeof destino === "string"
      ? document.querySelector(destino)
      : destino;

    if (!contenedor) throw new Error(`Destino "${destino}" no encontrado`);

    contenedor.innerHTML = html;
  } catch (err) {
    console.error("Error al cargar componente plano:", err);
  }
}

loadComponent("../../index.html", "body");