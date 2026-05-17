// Arquivo: /calculadoras/midas.js

function midasScore() {
    // Definição dos itens do MIDAS (Incapacidade por Cefaleia)
    const questoesMidas = [
        { id: "q1", titulo: "1. Quantos dias você perdeu de trabalho ou estudo por causa de dores de cabeça?" },
        { id: "q2", titulo: "2. Quantos dias a sua produtividade no trabalho ou na escola reduziu-se pela metade ou menos da metade devido à dores de cabeça? (não incluir os dias da pergunta 1)" },
        { id: "q3", titulo: "3. Quantos dias você não realizou afazeres domésticos (arrumação, compras, crianças) devido à dores de cabeça?" },
        { id: "q4", titulo: "4. Quantos dias sua produtividade nos afazeres domésticos reduziu-se pela metade ou menos? (não incluir os dias da pergunta 3)" },
        { id: "q5", titulo: "5. Quantos dias você não pôde participar de atividades sociais, familiares ou de lazer devido à dor de cabeça?" }
    ];

    let htmlPerguntas = "";

    questoesMidas.forEach((q) => {
        htmlPerguntas += `
            <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #eee;">
                <label style="display: block; font-size: 0.95rem; color: #333; margin-bottom: 8px; font-weight: 500;">${q.titulo}</label>
                <div style="display: flex; align-items: center;">
                    <input type="number" id="midas_${q.id}" min="0" max="90" placeholder="0" oninput="calcularMidas()" style="width: 80px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; text-align: center;">
                    <span style="margin-left: 10px; color: #666;">dias nos últimos 3 meses</span>
                </div>
            </div>
        `;
    });

    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Questionário MIDAS</h5>
                    <ul>
                        <li>Avalia a incapacidade causada pela enxaqueca/cefaleia.</li>
                        <li><strong>Atenção:</strong> As respostas devem considerar <strong>todas as dores de cabeça nos últimos 3 meses</strong> (aprox. 90 dias).</li>
                    </ul>
                </div>
                
                <h4 style="color: #0056b3; margin-bottom: 15px;">Dias de Incapacidade (Escore Principal)</h4>
                ${htmlPerguntas}

                <h4 style="color: #0056b3; margin-top: 30px; margin-bottom: 15px;">Avaliação Clínica Adicional</h4>
                <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #eee;">
                    <label style="display: block; font-size: 0.95rem; color: #333; margin-bottom: 8px; font-weight: 500;">A. Quantos dias você teve de dor de cabeça nos últimos 3 meses?</label>
                    <div style="display: flex; align-items: center;">
                        <input type="number" id="midas_freq" min="0" max="90" placeholder="0" oninput="calcularMidas()" style="width: 80px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; text-align: center;">
                        <span style="margin-left: 10px; color: #666;">dias no total</span>
                    </div>
                </div>

                <div style="margin-bottom: 20px; padding-bottom: 15px;">
                    <label style="display: block; font-size: 0.95rem; color: #333; margin-bottom: 8px; font-weight: 500;">B. Numa escala de 0 a 10, em média, qual a intensidade de suas dores de cabeça?</label>
                    <div style="display: flex; align-items: center;">
                        <input type="number" id="midas_int" min="0" max="10" placeholder="0" oninput="calcularMidas()" style="width: 80px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; text-align: center;">
                        <span style="margin-left: 10px; color: #666;">/ 10 (0=nenhuma, 10=mais intensa)</span>
                    </div>
                </div>
            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="midas-resultado-box">
                    <h3>Escore MIDAS</h3>
                    
                    <div style="margin-top: 20px;">
                        <div class="placar-numero" id="midas-placar-numero" style="font-size: 4rem; margin: 10px 0; color: #0056b3; line-height: 1;">0</div>
                        <div style="font-size: 1.1em; color: #666; line-height: 1.4; padding: 0 10px; font-weight: bold;" id="midas-grau-texto">
                            Grau I
                        </div>
                        <div style="font-size: 0.9em; color: #888; margin-top: 5px;" id="midas-desc-texto">
                            Incapacidade mínima ou nenhuma
                        </div>
                    </div>

                    <h4 style="margin-top: 30px; margin-bottom: 5px; color: #333; font-size: 0.9em;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="midas-placar-detalhe" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                    </div>
                </div>
            </div> 
        </div> 
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCopiaMidas();
    calcularMidas();
}

window.calcularMidas = function() {
    let total = 0;
    
    // Calcula as questões 1 a 5 para o escore principal
    for (let i = 1; i <= 5; i++) {
        let val = parseInt(document.getElementById(`midas_q${i}`).value) || 0;
        total += val;
    }

    // Pega as respostas extras
    let freq = parseInt(document.getElementById('midas_freq').value) || 0;
    let intensidade = parseInt(document.getElementById('midas_int').value) || 0;

    const placarNumero = document.getElementById('midas-placar-numero');
    const grauTexto = document.getElementById('midas-grau-texto');
    const descTexto = document.getElementById('midas-desc-texto');

    placarNumero.innerText = total;

    // Classificação do MIDAS
    let grau = "";
    let descricao = "";
    let cor = "";

    if (total <= 5) {
        grau = "GRAU I";
        descricao = "Incapacidade mínima ou nenhuma";
        cor = "#28a745"; // Verde
    } else if (total <= 10) {
        grau = "GRAU II";
        descricao = "Incapacidade leve";
        cor = "#ffc107"; // Amarelo
    } else if (total <= 20) {
        grau = "GRAU III";
        descricao = "Incapacidade moderada";
        cor = "#fd7e14"; // Laranja
    } else {
        grau = "GRAU IV";
        descricao = "Incapacidade severa";
        cor = "#dc3545"; // Vermelho
    }

    placarNumero.style.color = cor;
    grauTexto.innerText = grau;
    grauTexto.style.color = cor;
    descTexto.innerText = descricao;

    // Resumo para Prontuário
    let textoProntuario = `<strong>MIDAS: ${total} pontos (${grau})</strong><br>`;
    textoProntuario += `Classificação: ${descricao}<br><br>`;
    
    textoProntuario += `<strong>Contexto Clínico (Últimos 3 meses):</strong><br>`;
    textoProntuario += `- Frequência: ${freq} dias com cefaleia<br>`;
    textoProntuario += `- Intensidade Média: ${intensidade}/10`;

    document.getElementById('midas-placar-detalhe').innerHTML = textoProntuario;
};

function adicionarEstiloCopiaMidas() {
    if (document.getElementById('copia-style-midas')) return;
    const style = document.createElement('style');
    style.id = 'copia-style-midas';
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