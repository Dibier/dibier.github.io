// Microframework Dibier: index.js


async function fetchHtmlContent(basePath) {
  try {
    const response = await fetch(`${basePath}/index.html`);
    if(!response.ok) throw new Error(`Failed to fetch HTML from ${basePath}/index.html`);

    const htmlContent = await response.text();
    return htmlContent;

  } catch (e) {
    throw new Error(`Error in fetchHtmlContent for "${basePath}": ${e.menssage}`);
  }
}

// Load and inject HTML into a target container
async function loadComponentHtml(basePath, selector) {
  try {
    
    const htmlContent = await fetchHtmlContent(basePath);
    const tmpElement = document.createElement("div");
    tmpElement.innerHTML = htmlContent;

    const container = document.querySelector(selector);
    container.innerHTML = tmpElement.querySelector(".component-html").innerHTML;

  } catch (e) {
    throw new Error(`Error in loadComponentHtml for "${basePath}": ${e.message}`);
  }
}

// Load and attach CSS if it exists
function loadComponentCss(basePath) {
  try {
    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = `${basePath}/style.css`;
    styleSheet.onerror = () => {}; // Silent fail
    document.head.appendChild(styleSheet);
  } catch (e) {
    throw new Error(`Error in loadComponentCss for "${basePath}": ${e.message}`);
  }
}

// Load and attach JS if it exists
async function loadComponentJs(basePath) {
  try {
    const jsResponse = await fetch(`${basePath}/api.js`);
    if (jsResponse.ok) {
      const scriptElement = document.createElement('script');
      scriptElement.src = `${basePath}/api.js`;
      scriptElement.defer = true;
      document.head.appendChild(scriptElement);
    }
  } catch (e) {
    throw new Error(`Error in loadComponentJs for "${basePath}": ${e.message}`);
  }
}

// Load HTML, CSS, and JS for a component
async function loadComponent(basePath, target) {
  try {
    await loadComponentHtml(basePath, target);
    loadComponentCss(basePath);
    await loadComponentJs(basePath);

    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise().catch(err => {
        console.error(`MathJax render error in "${basePath}": ${err.message}`);
      });
    }

  } catch (e) {
    throw new Error(`Error in loadComponent for "${basePath}": ${e.message}`);
  }
}

// Alias to keep backward compatibility
async function cargarComponente(rutaBase, destino) {
  try {
    await loadComponent(rutaBase, destino);
  } catch (e) {
    console.error(`[SISTEMA] Component loading failed: ${e.message}`);
  }
}

// Register a custom element if not already registered
function createTagComponent(tagName, basePath) {
  try {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, class extends HTMLElement {
        connectedCallback() {
          cargarComponente(basePath, this);
        }
      });
    }
  } catch (e) {
    console.error(`[SISTEMA] Failed to define component "${tagName}": ${e.message}`);
  }
}

// Global API for all modules
window.Sistema = {
  cargarComponente,
  createTagComponent,
  esperar: ms => new Promise(res => setTimeout(res, ms)),
  log: msg => console.log(`[SISTEMA] ${msg}`),
};


