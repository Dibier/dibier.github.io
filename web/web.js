async function iniciarSitio() {
  await cargarComponente("web/navegador/navegador", "nav");
  await cargarComponente("web/pie/pie", "footer");
  await cargarComponente("web/contenido/blog/blog", "main");
}

iniciarSitio();
