// Arquivo: app.js (Versão 2)

// Encontra os elementos principais da página
const palco = document.getElementById('conteudo-calculadora');
const menuPrincipal = document.querySelector('.container-principal'); // <--- Pega o container do menu
let calculadoraAtual = null; // Guarda o nome da calculadora ativa

/**
 * Função MÁGICA, chamada por QUALQUER botão do menu.
 */
function carregarCalculadora(nomeCalculadora) {
    
    // 1. Esconde o menu principal
    menuPrincipal.style.display = 'none';

    // 2. Limpa o palco (remove a calculadora antiga)
    palco.innerHTML = ''; 

    // 3. Chama a função específica da calculadora
    try {
        if (typeof window[nomeCalculadora] === 'function') {
            window[nomeCalculadora]();
            calculadoraAtual = nomeCalculadora; // Guarda o nome
        } else {
            palco.innerHTML = `<p>Erro: A calculadora '${nomeCalculadora}' não foi encontrada.</p>`;
            // Se falhar, mostra o menu de novo
            menuPrincipal.style.display = 'block';
        }
    } catch (error) {
        console.error("Erro ao carregar calculadora:", error);
        palco.innerHTML = `<p>Ocorreu um erro ao tentar carregar esta calculadora.</p>`;
    }
}

/**
 * Injeta o conteúdo HTML no "palco".
 * Agora também adiciona um botão "Voltar".
 */
function injetarConteudo(htmlConteudo) {
    const botaoVoltar = '<button onclick="voltarParaMenu()" class="botao-voltar">&larr; Voltar ao Menu</button>';
    palco.innerHTML = botaoVoltar + htmlConteudo;

    // Rola a tela para o topo
    window.scrollTo(0, 0);
}

/**
 * Função chamada pelo botão "Voltar"
 */
function voltarParaMenu() {
    // 1. Limpa o palco
    palco.innerHTML = '';
    
    // 2. Mostra o menu principal novamente
    menuPrincipal.style.display = 'block';
    
    // 3. Limpa a calculadora atual
    calculadoraAtual = null;
}

// Mensagem de "Pronto"
console.log("NeuroCalc App v2.1 Carregado. (com modo de página única)");