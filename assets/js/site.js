// Hairly — interações do site (sem dependências).

const PRECO_MENSAL = 29.9;
const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

// Borda no topo ao rolar e barra fixa de download no celular.
const topo = document.getElementById("topo");
const barra = document.getElementById("barra-download");
const instalar = document.getElementById("instalar");
const aoRolar = () => {
  topo.classList.toggle("rolou", window.scrollY > 8);
  const noInstalar = instalar.getBoundingClientRect().top < window.innerHeight && instalar.getBoundingClientRect().bottom > 0;
  barra.classList.toggle("mostrar", window.scrollY > 600 && !noInstalar);
};
window.addEventListener("scroll", aoRolar, { passive: true });
aoRolar();

// Elementos aparecem suavemente ao entrar na tela.
const observador = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) {
      if (e.isIntersecting) {
        e.target.classList.add("visivel");
        observador.unobserve(e.target);
      }
    }
  },
  { rootMargin: "0px 0px -8% 0px" },
);
document.querySelectorAll(".revelar").forEach((el) => observador.observe(el));

// Calculadora "o app se paga".
const ticket = document.getElementById("ticket");
const voltas = document.getElementById("voltas");
const atualizarConta = () => {
  const t = Number(ticket.value);
  const v = Number(voltas.value);
  const ganho = t * v;
  document.getElementById("ticket-valor").textContent = brl(t);
  document.getElementById("voltas-valor").textContent = v;
  document.getElementById("resultado").textContent = brl(ganho);
  const vezes = Math.floor(ganho / PRECO_MENSAL);
  document.getElementById("retorno").textContent =
    vezes >= 2 ? `${vezes}× o valor da assinatura` : "já paga a assinatura do mês";
};
ticket.addEventListener("input", atualizarConta);
voltas.addEventListener("input", atualizarConta);
atualizarConta();

// Abas de instalação por marca, com teclado.
const abas = [...document.querySelectorAll('[role="tab"]')];
const selecionar = (aba) => {
  for (const a of abas) {
    const ativa = a === aba;
    a.setAttribute("aria-selected", String(ativa));
    a.tabIndex = ativa ? 0 : -1;
    document.getElementById(a.getAttribute("aria-controls")).hidden = !ativa;
  }
  aba.focus();
};
abas.forEach((aba, i) => {
  aba.addEventListener("click", () => selecionar(aba));
  aba.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") selecionar(abas[(i + 1) % abas.length]);
    if (e.key === "ArrowLeft") selecionar(abas[(i - 1 + abas.length) % abas.length]);
  });
});

// Pré-seleciona a aba da marca do aparelho, quando dá para saber.
const ua = navigator.userAgent.toLowerCase();
const marca = /samsung|sm-/.test(ua) ? "samsung" : /moto|motorola|xt\d/.test(ua) ? "motorola" : /xiaomi|redmi|poco|mi /.test(ua) ? "xiaomi" : null;
if (marca) {
  const aba = document.getElementById(`aba-${marca}`);
  if (aba) {
    for (const a of abas) {
      const ativa = a === aba;
      a.setAttribute("aria-selected", String(ativa));
      a.tabIndex = ativa ? 0 : -1;
      document.getElementById(a.getAttribute("aria-controls")).hidden = !ativa;
    }
  }
}
