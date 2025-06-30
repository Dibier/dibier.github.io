// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('[data-componente]');

  // Escuchar clics en cada enlace del nav
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevenir comportamiento por defecto
      const componente = link.getAttribute('data-componente');
      cargarComponente(componente);
    });
  });

  // Cargar componente por defecto (blog)
  cargarComponente('blog');
});

// Función para cargar un componente
function cargarComponente(nombre) {
  const ruta = `${nombre}/${nombre}.html`;

  fetch(ruta)
    .then(response => {
      if (!response.ok) {
        throw new Error(`No se pudo cargar el componente: ${nombre}`);
      }
      return response.text();
    })
    .then(html => {
      document.querySelector('main').innerHTML = html;

      // Re-renderizar fórmulas si hay MathJax
      if (window.MathJax) {
        MathJax.typesetPromise();
      }
    })
    .catch(error => {
      document.querySelector('main').innerHTML = `<p>Error al cargar ${nombre}.</p>`;
      console.error(error);
    });
}
