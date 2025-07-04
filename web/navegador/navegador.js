function activarEnlaceActivo(nombre) {
  const enlaces = document.querySelectorAll('a[data-componente]');
  enlaces.forEach(link => {
    if (link.dataset.componente === nombre) {
      link.classList.add('activo');
    } else {
      link.classList.remove('activo');
    }
  });
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-componente]");
  if (!link) return;

  e.preventDefault();
  const nombre = link.dataset.componente;

  Sistema.cargarComponente(`web/contenido/${nombre}/${nombre}`, "main");
  location.hash = nombre;
  activarEnlaceActivo(nombre);
});

// Escuchar el evento personalizado para activar el enlace inicial
document.addEventListener("activar-enlace-inicial", (e) => {
  activarEnlaceActivo(e.detail);
});
