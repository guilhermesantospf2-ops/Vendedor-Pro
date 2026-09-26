/**
 * VENDEDOR PRO - PERSUASIVE DIRECT RESPONSE ENGINE
 * Live Sales Popups | WhatsApp Voice Simulator | Interactive Calculators
 */

function initApp() {
  try { initHeroVideo(); } catch (e) { console.error('Hero video error:', e); }
  try { initCountdownTimer(); } catch (e) { console.error('Timer error:', e); }
  try { initLiveSalesToasts(); } catch (e) { console.error('Toast error:', e); }
  try { initObjectionSimulator(); } catch (e) { console.error('Simulator error:', e); }
  try { initRevenueCalculator(); } catch (e) { console.error('Calculator error:', e); }
  try { initStickyBuyBar(); } catch (e) { console.error('Sticky bar error:', e); }
  try { initFaqAccordion(); } catch (e) { console.error('FAQ error:', e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* ==========================================================================
   1. LIVE SALES NOTIFICATION TOASTS (FOMO & SOCIAL VALIDATION TRIGGER)
   ========================================================================== */
const recentSales = [
  { name: 'Marcos R.', city: 'Americana - SP', item: 'Vendedor Pro + 4 Bônus', time: 'há 2 minutos' },
  { name: 'Confecção Santa Fé', city: 'Brusque - SC', item: 'Vendedor Pro Completo', time: 'há 4 minutos' },
  { name: 'Juliana P.', city: 'Franca - SP', item: 'Vendedor Pro + 4 Bônus', time: 'há 7 minutos' },
  { name: 'Têxtil Minas', city: 'Belo Horizonte - MG', item: 'Vendedor Pro Completo', time: 'há 9 minutos' },
  { name: 'Rodrigo B.', city: 'Blumenau - SC', item: 'Vendedor Pro + 4 Bônus', time: 'há 11 minutos' },
  { name: 'Eduardo M.', city: 'Goiânia - GO', item: 'Vendedor Pro Completo', time: 'há 14 minutos' },
  { name: 'Ana Carolina S.', city: 'Caxias do Sul - RS', item: 'Vendedor Pro + 4 Bônus', time: 'há 17 minutos' }
];

function initLiveSalesToasts() {
  const toastEl = document.getElementById('liveSalesToast');
  const toastName = document.getElementById('toastName');
  const toastCity = document.getElementById('toastCity');
  const toastItem = document.getElementById('toastItem');
  const toastTime = document.getElementById('toastTime');

  if (!toastEl) return;

  let currentIndex = 0;

  function showNextToast() {
    const sale = recentSales[currentIndex];
    if (toastName) toastName.textContent = sale.name;
    if (toastCity) toastCity.textContent = `de ${sale.city}`;
    if (toastItem) toastItem.textContent = sale.item;
    if (toastTime) toastTime.textContent = sale.time;

    toastEl.classList.add('show');

    // Hide after 4.5 seconds
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 4500);

    currentIndex = (currentIndex + 1) % recentSales.length;
  }

  // First trigger after 4 seconds, then repeat every 11 seconds
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 11000);
  }, 4000);
}


/* ==========================================================================
   3. SIMULADOR DE OBJEÇÕES DO MERCADO TÊXTIL
   ========================================================================== */
const objectionsData = [
  {
    id: 'preco-concorrente',
    title: '💸 "O concorrente faz R$ 5 mais barato"',
    customerMsg: 'Gostei da proposta, mas a outra confecção me fez R$ 5 mais barato por camisa polo. Se não cobrir o valor, vou fechar lá.',
    script: '"Entendo perfeitamente, Roberto. Inclusive, se o foco fosse apenas preço de largada, eles seriam uma opção. Mas me tira uma dúvida rápida: você prefere economizar R$ 5 agora na peça ou evitar que a logo da sua empresa desbote e a costura torça na 3ª lavagem dos funcionários? Nós usamos malha penteada com costura dupla reforçada que dura o dobro do tempo. No final do ano, seu custo real por uso cai pela metade. Vamos garantir o lote com o nosso padrão de durabilidade?"',
    strategy: 'Custo por Uso & Reputação da Marca. Remove o foco do centavo pontual e projeta a vergonha de ter uniformes desbotados em menos de 60 dias.',
    tag: 'Objeção de Preço'
  },
  {
    id: 'vou-ver-diretoria',
    title: '👔 "Vou falar com a diretoria e te aviso"',
    customerMsg: 'Ficou ótimo o orçamento dos 80 conjuntos. Amanhã tenho reunião com a diretoria, vou apresentar a proposta e qualquer coisa te aviso!',
    script: '"Perfeito! Para te ajudar a defender o projeto com a diretoria sem você ter que virar especialista em uniformes: qual você acha que vai ser a maior preocupação deles: o prazo para o evento ou o padrão de durabilidade do bordado? Eu preparo um mini-resumo executivo de 1 página em PDF com o comparativo de retorno para você só repassar. Posso te mandar agora?"',
    strategy: 'Facilitador de Aprovação & Identificação do Medo Oculto. Transforma o comprador em seu parceiro interno e descobre o verdadeiro ponto de atrito antes da reunião.',
    tag: 'Objeção de Terceiros'
  },
  {
    id: 'cliente-sumiu',
    title: '👻 Cliente visualizou e sumiu no WhatsApp',
    customerMsg: '(Você enviou o orçamento completo de 60 uniformes há 3 dias. O cliente visualizou, não respondeu e silenciou a conversa).',
    script: '"Oi, Carlos, tudo bem? Passando para uma checagem rápida de produção: você conseguiu avaliar a proposta das 60 peças ou o projeto dos uniformes precisou ser adiado por aí? Se os planos mudaram, zero problemas! Só me dá um alô para eu liberar a reserva da matéria-prima no corte para o próximo cliente da fila."',
    strategy: 'Desistência Nobre & Escassez de Matéria-Prima. Desarma a pressão comercial, gera alívio no cliente e estimula resposta imediata pelo receio de perder o lote reservado.',
    tag: 'Reativação de Contato'
  },
  {
    id: 'prazo-longo',
    title: '⏱️ "Achei o prazo de 25 dias muito longo"',
    customerMsg: '25 dias úteis? Achei muito tempo! Preciso disso pronto para a inauguração da nossa filial no dia 15.',
    script: '"Compreendo 100% a urgência da inauguração! Nosso prazo garante conferência peça por peça e bordado computadorizado perfeito sem defeitos. Mas me diga: quantas peças são estritamente necessárias no dia da abertura? Conseguimos antecipar uma Remessa de Abertura com 30% do lote em 10 dias e entregar o saldo no cronograma padrão. Isso resolve perfeitamente sua data?"',
    strategy: 'Entrega Fracionada de Emergência. Salva a venda sem canibalizar o cronograma produtivo da sua fábrica.',
    tag: 'Objeção de Prazos'
  },
  {
    id: 'poucas-pecas',
    title: '📦 "Só quero 10 peças, faz preço de 100?"',
    customerMsg: 'Minha empresa é pequena, só preciso de 10 camisas agora. Consegue me fazer o mesmo preço unitário de quem pede 100?',
    script: '"Para 10 peças o custo de matriz e calibração de maquinário incide de forma concentrada. Porém, o que a maioria dos clientes do seu porte faz: fecham as 10 peças hoje e já deixam programadas mais 15 peças para as contratações do trimestre, travando a tabela com o desconto de lote. Vocês têm previsão de contratar até o final do ano? Se sim, já aprovo a condição especial para você agora."',
    strategy: 'Consolidação de Demanda Futura. Aumenta o volume e o ticket médio sem prostituir sua margem de lucro.',
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

  const buttons = container.querySelectorAll('.sim-btn');
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const item = objectionsData[index] || objectionsData.find(d => d.id === btn.getAttribute('data-id'));
      if (item) loadObjection(item);
    });
  });

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
   4. CALCULADORA DE PREJUÍZO VS. INVESTIMENTO DE R$ 47
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

    const lostPerMonth = quotes * 0.40 * ticket;
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
  updateCalculations();
}

/* ==========================================================================
   5. TIMER REGRESSIVO PERSISTENTE (NÃO RESETA NO F5)
   ========================================================================== */
function initCountdownTimer() {
  const STORAGE_KEY = 'vendedor_pro_timer_v5';
  const DURATION_MS = (14 * 60 + 32) * 1000; // 14 min 32 seg

  function getStoredEndTime() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const val = parseInt(stored, 10);
        if (!isNaN(val) && val > Date.now()) {
          return val;
        }
      }
    } catch (e) {}
    return null;
  }

  function setStoredEndTime(time) {
    try { localStorage.setItem(STORAGE_KEY, time.toString()); } catch (e) {}
    try { sessionStorage.setItem(STORAGE_KEY, time.toString()); } catch (e) {}
  }

  let endTime = getStoredEndTime();
  const now = Date.now();

  // Se não existir ou se já tiver expirado, inicia uma nova contagem
  if (!endTime || now >= endTime) {
    endTime = now + DURATION_MS;
    setStoredEndTime(endTime);
  }

  function pad(num) {
    return num.toString().padStart(2, '0');
  }

  function tick() {
    let diff = endTime - Date.now();

    // Se zerar, renova o ciclo suavemente para nunca travar congelado em 00:00
    if (diff <= 0) {
      endTime = Date.now() + DURATION_MS;
      setStoredEndTime(endTime);
      diff = DURATION_MS;
    }

    const totalSeconds = Math.max(0, Math.floor(diff / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formatted = `${pad(minutes)}:${pad(seconds)}`;

    const topTimer = document.getElementById('countdownTop');
    const offerTimer = document.getElementById('countdownOffer');
    const stickyTimer = document.getElementById('countdownSticky');

    if (topTimer) topTimer.textContent = formatted;
    if (offerTimer) offerTimer.textContent = formatted;
    if (stickyTimer) stickyTimer.textContent = formatted;
  }

  // Executa imediatamente para atualizar os números na tela
  tick();
  // Atualiza a cada 1 segundo (1000ms)
  setInterval(tick, 1000);
}

/* ==========================================================================
   6. STICKY BOTTOM BUY BAR
   ========================================================================== */
function initStickyBuyBar() {
  const bar = document.getElementById('stickyBuyBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      bar.classList.add('visible');
    } else {
      bar.classList.remove('visible');
    }
  });
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. HERO VSL VIDEO CONTROLLER (AUTOPLAY & SEAMLESS UNMUTE)
   ========================================================================== */
function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  const unmuteBtn = document.getElementById('videoUnmuteBtn');
  if (!video) return;

  // Garante autoplay imediato iniciando mudo (política universal dos navegadores)
  video.muted = true;
  
  const attemptPlay = () => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Se as políticas do navegador bloquearem até o vídeo mudo, inicia no primeiro toque/clique
        const forcePlayOnInteraction = () => {
          video.play();
          document.removeEventListener('click', forcePlayOnInteraction);
          document.removeEventListener('touchstart', forcePlayOnInteraction);
        };
        document.addEventListener('click', forcePlayOnInteraction, { once: true });
        document.addEventListener('touchstart', forcePlayOnInteraction, { once: true });
      });
    }
  };

  attemptPlay();

  // Ativação de áudio fluida
  if (unmuteBtn) {
    unmuteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = false;
      video.volume = 1.0;
      unmuteBtn.style.opacity = '0';
      setTimeout(() => {
        unmuteBtn.style.display = 'none';
      }, 250);
      video.play();
    });

    // Se o usuário clicar nos controles nativos e tirar o mudo
    video.addEventListener('volumechange', () => {
      if (!video.muted && video.volume > 0) {
        unmuteBtn.style.opacity = '0';
        setTimeout(() => {
          unmuteBtn.style.display = 'none';
        }, 250);
      }
    });
  }
}

