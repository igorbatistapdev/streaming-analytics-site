/* =====================================================================
   CONFIGURAÇÃO — substitua as duas URLs abaixo pelas URLs reais.
   ===================================================================== */
const DASHBOARD_URL = "https://dashboard-streaming.streamlit.app/";
const GITHUB_URL = "https://github.com/igorbatistapdev/dashboard-streaming.git";
/* ===================================================================== */

document.documentElement.classList.add("js");

// Abre a URL configurada em nova aba; avisa se ainda for o texto de exemplo.
function openLink(url, nome) {
  if (!/^https?:\/\//i.test(url)) {
    alert("Configure a URL do " + nome + " no início do arquivo script.js.");
    return;
  }
  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (w) w.opener = null;
}

document.querySelectorAll("[data-open]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const dash = el.dataset.open === "dashboard";
    openLink(dash ? DASHBOARD_URL : GITHUB_URL, dash ? "dashboard" : "GitHub");
  });
});

// Navbar: fundo ao rolar + menu hamburger
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

const onScroll = () => nav.classList.toggle("solid", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

function setMenu(open) {
  menu.classList.toggle("open", open);
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Aparição suave ao rolar
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  items.forEach((el, i) => { el.style.transitionDelay = (i % 3) * 70 + "ms"; io.observe(el); });
} else {
  items.forEach((el) => el.classList.add("in"));
}
