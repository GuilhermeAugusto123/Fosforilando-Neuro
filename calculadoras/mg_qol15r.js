// Arquivo: /calculadoras/mg_qol15.js

function mg_qol15() {
    // 15 Itens da Escala MG-QoL15 (Original - 0 a 60 pontos)
    const questoesQoL = [
        { id: "q1", titulo: "1. Estou frustrado por causa da MG" },
        { id: "q2", titulo: "2. Tenho dificuldades para olhar" },
        { id: "q3", titulo: "3. Tenho dificuldades para comer" },
        { id: "q4", titulo: "4. Limitei minha atividade social por causa da MG" },
        { id: "q5", titulo: "5. A MG limita meus hobbies e atividades de lazer." },
        { id: "q6", titulo: "6. Eu tenho dificuldade em atender às necessidades de minha família por causa da MG" },
        { id: "q7", titulo: "7. Tenho que fazer meus planos em torno da MG" },
        { id: "q8", titulo: "8. Meu trabalho foi prejudicado pela MG" },
        { id: "q9", titulo: "9. Eu tenho dificuldade para falar devido a MG" },
        { id: "q10", titulo: "10. Eu tenho dificuldade para dirigir devido a MG" },
        { id: "q11", titulo: "11. Estou deprimido por causa da MG" },
        { id: "q12", titulo: "12. Eu tenho dificuldade para andar devido a MG" },
        { id: "q13", titulo: "13. Tenho problemas para me ir a locais públicos por causa da MG" },
        { id: "q14", titulo: "14. Sinto-me sobrecarregado por causa da MG" },
        { id: "q15", titulo: "15. Tenho dificuldade para realizar meus cuidados pessoais (higiene) por causa da MG" }
    ];

    let htmlPerguntas = "";

    questoesQoL.forEach((q) => {
        htmlPerguntas += `
            <div class="grupo-radio" style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px dashed #eee;">
                <h4 style="font-size: 0.95rem; color: #333; margin-bottom: 10px;">${q.titulo}</h4>
                
                <div class="opcao-radio" style="display: inline-block; margin-right: 15px; margin-bottom: 5px;">
                    <label>
                        <input type="radio" name="mgqol_${q.id}" value="0" onchange="calcularMgQol()" checked>
                        <span class="checkmark"></span>Nunca (0)
                    </label>
                </div>
                <div class="opcao-radio" style="display: inline-block; margin-right: 15px; margin-bottom: 5px;">
                    <label>
                        <input type="radio" name="mgqol_${q.id}" value="1" onchange="calcularMgQol()">
                        <span class="checkmark"></span>Um pouco (1)
                    </label>
                </div>
                <div class="opcao-radio" style="display: inline-block; margin-right: 15px; margin-bottom: 5px;">
                    <label>
                        <input type="radio" name="mgqol_${q.id}" value="2" onchange="calcularMgQol()">
                        <span class="checkmark"></span>Às vezes (2)
                    </label>
                </div>
                <div class="opcao-radio" style="display: inline-block; margin-right: 15px; margin-bottom: 5px;">
                    <label>
                        <input type="radio" name="mgqol_${q.id}" value="3" onchange="calcularMgQol()">
                        <span class="checkmark"></span>Bastante (3)
                    </label>
                </div>
                <div class="opcao-radio" style="display: inline-block; margin-bottom: 5px;">
                    <label>
                        <input type="radio" name="mgqol_${q.id}" value="4" onchange="calcularMgQol()">
                        <span class="checkmark"></span>Sempre (4)
                    </label>
                </div>
            </div>
        `;
    });

    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>MG-QoL15 (0-60 pts)</h5>
                    <ul>
                        <li>Escala Original de Qualidade de Vida na Miastenia Gravis.</li>
                        <li>Indique quão verdadeira cada afirmação tem sido nas <strong>últimas semanas</strong>.</li>
                        <li>Por padrão, todos iniciam em "Nunca (0)". Pontuações mais altas indicam pior qualidade de vida.</li>
                    </ul>
                </div>
                ${htmlPerguntas}
            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="mgqol-resultado-box">
                    <h3>Escore MG-QoL15</h3>
                    
                    <div style="margin-top: 20px;">
                        <div class="placar-numero" id="mgqol-placar-numero" style="font-size: 4rem; margin: 10px 0; color: #0056b3; line-height: 1;">0</div>
                        <div style="font-size: 1.1em; color: #666; line-height: 1.4; padding: 0 10px; font-weight: bold;">
                            / 60 Pontos
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

function calcularMgQol() {
    let total = 0;
    let itensSempre = [];
    let itensBastante = [];
    let itensAsVezes = [];
    let itensUmPouco = [];

    if (!window.listaQuestoesQoL) return;

    window.listaQuestoesQoL.forEach(q => {
        const selecionado = document.querySelector(`input[name="mgqol_${q.id}"]:checked`);
        let valor = selecionado ? parseInt(selecionado.value) : 0;
        total += valor;
        
        let numeroQuestao = q.titulo.split('.')[0];
        
        if (valor === 4) itensSempre.push(`Q${numeroQuestao}`);
        if (valor === 3) itensBastante.push(`Q${numeroQuestao}`);
        if (valor === 2) itensAsVezes.push(`Q${numeroQuestao}`);
        if (valor === 1) itensUmPouco.push(`Q${numeroQuestao}`);
    });

    const resultadoTotal = document.getElementById('mgqol-placar-numero');
    if (resultadoTotal) {
        resultadoTotal.innerText = total;
        if (total <= 10) {
            resultadoTotal.style.color = "#28a745"; 
        } else if (total <= 30) {
            resultadoTotal.style.color = "#ffc107";
        } else if (total <= 45) {
            resultadoTotal.style.color = "#fd7e14";
        } else {
            resultadoTotal.style.color = "#dc3545";
        }
    }

    const detalhe = document.getElementById('mgqol-placar-detalhe');
    if (detalhe) {
        let textoProntuario = `<strong>MG-QoL15 Total: ${total}/60</strong><br>`;
        if (total === 0) {
            textoProntuario += `<br><span style="color:#28a745;">Nenhum impacto relatado (Todas as respostas = Nunca)</span>`;
        } else {
            if (itensSempre.length > 0) textoProntuario += `<br><strong>Sempre (4pts):</strong> ${itensSempre.join(', ')}`;
            if (itensBastante.length > 0) textoProntuario += `<br><strong>Bastante (3pts):</strong> ${itensBastante.join(', ')}`;
            if (itensAsVezes.length > 0) textoProntuario += `<br><strong>Às vezes (2pts):</strong> ${itensAsVezes.join(', ')}`;
            if (itensUmPouco.length > 0) textoProntuario += `<br><strong>Um pouco (1pt):</strong> ${itensUmPouco.join(', ')}`;
        }
        detalhe.innerHTML = textoProntuario;
    }
}

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

// Vincula as funções ao escopo global de forma segura
window.mg_qol15 = mg_qol15;
window.calcularMgQol = calcularMgQol;

// MAPA DE COMPATIBILIDADE: Mapeia mapeia todos os nomes possíveis que o index.html pode estar chamando
window.mg_qol15r = mg_qol15;
window.mgqol15r = mg_qol15;
window.mgqol15 = mg_qol15;
