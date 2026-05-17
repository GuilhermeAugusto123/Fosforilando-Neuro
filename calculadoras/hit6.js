// Arquivo: /calculadoras/hit6.js

function hit6Score() {
    // 6 Itens do HIT-6
    const questoesHit6 = [
        { id: "q1", titulo: "1. Quando você tem dor de cabeça, com que frequência a dor é forte?" },
        { id: "q2", titulo: "2. Com que frequência as dores de cabeça limitam sua capacidade de realizar suas atividades diárias habituais, incluindo cuidar da casa, trabalho, estudos, ou atividades sociais?" },
        { id: "q3", titulo: "3. Quando você tem dor de cabeça, com que frequência você gostaria de poder se deitar para descansar?" },
        { id: "q4", titulo: "4. Durante as últimas 4 semanas, com que frequência você se sentiu cansado(a) demais para trabalhar ou para realizar suas atividades diárias, por causa de suas dores de cabeça?" },
        { id: "q5", titulo: "5. Durante as últimas 4 semanas, com que frequência você sentiu que não estava mais aguentando ou se sentiu irritado(a) por causa de suas dores de cabeça?" },
        { id: "q6", titulo: "6. Durante as últimas 4 semanas, com que frequência suas dores de cabeça limitaram sua capacidade de se concentrar em seu trabalho ou em suas atividades diárias?" }
    ];

    let htmlPerguntas = "";

    questoesHit6.forEach((q) => {
        htmlPerguntas += `
            <div class="grupo-radio" style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px dashed #eee;">
                <h4 style="font-size: 0.95rem; color: #333; margin-bottom: 10px;">${q.titulo}</h4>
                <div class="opcao-radio" style="display: inline-block; margin-right: 15px;">
                    <label>
                        <input type="radio" name="hit6_${q.id}" value="6" onchange="calcularHit6()">
                        <span class="checkmark"></span>Nunca (6)
                    </label>
                </div>
                <div class="opcao-radio" style="display: inline-block; margin-right: 15px;">
                    <label>
                        <input type="radio" name="hit6_${q.id}" value="8" onchange="calcularHit6()">
                        <span class="checkmark"></span>Raramente (8)
                    </label>
                </div>
                <div class="opcao-radio" style="display: inline-block; margin-right: 15px;">
                    <label>
                        <input type="radio" name="hit6_${q.id}" value="10" onchange="calcularHit6()">
                        <span class="checkmark"></span>Às vezes (10)
                    </label>
                </div>
                <div class="opcao-radio" style="display: inline-block; margin-right: 15px;">
                    <label>
                        <input type="radio" name="hit6_${q.id}" value="11" onchange="calcularHit6()">
                        <span class="checkmark"></span>Com muita frequência (11)
                    </label>
                </div>
                <div class="opcao-radio" style="display: inline-block;">
                    <label>
                        <input type="radio" name="hit6_${q.id}" value="13" onchange="calcularHit6()">
                        <span class="checkmark"></span>Sempre (13)
                    </label>
                </div>
            </div>
        `;
    });

    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Teste de Impacto da Dor de Cabeça (HIT-6™)</h5>
                    <ul>
                        <li>Avalia o impacto da cefaleia nas atividades diárias e bem-estar (últimas 4 semanas).</li>
                        <li><strong>Pontuação:</strong> Varia de 36 a 78 pontos.</li>
                        <li>Responda todas as perguntas para obter o resultado.</li>
                    </ul>
                </div>
                ${htmlPerguntas}
            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="hit6-resultado-box">
                    <h3>Escore HIT-6</h3>
                    
                    <div style="margin-top: 20px;">
                        <div class="placar-numero" id="hit6-placar-numero" style="font-size: 4rem; margin: 10px 0; color: #ccc; line-height: 1;">--</div>
                        <div style="font-size: 1.1em; color: #666; line-height: 1.4; padding: 0 10px; font-weight: bold;" id="hit6-grau-texto">
                            Aguardando respostas...
                        </div>
                    </div>

                    <h4 style="margin-top: 30px; margin-bottom: 5px; color: #333; font-size: 0.9em;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="hit6-placar-detalhe" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                    </div>
                </div>
            </div> 
        </div> 
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCopiaHit6();
}

window.calcularHit6 = function() {
    let total = 0;
    let respondidas = 0;
    
    // Verifica todas as 6 questões
    for (let i = 1; i <= 6; i++) {
        const selecionado = document.querySelector(`input[name="hit6_q${i}"]:checked`);
        if (selecionado) {
            total += parseInt(selecionado.value);
            respondidas++;
        }
    }

    const placarNumero = document.getElementById('hit6-placar-numero');
    const grauTexto = document.getElementById('hit6-grau-texto');
    const detalheProntuario = document.getElementById('hit6-placar-detalhe');

    if (respondidas < 6) {
        placarNumero.innerText = "--";
        placarNumero.style.color = "#ccc";
        grauTexto.innerText = `Respondidas: ${respondidas}/6`;
        grauTexto.style.color = "#666";
        detalheProntuario.innerHTML = "<em>Responda todas as perguntas para gerar o resumo.</em>";
        return;
    }

    placarNumero.innerText = total;

    // Classificação do HIT-6
    let impacto = "";
    let recomendacao = "";
    let cor = "";

    if (total <= 49) {
        impacto = "Impacto Mínimo ou Nenhum";
        recomendacao = "A dor de cabeça tem pouco impacto na vida do paciente.";
        cor = "#28a745"; // Verde
    } else if (total >= 50 && total <= 55) {
        impacto = "Algum Impacto";
        recomendacao = "A dor está interferindo na vida do paciente. Atenção clínica recomendada.";
        cor = "#ffc107"; // Amarelo
    } else if (total >= 56 && total <= 59) {
        impacto = "Impacto Substancial";
        recomendacao = "A dor está causando problemas significativos. Modificação de tratamento pode ser necessária.";
        cor = "#fd7e14"; // Laranja
    } else if (total >= 60) {
        impacto = "Impacto Severo";
        recomendacao = "A dor está causando incapacidade severa. Intervenção clínica é altamente recomendada.";
        cor = "#dc3545"; // Vermelho
    }

    placarNumero.style.color = cor;
    grauTexto.innerText = impacto;
    grauTexto.style.color = cor;

    // Resumo para Prontuário
    let textoProntuario = `<strong>HIT-6: ${total} pontos</strong><br>`;
    textoProntuario += `<strong>Classificação:</strong> ${impacto}<br><br>`;
    textoProntuario += `<em>${recomendacao}</em>`;

    detalheProntuario.innerHTML = textoProntuario;
};

function adicionarEstiloCopiaHit6() {
    if (document.getElementById('copia-style-hit6')) return;
    const style = document.createElement('style');
    style.id = 'copia-style-hit6';
    style.innerHTML = `
        .placar-copia {
            font-size: 0.85em; font-family: 'Courier New', Courier, monospace;
            color: #333; padding: 10px; background-color: #f8f9fa;
            border: 1px dashed #ccc; border-radius: 4px;
            line-height: 1.5; text-align: left;
        }
    `;
    document.head.appendChild(style);
}