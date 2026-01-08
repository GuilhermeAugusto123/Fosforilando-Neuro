// Arquivo: /calculadoras/rcvs2.js

/**
 * Função principal chamada pelo app.js
 */
function rcvs2() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Atenção</h5>
                    <ul>
                        <li>Aplicar apenas em pacientes (18-55 anos) com nova arteriografia em imagem.</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>Cefaleia "Thunderclap" (única ou recorrente)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="rcvs2-headache" value="5" onchange="calcularRCVS2()"><span class="checkmark"></span>Presente (+5)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="rcvs2-headache" value="0" onchange="calcularRCVS2()" checked><span class="checkmark"></span>Ausente (0)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>Gatilho Vasoconstritor identificado</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">(Ex: pós-parto, drogas, exposição a SSRI, etc.)</span>
                    <div class="opcao-radio"><label><input type="radio" name="rcvs2-trigger" value="3" onchange="calcularRCVS2()"><span class="checkmark"></span>Sim (+3)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="rcvs2-trigger" value="0" onchange="calcularRCVS2()" checked><span class="checkmark"></span>Não (0)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>Sexo</h4>
                    <div class="opcao-radio"><label><input type="radio" name="rcvs2-sex" value="1" onchange="calcularRCVS2()"><span class="checkmark"></span>Feminino (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="rcvs2-sex" value="0" onchange="calcularRCVS2()" checked><span class="checkmark"></span>Masculino (0)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>Hemorragia Subaracnóidea (HSA)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="rcvs2-sah" value="1" onchange="calcularRCVS2()"><span class="checkmark"></span>Presente (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="rcvs2-sah" value="0" onchange="calcularRCVS2()" checked><span class="checkmark"></span>Ausente (0)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>Envolvimento da artéria carótida intracraniana</h4>
                    <div class="opcao-radio"><label><input type="radio" name="rcvs2-carotid" value="-2" onchange="calcularRCVS2()"><span class="checkmark"></span>Afetada (-2)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="rcvs2-carotid" value="0" onchange="calcularRCVS2()" checked><span class="checkmark"></span>Não afetada (0)</label></div>
                </div>


            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Resultado RCVS₂</h3>
                    
                    <div class="placar-numero" id="rcvs2-placar-numero">0</div>
                    <div class="placar-detalhe" id="rcvs2-placar-detalhe">Escore: 0</div>
                    <div class="placar-classificacao" id="rcvs2-placar-classificacao" style="font-size: 1.3em;">RCVS Altamente Improvável</div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial
    calcularRCVS2();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularRCVS2() {
    
    // 1. Obter os valores (note o valor negativo da carótida)
    const headache = parseInt(document.querySelector('input[name="rcvs2-headache"]:checked').value);
    const trigger = parseInt(document.querySelector('input[name="rcvs2-trigger"]:checked').value);
    const sex = parseInt(document.querySelector('input[name="rcvs2-sex"]:checked').value);
    const sah = parseInt(document.querySelector('input[name="rcvs2-sah"]:checked').value);
    const carotid = parseInt(document.querySelector('input[name="rcvs2-carotid"]:checked').value);

    // 2. Calcular o total
    const total = headache + trigger + sex + sah + carotid;

    // 3. Definir a classificação
    let classificacao = '';
    if (total >= 5) {
        classificacao = 'RCVS Altamente Provável';
    } else if (total <= 2) {
        classificacao = 'RCVS Altamente Improvável';
    } else { // 3 ou 4
        classificacao = 'Equívoco / Indeterminado';
    }

    // 4. Exibir o resultado
    document.getElementById('rcvs2-placar-numero').innerText = total;
    document.getElementById('rcvs2-placar-detalhe').innerText = `Escore: ${total}`;
    document.getElementById('rcvs2-placar-classificacao').innerText = classificacao;
}