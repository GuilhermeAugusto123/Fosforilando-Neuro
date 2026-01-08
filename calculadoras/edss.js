// Arquivo: /calculadoras/edss.js (Versão 2.2 - Com linha de Prontuário)

/**
 * Função principal chamada pelo app.js
 */
function edss() {
    // 1. Defina o HTML da calculadora
    // (O HTML das perguntas não muda)
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Calculadora EDSS</h5>
                    <ul>
                        <li><b>Passo 1:</b> Selecione o nível de deambulação (define escores ≥ 4.0).</li>
                        <li><b>Passo 2:</b> Se a deambulação for "Plena", preencha os Sistemas Funcionais (define escores 0.0-3.5).</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Nível de Deambulação</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">Selecione a capacidade máxima de deambulação:</span>
                    
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="plena" onchange="calcularEDSS_auto()" checked><span class="checkmark"></span><b>0.0-3.5:</b> Deambulação plena (sem restrições de distância)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="4.0" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>4.0:</b> Deambula > 500m (sem auxílio)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="4.5" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>4.5:</b> Deambula 300-499m (sem auxílio)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="5.0" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>5.0:</b> Deambula 200-299m (sem auxílio)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="5.5" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>5.5:</b> Deambula 100-199m (sem auxílio)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="6.0" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>6.0:</b> Requer auxílio unilateral (bengala, etc.) para 100m</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="6.5" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>6.5:</b> Requer auxílio bilateral (andador, etc.) para 20m</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="7.0" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>7.0:</b> Restrito à cadeira de rodas (transfere sozinho)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="7.5" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>7.5:</b> Restrito à cadeira de rodas (precisa de ajuda para transferir)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="8.0" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>8.0:</b> Restrito ao leito/cadeira (bom uso dos braços)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="8.5" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>8.5:</b> Restrito ao leito (uso mínimo dos braços)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="9.0" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>9.0:</b> Acamado, dependente (comunica, deglute)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="9.5" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>9.5:</b> Acamado, totalmente dependente</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="edss-deambulacao" value="10.0" onchange="calcularEDSS_auto()"><span class="checkmark"></span><b>10.0:</b> Óbito devido à EM</label></div>
                </div>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

                <h3 style="color: #005a9c;">2. Sistemas Funcionais (SFs)</h3>
                <span class="sub-instrucao-titulo" style="padding: 0 0 15px; display: block;">(Usado para calcular escores 0.0-3.5 se a deambulação for "Plena")</span>
                
                ${sfDropdown('sf-piramidal', 'Piramidal', [
                    "0: Normal", "1: Sinais anormais, sem incapacidade", "2: Incapacidade mínima", "3: Monoparesia grave / Paresia moderada",
                    "4: Monoplegia / Paresia acentuada", "5: Paraplegia, hemiplegia", "6: Quadriplegia"
                ])}
                
                ${sfDropdown('sf-cerebelar', 'Cerebelar', [
                    "0: Normal", "1: Sinais anormais, sem incapacidade", "2: Ataxia discreta", "3: Ataxia moderada (tronco ou membros)",
                    "4: Ataxia grave (não faz mov. coordenados)"
                ])}
                
                ${sfDropdown('sf-tronco', 'Tronco Cerebral', [
                    "0: Normal", "1: Somente sinais anormais", "2: Nistagmo moderado / Incapacidade leve", "3: Nistagmo grave / Paresia extraocular",
                    "4: Disartria acentuada", "5: Incapaz de deglutir ou falar"
                ])}
                
                ${sfDropdown('sf-sensitivo', 'Sensitivo', [
                    "0: Normal", "1: Diminuição vibratória leve (1-2 membros)", "2: Diminuição discreta (tato/dor) (1-2 membros)",
                    "3: Diminuição moderada (tato/dor) (1-2 membros)", "4: Diminuição acentuada (tato/dor) (1-2 membros)", "5: Perda da sensibilidade (1-2 membros)"
                ])}
                
                ${sfDropdown('sf-vesical', 'Vesical (Bexiga)', [
                    "0: Normal", "1: Sintomas urinários leves", "2: Incontinência < 1x/semana", "3: Incontinência > 1x/semana",
                    "4: Incontinência diária", "5: Retenção (necessita cateterismo)", "6: Perda função (ambos Esfíncteres)"
                ])}
                
                ${sfDropdown('sf-intestinal', 'Intestinal', [
                    "0: Normal", "1: Obstipação leve", "2: Obstipação diária (controlável)", "3: Incontinência < 1x/semana",
                    "4: Incontinência > 1x/semana", "5: Sem controle esfincteriano"
                ])}
                
                ${sfDropdown('sf-visual', 'Visual', [
                    "0: Normal", "1: Escotoma, AV > 20/30", "2: Pior olho AV 20/30-20/59", "3: Pior olho AV 20/60-20/99",
                    "4: Pior olho AV 20/100-20/200", "5: Pior olho AV < 20/200", "6: Grau 5 + Melhor olho < 20/60"
                ])}
                
                ${sfDropdown('sf-mental', 'Mental', [
                    "0: Normal", "1: Alteração de humor", "2: Diminuição discreta", "3: Diminuição moderada",
                    "4: Diminuição acentuada", "5: Demência"
                ])}


            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>EDSS Calculado</h3>
                    
                    <div class="placar-numero" id="edss-placar-numero">0.0</div>
                    <div class="placar-detalhe" id="edss-placar-detalhe" style="font-size: 1.1em; line-height: 1.4; padding: 0 10px;">
                        Deambulação plena. Todos os SFs grau 0.
                    </div>
                    
                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo SFs (p/ Prontuário):</h4>
                    <div class="placar-copia" id="edss-copia-sf">
                        Nenhum SF afetado (Grau > 0)
                    </div>
                    <div class="placar-classificacao" id="edss-placar-classificacao" style="font-size: 1.0em; margin-top: 15px;">
                        (SFs: 0xG2, 0xG3, 0xG4)
                    </div>
                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilo para os Dropdowns E A NOVA CAIXA DE CÓPIA
    adicionarEstiloEDSS();

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularEDSS_auto();
}

/**
 * Função de cálculo (chamada automaticamente)
 * (ATUALIZADA com a linha de cópia)
 */
function calcularEDSS_auto() {
    
    // --- 1. Obter Deambulação ---
    const deambulacao = document.querySelector('input[name="edss-deambulacao"]:checked').value;

    let scoreFinal = 0.0;
    let descricao = "";
    let debugInfo = ""; // Para mostrar a contagem de SFs
    let stringCopia = "Deambulação restringe o escore."; // Padrão

    // --- 2. Lógica para escores 4.0 a 10.0 (Baseados na Deambulação) ---
    if (deambulacao !== 'plena') {
        scoreFinal = parseFloat(deambulacao);
        
        // Pega a descrição do label do radio
        const label = document.querySelector(`input[name="edss-deambulacao"][value="${deambulacao}"]`).closest('label');
        descricao = label.innerText;

    } else {
        // --- 3. Lógica para escores 0.0 a 3.5 (Baseados nos SFs) ---
        // (Deambulação é "Plena")
        
        // Coletar os 8 SFs
        const sf_piramidal = parseInt(document.getElementById('sf-piramidal').value);
        const sf_cerebelar = parseInt(document.getElementById('sf-cerebelar').value);
        const sf_tronco = parseInt(document.getElementById('sf-tronco').value);
        const sf_sensitivo = parseInt(document.getElementById('sf-sensitivo').value);
        const sf_vesical = parseInt(document.getElementById('sf-vesical').value);
        const sf_intestinal = parseInt(document.getElementById('sf-intestinal').value);
        const sf_visual = parseInt(document.getElementById('sf-visual').value);
        const sf_mental = parseInt(document.getElementById('sf-mental').value);

        const sf_list = [sf_piramidal, sf_cerebelar, sf_tronco, sf_sensitivo, sf_vesical, sf_intestinal, sf_visual, sf_mental];

        // --- LÓGICA DA SUA SOLICITAÇÃO (COPIAR E COLAR) ---
        const sf_scores = [
            { nome: 'Pir', val: sf_piramidal }, { nome: 'Cer', val: sf_cerebelar },
            { nome: 'Tro', val: sf_tronco },  { nome: 'Sen', val: sf_sensitivo },
            { nome: 'Ves', val: sf_vesical },   { nome: 'Int', val: sf_intestinal },
            { nome: 'Vis', val: sf_visual },  { nome: 'Men', val: sf_mental }
        ];

        const sf_afetados = sf_scores
            .filter(sf => sf.val > 0) // Pega apenas SFs com grau > 0
            .map(sf => `${sf.nome}: ${sf.val}`); // Formata como "Pir: 1"
        
        if (sf_afetados.length > 0) {
            stringCopia = sf_afetados.join('; ');
        } else {
            stringCopia = "Nenhum SF afetado (Grau > 0)";
        }
        // --- FIM DA LÓGICA DA SOLICITAÇÃO ---


        // Contar quantos SFs têm cada grau (ignorando grau 0)
        let g1 = 0, g2 = 0, g3 = 0, g4 = 0, g5 = 0, g6 = 0;
        
        sf_list.forEach(sf => {
            if (sf === 1) g1++;
            else if (sf === 2) g2++;
            else if (sf === 3) g3++;
            else if (sf === 4) g4++;
            else if (sf === 5) g5++;
            else if (sf === 6) g6++;
        });

        // Esta é a linha que você pediu para manter
        debugInfo = `(SFs: ${g2}xG2, ${g3}xG3, ${g4}xG4, ${g5}xG5)`;
        
        // Aplicar a lógica do EDSS (baseado no PDF)
        if (g2 + g3 + g4 + g5 + g6 === 0) {
            if (g1 === 0) {
                scoreFinal = 0.0;
                descricao = "Exame neurológico normal.";
            } else if (g1 === 1) {
                scoreFinal = 1.0;
                descricao = "Sem incapacidade. 1 SF Grau 1.";
            } else { // g1 >= 2
                scoreFinal = 1.5;
                descricao = "Sem incapacidade. 2 ou mais SFs Grau 1.";
            }
        } else if (g2 === 1 && g3 + g4 + g5 + g6 === 0) {
            scoreFinal = 2.0;
            descricao = "Incapacidade mínima em 1 SF (1 SF Grau 2).";
        } else if (g2 >= 2 && g3 + g4 + g5 + g6 === 0) {
            scoreFinal = 2.5;
            descricao = "Incapacidade mínima em 2 ou mais SFs (≥2 SFs Grau 2).";
        } else if (g3 === 1 && g4 + g5 + g6 === 0) {
            scoreFinal = 3.0;
            descricao = "Incapacidade moderada em 1 SF (1 SF Grau 3).";
        } else if (g2 >= 3 && g3 + g4 + g5 + g6 === 0) {
            scoreFinal = 3.0;
            descricao = "Incapacidade discreta em 3 ou 4 SFs (≥3 SFs Grau 2).";
        } else if (g3 >= 2 || (g3 === 1 && g2 >= 1) || g4 >= 1 || g5 >= 1 || g6 >= 1) {
            scoreFinal = 3.5;
            descricao = "Deambulação plena, mas com incapacidade moderada em >1 SF.";
            
            // Lógica mais fina (do PDF)
            if (g3 === 1 && g2 >= 1) {
                descricao = "Deambulação plena, 1 SF Grau 3 e ≥1 SF Grau 2.";
            } else if (g3 >= 2) {
                descricao = "Deambulação plena, ≥2 SFs Grau 3.";
            } else if (g5 >= 1 || g4 >= 1) {
                descricao = "Deambulação plena, com ≥1 SF Grau 4 ou 5 (mas Deambulação não é o SF principal).";
            } else if (g2 >= 5) {
                descricao = "Deambulação plena, ≥5 SFs Grau 2.";
            }
        } else {
             scoreFinal = 0.0; // Caso de fallback
             descricao = "Verifique os SFs. (Deambulação Plena)";
             debugInfo = "";
        }
    }
    
    // 4. Exibir o resultado
    document.getElementById('edss-placar-numero').innerText = scoreFinal.toFixed(1);
    document.getElementById('edss-placar-detalhe').innerText = descricao;
    document.getElementById('edss-placar-classificacao').innerText = debugInfo; // A contagem de SFs
    document.getElementById('edss-copia-sf').innerText = stringCopia; // A linha de cópia
}

/**
 * Função auxiliar para criar os <select> dos SFs
 * (Sem erros de sintaxe)
 */
function sfDropdown(id, titulo, opcoes) {
    let optionsHtml = '';
    opcoes.forEach((opcao, index) => {
        // Extrai o grau (o primeiro número)
        const grau = parseInt(opcao.split(':')[0].replace(/\D/g, ''));
        optionsHtml += `<option value="${grau}">${opcao}</option>`;
    });

    return `
    <div class="grupo-radio" style="margin-bottom: 10px;">
        <h4 style="font-size: 1.1em; margin-bottom: 10px;">${titulo}</h4>
        <div style="padding: 0 15px 15px;">
            <select id="${id}" class="edss-select" onchange="calcularEDSS_auto()">
                ${optionsHtml}
            </select>
        </div>
    </div>
    `;
}

/**
 * Adiciona o estilo para os dropdowns (select) E a caixa de cópia
 * (Sem erros de sintaxe)
 */
function adicionarEstiloEDSS() {
    if (document.getElementById('edss-style')) return;

    const style = document.createElement('style');
    style.id = 'edss-style';
    style.innerHTML = `
        .edss-select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: white;
            font-size: 1em;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23005a9c%22%20d%3D%22M287%2069.4a17.6%2017.6%0%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E');
            background-repeat: no-repeat;
            background-position: right 10px top 50%;
            background-size: 10px auto;
        }

        /* O estilo para a sua caixa de cópia */
        .placar-copia {
            font-size: 0.9em;
            font-family: 'Courier New', Courier, monospace;
            color: #333;
            padding: 8px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            border-radius: 4px;
            line-height: 1.5;
            text-align: left; /* Alinhado à esquerda */
        }
    `;
    document.head.appendChild(style);
}