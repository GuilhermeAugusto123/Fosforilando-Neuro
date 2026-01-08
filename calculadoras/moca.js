// Arquivo: /calculadoras/moca.js (Versão 2.1 - Com botão Imprimir)

/**
 * Função principal chamada pelo app.js
 */
function moca() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="calc-tabs">
                    <button id="moca-btn-pontuacao" class="calc-tab-btn active" onclick="mocaMudarAba('pontuacao')">Pontuação</button>
                    <button id="moca-btn-instrucoes" class="calc-tab-btn" onclick="mocaMudarAba('instrucoes')">Instruções de Aplicação</button>
                    
                    <a href="pdf/moca_teste.pdf" target="_blank" class="calc-tab-btn-link">
                        🖨️ Abrir PDF
                    </a>
                </div>

                <div id="moca-tab-pontuacao" class="calc-tab-pane active">
                    <div class="aviso-instrucao" style="margin-top: 20px;">
                        <h5>Pontuação MoCA (0-30 pts)</h5>
                        <ul><li>Marque os itens que o paciente acertou.</li></ul>
                    </div>
                    
                    ${mocaGrupoCheckbox('Visuoespacial / Executivo (Máx 5)', [
                        { id: 'moca-trilhas', texto: 'Alternância de Trilhas (1-A...5-E)' },
                        { id: 'moca-cubo', texto: 'Cubo (tridimensional, linhas, etc.)' },
                        { id: 'moca-relogio-contorno', texto: 'Relógio: Contorno (círculo)' },
                        { id: 'moca-relogio-numeros', texto: 'Relógio: Números (corretos, na ordem)' },
                        { id: 'moca-relogio-ponteiros', texto: 'Relógio: Ponteiros (11h10)' }
                    ])}
                    
                    ${mocaGrupoCheckbox('Nomeação (Máx 3)', [
                        { id: 'moca-leao', texto: 'Leão' },
                        { id: 'moca-rino', texto: 'Rinoceronte' },
                        { id: 'moca-camelo', texto: 'Camelo / Dromedário' }
                    ])}

                    <div class="grupo-radio">
                        <h4>Atenção (Máx 6)</h4>
                        <div style="padding: 10px 20px 0 20px;">
                            ${mocaCheckbox('moca-dig-direto', 'Dígitos na Ordem Direta (2 1 8 5 4)')}
                            ${mocaCheckbox('moca-dig-inverso', 'Dígitos na Ordem Inversa (7 4 2)')}
                            ${mocaCheckbox('moca-vigilancia', 'Vigilância (Bater no "A", 0-1 erro)')}
                        </div>
                        
                        <h5 style="padding: 15px 20px 5px; color: #333; margin:0;">Sete Seriado (Pontuação automática abaixo):</h5>
                        <div style="padding: 0 20px 20px;">
                            ${mocaCheckbox('moca-serial-93', '93')}
                            ${mocaCheckbox('moca-serial-86', '86')}
                            ${mocaCheckbox('moca-serial-79', '79')}
                            ${mocaCheckbox('moca-serial-72', '72')}
                            ${mocaCheckbox('moca-serial-65', '65')}
                        </div>
                    </div>
                    
                    ${mocaGrupoCheckbox('Linguagem (Máx 3)', [
                        { id: 'moca-frase1', texto: 'Frase 1: "Eu somente sei que é João..."' },
                        { id: 'moca-frase2', texto: 'Frase 2: "O gato sempre se esconde..."' },
                        { id: 'moca-fluencia', texto: 'Fluência Verbal (≥ 11 palavras com "F")' }
                    ])}
                    
                    ${mocaGrupoCheckbox('Abstração (Máx 2)', [
                        { id: 'moca-abs-trem', texto: 'Trem - Bicicleta (transporte)' },
                        { id: 'moca-abs-relogio', texto: 'Relógio - Régua (medida)' }
                    ])}
                    
                    ${mocaGrupoCheckbox('Evocação Tardia (Máx 5)', [
                        { id: 'moca-evo-rosto', texto: 'Rosto' },
                        { id: 'moca-evo-veludo', texto: 'Veludo' },
                        { id: 'moca-evo-igreja', texto: 'Igreja' },
                        { id: 'moca-evo-margarida', texto: 'Margarida' },
                        { id: 'moca-evo-vermelho', texto: 'Vermelho' }
                    ])}
                    
                    ${mocaGrupoCheckbox('Orientação (Máx 6)', [
                        { id: 'moca-ori-dia', texto: 'Dia do mês' },
                        { id: 'moca-ori-mes', texto: 'Mês' },
                        { id: 'moca-ori-ano', texto: 'Ano' },
                        { id: 'moca-ori-semana', texto: 'Dia da semana' },
                        { id: 'moca-ori-lugar', texto: 'Lugar' },
                        { id: 'moca-ori-cidade', texto: 'Cidade' }
                    ])}
                    
                    <div class="grupo-radio">
                        <h4>Ajuste de Escolaridade</h4>
                        ${mocaCheckbox('moca-escolaridade', 'Adicionar 1 ponto (Escolaridade ≤ 12 anos)')}
                    </div>
                </div> <div id="moca-tab-instrucoes" class="calc-tab-pane" style="display: none;">
                    <div style="padding: 20px 5px;">
                        <h4>1. Alternância de Trilhas</h4>
                        <p><b>Instrução:</b> "Por favor, desenhe uma linha indo de um número para uma letra em ordem ascendente. Comece aqui (aponte para o 1) e desenhe uma linha de 1 para A, depois para 2, e assim por diante. Termine aqui (aponte para E)."</p>
                        <p><b>Pontuação:</b> 1 ponto se desenhar o padrão 1-A-2-B-3-C-4-D-5-E corretamente, sem cruzar linhas. Qualquer erro não corrigido imediatamente zera a pontuação.</p>

                        <h4>2. Habilidades Visuoconstrutivas (Cubo)</h4>
                        <p><b>Instrução:</b> "Copie este desenho o mais precisamente que você puder."</p>
                        <p><b>Pontuação:</b> 1 ponto para um desenho correto: tridimensional, todas as linhas presentes e nenhuma adicionada, linhas relativamente paralelas e de comprimento similar.</p>

                        <h4>3. Habilidades Visuoconstrutivas (Relógio)</h4>
                        <p><b>Instrução:</b> "Desenhe um relógio. Coloque todos os números e marque a hora 11:10."</p>
                        <p><b>Pontuação:</b> 1 ponto para cada critério: <b>Contorno</b> (círculo com distorção mínima), <b>Números</b> (todos presentes, na ordem correta e nos quadrantes aproximados), <b>Ponteiros</b> (dois ponteiros indicando a hora correta, o de horas menor que o de minutos, ambos centralizados).</p>

                        <h4>4. Nomeação</h4>
                        <p><b>Instrução:</b> "Me diga o nome desse animal." (apontando para cada figura)</p>
                        <p><b>Pontuação:</b> 1 ponto para cada: (1) Leão, (2) Rinoceronte, (3) Camelo ou Dromedário.</p>

                        <h4>5. Memória (Não pontua nesta fase)</h4>
                        <p><b>Instrução:</b> "Este é um teste de memória. Eu lerei uma lista de palavras que você deverá lembrar-se agora e mais tarde. Ouça com atenção. Quando eu terminar, me diga todas as palavras que puder lembrar." Leia as palavras (Rosto, Veludo, Igreja, Margarida, Vermelho) na velocidade de uma por segundo. Após a primeira tentativa, leia a lista uma segunda vez e peça para o paciente repetir novamente.</p>

                        <h4>6. Atenção</h4>
                        <p><b>Dígitos na Ordem Direta (1 ponto):</b> Diga: "Eu lhe direi alguns números e quando eu terminar, repita na ordem exata que eu os disse."</p>
                        <p><b>Dígitos na Ordem Inversa (1 ponto):</b> Diga: "Agora eu lhe direi mais alguns números, porém quando eu terminar você deverá repeti-los para mim na ordem inversa."</p>
                        <p><b>Vigilância (1 ponto):</b> Diga: "Eu lerei uma sequência de letras. Toda a vez que eu disser a letra A, bata a mão uma vez. Se eu disser uma letra diferente, não bata a sua mão." (Pontue 1 se houver 0 ou 1 erro).</p>
                        <p><b>Sete Seriado (0-3 pontos):</b> Diga: "Agora eu lhe pedirei para que você subtraia sete a partir de 100, e então siga subtraindo sete da sua resposta até eu lhe dizer que pare." A pontuação é: 4 ou 5 subtrações corretas = 3 pontos; 2 ou 3 corretas = 2 pontos; 1 correta = 1 ponto.</p>

                        <h4>7. Linguagem</h4>
                        <p><b>Repetição de Sentenças (2 pontos):</b> Peça para repetir exatamente as duas frases. 1 ponto para cada frase correta. Fique atento a omissões e substituições.</p>
                        <p><b>Fluência Verbal (1 ponto):</b> Diga: "Diga-me o maior número de palavras que você puder pensar que comecem com a letra F em um minuto. Não valem nomes próprios, números ou palavras com o mesmo radical." (1 ponto se ≥ 11 palavras em 60s).</p>

                        <h4>8. Abstração (2 pontos)</h4>
                        <p><b>Instrução:</b> Peça a semelhança entre cada par. Exemplo: "Em que uma laranja e uma banana são parecidas?". Se a resposta for concreta, dê uma única dica: "Diga de outra forma em que eles são parecidos".</p>
                        <p><b>Pontuação:</b> 1 ponto para cada par: Trem-bicicleta (meios de transporte), Relógio-régua (instrumentos de medida).</p>

                        <h4>9. Evocação Tardia (5 pontos)</h4>
                        <p><b>Instrução:</b> "Anteriormente, eu li algumas palavras para você, as quais eu pedi que você se lembrasse. Me diga quantas dessas palavras você pode lembrar."</p>
                        <p><b>Pontuação:</b> 1 ponto para cada palavra lembrada espontaneamente, sem nenhuma pista.</p>

                        <h4>10. Orientação (6 pontos)</h4>
                        <p><b>Instrução:</b> "Diga-me a data de hoje" (se necessário, peça especificamente dia, mês, ano, dia da semana). "Agora me diga o nome deste lugar e em que cidade fica."</p>
                        <p><b>Pontuação:</b> 1 ponto para cada item correto (dia, mês, ano, dia da semana, local, cidade).</p>

                        <hr>
                        <p style="font-size: 0.8em; color: #555;">Referência: STUDART NETO, Adalberto et al. Neurologia. 1. ed. Rio de Janeiro: Atheneu, 2021. 1450 p. Manual do médico-residente do Hospital das Clínicas da Faculdade de Medicina da Universidade de São Paulo.</p>
                    </div>
                </div> </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Escore MoCA</h3>
                    
                    <div class="placar-numero" id="moca-placar-numero">0</div>
                    <div class="placar-detalhe" id="moca-placar-classificacao" style="font-size: 1.3em; line-height: 1.4; padding: 0 10px;">
                        (Escore Máximo: 30)
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="moca-placar-detalhe" style="font-size: 0.9em;">
                        MoCA: 0/30 (Detalhes...)
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona todos os estilos necessários
    adicionarEstiloMOCA_v2();

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularMOCA();
}

/**
 * Função de CÁLCULO (v2.0)
 * (Não mudou do v2.0)
 */
function calcularMOCA() {
    
    // Função auxiliar para checar o checkbox
    const isChecked = (id) => document.getElementById(id).checked;

    // 1. Visuoespacial/Executivo (5 pts)
    let p1 = 0;
    if (isChecked('moca-trilhas')) p1++;
    if (isChecked('moca-cubo')) p1++;
    if (isChecked('moca-relogio-contorno')) p1++;
    if (isChecked('moca-relogio-numeros')) p1++;
    if (isChecked('moca-relogio-ponteiros')) p1++;

    // 2. Nomeação (3 pts)
    let p2 = 0;
    if (isChecked('moca-leao')) p2++;
    if (isChecked('moca-rino')) p2++;
    if (isChecked('moca-camelo')) p2++;
    
    // 3. Atenção (6 pts)
    let p3 = 0;
    if (isChecked('moca-dig-direto')) p3++;
    if (isChecked('moca-dig-inverso')) p3++;
    if (isChecked('moca-vigilancia')) p3++;
    
    // Pontuação do Sete Seriado (Máx 3 pts)
    let acertosSerial = 0;
    if (isChecked('moca-serial-93')) acertosSerial++;
    if (isChecked('moca-serial-86')) acertosSerial++;
    if (isChecked('moca-serial-79')) acertosSerial++;
    if (isChecked('moca-serial-72')) acertosSerial++;
    if (isChecked('moca-serial-65')) acertosSerial++;
    
    if (acertosSerial >= 4) {
        p3 += 3;
    } else if (acertosSerial >= 2) {
        p3 += 2;
    } else if (acertosSerial === 1) {
        p3 += 1;
    }

    // 4. Linguagem (3 pts)
    let p4 = 0;
    if (isChecked('moca-frase1')) p4++;
    if (isChecked('moca-frase2')) p4++;
    if (isChecked('moca-fluencia')) p4++;

    // 5. Abstração (2 pts)
    let p5 = 0;
    if (isChecked('moca-abs-trem')) p5++;
    if (isChecked('moca-abs-relogio')) p5++;

    // 6. Evocação Tardia (5 pts)
    let p6 = 0;
    if (isChecked('moca-evo-rosto')) p6++;
    if (isChecked('moca-evo-veludo')) p6++;
    if (isChecked('moca-evo-igreja')) p6++;
    if (isChecked('moca-evo-margarida')) p6++;
    if (isChecked('moca-evo-vermelho')) p6++;

    // 7. Orientação (6 pts)
    let p7 = 0;
    if (isChecked('moca-ori-dia')) p7++;
    if (isChecked('moca-ori-mes')) p7++;
    if (isChecked('moca-ori-ano')) p7++;
    if (isChecked('moca-ori-semana')) p7++;
    if (isChecked('moca-ori-lugar')) p7++;
    if (isChecked('moca-ori-cidade')) p7++;

    // 8. Escolaridade
    const p_esc = isChecked('moca-escolaridade') ? 1 : 0;

    // --- Cálculo Final ---
    let total = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p_esc;
    if (total > 30) {
        total = 30; // Limite máximo
    }

    // Classificação
    let classificacao = '';
    if (total >= 26) {
        classificacao = 'Resultado Normal';
    } else if (total >= 18) {
        classificacao = 'Comprometimento Cognitivo Leve';
    } else if (total >= 10) {
        classificacao = 'Comprometimento Cognitivo Moderado';
    } else {
        classificacao = 'Comprometimento Cognitivo Grave';
    }

    // Linha de Cópia
    const detalhe = `MoCA: ${total}/30 (Vis:${p1} Nom:${p2} Ate:${p3} Lin:${p4} Abs:${p5} Evo:${p6} Ori:${p7} Esc:${p_esc})`;

    // Exibir o resultado
    document.getElementById('moca-placar-numero').innerText = total;
    document.getElementById('moca-placar-detalhe').innerText = detalhe;
    document.getElementById('moca-placar-classificacao').innerText = classificacao;
}


/**
 * Função auxiliar para criar GRUPOS de checkboxes
 * (Não mudou)
 */
function mocaGrupoCheckbox(titulo, itens) {
    let checkboxesHtml = itens.map(item => mocaCheckbox(item.id, item.texto)).join('');
    return `
    <div class="grupo-radio">
        <h4>${titulo}</h4>
        ${checkboxesHtml}
    </div>
    `;
}

/**
 * Função auxiliar para criar UM checkbox
 * (Não mudou)
 */
function mocaCheckbox(id, texto) {
    return `
    <div class="opcao-radio" style="padding-left: 50px;">
        <label>
            <input type="checkbox" id="${id}" onchange="calcularMOCA()">
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
function mocaMudarAba(aba) {
    if (aba === 'pontuacao') {
        document.getElementById('moca-tab-pontuacao').style.display = 'block';
        document.getElementById('moca-tab-instrucoes').style.display = 'none';
        document.getElementById('moca-btn-pontuacao').classList.add('active');
        document.getElementById('moca-btn-instrucoes').classList.remove('active');
    } else {
        document.getElementById('moca-tab-pontuacao').style.display = 'none';
        document.getElementById('moca-tab-instrucoes').style.display = 'block';
        document.getElementById('moca-btn-pontuacao').classList.remove('active');
        document.getElementById('moca-btn-instrucoes').classList.add('active');
    }
}


/**
 * Adiciona TODOS os estilos necessários para o MoCA v2.0
 * (Não mudou)
 */
function adicionarEstiloMOCA_v2() {
    
    // 1. Estilo das ABAS (Novo)
    if (!document.getElementById('calc-tabs-style')) {
        const styleTabs = document.createElement('style');
        styleTabs.id = 'calc-tabs-style';
        styleTabs.innerHTML = `
            .calc-tabs {
                display: flex;
                border-bottom: 2px solid #005a9c;
                margin-bottom: 0; /* Remove a margem para colar no conteúdo */
            }
            .calc-tab-btn {
                padding: 10px 15px;
                cursor: pointer;
                background-color: #f0f8ff;
                border: none;
                border-radius: 5px 5px 0 0;
                font-size: 1em;
                font-weight: 600;
                color: #005a9c;
                opacity: 0.7;
                margin-right: 5px;
            }
            .calc-tab-btn.active {
                background-color: #005a9c;
                color: white;
                opacity: 1;
            }
            .calc-tab-pane {
                /* Oculta/mostra via JS */
            }
            /* Ajuste para as caixas de grupo dentro das abas */
            .calc-tab-pane .grupo-radio {
                border-top-left-radius: 0;
            }
        `;
        document.head.appendChild(styleTabs);
    }

    // 2. Estilo para Checkbox (do rope_pascal.js)
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

    // 3. Estilo para Caixa de Cópia (do edss.js)
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