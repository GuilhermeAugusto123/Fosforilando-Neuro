// Arquivo: /calculadoras/csi.js

/**
 * Função principal chamada pelo app.js
 */
function csi() {
    
    // Lista das 25 Perguntas (Versão Brasileira Validada - Caumo et al.)
    const perguntas = [
        "1. Sinto-me cansado e não renovado quando acordo pela manhã.",
        "2. Meus músculos parecem rígidos e doloridos.",
        "3. Tenho crises de ansiedade.",
        "4. Ranjo ou aperto os dentes.",
        "5. Tenho problemas de diarreia e/ou prisão de ventre.",
        "6. Preciso de ajuda para realizar minhas atividades diárias.",
        "7. Sou sensível a luzes fortes.",
        "8. Canso-me facilmente quando estou fisicamente ativo.",
        "9. Tenho dor no corpo todo.",
        "10. Tenho dores de cabeça.",
        "11. Sinto desconforto na bexiga e/ou ardência ao urinar.",
        "12. Não durmo bem.",
        "13. Tenho dificuldade de concentração.",
        "14. Tenho problemas de pele como ressecamento, coceira ou erupções cutâneas.",
        "15. O estresse faz meus sintomas físicos piorarem.",
        "16. Sinto-me triste ou deprimido.",
        "17. Tenho pouca energia.",
        "18. Tenho tensão muscular no pescoço e ombros.",
        "19. Tenho dor na mandíbula.",
        "20. Cheiros fortes, como perfumes, me deixam tonto e/ou nauseado.",
        "21. Preciso urinar com frequência.",
        "22. Minhas pernas ficam desconfortáveis e inquietas quando tento dormir.",
        "23. Tenho dificuldade de me lembrar das coisas.",
        "24. Sofri trauma quando era criança.",
        "25. Tenho dor na região pélvica."
    ];

    // Gera o HTML das perguntas dinamicamente
    let htmlPerguntas = '';
    perguntas.forEach((pergunta, index) => {
        const num = index + 1;
        htmlPerguntas += `
            <div class="grupo-radio" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0;">
                <p style="font-weight: 600; margin-bottom: 10px; color: #444;">${pergunta}</p>
                
                <div class="opcao-radio"><label><input type="radio" name="csi-${num}" value="0" onchange="calcularCSI()" checked><span class="checkmark"></span>(0) Nunca</label></div>
                <div class="opcao-radio"><label><input type="radio" name="csi-${num}" value="1" onchange="calcularCSI()"><span class="checkmark"></span>(1) Raramente</label></div>
                <div class="opcao-radio"><label><input type="radio" name="csi-${num}" value="2" onchange="calcularCSI()"><span class="checkmark"></span>(2) Às vezes</label></div>
                <div class="opcao-radio"><label><input type="radio" name="csi-${num}" value="3" onchange="calcularCSI()"><span class="checkmark"></span>(3) Frequentemente</label></div>
                <div class="opcao-radio"><label><input type="radio" name="csi-${num}" value="4" onchange="calcularCSI()"><span class="checkmark"></span>(4) Sempre</label></div>
            </div>
        `;
    });

    // Monta o layout completo
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>CSI - Inventário de Sensibilização Central</h5>
                    <ul>
                        <li>Responda com que frequência você sente cada sintoma abaixo.</li>
                        <li>Escala de 0 (Nunca) a 4 (Sempre).</li>
                    </ul>
                </div>
                
                ${htmlPerguntas}

            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Resultado CSI</h3>
                    
                    <div class="placar-numero" id="csi-placar-numero">0</div>
                    <div class="placar-classificacao" id="csi-placar-classificacao" style="font-size: 1.1em; margin-top: 15px;">
                        Subclínico
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="csi-placar-detalhe" style="font-size: 0.9em; text-align: center;">
                        CSI: 0/100 (Subclínico)
                    </div>

                </div>
            </div> 

        </div>
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCSI();
    calcularCSI();
}

/**
 * Função de cálculo
 */
function calcularCSI() {
    let total = 0;
    
    // Soma as 25 perguntas
    for (let i = 1; i <= 25; i++) {
        const input = document.querySelector(`input[name="csi-${i}"]:checked`);
        if (input) {
            total += parseInt(input.value);
        }
    }

    // Classificação (Mayer et al., 2012 / Neblett et al., 2013)
    let classificacao = '';
    let cor = '';

    if (total < 30) {
        classificacao = 'Subclínico';
        cor = '#5cb85c'; // Verde
    } else if (total < 40) {
        classificacao = 'Leve';
        cor = '#f0ad4e'; // Laranja claro
    } else if (total < 50) {
        classificacao = 'Moderado';
        cor = '#ff9800'; // Laranja
    } else if (total < 60) {
        classificacao = 'Grave';
        cor = '#d9534f'; // Vermelho
    } else {
        classificacao = 'Extremo';
        cor = '#c9302c'; // Vermelho escuro
    }

    // Nota: Cut-off clínico geralmente é >= 40.
    const sufixo = total >= 40 ? " (Sugestivo de SC)" : "";

    // Exibir resultados
    document.getElementById('csi-placar-numero').innerText = total;
    
    const divClass = document.getElementById('csi-placar-classificacao');
    divClass.innerText = classificacao + sufixo;
    divClass.style.color = cor;
    divClass.style.fontWeight = 'bold';

    document.getElementById('csi-placar-detalhe').innerText = `CSI: ${total}/100 (${classificacao})`;
}

/**
 * Adiciona estilos necessários (reutilizando)
 */
function adicionarEstiloCSI() {
    if (!document.getElementById('edss-style')) {
        const styleCopia = document.createElement('style');
        styleCopia.id = 'edss-style';
        styleCopia.innerHTML = `
            .placar-copia {
                font-size: 0.9em; font-family: 'Courier New', Courier, monospace;
                color: #333; padding: 8px; background-color: #f8f9fa;
                border: 1px dashed #ccc; border-radius: 4px;
                line-height: 1.5; text-align: left;
            }
        `;
        document.head.appendChild(styleCopia);
    }
}