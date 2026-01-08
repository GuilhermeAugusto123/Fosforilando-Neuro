// Arquivo: /calculadoras/hachinski.js

/**
 * Função principal chamada pelo app.js
 */
function hachinski() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Escore Isquêmico de Hachinski (0-18 pts)</h5>
                    <ul>
                        <li>Marque os itens presentes na história do paciente.</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>Características Clínicas</h4>
                    ${hachinskiCheckbox('hach-1', 'Início abrupto (Peso 2)')}
                    ${hachinskiCheckbox('hach-2', 'Evolução em degraus (Peso 1)')}
                    ${hachinskiCheckbox('hach-3', 'Curso flutuante (Peso 2)')}
                    ${hachinskiCheckbox('hach-4', 'Confusão noturna (Peso 1)')}
                    ${hachinskiCheckbox('hach-5', 'Preservação relativa da personalidade (Peso 1)')}
                    ${hachinskiCheckbox('hach-6', 'Depressão (Peso 1)')}
                    ${hachinskiCheckbox('hach-7', 'Queixas somáticas (Peso 1)')}
                    ${hachinskiCheckbox('hach-8', 'Incontinência emocional (Peso 1)')}
                    ${hachinskiCheckbox('hach-9', 'História de Hipertensão Arterial (Peso 1)')}
                    ${hachinskiCheckbox('hach-10', 'História de AVC (Peso 2)')}
                    ${hachinskiCheckbox('hach-11', 'Evidência de aterosclerose (Peso 1)')}
                    ${hachinskiCheckbox('hach-12', 'Sintomas neurológicos focais (Peso 2)')}
                    ${hachinskiCheckbox('hach-13', 'Sinais neurológicos focais (Peso 2)')}
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Escore de Hachinski</h3>
                    
                    <div class="placar-numero" id="hachinski-placar-numero">0</div>
                    <div class="placar-classificacao" id="hachinski-placar-classificacao" style="font-size: 1.3em; margin-top: 15px;">
                        Sugestivo de Demência Degenerativa
                    </div>
                    <div class="placar-detalhe" style="font-size: 0.9em; margin-top: 5px;">
                        (Escore Total 0-18)
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilos necessários (reutilizando IDs de estilo que já criamos)
    adicionarEstiloHachinski();

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularHachinski();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularHachinski() {
    
    const isChecked = (id) => document.getElementById(id).checked;

    // 1. Obter os valores dos 13 itens com seus pesos
    let total = 0;
    total += isChecked('hach-1') ? 2 : 0;  // Início abrupto
    total += isChecked('hach-2') ? 1 : 0;  // Evolução em degraus
    total += isChecked('hach-3') ? 2 : 0;  // Curso flutuante
    total += isChecked('hach-4') ? 1 : 0;  // Confusão noturna
    total += isChecked('hach-5') ? 1 : 0;  // Preservação personalidade
    total += isChecked('hach-6') ? 1 : 0;  // Depressão
    total += isChecked('hach-7') ? 1 : 0;  // Queixas somáticas
    total += isChecked('hach-8') ? 1 : 0;  // Incontinência emocional
    total += isChecked('hach-9') ? 1 : 0;  // HAS
    total += isChecked('hach-10') ? 2 : 0; // História de AVC
    total += isChecked('hach-11') ? 1 : 0; // Aterosclerose
    total += isChecked('hach-12') ? 2 : 0; // Sintomas focais
    total += isChecked('hach-13') ? 2 : 0; // Sinais focais
    
    // 2. Definir a classificação
    let classificacao = '';
    if (total >= 7) {
        classificacao = 'Sugestivo de Demência Vascular';
    } else if (total <= 4) {
        classificacao = 'Sugestivo de Demência Degenerativa (Alzheimer)';
    } else { // 5 ou 6
        classificacao = 'Misto / Indefinido';
    }

    // 3. Exibir o resultado
    document.getElementById('hachinski-placar-numero').innerText = total;
    document.getElementById('hachinski-placar-classificacao').innerText = classificacao;
}

/**
 * Função auxiliar para criar UM checkbox
 */
function hachinskiCheckbox(id, texto) {
    return `
    <div class="opcao-radio" style="padding-left: 50px;">
        <label>
            <input type="checkbox" id="${id}" onchange="calcularHachinski()">
            <span class="checkmark-check" style="top: 15px; left: 20px;"></span>
            ${texto}
        </label>
    </div>
    `;
}

/**
 * Adiciona estilos necessários (reutilizados)
 */
function adicionarEstiloHachinski() {
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
}