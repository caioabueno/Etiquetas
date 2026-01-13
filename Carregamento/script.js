
let pedidos = [];

// Inicializa data
const hoje = new Date();
document.getElementById('dataHoje').innerText = `${hoje.getDate()}/${hoje.getMonth() + 1}/${hoje.getFullYear()}`;

function handleEnter(e) {
  if (e.key === 'Enter') adicionarPedido();
}

function adicionarPedido() {
  const cliente = document.getElementById('inCliente').value.toUpperCase();
  const qtd = parseInt(document.getElementById('inQtd').value);

  if (!cliente || !qtd) {
    alert("Preencha o cliente e a quantidade!");
    return;
  }

  // Adiciona ao array
  pedidos.push({ cliente, qtd });

  // Limpa inputs e foca no cliente para o próximo
  document.getElementById('inCliente').value = "";
  document.getElementById('inQtd').value = "";
  document.getElementById('inCliente').focus();

  renderizar();
}

function renderizar() {
  const tbody = document.getElementById('tabelaBody');
  const miniList = document.getElementById('miniList');
  const totalEl = document.getElementById('totalVol');

  tbody.innerHTML = "";
  miniList.innerHTML = "";
  let total = 0;

  // Renderiza na Etiqueta (Tabela)
  pedidos.forEach((p, index) => {
    total += p.qtd;

    // Linha na Etiqueta
    const tr = document.createElement('tr');
    tr.innerHTML = `
                    <td class="row-cliente">${p.cliente}</td>
                    <td class="row-vol">${p.qtd}</td>
                `;
    tbody.appendChild(tr);

    // Linha no Painel (Mini lista com botão de remover)
    const miniItem = document.createElement('div');
    miniItem.className = 'mini-item';
    miniItem.innerHTML = `
                    <span>${p.cliente} (${p.qtd})</span>
                    <button onclick="removerPedido(${index})">X</button>
                `;
    miniList.appendChild(miniItem);
  });

  //usar para totalizador se voltar a utilizar
  // totalEl.innerText = total;

  // --- LÓGICA DE AUTO-RESIZE ---
  ajustarFonte();
}

function removerPedido(index) {
  pedidos.splice(index, 1);
  renderizar();
}

function limparTudo() {
  if (confirm("Tem certeza que quer limpar toda a lista?")) {
    pedidos = [];
    renderizar();
  }
}

// Função Mágica: Ajusta o tamanho da fonte para caber no container
function ajustarFonte() {
  const container = document.getElementById('listaContainer');
  const table = document.getElementById('tabelaPedidos');
  const linhasCliente = document.querySelectorAll('.row-cliente');
  const linhasVol = document.querySelectorAll('.row-vol');

  // 1. Reseta para um tamanho grande inicial
  let fontSize = 4.0; // Começa com 4rem
  aplicarFonte(fontSize);

  // 2. Enquanto a tabela for maior que o container, diminui a fonte
  // container.clientHeight = altura disponível
  // table.scrollHeight = altura que o conteúdo quer ocupar
  while (table.scrollHeight > container.clientHeight && fontSize > 0.5) {
    fontSize -= 0.1; // Diminui de 0.1 em 0.1
    aplicarFonte(fontSize);
  }
}

function aplicarFonte(size) {
  const linhasCliente = document.querySelectorAll('.row-cliente');
  const linhasVol = document.querySelectorAll('.row-vol');

  linhasCliente.forEach(el => el.style.fontSize = size + "rem");
  linhasVol.forEach(el => el.style.fontSize = size + "rem");
}
