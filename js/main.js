const themeBtn = document.getElementById("theme-toggle");
const nav = document.getElementById("nav-links");
const menuBtn = document.getElementById("menu-btn");
const modal = document.getElementById("cite-modal");
const citeBox = document.getElementById("cite-box");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
syncThemeIcon();

themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  syncThemeIcon();
});

function syncThemeIcon() {
  const light = document.documentElement.dataset.theme === "light";
  themeBtn.innerHTML = light ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  themeBtn.setAttribute("aria-label", light ? "切换深色模式" : "切换浅色模式");
}

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...nav.querySelectorAll("a")];
const spy = () => {
  const y = window.scrollY + 90;
  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.offsetTop <= y) current = section.id;
  }
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};
window.addEventListener("scroll", spy, { passive: true });
spy();

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.tab;
    document.querySelectorAll(".tab").forEach((item) => {
      const on = item === btn;
      item.classList.toggle("active", on);
      item.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.hidden = panel.dataset.panel !== key;
    });
  });
});

document.querySelectorAll("[data-cite]").forEach((btn) => {
  btn.addEventListener("click", () => {
    citeBox.textContent = btn.getAttribute("data-cite");
    modal.classList.add("open");
  });
});

document.getElementById("copy-cite").addEventListener("click", async () => {
  await navigator.clipboard.writeText(citeBox.textContent);
  document.getElementById("copy-cite").textContent = "已复制";
  setTimeout(() => {
    document.getElementById("copy-cite").textContent = "复制";
  }, 1200);
});

document.getElementById("close-cite").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.remove("open");
});
