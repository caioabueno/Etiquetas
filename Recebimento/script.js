function mascaraData(val) {
  let v = val.value;

  // Remove tudo que não é dígito
  v = v.replace(/\D/g, "");

  // Adiciona a primeira barra
  v = v.replace(/(\d{2})(\d)/, "$1/$2");

  // Adiciona a segunda barra
  v = v.replace(/(\d{2})(\d)/, "$1/$2");

  val.value = v;
}

function getTodayFormatted() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}

// Controla o comportamento do Checkbox de Data
function toggleDateMode() {
  const chk = document.getElementById('chkHoje');
  const input = document.getElementById('inRec');

  if (chk.checked) {
    input.value = getTodayFormatted();
    input.disabled = true; // Bloqueia edição
  } else {
    input.disabled = false; // Libera edição
    input.focus();
  }
  updateLabel();
}

function updateLabel() {
  // Inputs Simples
  document.getElementById('outProd').innerText = document.getElementById('inProd').value;
  document.getElementById('outQtd').innerText = document.getElementById('inQtd').value;
  document.getElementById('outVal').innerText = document.getElementById('inVal').value;
  document.getElementById('outRec').innerText = document.getElementById('inRec').value;
  document.getElementById('outForn').innerText = document.getElementById('inForn').value;
  document.getElementById('outRefItem').innerText = document.getElementById('inRefItem').value;
  document.getElementById('outConf').innerText = document.getElementById('inConf').value.toUpperCase();

  // Ajuste automático de fonte do Produto
  const prodName = document.getElementById('inProd').value;
  const prodEl = document.getElementById('outProd');

  // Lógica simples de redimensionamento
  if (prodName.length > 30) {
    prodEl.style.fontSize = "5rem";
  } else if (prodName.length > 20) {
    prodEl.style.fontSize = "5.5rem";
  } else {
    prodEl.style.fontSize = "6rem";
  }
}
// Roda uma vez ao carregar para garantir que o select inicial apareça
window.onload = updateLabel;