(function () {
  const themes = ["dark", "light", "ocean", "purple"];
  const icons = { dark: "🌙", light: "☀️", ocean: "🌊", purple: "💜" };
  const labels = {
    dark: "Dark",
    light: "Light",
    ocean: "Ocean",
    purple: "Purple",
  };

  const toggleBtn = document.getElementById("theme-toggle-btn");
  const menu = document.getElementById("theme-menu");

  menu.style.cssText = `
    display: none;
    flex-direction: column;
    gap: 8px;
    position: fixed;
    top: 30%;
    right: 55px;
    z-index: 9999999999999999;
  `;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(-10px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    #theme-menu { animation: fadeIn 0.25s ease; }
    .fa-gear { transition: transform 0.5s ease !important; }
    .gear-open { transform: rotate(90deg) !important; }
  `;
  document.head.appendChild(style);

  themes.forEach(theme => {
    const btn = document.createElement("button");
    btn.dataset.theme = theme;
    btn.innerHTML = `${icons[theme]} ${labels[theme]}`;
    btn.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 9999px;
      border: 2px solid transparent;
      background: rgba(30, 40, 60, 0.95);
      color: #f2f4fa;
      font-family: 'Cairo', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      backdrop-filter: blur(8px);
      transition: all 0.3s ease;
      white-space: nowrap;
    `;

    btn.addEventListener("click", () => {
      applyTheme(theme);
      closeMenu();
    });
    btn.addEventListener(
      "mouseenter",
      () => (btn.style.background = "rgba(126,96,244,0.5)"),
    );
    btn.addEventListener("mouseleave", () => updateActiveStyle());

    menu.appendChild(btn);
  });

  let isOpen = false;
  const gearIcon = toggleBtn.querySelector(".fa-gear");

  toggleBtn.addEventListener("click", e => {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });

  function openMenu() {
    isOpen = true;
    menu.style.display = "flex";
    gearIcon.classList.add("gear-open");
  }

  function closeMenu() {
    isOpen = false;
    menu.style.display = "none";
    gearIcon.classList.remove("gear-open");
  }

  document.addEventListener("click", e => {
    if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
    updateActiveStyle();
  }

  function updateActiveStyle() {
    const current = document.documentElement.getAttribute("data-theme");
    menu.querySelectorAll("button").forEach(btn => {
      btn.style.border =
        btn.dataset.theme === current
          ? "2px solid #7e60f4"
          : "2px solid transparent";
      btn.style.background =
        btn.dataset.theme === current
          ? "rgba(126,96,244,0.35)"
          : "rgba(30, 40, 60, 0.95)";
    });
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
    updateActiveStyle();
  }
  const saved = localStorage.getItem("portfolio-theme") || "dark";
  applyTheme(saved);
})();
