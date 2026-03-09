// Arquivo: /calculadoras/compass31.js

function compass31() {
    // Banco de Dados das 31 Questões (Baseado no PDF Oficial da Versão Portuguesa)
    const questoes = [
        // --- DOMÍNIO 1: ORTOSTÁTICO ---
        { id: 1, dominio: 'orto', text: "1. No último ano, alguma vez sentiu-se fraco ou estonteado ou teve dificuldade em pensar logo após se levantar de uma posição sentada ou deitada?", options: [ {v:1, l:"Sim"}, {v:0, l:"Não"} ] },
        { id: 2, dominio: 'orto', text: "2. Ao levantar-se, com que frequência sente esses sintomas?", options: [ {v:1, l:"Raramente"}, {v:2, l:"Ocasionalmente"}, {v:3, l:"Frequentemente"}, {v:4, l:"Quase sempre"} ] },
        { id: 3, dominio: 'orto', text: "3. Como avalia a gravidade desses sintomas?", options: [ {v:1, l:"Ligeira"}, {v:2, l:"Moderada"}, {v:3, l:"Grave"} ] },
        { id: 4, dominio: 'orto', text: "4. No último ano, esses sintomas que sentiu:", options: [ {v:5, l:"Ficaram muito pior"}, {v:4, l:"Ficaram um pouco pior"}, {v:3, l:"Permaneceram quase o mesmo"}, {v:2, l:"Ficaram um pouco melhor"}, {v:1, l:"Ficaram muito melhor"}, {v:0, l:"Desapareceram completamente"} ] },
        
        // --- DOMÍNIO 2: VASOMOTOR ---
        { id: 5, dominio: 'vaso', text: "5. No último ano, alguma vez notou alterações da cor da sua pele, como vermelho, branco ou arroxeado?", options: [ {v:1, l:"Sim"}, {v:0, l:"Não"} ] },
        { id: 6, dominio: 'vaso', text: "6. Que partes do seu corpo foram afetadas por estas alterações de cor?", options: [ {v:1, l:"Mãos"}, {v:2, l:"Pés"}, {v:3, l:"Ambos (Mãos e Pés)"} ] },
        { id: 7, dominio: 'vaso', text: "7. Estas alterações na sua cor da pele:", options: [ {v:5, l:"Ficaram muito pior"}, {v:4, l:"Ficaram um pouco pior"}, {v:3, l:"Permaneceram quase o mesmo"}, {v:2, l:"Ficaram um pouco melhor"}, {v:1, l:"Ficaram muito melhor"}, {v:0, l:"Desapareceram completamente"} ] },
        
        // --- DOMÍNIO 3: SECRETOMOTOR ---
        { id: 8, dominio: 'secreto', text: "8. Nos últimos 5 anos, que alterações ocorreram na transpiração geral do seu corpo?", options: [ {v:2, l:"Suo muito mais do que costumava"}, {v:1, l:"Suo um pouco mais do que costumava"}, {v:0, l:"Não notei qualquer alteração"}, {v:3, l:"Suo um pouco menos do que costumava"}, {v:4, l:"Suo muito menos do que costumava"} ] },
        { id: 9, dominio: 'secreto', text: "9. Sente os seus olhos extremamente secos?", options: [ {v:1, l:"Sim"}, {v:0, l:"Não"} ] },
        { id: 10, dominio: 'secreto', text: "10. Sente a sua boca extremamente seca?", options: [ {v:1, l:"Sim"}, {v:0, l:"Não"} ] },
        { id: 11, dominio: 'secreto', text: "11. Para o sintoma de olhos/boca seca que teve durante o maior período de tempo, esse sintoma:", options: [ {v:0, l:"Não tive nenhum destes sintomas"}, {v:5, l:"Ficou muito pior"}, {v:4, l:"Ficou um pouco pior"}, {v:3, l:"Ficou quase o mesmo"}, {v:2, l:"Ficou um pouco melhor"}, {v:1, l:"Ficou muito melhor"}, {v:0, l:"Desapareceu completamente"} ] },
        
        // --- DOMÍNIO 4: GASTROINTESTINAL ---
        { id: 12, dominio: 'gi', text: "12. No último ano, notou alguma mudança na forma como fica cheio quando come uma refeição?", options: [ {v:4, l:"Fico cheio muito mais rapidamente agora"}, {v:3, l:"Fico cheio mais rapidamente agora"}, {v:0, l:"Não notei qualquer mudança"}, {v:1, l:"Fico cheio menos rapidamente agora"}, {v:2, l:"Fico cheio muito menos rapidamente agora"} ] },
        { id: 13, dominio: 'gi', text: "13. No último ano, sentiu-se excessivamente cheio (sensação de inchaço) após uma refeição?", options: [ {v:0, l:"Nunca"}, {v:1, l:"Às vezes"}, {v:2, l:"Uma grande parte do tempo"} ] },
        { id: 14, dominio: 'gi', text: "14. No último ano, vomitou após uma refeição?", options: [ {v:0, l:"Nunca"}, {v:1, l:"Às vezes"}, {v:2, l:"Uma grande parte do tempo"} ] },
        { id: 15, dominio: 'gi', text: "15. No último ano, teve dor tipo cólica ou dor abdominal com cólica?", options: [ {v:0, l:"Nunca"}, {v:1, l:"Às vezes"}, {v:2, l:"Uma grande parte do tempo"} ] },
        { id: 16, dominio: 'gi', text: "16. No último ano, teve crises de diarreia?", options: [ {v:1, l:"Sim"}, {v:0, l:"Não"} ] },
        { id: 17, dominio: 'gi', text: "17. Com que frequência isso acontece?", options: [ {v:1, l:"Raramente"}, {v:2, l:"Ocasionalmente"}, {v:3, l:"Frequentemente"}, {v:4, l:"Constantemente"} ] },
        { id: 18, dominio: 'gi', text: "18. Como avalia a gravidade das crises de diarreia?", options: [ {v:1, l:"Ligeira"}, {v:2, l:"Moderada"}, {v:3, l:"Grave"} ] },
        { id: 19, dominio: 'gi', text: "19. Essas crises de diarreia estão:", options: [ {v:5, l:"Muito pior"}, {v:4, l:"Um pouco pior"}, {v:3, l:"Quase o mesmo"}, {v:2, l:"Um pouco melhor"}, {v:1, l:"Muito melhor"}, {v:0, l:"Desapareceram completamente"} ] },
        { id: 20, dominio: 'gi', text: "20. No último ano, teve prisão de ventre?", options: [ {v:1, l:"Sim"}, {v:0, l:"Não"} ] },
        { id: 21, dominio: 'gi', text: "21. Com que frequência tem prisão de ventre?", options: [ {v:1, l:"Raramente"}, {v:2, l:"Ocasionalmente"}, {v:3, l:"Frequentemente"}, {v:4, l:"Constantemente"} ] },
        { id: 22, dominio: 'gi', text: "22. Como avalia a gravidade da prisão de ventre?", options: [ {v:1, l:"Ligeira"}, {v:2, l:"Moderada"}, {v:3, l:"Grave"} ] },
        { id: 23, dominio: 'gi', text: "23. A sua prisão de ventre está:", options: [ {v:5, l:"Muito pior"}, {v:4, l:"Um pouco pior"}, {v:3, l:"Quase o mesmo"}, {v:2, l:"Um pouco melhor"}, {v:1, l:"Muito melhor"}, {v:0, l:"Desapareceu completamente"} ] },
        
        // --- DOMÍNIO 5: BEXIGA ---
        // Adicionada a opção "0 - Nunca" para que o escore parta do normal.
        { id: 24, dominio: 'bexiga', text: "24. No último ano, alguma vez perdeu o controlo da função da sua bexiga?", options: [ {v:0, l:"Nunca"}, {v:1, l:"Raramente"}, {v:2, l:"Ocasionalmente"}, {v:3, l:"Frequentemente"}, {v:4, l:"Constantemente"} ] },
        { id: 25, dominio: 'bexiga', text: "25. No último ano, alguma vez teve dificuldade em urinar?", options: [ {v:0, l:"Nunca"}, {v:1, l:"Raramente"}, {v:2, l:"Ocasionalmente"}, {v:3, l:"Frequentemente"}, {v:4, l:"Constantemente"} ] },
        { id: 26, dominio: 'bexiga', text: "26. No último ano, alguma vez teve problemas em esvaziar completamente a bexiga?", options: [ {v:0, l:"Nunca"}, {v:1, l:"Raramente"}, {v:2, l:"Ocasionalmente"}, {v:3, l:"Frequentemente"}, {v:4, l:"Constantemente"} ] },
        
        // --- DOMÍNIO 6: PUPILOMOTOR ---
        { id: 27, dominio: 'pupilo', text: "27. No último ano, sem óculos de sol, a luz brilhante incomodava os seus olhos?", options: [ {v:0, l:"Nunca"}, {v:1, l:"Ocasionalmente"}, {v:2, l:"Frequentemente"}, {v:3, l:"Sempre"} ] },
        { id: 28, dominio: 'pupilo', text: "28. Quão grave é esta sensibilidade à luz brilhante?", options: [ {v:1, l:"Ligeira"}, {v:2, l:"Moderada"}, {v:3, l:"Grave"} ] },
        { id: 29, dominio: 'pupilo', text: "29. No último ano, teve dificuldade para focar os seus olhos?", options: [ {v:0, l:"Nunca"}, {v:1, l:"Ocasionalmente"}, {v:2, l:"Frequentemente"}, {v:3, l:"Sempre"} ] },
        { id: 30, dominio: 'pupilo', text: "30. Quão grave é este problema de visão?", options: [ {v:1, l:"Ligeiro"}, {v:2, l:"Moderado"}, {v:3, l:"Grave"} ] },
        { id: 31, dominio: 'pupilo', text: "31. O sintoma mais problemático nos seus olhos está:", options: [ {v:0, l:"Não tive nenhum destes sintomas"}, {v:5, l:"Muito pior"}, {v:4, l:"Um pouco pior"}, {v:3, l:"Quase o mesmo"}, {v:2, l:"Um pouco melhor"}, {v:1, l:"Muito melhor"}, {v:0, l:"Desapareceu completamente"} ] }
    ];

    // Geração dinâmica do HTML das 31 perguntas
    let htmlPerguntas = "";

    questoes.forEach((q) => {
        let nameId = `compass_${q.id}`;
        let divId = `container_compass_${q.id}`;
        
        htmlPerguntas += `
            <div class="grupo-radio" id="${divId}">
                <h4 style="font-size: 0.95rem;">${q.text}</h4>
        `;
        
        q.options.forEach((opt, index) => {
            // Marca a primeira opção com valor 0 como 'checked' por padrão, se houver
            let isChecked = (opt.v === 0 && index === 0) ? "checked" : "";
            // Se for Sim/Não, deixa sem check inicial para obrigar a escolha
            if(q.options.length === 2 && opt.l === "Sim") isChecked = "";
            if(q.options.length === 2 && opt.l === "Não") isChecked = "checked";

            htmlPerguntas += `
                <div class="opcao-radio">
                    <label>
                        <input type="radio" name="${nameId}" value="${opt.v}" data-dominio="${q.dominio}" onchange="verificarCondicoesCompass(); calcularCompass()" ${isChecked}>
                        <span class="checkmark"></span>${opt.l}
                    </label>
                </div>
            `;
        });
        htmlPerguntas += `</div>`;
    });

    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>COMPASS 31 (0-100 pts)</h5>
                    <ul>
                        <li>Questionário Consolidado de Sintomas Autonômicos (Versão Oficial em Português).</li>
                        <li>A lógica de "saltar perguntas" é aplicada automaticamente de acordo com as suas respostas.</li>
                    </ul>
                </div>
                ${htmlPerguntas}
            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>COMPASS 31</h3>
                    
                    <div class="placar-numero" id="compass-placar-numero">0</div>
                    <div class="placar-detalhe" id="compass-placar-classificacao" style="font-size: 1.1em; line-height: 1.4; padding: 0 10px;">
                        Escore Total (0-100)
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="compass-placar-detalhe" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                    </div>
                </div>
            </div> 
        </div> 
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCopiaCompass();
    verificarCondicoesCompass(); // Roda a primeira vez para esconder as perguntas certas
    calcularCompass();
}

/**
 * Função Mágica que esconde/mostra as perguntas baseada nas respostas
 */
window.verificarCondicoesCompass = function() {
    // Helper para mostrar/esconder blocos inteiros
    const toggleVisibilidade = (mostrar, ...ids) => {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.style.display = mostrar ? 'block' : 'none';
                if(!mostrar) {
                    // Se estiver escondido, desmarca a bolinha (para não pontuar invisível)
                    const radios = el.querySelectorAll('input[type="radio"]');
                    radios.forEach(r => {
                        // Se a opção tiver valor 0, marca ela como padrão ao esconder
                        if(r.value === "0") r.checked = true;
                        else r.checked = false;
                    });
                }
            }
        });
    };

    // Q1: Se Não (0), pula Q2, Q3, Q4
    const q1 = document.querySelector('input[name="compass_1"]:checked');
    toggleVisibilidade(q1 && q1.value === "1", 'container_compass_2', 'container_compass_3', 'container_compass_4');

    // Q5: Se Não (0), pula Q6, Q7
    const q5 = document.querySelector('input[name="compass_5"]:checked');
    toggleVisibilidade(q5 && q5.value === "1", 'container_compass_6', 'container_compass_7');

    // Q16: Se Não (0), pula Q17, Q18, Q19
    const q16 = document.querySelector('input[name="compass_16"]:checked');
    toggleVisibilidade(q16 && q16.value === "1", 'container_compass_17', 'container_compass_18', 'container_compass_19');

    // Q20: Se Não (0), pula Q21, Q22, Q23
    const q20 = document.querySelector('input[name="compass_20"]:checked');
    toggleVisibilidade(q20 && q20.value === "1", 'container_compass_21', 'container_compass_22', 'container_compass_23');

    // Q27: Se Nunca (0), pula Q28
    const q27 = document.querySelector('input[name="compass_27"]:checked');
    toggleVisibilidade(q27 && q27.value !== "0", 'container_compass_28');

    // Q29: Se Nunca (0), pula Q30
    const q29 = document.querySelector('input[name="compass_29"]:checked');
    toggleVisibilidade(q29 && q29.value !== "0", 'container_compass_30');
};

/**
 * Função de cálculo (chamada automaticamente)
 */
window.calcularCompass = function() {
    const selecionados = document.querySelectorAll('input[type="radio"]:checked');
    let pontuacoes = { orto: 0, vaso: 0, secreto: 0, gi: 0, bexiga: 0, pupilo: 0 };
    
    // Total máximo possível em valores brutos de cada bloco (usado para converter em %)
    let maximos = { orto: 13, vaso: 9, secreto: 12, gi: 20, bexiga: 12, pupilo: 17 };

    // 1. Somar os valores marcados
    selecionados.forEach(radio => {
        // Ignora campos que foram escondidos pela lógica condicional (mesmo que tenham value 0)
        let divPai = radio.closest('.grupo-radio');
        if (divPai && divPai.style.display !== 'none') {
            let dominio = radio.getAttribute('data-dominio');
            pontuacoes[dominio] += parseInt(radio.value);
        }
    });

    // 2. Calcular o score ponderado (Peso oficial do COMPASS 31)
    let scoreOrto = (pontuacoes.orto / maximos.orto) * 40;
    let scoreVaso = (pontuacoes.vaso / maximos.vaso) * 5;
    let scoreSecreto = (pontuacoes.secreto / maximos.secreto) * 15;
    let scoreGi = (pontuacoes.gi / maximos.gi) * 25;
    let scoreBexiga = (pontuacoes.bexiga / maximos.bexiga) * 10;
    let scorePupilo = (pontuacoes.pupilo / maximos.pupilo) * 5;

    let total = scoreOrto + scoreVaso + scoreSecreto + scoreGi + scoreBexiga + scorePupilo;
    if (total > 100) total = 100;

    // 3. Resumo para o Prontuário
    const detalhe = `
        <strong>Total: ${total.toFixed(1)} / 100</strong><br><br>
        Ortostático: ${scoreOrto.toFixed(1)} / 40<br>
        Vasomotor: ${scoreVaso.toFixed(1)} / 5<br>
        Secretomotor: ${scoreSecreto.toFixed(1)} / 15<br>
        Gastrointestinal: ${scoreGi.toFixed(1)} / 25<br>
        Bexiga: ${scoreBexiga.toFixed(1)} / 10<br>
        Pupilomotor: ${scorePupilo.toFixed(1)} / 5
    `;

    // 4. Exibir no painel
    document.getElementById('compass-placar-numero').innerText = Math.round(total);
    document.getElementById('compass-placar-detalhe').innerHTML = detalhe;
    
    let boxClassificacao = document.getElementById('compass-placar-numero');
    if (total < 15) boxClassificacao.style.color = "#0056b3"; 
    else if (total < 40) boxClassificacao.style.color = "#ff9800"; 
    else boxClassificacao.style.color = "#dc3545"; 
};

function adicionarEstiloCopiaCompass() {
    if (document.getElementById('copia-style-app')) return;
    const style = document.createElement('style');
    style.id = 'copia-style-app';
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