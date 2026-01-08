// Arquivo: /calculadoras/isi.js

/**
 * Função principal chamada pelo app.js
 */
function isi() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Índice de Gravidade de Insônia (ISI)</h5>
                    <ul>
                        <li>Avalie a gravidade dos problemas de sono nas <b>últimas 2 semanas</b>.</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Dificuldade em pegar no sono</h4>
                    ${isiOpcoes('isi-1')}
                </div>
                
                <div class="grupo-radio">
                    <h4>2. Dificuldade em manter o sono</h4>
                    ${isiOpcoes('isi-2')}
                </div>
                
                <div class="grupo-radio">
                    <h4>3. Problema de acordar muito cedo</h4>
                    ${isiOpcoes('isi-3')}
                </div>
                
                <div class="grupo-radio">
                    <h4>4. Quão satisfeito(a) você está com seu padrão de sono atual?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="isi-4" value="0" onchange="calcularISI()" checked><span class="checkmark"></span>(0) Muito satisfeito</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-4" value="1" onchange="calcularISI()"><span class="checkmark"></span>(1) Satisfeito</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-4" value="2" onchange="calcularISI()"><span class="checkmark"></span>(2) Neutro</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-4" value="3" onchange="calcularISI()"><span class="checkmark"></span>(3) Insatisfeito</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-4" value="4" onchange="calcularISI()"><span class="checkmark"></span>(4) Muito insatisfeito</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>5. O quanto seu problema de sono interfere nas atividades diárias?</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Fadiga, concentração, memória, humor)</span>
                    <div class="opcao-radio"><label><input type="radio" name="isi-5" value="0" onchange="calcularISI()" checked><span class="checkmark"></span>(0) Nada</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-5" value="1" onchange="calcularISI()"><span class="checkmark"></span>(1) Um pouco</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-5" value="2" onchange="calcularISI()"><span class="checkmark"></span>(2) Moderadamente</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-5" value="3" onchange="calcularISI()"><span class="checkmark"></span>(3) Muito</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-5" value="4" onchange="calcularISI()"><span class="checkmark"></span>(4) Extremamente</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>6. O quanto os outros percebem que seu sono atrapalha sua qualidade de vida?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="isi-6" value="0" onchange="calcularISI()" checked><span class="checkmark"></span>(0) Nada</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-6" value="1" onchange="calcularISI()"><span class="checkmark"></span>(1) Um pouco</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-6" value="2" onchange="calcularISI()"><span class="checkmark"></span>(2) Moderadamente</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-6" value="3" onchange="calcularISI()"><span class="checkmark"></span>(3) Muito</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-6" value="4" onchange="calcularISI()"><span class="checkmark"></span>(4) Extremamente</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>7. O quanto você está preocupado(a) com seu problema de sono atual?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="isi-7" value="0" onchange="calcularISI()" checked><span class="checkmark"></span>(0) Nada</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-7" value="1" onchange="calcularISI()"><span class="checkmark"></span>(1) Um pouco</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-7" value="2" onchange="calcularISI()"><span class="checkmark"></span>(2) Moderadamente</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-7" value="3" onchange="calcularISI()"><span class="checkmark"></span>(3) Muito</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="isi-7" value="4" onchange="calcularISI()"><span class="checkmark"></span>(4) Extremamente</label></div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>ISI (Insônia)</h3>
                    
                    <div class="placar-numero" id="isi-placar-numero">0</div>
                    <div class="placar-classificacao" id="isi-placar-classificacao" style="font-size: 1.3em; margin-top: 15px;">
                        Sem insônia clinicamente significativa
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="isi-placar-detalhe" style="font-size: 1.0em; text-align: center;">
                        ISI: 0/28
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilos necessários
    adicionarEstiloISI();

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularISI();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularISI() {
    
    let total = 0;
    
    // 1. Obter os valores dos 7 itens
    for (let i = 1; i <= 7; i++) {
        total += parseInt(document.querySelector(`input[name="isi-${i}"]:checked`).value);
    }
    
    // 2. Definir a classificação
    let classificacao = '';
    if (total <= 7) {
        classificacao = 'Sem insônia clinicamente significativa';
    } else if (total <= 14) {
        classificacao = 'Insônia Subclínica (Leve)';
    } else if (total <= 21) {
        classificacao = 'Insônia Clínica (Moderada)';
    } else {
        classificacao = 'Insônia Clínica (Grave)';
    }

    // 3. Exibir o resultado
    document.getElementById('isi-placar-numero').innerText = total;
    document.getElementById('isi-placar-classificacao').innerText = classificacao;
    document.getElementById('isi-placar-detalhe').innerText = `ISI: ${total}/28 (${classificacao})`;
}

/**
 * Função auxiliar para as opções padrão (0-4)
 */
function isiOpcoes(name) {
    return `
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="0" onchange="calcularISI()" checked><span class="checkmark"></span>(0) Nenhuma</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="1" onchange="calcularISI()"><span class="checkmark"></span>(1) Leve</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="2" onchange="calcularISI()"><span class="checkmark"></span>(2) Moderada</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="3" onchange="calcularISI()"><span class="checkmark"></span>(3) Grave</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="4" onchange="calcularISI()"><span class="checkmark"></span>(4) Muito Grave</label></div>
    `;
}

/**
 * Adiciona estilos necessários
 */
function adicionarEstiloISI() {
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