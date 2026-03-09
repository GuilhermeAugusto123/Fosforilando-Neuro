// Arquivo: /calculadoras/mg_qol15r.js

function mg_qol15r() {
    // 15 Itens da Escala MG-QoL15r (Qualidade de Vida em MG - Revisada)
    const questoesQoL = [
        { id: "q1", titulo: "1. Estou frustrado(a) com a minha miastenia gravis." },
        { id: "q2", titulo: "2. Tenho dificuldade em usar os meus olhos." },
        { id: "q3", titulo: "3. Tenho dificuldade para comer por causa da MG." },
        { id: "q4", titulo: "4. Limito as minhas atividades sociais por causa da MG." },
        { id: "q5", titulo: "5. Minha capacidade de aproveitar meus hobbies/passatempos está limitada." },
        { id: "q6", titulo: "6. Tenho dificuldade em atender às necessidades da minha família." },
        { id: "q7", titulo: "7. Tenho que planejar minha rotina em função da MG." },
        { id: "q8", titulo: "8. Meu desempenho no trabalho/estudo é afetado negativamente." },
        { id: "q9", titulo: "9. Tenho dificuldade para falar." },
        { id: "q10", titulo: "10. Tenho dificuldade para dirigir." },
        { id: "q11", titulo: "11. Sinto-me deprimido(a) por causa da MG." },
        { id: "q12", titulo: "12. Tenho dificuldade para andar." },
        { id: "q13", titulo: "13. Tenho dificuldade para me locomover em locais públicos." },
        { id: "q14", titulo: "14. Sinto-me sobrecarregado(a) por causa da MG." },
        { id: "q15", titulo: "15. Tenho dificuldade com minha higiene pessoal." }
    ];

    let htmlPerguntas = "";

    questoesQoL.forEach((q) => {
        htmlPerguntas += `
            <div class="grupo-radio">
                <h4 style="font-size: 0.95rem; color: #333;">${q.titulo}</h4>
                <div class="opcao-radio">
                    <label>
                        <input type="radio" name="mgqol_${q.id}" value="0" onchange="calcularMgQol()" checked>
                        <span class="checkmark"></span>0: Nada
                    </label>
                </div>
                <div class="opcao-radio">
                    <label>
                        <input type="radio" name="mgqol_${q.id}" value="1" onchange="calcularMgQol()">
                        <span class="checkmark"></span>1: Um pouco
                    </label>
                </div>
                <div class="opcao-radio">
                    <label>
                        <input type="radio" name="mgqol_${q.id}" value="2" onchange="calcularMgQol()">
                        <span class="checkmark"></span>2: Muito
                    </label>
                </div>
            </div>
        `;
    });

    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>MG-QoL15r (0-30 pts)</h5>
                    <ul>
                        <li>Escala Revisada de Qualidade de Vida na Miastenia Gravis.</li>
                        <li>Questiona o paciente sobre as <strong>últimas semanas</strong>.</li>
                        <li>Por padrão, todos iniciam em "0 (Nada)". Pontuações mais altas indicam pior qualidade de vida.</li>
                    </ul>
                </div>
                ${htmlPerguntas}
            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="mgqol-resultado-box">
                    <h3>Escore MG-QoL15r</h3>
                    
                    <div style="margin-top: 20px;">
                        <div class="placar-numero" id="mgqol-placar-numero" style="font-size: 4rem; margin: 10px 0; color: #0056b3; line-height: 1;">0</div>
                        <div style="font-size: 1.1em; color: #666; line-height: 1.4; padding: 0 10px; font-weight: bold;">
                            / 30 Pontos
                        </div>
                    </div>

                    <h4 style="margin-top: 30px; margin-bottom: 5px; color: #333; font-size: 0.9em;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="mgqol-placar-detalhe" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                    </div>
                </div>
            </div> 
        </div> 
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCopiaMgQol();
    
    window.listaQuestoesQoL = questoesQoL;
    calcularMgQol();
}

window.calcularMgQol = function() {
    let total = 0;
    
    // Contadores para o resumo do prontuário ficar limpo (só lista o que pontuou)
    let itensUmPouco = [];
    let itensMuito = [];

    window.listaQuestoesQoL.forEach(q => {
        const selecionado = document.querySelector(`input[name="mgqol_${q.id}"]:checked`);
        let valor = selecionado ? parseInt(selecionado.value) : 0;
        total += valor;
        
        // Pega o número da questão para facilitar a leitura médica
        let numeroQuestao = q.titulo.split('.')[0];
        
        if (valor === 1) itensUmPouco.push(`Q${numeroQuestao}`);
        if (valor === 2) itensMuito.push(`Q${numeroQuestao}`);
    });

    const resultadoTotal = document.getElementById('mgqol-placar-numero');
    resultadoTotal.innerText = total;
    
    // Feedback visual (Cores)
    if (total <= 5) {
        resultadoTotal.style.color = "#28a745"; // Verde (Boa qualidade de vida)
    } else if (total <= 15) {
        resultadoTotal.style.color = "#ff9800"; // Laranja/Amarelo (Impacto moderado)
    } else {
        resultadoTotal.style.color = "#dc3545"; // Vermelho (Impacto grave)
    }

    // Texto dinâmico para o prontuário (Só mostra as categorias se houver itens)
    let textoProntuario = `<strong>MG-QoL15r Total: ${total}/30</strong><br>`;
    
    if (total === 0) {
        textoProntuario += `<br><span style="color:#28a745;">Sem impacto na qualidade de vida (Todas as respostas = 0)</span>`;
    } else {
        if (itensMuito.length > 0) {
            textoProntuario += `<br><strong>Itens com "Muito" impacto (2pts):</strong><br>${itensMuito.join(', ')}`;
        }
        if (itensUmPouco.length > 0) {
            textoProntuario += `<br><strong>Itens com "Um pouco" de impacto (1pt):</strong><br>${itensUmPouco.join(', ')}`;
        }
    }

    document.getElementById('mgqol-placar-detalhe').innerHTML = textoProntuario;
};

function adicionarEstiloCopiaMgQol() {
    if (document.getElementById('copia-style-mgqol')) return;
    const style = document.createElement('style');
    style.id = 'copia-style-mgqol';
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