(function () {
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        packages: { '[+]': ['ams'] }
      },
      loader: { load: ['[tex]/ams'] },
      startup: {
        ready: () => {
          console.log("MathJax listo");
          MathJax.startup.defaultReady();
          MathJax.typesetPromise();  // Renderiza lo que haya inicialmente
        }
      }
    };

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    document.head.appendChild(script);
  })();