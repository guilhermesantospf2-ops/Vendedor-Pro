/**
 * VENDEDOR PRO - Interactive Experience Scripts
 * 100+ Frases Prontas para Fechamento de Vendas de Uniformes
 */

document.addEventListener('DOMContentLoaded', () => {
  initObjectionSimulator();
  initRevenueCalculator();
  initCountdownTimer();
  initFaqAccordion();
  initSmoothScroll();
});

/* ==========================================================================
   1. SIMULADOR INTERATIVO DE OBJEÇÕES ("TEST DRIVE DO SCRIPT")
   ========================================================================== */
const objectionsData = [
  {
    id: 'preco-concorrente',
    title: '💸 "O concorrente faz mais barato"',
    customerMsg: 'Gostei do modelo, mas a confecção aqui perto me fez R$ 5 mais barato por camisa. Se você não cobrir o valor, vou fechar com eles.',
    script: '"Entendo perfeitamente seu ponto. Se o foco fosse apenas preço de largada, eles seriam uma opção. Mas me tira uma dúvida rápida: você prefere economizar R$ 5 agora na peça ou evitar que a logo da sua empresa desbote e o tecido torça na 3ª lavagem dos colaboradores? Nós usamos malha penteada com costura dupla reforçada que dura o dobro do tempo. No fim do ano, seu custo real por uso cai pela metade. Vamos rodar o lote com o nosso padrão de durabilidade?"',
    strategy: 'Custo por Uso & Reputação da Marca. Remove o foco do preço pontual e projeta o prejuízo de ter uniformes desbotados e funcionários desleixados.',
    tag: 'Objeção de Preço'
  },
  {
    id: 'vou-ver-diretoria',
    title: '👔 "Vou falar com a diretoria/sócio"',
    customerMsg: 'Ficou ótimo o orçamento. Amanhã tenho reunião com a diretoria, vou levar a proposta e qualquer coisa te aviso!',
    script: '"Perfeito! Para te ajudar a defender o projeto com a diretoria sem você ter que virar especialista em uniformes: qual você acha que vai ser a maior preocupação deles: o prazo para o evento ou a durabilidade do bordado? Eu preparo um mini-resumo executivo de 1 página em PDF com o comparativo de durabilidade e retorno para você só repassar. Posso te mandar agora?"',
    strategy: 'Facilitador de Aprovação & Identificação do Medo Oculto. Transforma o comprador em seu parceiro interno e descobre o verdadeiro ponto de atrito antes da reunião.',
    tag: 'Objeção de Terceiros'
  },
  {
    id: 'cliente-sumiu',
    title: '👻 Cliente visualizou e sumiu no WhatsApp',
    customerMsg: '(Você enviou o orçamento completo de 60 conjuntos há 3 dias. O cliente visualizou, não respondeu e silenciou o contato).',
    script: '"Oi, Carlos, tudo bem? Passando para uma checagem rápida de produção: você conseguiu analisar a cotação das 60 peças ou a renovação dos uniformes precisou ser adiada por aí? Se os planos mudaram, zero problemas! Só me dá um alô para eu liberar a reserva da matéria-prima no corte para o próximo cliente da fila."',
    strategy: 'Desistência Nobre & Escassez de Matéria-Prima. Desarma a pressão de venda, gera alívio no cliente e estimula resposta imediata pelo medo de perder a vez no corte.',
    tag: 'Reativação de Contato'
  },
  {
    id: 'prazo-longo',
    title: '⏱️ "Achei o prazo de 25 dias muito longo"',
    customerMsg: '25 dias úteis? Nossa, achei muito demorado. Preciso disso pronto para a inauguração da nossa nova filial.',
    script: '"Compreendo 100% a urgência da inauguração! Nosso prazo garante conferência peça por peça e bordado computadorizado perfeito sem falhas. Mas me diga: quantas peças são estritamente necessárias no dia da abertura? Conseguimos antecipar uma Remessa de Abertura com 30% do lote em 10 dias e entregar o saldo com tranquilidade. Isso resolve perfeitamente sua data?"',
    strategy: 'Entrega Fracionada de Emergência. Salva a venda sem canibalizar o cronograma produtivo da sua fábrica.',
    tag: 'Objeção de Prazos'
  },
  {
    id: 'poucas-pecas',
    title: '📦 "Só quero 10 peças, faz preço de 100?"',
    customerMsg: 'Minha empresa é enxuta, só preciso de 10 jalecos agora. Consegue me fazer o mesmo preço unitário de quem pede 100?',
    script: '"Para 10 peças o custo de matriz e calibração de maquinário incide de forma mais pesada. Porém, o que a maioria dos nossos clientes desse porte faz: fecham as 10 peças hoje e já deixam programadas mais 15 peças para as contratações do semestre, travando a tabela com o desconto de lote. Vocês têm previsão de contratar até o final do ano? Se sim, já aprovo a condição especial para você agora."',
    strategy: 'Consolidação de Demanda Futura. Aumenta o ticket médio sem prostituir sua margem de lucro.',
    tag: 'Objeção de Quantidade'
  }
];

function initObjectionSimulator() {
  const container = document.getElementById('objectionButtonsContainer');
  const displayTag = document.getElementById('simulatorTag');
  const customerMsg = document.getElementById('simulatorCustomerMsg');
  const scriptText = document.getElementById('simulatorScriptText');
  const scriptWhy = document.getElementById('simulatorScriptWhy');

  if (!container) return;

  // Render buttons
  container.innerHTML = '';
  objectionsData.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.className = `objection-btn ${index === 0 ? 'active' : ''}`;
    btn.setAttribute('data-id', item.id);
    btn.innerHTML = `
      <span>${item.title}</span>
      <span class="chevron">→</span>
    `;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.objection-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadObjection(item);
    });
    container.appendChild(btn);
  });

  // Load initial objection
  loadObjection(objectionsData[0]);

  function loadObjection(item) {
    if (displayTag) displayTag.textContent = item.tag;
    if (customerMsg) {
      customerMsg.style.opacity = '0';
      setTimeout(() => {
        customerMsg.textContent = item.customerMsg;
        customerMsg.style.opacity = '1';
      }, 150);
    }
    if (scriptText) {
      scriptText.style.opacity = '0';
      setTimeout(() => {
        scriptText.textContent = item.script;
        scriptText.style.opacity = '1';
      }, 200);
    }
    if (scriptWhy) {
      scriptWhy.style.opacity = '0';
      setTimeout(() => {
        scriptWhy.innerHTML = `<strong>Por que funciona:</strong> ${item.strategy}`;
        scriptWhy.style.opacity = '1';
      }, 250);
    }
  }
}

/* ==========================================================================
   2. CALCULADORA INTERATIVA DE PERDA DE VENDAS
   ========================================================================== */
function initRevenueCalculator() {
  const sliderQuotes = document.getElementById('sliderQuotes');
  const sliderTicket = document.getElementById('sliderTicket');
  const valQuotes = document.getElementById('valQuotes');
  const valTicket = document.getElementById('valTicket');
  const displayLost = document.getElementById('displayLostMoney');
  const displayRecover = document.getElementById('displayRecoverMoney');

  if (!sliderQuotes || !sliderTicket) return;

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  });

  function updateCalculations() {
    const quotes = parseInt(sliderQuotes.value, 10);
    const ticket = parseInt(sliderTicket.value, 10);

    if (valQuotes) valQuotes.textContent = `${quotes} orçamentos/mês`;
    if (valTicket) valTicket.textContent = currencyFormatter.format(ticket);

    // Média de perda por falta de scripts persuasivos no fechamento: ~40% das oportunidades
    const lostPerMonth = quotes * 0.40 * ticket;
    // Potencial mínimo de recuperação fechando apenas +3 pedidos por mês com o Vendedor Pro
    const recoveredPerMonth = 3 * ticket;

    if (displayLost) {
      displayLost.textContent = currencyFormatter.format(lostPerMonth);
    }
    if (displayRecover) {
      displayRecover.textContent = `+ ${currencyFormatter.format(recoveredPerMonth)} / mês`;
    }
  }

  sliderQuotes.addEventListener('input', updateCalculations);
  sliderTicket.addEventListener('input', updateCalculations);

  // Initial calculation run
  updateCalculations();
}

/* ==========================================================================
   3. TIMER REGRESSIVO DE OFERTA
   ========================================================================== */
function initCountdownTimer() {
  const topTimer = document.getElementById('countdownTop');
  const offerTimer = document.getElementById('countdownOffer');

  let totalSeconds = 14 * 60 + 38; // 14 min 38 seg

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      totalSeconds = 15 * 60; // reset loop for urgency preservation
    }
    const formatted = formatTime(totalSeconds);
    if (topTimer) topTimer.textContent = formatted;
    if (offerTimer) offerTimer.textContent = formatted;
  }, 1000);
}

/* ==========================================================================
   4. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. SMOOTH SCROLL PARA BOTÕES DE CTA
   ========================================================================== */
function initSmoothScroll() {
  const ctaLinks = document.querySelectorAll('a[href^="#"]');

  ctaLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
