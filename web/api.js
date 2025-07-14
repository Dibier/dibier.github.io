async function iniciarSitio() {
  await cargarComponente("web/navegador", "nav");
  await cargarComponente("web/pie", "footer");
  await cargarComponente("web/contenido/blog", "main");
}

iniciarSitio();
