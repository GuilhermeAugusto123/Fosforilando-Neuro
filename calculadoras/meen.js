// Arquivo: /calculadoras/meen.js (Versão 1.1 - Imagem Local)

/**
 * Função principal chamada pelo app.js
 */
function meen() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="calc-tabs">
                    <button id="meen-btn-pontuacao" class="calc-tab-btn active" onclick="meenMudarAba('pontuacao')">Aplicação / Pontuação</button>
                    <button id="meen-btn-instrucoes" class="calc-tab-btn" onclick="meenMudarAba('instrucoes')">Instruções</button>
                </div>

                <div id="meen-tab-pontuacao" class="calc-tab-pane active">
                    <div class="aviso-instrucao" style="margin-top: 20px;">
                        <h5>Miniexame do Estado Mental (0-30 pts)</h5>
                        <ul><li>Marque os itens que o paciente acertou.</li></ul>
                    </div>
                    
                    ${meenGrupoCheckbox('Orientação Temporal (Máx 5)', [
                        { id: 'meen-ano', texto: 'Ano' },
                        { id: 'meen-mes', texto: 'Mês' },
                        { id: 'meen-dia', texto: 'Dia do mês' },
                        { id: 'meen-semana', texto: 'Dia da semana' },
                        { id: 'meen-hora', texto: 'Hora aproximada' }
                    ])}
                    
                    ${meenGrupoCheckbox('Orientação Espacial (Máx 5)', [
                        { id: 'meen-estado', texto: 'Estado' },
                        { id: 'meen-cidade', texto: 'Cidade' },
                        { id: 'meen-bairro', texto: 'Bairro / Rua próxima' },
                        { id: 'meen-local-grande', texto: 'Local (Hospital, Casa)' },
                        { id: 'meen-local-pequeno', texto: 'Local (Consultório, Sala)' }
                    ])}
                    
                    ${meenGrupoCheckbox('Memória Imediata (Registro) (Máx 3)', [
                        { id: 'meen-carro', texto: 'CARRO (1ª tentativa)' },
                        { id: 'meen-vaso', texto: 'VASO (1ª tentativa)' },
                        { id: 'meen-tijolo', texto: 'TIJOLO (1ª tentativa)' }
                    ])}

                    ${meenGrupoCheckbox('Atenção e Cálculo (Máx 5)', [
                        { id: 'meen-calc-93', texto: 'Acertou "93"' },
                        { id: 'meen-calc-86', texto: 'Acertou "86"' },
                        { id: 'meen-calc-79', texto: 'Acertou "79"' },
                        { id: 'meen-calc-72', texto: 'Acertou "72"' },
                        { id: 'meen-calc-65', texto: 'Acertou "65"' }
                    ], "Pontue 1 para cada subtração correta (100-7...).")}

                    ${meenGrupoCheckbox('Evocação (Memória Tardia) (Máx 3)', [
                        { id: 'meen-evo-carro', texto: 'Lembrou "CARRO"' },
                        { id: 'meen-evo-vaso', texto: 'Lembrou "VASO"' },
                        { id: 'meen-evo-tijolo', texto: 'Lembrou "TIJOLO"' }
                    ])}
                    
                    ${meenGrupoCheckbox('Nomeação (Máx 2)', [
                        { id: 'meen-nomear-relogio', texto: 'Nomeou "Relógio"' },
                        { id: 'meen-nomear-caneta', texto: 'Nomeou "Caneta"' }
                    ])}
                    
                    ${meenGrupoCheckbox('Repetição (Máx 1)', [
                        { id: 'meen-repetir-frase', texto: 'Repetiu "Nem aqui, nem ali, nem lá"' }
                    ])}

                    ${meenGrupoCheckbox('Comando Verbal (Máx 3)', [
                        { id: 'meen-cmd-mao', texto: 'Pegou papel com Mão Direita' },
                        { id: 'meen-cmd-dobrou', texto: 'Dobrou ao meio' },
                        { id: 'meen-cmd-chao', texto: 'Colocou no chão' }
                    ])}

                    <div class="grupo-radio">
                        <h4>9. Leitura (Máx 1)</h4>
                        <div class="meen-leitura-box">FECHE OS OLHOS</div>
                        <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">Instrução: Mostre a caixa acima ao paciente e peça para fazer o que está escrito.</span>
                        ${meenCheckbox('meen-leitura', 'Paciente executou o comando')}
                    </div>
                    
                    <div class="grupo-radio">
                        <h4>10. Desenho (Praxia) (Máx 1)</h4>
                        <div class="meen-desenho-box">
                            <img src="img/meen_pentagonos.png" alt="Pentágonos Intersectados">
                        </div>
                        <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">Instrução: Peça ao paciente para copiar a imagem acima.</span>
                        ${meenCheckbox('meen-desenho', 'Copiou corretamente (2 pentágonos, 5 lados, intersecção de 4 lados)')}
                    </div>

                </div> <div id="meen-tab-instrucoes" class="calc-tab-pane" style="display: none;">
                    <div style="padding: 20px 5px;">
                        <h4>Orientação Temporal (1 ponto por resposta correta)</h4>
                        <p>Em que dia estamos? Em que mês estamos? Em que ano estamos? Em que dia da semana estamos? Qual a hora aproximada? (Considere a variação de mais ou menos uma hora)</p>
                        <h4>Orientação Espacial (1 ponto por resposta correta)</h4>
                        <p>Em que local nós estamos (consultório, dormitório, sala)? Que local é este aqui (hospital, casa de repouso, própria casa)? Em que bairro nós estamos ou qual o nome de uma rua próxima? Em que cidade nós estamos? Em que estado nós estamos?</p>
                        <h4>Memória Imediata</h4>
                        <p>Fale ao paciente que você está testando a memória. Diga que irá falar três palavras e que ele deverá repeti-las a seguir: <b>carro, vaso, tijolo</b>. Dê 1 ponto para cada palavra repetida acertadamente na 1ª vez. Pode repeti-las até três vezes para o aprendizado, se houver erros.</p>
                        <h4>Atenção e Cálculo</h4>
                        <p><b>Subtração de setes seriados:</b> Peça ao paciente que subtraia sete a partir de 100, e então siga subtraindo sete da sua resposta até que você diga para parar (100-7, 93-7, etc.). Considere 1 ponto para cada resultado correto. Se houver erro, corrija-o e prossiga. Considere correto se o examinado espontaneamente se autocorrigir.</p>
                        <h4>Evocação das Palavras</h4>
                        <p>Pergunte quais as palavras que o sujeito acabara de repetir (1 ponto para cada).</p>
                        <h4>Nomeação</h4>
                        <p>Peça para o sujeito nomear os objetos mostrados (relógio, caneta). Dê 1 ponto para cada.</p>
                        <h4>Repetição</h4>
                        <p>Diga: "Vou lhe dizer uma frase e quero que você repita depois de mim: <b>'Nem aqui, nem ali, nem lá'</b>". Considere somente se a repetição for perfeita (1 ponto).</p>
                        <h4>Comando Verbal (3 estágios)</h4>
                        <p>Dê o comando: "Pegue este papel com a mão direita (1 ponto), dobre-o ao meio (1 ponto) e coloque-o no chão (1 ponto)". Se o sujeito pedir ajuda no meio da tarefa, não dê dicas.</p>
                        <h4>Leitura</h4>
                        <p>Mostre a frase escrita "FECHE OS OLHOS" e peça para o indivíduo fazer o que está sendo mandado. Não auxilie se pedir ajuda ou se só ler a frase sem realizar o comando (1 ponto).</p>
                        <h4>Desenho (Praxia)</h4>
                        <p>Peça ao indivíduo para copiar os pentágonos da melhor forma possível. Considere apenas se houver 2 pentágonos interseccionados, formando uma figura de quatro lados (1 ponto).</p>
                        <hr>
                        <p style="font-size: 0.8em; color: #555;">Referência: STUDART NETO, Adalberto et al. Neurologia. 1. ed. Rio de Janeiro: Atheneu, 2021. 1450 p. Manual do médico-residente do Hospital das Clínicas da Faculdade de Medicina da Universidade de São Paulo.</p>
                    </div>
                </div> </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>MEEN / MMSE</h3>
                    <div class="placar-numero" id="meen-placar-numero">30</div>
                    <div class="placar-detalhe" id="meen-placar-classificacao" style="font-size: 1.3em; line-height: 1.4; padding: 0 10px;">
                        (Escore Máximo: 30)
                    </div>
                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="meen-placar-detalhe" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                        </div>
                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona todos os estilos necessários (esta função não muda)
    adicionarEstiloMEEN();

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularMEEN();
}

/**
 * Função de CÁLCULO (v1.1)
 * (Esta função não muda)
 */
function calcularMEEN() {
    
    const isChecked = (id) => document.getElementById(id).checked;

    // 1. Orientação Temporal (5)
    let p_ot = 0;
    if (isChecked('meen-ano')) p_ot++;
    if (isChecked('meen-mes')) p_ot++;
    if (isChecked('meen-dia')) p_ot++;
    if (isChecked('meen-semana')) p_ot++;
    if (isChecked('meen-hora')) p_ot++;

    // 2. Orientação Espacial (5)
    let p_oe = 0;
    if (isChecked('meen-estado')) p_oe++;
    if (isChecked('meen-cidade')) p_oe++;
    if (isChecked('meen-bairro')) p_oe++;
    if (isChecked('meen-local-grande')) p_oe++;
    if (isChecked('meen-local-pequeno')) p_oe++;
    
    // 3. Registro (3)
    let p_reg = 0;
    if (isChecked('meen-carro')) p_reg++;
    if (isChecked('meen-vaso')) p_reg++;
    if (isChecked('meen-tijolo')) p_reg++;

    // 4. Cálculo (5)
    let p_calc = 0;
    if (isChecked('meen-calc-93')) p_calc++;
    if (isChecked('meen-calc-86')) p_calc++;
    if (isChecked('meen-calc-79')) p_calc++;
    if (isChecked('meen-calc-72')) p_calc++;
    if (isChecked('meen-calc-65')) p_calc++;

    // 5. Evocação (3)
    let p_evo = 0;
    if (isChecked('meen-evo-carro')) p_evo++;
    if (isChecked('meen-evo-vaso')) p_evo++;
    if (isChecked('meen-evo-tijolo')) p_evo++;

    // 6. Nomeação (2)
    let p_nom = 0;
    if (isChecked('meen-nomear-relogio')) p_nom++;
    if (isChecked('meen-nomear-caneta')) p_nom++;

    // 7. Repetição (1)
    const p_rep = isChecked('meen-repetir-frase') ? 1 : 0;

    // 8. Comando (3)
    let p_cmd = 0;
    if (isChecked('meen-cmd-mao')) p_cmd++;
    if (isChecked('meen-cmd-dobrou')) p_cmd++;
    if (isChecked('meen-cmd-chao')) p_cmd++;

    // 9. Leitura (1)
    const p_lei = isChecked('meen-leitura') ? 1 : 0;
    
    // 10. Desenho (1)
    const p_des = isChecked('meen-desenho') ? 1 : 0;

    // --- Cálculo Final ---
    const total = p_ot + p_oe + p_reg + p_calc + p_evo + p_nom + p_rep + p_cmd + p_lei + p_des;

    // Classificação
    let classificacao = '';
    if (total >= 27) {
        classificacao = 'Normal';
    } else if (total >= 21) {
        classificacao = 'Comp. Cognitivo Leve';
    } else if (total >= 11) {
        classificacao = 'Comp. Cognitivo Moderado';
    } else {
        classificacao = 'Comp. Cognitivo Grave';
    }

    // Linha de Cópia
    const detalhe = `
        MEEN: ${total}/30<br>
        (OT:${p_ot}/5 OE:${p_oe}/5 Reg:${p_reg}/3 Calc:${p_calc}/5 Evo:${p_evo}/3 Nom:${p_nom}/2 Rep:${p_rep}/1 Cmd:${p_cmd}/3 Lei:${p_lei}/1 Des:${p_des}/1)
    `;

    // Exibir o resultado
    document.getElementById('meen-placar-numero').innerText = total;
    document.getElementById('meen-placar-detalhe').innerHTML = detalhe;
    document.getElementById('meen-placar-classificacao').innerText = classificacao;
}


/**
 * Função auxiliar para criar GRUPOS de checkboxes
 * (Não mudou)
 */
function meenGrupoCheckbox(titulo, itens, subtitulo = "") {
    let subHtml = subtitulo ? `<span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">${subtitulo}</span>` : "";
    let checkboxesHtml = itens.map(item => meenCheckbox(item.id, item.texto)).join('');
    return `
    <div class="grupo-radio">
        <h4>${titulo}</h4>
        ${subHtml}
        ${checkboxesHtml}
    </div>
    `;
}

/**
 * Função auxiliar para criar UM checkbox
 * (Não mudou)
 */
function meenCheckbox(id, texto) {
    return `
    <div class="opcao-radio" style="padding-left: 50px;">
        <label>
            <input type="checkbox" id="${id}" onchange="calcularMEEN()">
            <span class="checkmark-check" style="top: 15px; left: 20px;"></span>
            ${texto}
        </label>
    </div>
    `;
}

/**
 * Função para trocar as abas
 * (Não mudou)
 */
function meenMudarAba(aba) {
    if (aba === 'pontuacao') {
        document.getElementById('meen-tab-pontuacao').style.display = 'block';
        document.getElementById('meen-tab-instrucoes').style.display = 'none';
        document.getElementById('meen-btn-pontuacao').classList.add('active');
        document.getElementById('meen-btn-instrucoes').classList.remove('active');
    } else {
        document.getElementById('meen-tab-pontuacao').style.display = 'none';
        document.getElementById('meen-tab-instrucoes').style.display = 'block';
        document.getElementById('meen-btn-pontuacao').classList.remove('active');
        document.getElementById('meen-btn-instrucoes').classList.add('active');
    }
}

/**
 * Adiciona TODOS os estilos necessários para o MEEN
 * (Não mudou)
 */
function adicionarEstiloMEEN() {
    
    // 1. Estilo das ABAS (do MoCA)
    if (!document.getElementById('calc-tabs-style')) {
        const styleTabs = document.createElement('style');
        styleTabs.id = 'calc-tabs-style';
        styleTabs.innerHTML = `
            .calc-tabs { display: flex; border-bottom: 2px solid #005a9c; margin-bottom: 0; }
            .calc-tab-btn {
                padding: 10px 15px; cursor: pointer; background-color: #f0f8ff;
                border: none; border-radius: 5px 5px 0 0; font-size: 1em;
                font-weight: 600; color: #005a9c; opacity: 0.7; margin-right: 5px;
            }
            .calc-tab-btn.active { background-color: #005a9c; color: white; opacity: 1; }
            .calc-tab-pane .grupo-radio:first-child,
            .calc-tab-pane .aviso-instrucao:first-child { border-top-left-radius: 0; }
        `;
        document.head.appendChild(styleTabs);
    }

    // 2. Estilo para Checkbox (do MoCA)
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

    // 3. Estilo para Caixa de Cópia (do MoCA)
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

    // 4. Estilos NOVOS para Leitura e Desenho
    if (!document.getElementById('meen-style')) {
        const styleMEEN = document.createElement('style');
        styleMEEN.id = 'meen-style';
        styleMEEN.innerHTML = `
            .meen-leitura-box {
                font-size: 3.5em; /* "bem grande mesmo" */
                font-weight: 700;
                text-align: center;
                padding: 40px 20px;
                background-color: #f8f9fa;
                border: 1px solid #ccc;
                margin: 15px 20px;
                border-radius: 5px;
            }
            .meen-desenho-box {
                padding: 20px;
                text-align: center;
                background-color: #f8f9fa;
                border: 1px solid #ccc;
                margin: 15px 20px;
                border-radius: 5px;
            }
            .meen-desenho-box img {
                max-width: 100%;
                height: auto;
                max-height: 200px;
            }
        `;
        document.head.appendChild(styleMEEN);
    }
}