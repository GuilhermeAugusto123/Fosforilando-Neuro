// Arquivo: /calculadoras/mgfa.js

/**
 * Função principal chamada pelo app.js
 */
function mgfa() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="grupo-radio">
                    <h4>1. Selecione a Classe de Gravidade</h4>
                    
                    <div class="opcao-radio"><label><input type="radio" name="mgfa-classe" value="I" onchange="calcularMGFA()" checked><span class="checkmark"></span>
                        <b>Classe I:</b> Fraqueza ocular pura, podendo incluir fraqueza do fechamento ocular. Todos os outros músculos estão normais.
                    </label></div>
                    
                    <div class="opcao-radio"><label><input type="radio" name="mgfa-classe" value="II" onchange="calcularMGFA()"><span class="checkmark"></span>
                        <b>Classe II:</b> Fraqueza leve em músculos apendiculares, axiais, orofaríngeos ou respiratórios. Pode haver envolvimento ocular.
                    </label></div>
                    
                    <div class="opcao-radio"><label><input type="radio" name="mgfa-classe" value="III" onchange="calcularMGFA()"><span class="checkmark"></span>
                        <b>Classe III:</b> Fraqueza moderada em músculos apendiculares, axiais, orofaríngeos ou respiratórios. Pode haver envolvimento ocular.
                    </label></div>
                    
                    <div class="opcao-radio"><label><input type="radio" name="mgfa-classe" value="IV" onchange="calcularMGFA()"><span class="checkmark"></span>
                        <b>Classe IV:</b> Fraqueza grave em músculos apendiculares, axiais, orofaríngeos ou respiratórios. Pode haver envolvimento ocular.
                    </label></div>
                    
                    <div class="opcao-radio"><label><input type="radio" name="mgfa-classe" value="V" onchange="calcularMGFA()"><span class="checkmark"></span>
                        <b>Classe V:</b> Intubação, com ou sem ventilação mecânica, exceto quando utilizada para controle pós-operatório de rotina.
                    </label></div>
                </div>

                <div class="grupo-radio" id="mgfa-subtipo-box" style="display: none;">
                    <h4>2. Selecione o Subtipo de Fraqueza</h4>
                    
                    <div class="opcao-radio"><label><input type="radio" name="mgfa-subtipo" value="a" onchange="calcularMGFA()" checked><span class="checkmark"></span>
                        <b>Subtipo a:</b> Predomínio de fraqueza nos membros, músculos axiais ou ambos.
                    </label></div>
                    
                    <div class="opcao-radio"><label><input type="radio" name="mgfa-subtipo" value="b" onchange="calcularMGFA()"><span class="checkmark"></span>
                        <b>Subtipo b:</b> Predomínio de fraqueza nos músculos orofaríngeos, respiratórios ou ambos.
                    </label></div>
                </div>


            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Resultado MGFA</h3>
                    
                    <div class="placar-numero" id="mgfa-placar-classe" style="font-size: 3.5em;">Classe I</div>
                    <div class="placar-detalhe" id="mgfa-placar-descricao" style="font-size: 1.1em; line-height: 1.4; padding: 0 10px;">
                        Fraqueza ocular pura, podendo incluir fraqueza do fechamento ocular. Todos os outros músculos estão normais.
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial
    calcularMGFA();
}

/**
 * Função de cálculo (chamada automaticamente)
 * Esta função também controla a visibilidade da caixa de subtipo.
 */
function calcularMGFA() {
    
    // 1. Obter os valores selecionados
    const classe = document.querySelector('input[name="mgfa-classe"]:checked').value;
    const subtipo = document.querySelector('input[name="mgfa-subtipo"]:checked').value;
    
    // 2. Lógica de visibilidade (O seu "insight"!)
    const subtipoBox = document.getElementById('mgfa-subtipo-box');
    if (classe === 'II' || classe === 'III' || classe === 'IV') {
        subtipoBox.style.display = 'block'; // Mostra a caixa
    } else {
        subtipoBox.style.display = 'none'; // Esconde a caixa
    }

    // 3. Definir o placar e a descrição
    let placarFinal = '';
    let descricaoFinal = '';

    switch (classe) {
        case 'I':
            placarFinal = 'Classe I';
            descricaoFinal = 'Fraqueza ocular pura, podendo incluir fraqueza do fechamento ocular. Todos os outros músculos estão normais.';
            break;
        case 'II':
            placarFinal = `Classe II${subtipo}`;
            if (subtipo === 'a') {
                descricaoFinal = 'Fraqueza leve em músculos apendiculares, axiais, ou ambos (predomínio de membros/axiais). Pode haver envolvimento ocular.';
            } else {
                descricaoFinal = 'Fraqueza leve em músculos orofaríngeos, respiratórios, ou ambos (predomínio orofaríngeo/respiratório). Pode haver envolvimento ocular.';
            }
            break;
        case 'III':
            placarFinal = `Classe III${subtipo}`;
            if (subtipo === 'a') {
                descricaoFinal = 'Fraqueza moderada em músculos apendiculares, axiais, ou ambos (predomínio de membros/axiais). Pode haver envolvimento ocular.';
            } else {
                descricaoFinal = 'Fraqueza moderada em músculos orofaríngeos, respiratórios, ou ambos (predomínio orofaríngeo/respiratório). Pode haver envolvimento ocular.';
            }
            break;
        case 'IV':
            placarFinal = `Classe IV${subtipo}`;
            if (subtipo === 'a') {
                descricaoFinal = 'Fraqueza grave em músculos apendiculares, axiais, ou ambos (predomínio de membros/axiais). Pode haver envolvimento ocular.';
            } else {
                descricaoFinal = 'Fraqueza grave em músculos orofaríngeos, respiratórios, ou ambos (predomínio orofaríngeo/respiratório). Pode haver envolvimento ocular.';
            }
            break;
        case 'V':
            placarFinal = 'Classe V';
            descricaoFinal = 'Intubação, com ou sem ventilação mecânica, exceto quando utilizada para controle pós-operatório de rotina.';
            break;
    }

    // 4. Exibir o resultado
    document.getElementById('mgfa-placar-classe').innerText = placarFinal;
    document.getElementById('mgfa-placar-descricao').innerText = descricaoFinal;
}