// Arquivo: /calculadoras/katz.js

/**
 * Função principal chamada pelo app.js
 */
function katz() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Índice de Katz (AVDs Básicas) (0-6 pts)</h5>
                    <ul>
                        <li>Marque as atividades que o paciente realiza com <b>independência</b>.</li>
                        <li>(Pontuação: 1 = Independente, 0 = Dependente)</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Banho</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Independente = toma banho sozinho ou precisa de ajuda para lavar apenas uma parte do corpo, ex: costas)</span>
                    ${katzCheckbox('katz-1', 'Independente')}
                </div>
                
                <div class="grupo-radio">
                    <h4>2. Vestir-se</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Independente = pega as roupas e veste-se sozinho, exceto amarrar sapatos)</span>
                    ${katzCheckbox('katz-2', 'Independente')}
                </div>
                
                <div class="grupo-radio">
                    <h4>3. Uso do Banheiro</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Independente = vai ao banheiro, usa a descarga e limpa-se sozinho)</span>
                    ${katzCheckbox('katz-3', 'Independente')}
                </div>
                
                <div class="grupo-radio">
                    <h4>4. Transferência</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Independente = entra e sai da cama ou cadeira sem ajuda)</span>
                    ${katzCheckbox('katz-4', 'Independente')}
                </div>
                
                <div class="grupo-radio">
                    <h4>5. Continência</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Independente = controle total de esfíncteres [urinário e fecal])</span>
                    ${katzCheckbox('katz-5', 'Independente')}
                </div>
                
                <div class="grupo-radio">
                    <h4>6. Alimentação</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Independente = leva a comida do prato à boca sem ajuda. *Cortar a comida pode ser feito por outro)</span>
                    ${katzCheckbox('katz-6', 'Independente')}
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Índice de Katz</h3>
                    
                    <div class="placar-numero" id="katz-placar-numero">6</div>
                    <div class="placar-classificacao" id="katz-placar-classificacao" style="font-size: 1.3em; margin-top: 15px;">
                        Independência (6/6)
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="katz-placar-detalhe" style="font-size: 0.9em;">
                        Katz: 6/6 (B:1 V:1 T:1 Tr:1 C:1 A:1)
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilos necessários (reutilizando IDs de estilo que já criamos)
    adicionarEstiloKatz();

    // 4. Chame o cálculo uma vez para definir o estado inicial (começa com tudo marcado)
    calcularKatz();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularKatz() {
    
    const isChecked = (id) => document.getElementById(id).checked;

    // 1. Obter os valores dos 6 itens
    const p1 = isChecked('katz-1') ? 1 : 0; // Banho
    const p2 = isChecked('katz-2') ? 1 : 0; // Vestir
    const p3 = isChecked('katz-3') ? 1 : 0; // Banheiro
    const p4 = isChecked('katz-4') ? 1 : 0; // Transferência
    const p5 = isChecked('katz-5') ? 1 : 0; // Continência
    const p6 = isChecked('katz-6') ? 1 : 0; // Alimentação
    
    // 2. Calcular o total
    const total = p1 + p2 + p3 + p4 + p5 + p6;
    
    // 3. Definir a classificação
    let classificacao = '';
    if (total === 6) {
        classificacao = 'Independência (6/6)';
    } else if (total >= 4) {
        classificacao = 'Dependência Leve (4-5/6)';
    } else if (total >= 2) {
        classificacao = 'Dependência Moderada (2-3/6)';
    } else { // 0-1
        classificacao = 'Dependência Grave (0-1/6)';
    }

    // 4. Linha de Cópia
    const detalhe = `Katz: ${total}/6 (B:${p1} V:${p2} T:${p3} Tr:${p4} C:${p5} A:${p6})`;

    // 5. Exibir o resultado
    document.getElementById('katz-placar-numero').innerText = total;
    document.getElementById('katz-placar-classificacao').innerText = classificacao;
    document.getElementById('katz-placar-detalhe').innerText = detalhe;
}

/**
 * Função auxiliar para criar UM checkbox
 */
function katzCheckbox(id, texto) {
    return `
    <div class="opcao-radio" style="padding-left: 50px;">
        <label>
            <input type="checkbox" id="${id}" onchange="calcularKatz()" checked>
            <span class="checkmark-check" style="top: 15px; left: 20px;"></span>
            ${texto}
        </label>
    </div>
    `;
}

/**
 * Adiciona estilos necessários
 */
function adicionarEstiloKatz() {
    // Estilo para Checkbox (do MoCA/MEEN)
    if (!document.getElementById('checkbox-style')) {
        const styleCheck = document.createElement('style');
        styleCheck.id = 'checkbox-style';
        styleCheck.innerHTML = `
            .checkmark-check {
                position: absolute; top: 15px; left: 20px; height: 20px; width: 20px;
                background-color: #eee; border: 1px solid #ccc; border-radius: 3px;
            }
            .opcao-radio:hover input ~ .checkmark-check { background-color: #ccc; }
            .opcao-radio input:checked ~ .checkmark-check { background-color: #007bff; border-color: #007bff; }
            .checkmark-check:after {
                content: ""; position: absolute; display: none;
                left: 7px; top: 3px; width: 5px; height: 10px;
                border: solid white; border-width: 0 3px 3px 0;
                transform: rotate(45deg);
            }
            .opcao-radio input:checked ~ .checkmark-check:after { display: block; }
        `;
        document.head.appendChild(styleCheck);
    }

    // Estilo para Caixa de Cópia (do EDSS)
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