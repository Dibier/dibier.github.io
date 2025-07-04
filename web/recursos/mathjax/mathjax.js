// mathjax.js

(function () {
  // Configuración personalizada de MathJax para los delimitadores
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      packages: { '[+]': ['ams'] }
    },
    loader: { load: ['[tex]/ams'] }
  };

  // Cargar MathJax de manera asíncrona
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
  script.async = true;
  script.onload = function () {
    MathJax.typesetPromise().then(() => {
      console.log("MathJax ha terminado de cargar");
    }).catch(err => {
      console.error("Error al cargar MathJax:", err);
    });
  };
  document.head.appendChild(script);
})();
