// Arquivo: /calculadoras/hsa_workflow.js

/**
 * Função principal chamada pelo app.js
 */
function hsa_workflow() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Workflow de HSA</h5>
                    <ul>
                        <li>Calcule o WFNS e o mFisher para obter o VASOGRADE.</li>
                    </ul>
                </div>

                <h3>1. Escala WFNS</h3>
                
                <div class="grupo-radio">
                    <h4>Escala de Coma de Glasgow (GCS)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-gcs" value="15" onchange="calcularHSAWorkflow()" checked><span class="checkmark"></span>GCS 15</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-gcs" value="14" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>GCS 14</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-gcs" value="13" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>GCS 13</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-gcs" value="12" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>GCS 12</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-gcs" value="11" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>GCS 11</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-gcs" value="10" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>GCS 10</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-gcs" value="9" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>GCS 9</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-gcs" value="8" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>GCS 8</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-gcs" value="7" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>GCS 7</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-gcs" value="6" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>GCS 6 ou menos</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>Déficit Motor Focal</h4>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-motor" value="1" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>Presente</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-motor" value="0" onchange="calcularHSAWorkflow()" checked><span class="checkmark"></span>Ausente</label></div>
                </div>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

                <h3>2. Escala de Fisher Modificada</h3>
                
                <div class="grupo-radio">
                    <h4>Classificação da hemorragia na TC</h4>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-fisher" value="0" onchange="calcularHSAWorkflow()" checked><span class="checkmark"></span>Grau 0: Sem HSA ou HIV</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-fisher" value="1" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>Grau 1: HSA fina/difusa, sem HIV</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-fisher" value="2" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>Grau 2: HSA fina/difusa, com HIV</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-fisher" value="3" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>Grau 3: HSA espessa (coágulo), sem HIV</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="hsa-fisher" value="4" onchange="calcularHSAWorkflow()"><span class="checkmark"></span>Grau 4: HSA espessa (coágulo), com HIV</label></div>
                </div>


            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Resultados HSA</h3>
                    
                    <div class="placar-numero" id="hsa-wfns-numero" style="font-size: 3.5em;">1</div>
                    <div class="placar-detalhe" id="hsa-wfns-detalhe">WFNS: 1</div>
                    <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">
                    
                    <div class="placar-numero" id="hsa-fisher-numero" style="font-size: 3.5em;">0</div>
                    <div class="placar-detalhe" id="hsa-fisher-detalhe">mFisher: 0</div>
                    <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">VASOGRADE</h4>
                    <div class="placar-classificacao" id="hsa-vasograde-classificacao" style="font-size: 1.5em; padding: 10px; border-radius: 5px;">VERDE</div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial
    calcularHSAWorkflow();
    
    // 4. Adiciona estilo para o VASOGRADE
    adicionarEstiloVasograde();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularHSAWorkflow() {
    
    // --- 1. Calcular WFNS ---
    const gcs = parseInt(document.querySelector('input[name="hsa-gcs"]:checked').value);
    const deficitMotor = parseInt(document.querySelector('input[name="hsa-motor"]:checked').value);
    
    let wfnsScore = 0;
    if (gcs === 15 && deficitMotor === 0) {
        wfnsScore = 1;
    } else if (gcs === 15 && deficitMotor === 1) {
        wfnsScore = 2; // GCS 15 com déficit motor
    } else if (gcs === 14 && deficitMotor === 0) {
        wfnsScore = 2; // GCS 14 sem déficit
    } else if (gcs === 14 && deficitMotor === 1) {
        wfnsScore = 3; // GCS 14 com déficit
    } else if (gcs === 13 && deficitMotor === 0) {
        wfnsScore = 3; // GCS 13 sem déficit
    } else if (gcs >= 7 && gcs <= 12) {
        wfnsScore = 4; // GCS 7-12 (com ou sem déficit)
    } else if (gcs <= 6) {
        wfnsScore = 5; // GCS 3-6 (com ou sem déficit)
    }
    
    // --- 2. Calcular Fisher Modificado ---
    const fisherScore = parseInt(document.querySelector('input[name="hsa-fisher"]:checked').value);

    // --- 3. Calcular VASOGRADE ---
    let vasogradeCor = '';
    let vasogradeTexto = '';

    // Lógica do VASOGRADE (baseada em WFNS e mFisher)
    if ( (wfnsScore === 1 || wfnsScore === 2) && (fisherScore === 1 || fisherScore === 2) ) {
        // WFNS 1-2 E mFisher 1-2
        vasogradeCor = 'verde';
        vasogradeTexto = 'VERDE';
    } else if ( (wfnsScore === 1 || wfnsScore === 2) && (fisherScore === 3 || fisherScore === 4) ) {
        // WFNS 1-2 E mFisher 3-4
        vasogradeCor = 'amarelo';
        vasogradeTexto = 'AMARELO';
    } else if ( (wfnsScore === 3) && (fisherScore === 1 || fisherScore === 2) ) {
        // WFNS 3 E mFisher 1-2
        vasogradeCor = 'amarelo';
        vasogradeTexto = 'AMARELO';
    } else {
        // Todos os outros casos são Vermelho
        // (WFNS 3 E mFisher 3-4) OU (WFNS 4-5)
        vasogradeCor = 'vermelho';
        vasogradeTexto = 'VERMELHO';
    }

    // 4. Exibir os resultados
    document.getElementById('hsa-wfns-numero').innerText = wfnsScore;
    document.getElementById('hsa-wfns-detalhe').innerText = `WFNS: ${wfnsScore}`;
    
    document.getElementById('hsa-fisher-numero').innerText = fisherScore;
    document.getElementById('hsa-fisher-detalhe').innerText = `mFisher: ${fisherScore}`;
    
    const vasogradeEl = document.getElementById('hsa-vasograde-classificacao');
    vasogradeEl.innerText = vasogradeTexto;
    vasogradeEl.className = `placar-classificacao vasograde-${vasogradeCor}`;
}

/**
 * Adiciona o estilo para as cores do VASOGRADE
 */
function adicionarEstiloVasograde() {
    // Verifica se o estilo já foi injetado
    if (document.getElementById('vasograde-style')) return;

    const style = document.createElement('style');
    style.id = 'vasograde-style';
    style.innerHTML = `
        .vasograde-verde {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        .vasograde-amarelo {
            background-color: #fff3cd;
            border: 1px solid #ffeeba;
            color: #856404;
        }
        .vasograde-vermelho {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
    `;
    document.head.appendChild(style);
}