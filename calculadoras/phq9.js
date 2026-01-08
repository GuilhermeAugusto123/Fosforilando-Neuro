// Arquivo: /calculadoras/phq9.js

/**
 * Função principal chamada pelo app.js
 */
function phq9() {
    
    // As 9 Perguntas do PHQ-9 (DSM-IV)
    const perguntas = [
        "1. Ter pouco interesse ou prazer em fazer as coisas.",
        "2. Sentir-se 'pra baixo', deprimido(a) ou sem perspectiva.",
        "3. Dificuldade para adormecer, permanecer dormindo ou dormir demais.",
        "4. Sentir-se cansado(a) ou com pouca energia.",
        "5. Ter pouco apetite ou comer em excesso.",
        "6. Sentir-se mal consigo mesmo(a) — ou achar que é um fracasso ou que decepcionou sua família ou a você mesmo(a).",
        "7. Dificuldade para se concentrar nas coisas, como ler o jornal ou ver televisão.",
        "8. Mover-se ou falar tão devagar que outras pessoas poderiam ter notado? Ou o oposto — estar tão agitado(a) ou inquieto(a) que você anda de um lado para o outro muito mais do que de costume.",
        "9. Pensar em se ferir de alguma maneira ou que seria melhor estar morto(a)."
    ];

    // Gera o HTML das perguntas dinamicamente
    let htmlPerguntas = '';
    perguntas.forEach((pergunta, index) => {
        const num = index + 1;
        // Alerta visual para a pergunta 9 (risco de suicídio)
        const estiloExtra = num === 9 ? "border-left: 4px solid #d9534f; padding-left: 10px;" : "";
        
        htmlPerguntas += `
            <div class="grupo-radio" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0; ${estiloExtra}">
                <p style="font-weight: 600; margin-bottom: 10px; color: #444;">${pergunta}</p>
                
                <div class="opcao-radio"><label><input type="radio" name="phq-${num}" value="0" onchange="calcularPHQ9()" checked><span class="checkmark"></span>(0) Nenhuma vez</label></div>
                <div class="opcao-radio"><label><input type="radio" name="phq-${num}" value="1" onchange="calcularPHQ9()"><span class="checkmark"></span>(1) Vários dias</label></div>
                <div class="opcao-radio"><label><input type="radio" name="phq-${num}" value="2" onchange="calcularPHQ9()"><span class="checkmark"></span>(2) Mais da metade dos dias</label></div>
                <div class="opcao-radio"><label><input type="radio" name="phq-${num}" value="3" onchange="calcularPHQ9()"><span class="checkmark"></span>(3) Quase todos os dias</label></div>
            </div>
        `;
    });

    // Layout
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>PHQ-9 (Depressão)</h5>
                    <p>Durante as <strong>duas últimas semanas</strong>, com que frequência você foi incomodado(a) pelos problemas abaixo?</p>
                </div>
                
                ${htmlPerguntas}
            </div>

            <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Escore PHQ-9</h3>
                    
                    <div class="placar-numero" id="phq-placar-numero">0</div>
                    <div class="placar-classificacao" id="phq-placar-classificacao" style="font-size: 1.1em; margin-top: 15px;">
                        Sem Depressão
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo:</h4>
                    <div class="placar-copia" id="phq-placar-detalhe" style="font-size: 0.9em; text-align: center;">
                        PHQ-9: 0/27 (Sem Depressão)
                    </div>
                    
                    <div id="alerta-suicidio" style="display:none; margin-top:15px; color: #d9534f; font-weight:bold; font-size:0.9em; border: 1px solid #d9534f; padding: 10px; border-radius: 5px; background: #fff5f5;">
                        ⚠ ATENÇÃO: Item 9 positivo. Avaliar risco de suicídio imediatamente.
                    </div>

                </div>
            </div> 
        </div>
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloPHQ();
    calcularPHQ9();
}

/**
 * Função de cálculo
 */
function calcularPHQ9() {
    let total = 0;
    let item9 = 0; // Variável para monitorar o item de suicídio
    
    for (let i = 1; i <= 9; i++) {
        const input = document.querySelector(`input[name="phq-${i}"]:checked`);
        if (input) {
            const val = parseInt(input.value);
            total += val;
            if (i === 9) item9 = val; // Captura valor do item 9
        }
    }

    // Classificação (Kroenke et al.)
    let classificacao = '';
    let cor = '';

    if (total <= 4) {
        classificacao = 'Nenhuma / Mínima';
        cor = '#5cb85c'; // Verde
    } else if (total <= 9) {
        classificacao = 'Depressão Leve';
        cor = '#f0ad4e'; // Amarelo/Laranja
    } else if (total <= 14) {
        classificacao = 'Depressão Moderada';
        cor = '#ff9800'; // Laranja
    } else if (total <= 19) {
        classificacao = 'Depressão Moderadamente Grave';
        cor = '#d9534f'; // Vermelho Claro
    } else {
        classificacao = 'Depressão Grave';
        cor = '#c9302c'; // Vermelho Escuro
    }

    // Exibir
    document.getElementById('phq-placar-numero').innerText = total;
    
    const divClass = document.getElementById('phq-placar-classificacao');
    divClass.innerText = classificacao;
    divClass.style.color = cor;
    divClass.style.fontWeight = 'bold';

    document.getElementById('phq-placar-detalhe').innerText = `PHQ-9: ${total}/27 (${classificacao})`;

    // Lógica de Alerta de Suicídio (Item 9 > 0)
    const boxAlerta = document.getElementById('alerta-suicidio');
    if (item9 > 0) {
        boxAlerta.style.display = 'block';
    } else {
        boxAlerta.style.display = 'none';
    }
}

/**
 * Estilos auxiliares
 */
function adicionarEstiloPHQ() {
    if (!document.getElementById('phq-style')) {
        const style = document.createElement('style');
        style.id = 'phq-style';
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