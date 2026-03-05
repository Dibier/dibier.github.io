document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------
  // 1. Dark Mode Logic
  // ---------------------------------------------------------
  const toggleButton = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const iconSun = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  const iconMoon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
    if(toggleButton) toggleButton.innerHTML = iconSun;
  } else {
    if(toggleButton) toggleButton.innerHTML = iconMoon;
  }

  // Toggle function
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      
      // Update icon
      toggleButton.innerHTML = isDark ? iconSun : iconMoon;

      // Save preference
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // ---------------------------------------------------------
  // 2. Tag Filtering Logic
  // ---------------------------------------------------------
  const articles = document.querySelectorAll('.entrada');
  const filterContainer = document.getElementById('filter-container');

  if (articles.length > 0 && filterContainer) {
    // Collect unique tags
    const tags = new Set();
    articles.forEach(article => {
      const articleTags = article.getAttribute('data-tags');
      if (articleTags) {
        articleTags.split(' ').forEach(tag => {
          if (tag.trim()) tags.add(tag.trim());
        });
      }
    });

    // Create "All" button
    const allBtn = document.createElement('button');
    allBtn.textContent = 'Todos';
    allBtn.classList.add('filter-btn', 'active');
    allBtn.addEventListener('click', () => filterArticles('all', allBtn));
    filterContainer.appendChild(allBtn);

    // Create buttons for each tag
    tags.forEach(tag => {
      const btn = document.createElement('button');
      // Capitalize first letter for display
      btn.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
      btn.classList.add('filter-btn');
      btn.addEventListener('click', () => filterArticles(tag, btn));
      filterContainer.appendChild(btn);
    });
  }

  function filterArticles(selectedTag, clickedBtn) {
    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');

    // Show/Hide articles
    articles.forEach(article => {
      const articleTags = article.getAttribute('data-tags');
      if (selectedTag === 'all' || (articleTags && articleTags.includes(selectedTag))) {
        article.style.display = ''; // Reset to default (block/flex)
        // Add a small fade-in animation
        article.style.animation = 'fadeIn 0.5s ease';
      } else {
        article.style.display = 'none';
      }
    });
  }
});
