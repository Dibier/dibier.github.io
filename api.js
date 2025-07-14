// Microframework Dibier: index.js

// Cargar componente HTML, CSS y JS
async function cargarComponente(rutaBase, destino) {
  try {
    const res = await fetch(`${rutaBase}/index.html`);
    const html = await res.text();

    const contenedor = (typeof destino === 'string')
      ? document.querySelector(destino)
      : destino;

    contenedor.innerHTML = html;

    // Cargar CSS si existe
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = `${rutaBase}/style.css`;
    css.onerror = () => {}; // Silencioso
    document.head.appendChild(css);

    // Cargar JS si existe
    const js = await fetch(`${rutaBase}/api.js`);
    if (js.ok) {
      const script = document.createElement('script');
      script.src = `${rutaBase}/api.js`;
      script.defer = true;

      const apisContainer = document.querySelector("apis");
      if (apisContainer) {
        apisContainer.appendChild(script);
      }
    }

    // Renderizar fórmulas si MathJax ya está listo
if (window.MathJax && MathJax.typesetPromise) {
  MathJax.typesetPromise().catch(err => console.error(err));
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


cargarComponente("web", "web");