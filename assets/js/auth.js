// Página de reserva dos links de conta (confirmar e-mail, nova senha).
// Quando o Android não abre o Salone direto, repassa o link para o app.
// O código do link só funciona no aparelho que pediu (PKCE); nada é guardado aqui.
(function () {
  var destino = 'salone://auth' + window.location.search + window.location.hash;
  var botao = document.getElementById('abrir');
  if (botao) botao.setAttribute('href', destino);
  if (window.location.search || window.location.hash) window.location.replace(destino);
})();
