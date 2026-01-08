// Arquivo: /calculadoras/gad7.js

/**
 * Função principal chamada pelo app.js
 */
function gad7() {
    
    // As 7 Perguntas do GAD-7
    const perguntas = [
        "1. Sentir-se nervoso(a), ansioso(a) ou muito tenso(a).",
        "2. Não ser capaz de impedir ou de controlar as preocupações.",
        "3. Preocupar-se muito com diversas coisas.",
        "4. Dificuldade para relaxar.",
        "5. Ficar tão agitado(a) que se torna difícil permanecer sentado(a).",
        "6. Ficar facilmente aborrecido(a) ou irritado(a).",
        "7. Sentir medo como se algo horrível fosse acontecer."
    ];

    // Gera o HTML das perguntas
    let htmlPerguntas = '';
    perguntas.forEach((pergunta, index) => {
        const num = index + 1;
        htmlPerguntas += `
            <div class="grupo-radio" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0;">
                <p style="font-weight: 600; margin-bottom: 10px; color: #444;">${pergunta}</p>
                
                <div class="opcao-radio"><label><input type="radio" name="gad-${num}" value="0" onchange="calcularGAD7()" checked><span class="checkmark"></span>(0) Nenhuma vez</label></div>
                <div class="opcao-radio"><label><input type="radio" name="gad-${num}" value="1" onchange="calcularGAD7()"><span class="checkmark"></span>(1) Vários dias</label></div>
                <div class="opcao-radio"><label><input type="radio" name="gad-${num}" value="2" onchange="calcularGAD7()"><span class="checkmark"></span>(2) Mais da metade dos dias</label></div>
                <div class="opcao-radio"><label><input type="radio" name="gad-${num}" value="3" onchange="calcularGAD7()"><span class="checkmark"></span>(3) Quase todos os dias</label></div>
            </div>
        `;
    });

    // Layout
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>GAD-7 (Ansiedade Generalizada)</h5>
                    <p>Durante as <strong>duas últimas semanas</strong>, com que frequência você foi incomodado(a) pelos problemas abaixo?</p>
                </div>
                
                ${htmlPerguntas}
            </div>

            <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Escore GAD-7</h3>
                    
                    <div class="placar-numero" id="gad-placar-numero">0</div>
                    <div class="placar-classificacao" id="gad-placar-classificacao" style="font-size: 1.1em; margin-top: 15px;">
                        Ansiedade Mínima
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo:</h4>
                    <div class="placar-copia" id="gad-placar-detalhe" style="font-size: 0.9em; text-align: center;">
                        GAD-7: 0/21 (Mínima)
                    </div>

                </div>
            </div> 
        </div>
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloGAD();
    calcularGAD7();
}

/**
 * Função de cálculo
 */
function calcularGAD7() {
    let total = 0;
    
    for (let i = 1; i <= 7; i++) {
        const input = document.querySelector(`input[name="gad-${i}"]:checked`);
        if (input) total += parseInt(input.value);
    }

    // Classificação (Spitzer et al.)
    let classificacao = '';
    let cor = '';

    if (total <= 4) {
        classificacao = 'Ansiedade Mínima';
        cor = '#5cb85c'; // Verde
    } else if (total <= 9) {
        classificacao = 'Ansiedade Leve';
        cor = '#f0ad4e'; // Amarelo/Laranja
    } else if (total <= 14) {
        classificacao = 'Ansiedade Moderada';
        cor = '#ff9800'; // Laranja
    } else {
        classificacao = 'Ansiedade Grave';
        cor = '#d9534f'; // Vermelho
    }

    // Exibir
    document.getElementById('gad-placar-numero').innerText = total;
    
    const divClass = document.getElementById('gad-placar-classificacao');
    divClass.innerText = classificacao;
    divClass.style.color = cor;
    divClass.style.fontWeight = 'bold';

    document.getElementById('gad-placar-detalhe').innerText = `GAD-7: ${total}/21 (${classificacao})`;
}

/**
 * Estilos auxiliares
 */
function adicionarEstiloGAD() {
    if (!document.getElementById('gad-style')) {
        const style = document.createElement('style');
        style.id = 'gad-style';
        style.innerHTML = `
            .placar-copia {
                font-size: 0.9em; font-family: 'Courier New', Courier, monospace;
                color: #333; padding: 8px; background-color: #f8f9fa;
                border: 1px dashed #ccc; border-radius: 4px;
                line-height: 1.5; text-align: left;
            }
        `;
        document.head.appendChild(style);
    }
}