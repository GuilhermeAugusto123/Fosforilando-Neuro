// Arquivo: /calculadoras/sara.js

/**
 * Função principal chamada pelo app.js
 */
function sara() {
    // 1. Defina o HTML da calculadora
    // (Baseado na estrutura da SARA e nas instruções do getmov.org)
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Escala SARA (0-40 pts)</h5>
                    <ul>
                        <li>Para cada item, selecione a pontuação que melhor descreve o paciente. As instruções de como aplicar o teste estão abaixo de cada título.</li>
                    </ul>
                </div>

                ${saraDropdown('sara-1', '1. Marcha (0-8)', 
                    [
                        "0: Normal",
                        "1: Ligeira dificuldade, instabilidade intermitente",
                        "2: Instabilidade óbvia, dificuldade em girar",
                        "3: Passos irregulares, grande base de apoio",
                        "4. Incapaz de andar sem apoio intermitente (parede)",
                        "5: Incapaz de andar sem apoio constante (bengala, andador)",
                        "6: Incapaz de andar > 10m (mesmo com apoio)",
                        "7: Incapaz de andar (mesmo com apoio)",
                        "8: Incapaz de ficar em pé (mesmo com apoio)"
                    ], 
                    "Pedir para andar 10m (incluindo meia-volta) e andar em tandem (pé ante pé). Pontuar o pior desempenho."
                )}

                ${saraDropdown('sara-2', '2. Postura (0-6)', 
                    [
                        "0: Normal (capaz de ficar em tandem > 10s)",
                        "1: Capaz de ficar em tandem 3-10s",
                        "2: Incapaz de ficar em tandem, mas fica com pés juntos > 10s",
                        "3: Fica com pés juntos < 10s",
                        "4: Incapaz de ficar com pés juntos, mas fica em pé sem apoio",
                        "5: Incapaz de ficar em pé sem apoio (intermitente)",
                        "6: Incapaz de ficar em pé (mesmo com apoio)"
                    ], 
                    "Paciente em pé. Testar com pés em tandem (um na frente do outro), pés juntos, e base normal."
                )}
                
                ${saraDropdown('sara-3', '3. Posição Sentada (0-4)', 
                    [
                        "0: Normal (sem instabilidade)",
                        "1: Instabilidade leve, oscilação intermitente",
                        "2: Oscilação constante, mas senta sem apoio > 10s",
                        "3: Senta sem apoio < 10s",
                        "4: Incapaz de sentar sem apoio"
                    ], 
                    "Paciente sentado na maca, sem apoio para os pés, com braços cruzados por > 10s."
                )}
                
                ${saraDropdown('sara-4', '4. Fala (0-6)', 
                    [
                        "0: Normal",
                        "1: Sugestão de distúrbio da fala (leve)",
                        "2: Fala prejudicada, mas fácil de entender",
                        "3: Palavras ocasionais difíceis de entender",
                        "4: Muitas palavras difíceis de entender",
                        "5: Apenas palavras isoladas são compreensíveis",
                        "6: Fala ininteligível / Anartria"
                    ], 
                    "Avaliar durante a conversa e solicitar a repetição de frases (ex: 'Governo Federal')."
                )}
                
                ${saraDropdown('sara-5', '5. Teste Dedo-Nariz (0-4)', 
                    [
                        "0: Normal (sem dismetria)",
                        "1: Dismetria leve (erra o alvo < 5cm)",
                        "2: Dismetria clara (erra o alvo 5-15cm)",
                        "3: Dismetria grave (erra o alvo > 15cm)",
                        "4: Incapaz de realizar"
                    ], 
                    "Paciente sentado, braço estendido. Pedir para tocar o nariz e voltar à posição 5x. Pontuar o lado com pior desempenho."
                )}
                
                ${saraDropdown('sara-6', '6. Teste Dedo-Dedo (0-4)', 
                    [
                        "0: Normal (sem dismetria)",
                        "1: Dismetria leve (erra o alvo < 5cm)",
                        "2: Dismetria clara (erra o alvo 5-15cm)",
                        "3: Dismetria grave (erra o alvo > 15cm)",
                        "4: Incapaz de realizar"
                    ], 
                    "Paciente toca o dedo do examinador e depois o próprio nariz (5x). O examinador move o dedo. Pontuar o pior lado."
                )}
                
                ${saraDropdown('sara-7', '7. Mov. Alternados Rápidos (0-4)', 
                    [
                        "0: Normal (> 10 repetições em 10s)",
                        "1: Ligeiramente irregular (< 10 repetições em 10s)",
                        "2: Claramente irregular, interrupções",
                        "3: Muito irregular, disdiadococinesia grave",
                        "4: Incapaz de realizar"
                    ], 
                    "Pedir para fazer pronação/supinação rápida da mão sobre a coxa (10x). Pontuar o pior lado."
                )}
                
                ${saraDropdown('sara-8', '8. Teste Calcanhar-Joelho (0-4)', 
                    [
                        "0: Normal",
                        "1: Ligeiramente anormal (leve dismetria)",
                        "2: Claramente anormal (erra o joelho, desliza fora da tíbia)",
                        "3: Gravemente anormal (muita dismetria)",
                        "4: Incapaz de realizar"
                    ], 
                    "Paciente deitado. Pedir para tocar o joelho oposto com o calcanhar e deslizar pela tíbia. (3x). Pontuar o pior lado."
                )}

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Escore SARA</h3>
                    
                    <div class="placar-numero" id="sara-placar-numero">0</div>
                    <div class="placar-detalhe" id="sara-placar-classificacao" style="font-size: 1.1em; line-height: 1.4; padding: 0 10px;">
                        Escore Total (0-40)
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="sara-placar-detalhe">
                        Mar:0 Pos:0 Sen:0 Fal:0 DN:0 DD:0 MRA:0 CJ:0
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilo para os Dropdowns (reutiliza o estilo do EDSS)
    if (!document.getElementById('edss-style')) {
         adicionarEstiloSARA(); // Adiciona um estilo de dropdown
    }
    // Adiciona estilo para a caixa de cópia (reutiliza do EDSS/MG)
    if (!document.getElementById('edss-style')) {
         adicionarEstiloCopiaSARA();
    }


    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularSARA();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularSARA() {
    
    // 1. Obter os valores dos 8 itens
    const p1 = parseInt(document.getElementById('sara-1').value); // Marcha
    const p2 = parseInt(document.getElementById('sara-2').value); // Postura
    const p3 = parseInt(document.getElementById('sara-3').value); // Sentado
    const p4 = parseInt(document.getElementById('sara-4').value); // Fala
    const p5 = parseInt(document.getElementById('sara-5').value); // Dedo-Nariz
    const p6 = parseInt(document.getElementById('sara-6').value); // Dedo-Dedo
    const p7 = parseInt(document.getElementById('sara-7').value); // Mov. Rápidos
    const p8 = parseInt(document.getElementById('sara-8').value); // Calcanhar-Joelho
    
    // 2. Calcular o total (Score 0-40)
    const total = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
    
    // 3. Criar a linha de cópia
    const detalhe = `Mar:${p1} Pos:${p2} Sen:${p3} Fal:${p4} DN:${p5} DD:${p6} MRA:${p7} CJ:${p8}`;

    // 4. Exibir o resultado
    document.getElementById('sara-placar-numero').innerText = total;
    document.getElementById('sara-placar-detalhe').innerText = detalhe;
    document.getElementById('sara-placar-classificacao').innerText = "Escore Total (0-40)";
}

/**
 * Função auxiliar para criar os <select> dos SFs
 * (Reutilizada do EDSS, mas com instrução)
 */
function saraDropdown(id, titulo, opcoes, instrucao) {
    let optionsHtml = '';
    opcoes.forEach((opcao, index) => {
        // Extrai o grau (o primeiro número)
        const grau = parseFloat(opcao.split(':')[0]);
        optionsHtml += `<option value="${grau}">${opcao}</option>`;
    });

    return `
    <div class="grupo-radio" style="margin-bottom: 15px;">
        <h4 style="font-size: 1.1em; margin-bottom: 5px;">${titulo}</h4>
        <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block; font-style: normal; color: #333;">
            <b>Instrução:</b> ${instrucao}
        </span>
        <div style="padding: 0 15px 15px;">
            <select id="${id}" class="edss-select" onchange="calcularSARA()">
                ${optionsHtml}
            </select>
        </div>
    </div>
    `;
}

/**
 * Adiciona o estilo para os dropdowns (select)
 * (Caso o estilo do EDSS não tenha sido carregado)
 */
function adicionarEstiloSARA() {
    if (document.getElementById('edss-style')) return;
    const style = document.createElement('style');
    style.id = 'edss-style';
    style.innerHTML = `
        .edss-select {
            width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;
            background-color: white; font-size: 1em;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            -webkit-appearance: none; -moz-appearance: none; appearance: none;
            background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23005a9c%22%20d%3D%22M287%2069.4a17.6%2017.6%0%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E');
            background-repeat: no-repeat;
            background-position: right 10px top 50%;
            background-size: 10px auto;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Adiciona o estilo para a caixa de cópia
 * (Caso o estilo do EDSS não tenha sido carregado)
 */
function adicionarEstiloCopiaSARA() {
    if (document.getElementById('edss-style')) return; // Reutiliza o ID para não duplicar
    const style = document.createElement('style');
    style.id = 'edss-style'; 
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