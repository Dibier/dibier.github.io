// === Microframework Dibier: index.js ===

// Cargar componente HTML, CSS y JS
async function cargarComponente(rutaBase, destino) {
  try {
    const res = await fetch(`${rutaBase}.html`);
    const html = await res.text();

    const contenedor = (typeof destino === 'string')
      ? document.querySelector(destino)
      : destino;

    contenedor.innerHTML = html;

    // Cargar CSS si existe
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = `${rutaBase}.css`;
    css.onerror = () => {}; // Silencioso
    document.head.appendChild(css);

    // Cargar JS si existe
    const js = await fetch(`${rutaBase}.js`);
    if (js.ok) {
      const script = document.createElement('script');
      script.src = `${rutaBase}.js`;
      script.defer = true;
      document.body.appendChild(script);
    }

  } catch (error) {
    console.error(`Error cargando componente: ${rutaBase}`, error);
  }
}

// Crear y registrar un nuevo elemento personalizado
function crearComponente(nombreTag, rutaBase) {
  if (!customElements.get(nombreTag)) {
    customElements.define(nombreTag, class extends HTMLElement {
      connectedCallback() {
        cargarComponente(rutaBase, this);
      }
    });
  }
}

// API global para todos los módulos
window.Sistema = {
  cargarComponente,
  crearComponente,
  esperar: ms => new Promise(res => setTimeout(res, ms)),
  log: msg => console.log(`[SISTEMA] ${msg}`),
};


cargarComponente("web/web", "sitio-web");