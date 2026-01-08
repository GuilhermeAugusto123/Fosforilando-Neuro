// Arquivo: /calculadoras/pns_score.js

/**
 * Função principal chamada pelo app.js
 */
function pns_score() {
    // 1. Defina o HTML da calculadora
    //
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>PNS-Care Score</h5>
                    <ul>
                        <li>Escore diagnóstico para Síndrome Neurológica Paraneoplásica.</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Sintomas Neurológicos Clássicos?</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">(Ex: Encefalite límbica, cerebelite, opsoclonus, etc.)</span>
                    <div class="opcao-radio"><label><input type="radio" name="pns-1" value="3" onchange="calcularPNS()" checked><span class="checkmark"></span>Sim (Peso 3)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="pns-1" value="0" onchange="calcularPNS()"><span class="checkmark"></span>Não (Peso 0)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>2. Câncer ou Tumor?</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">(Ativo ou tratado nos últimos 5 anos)</span>
                    <div class="opcao-radio"><label><input type="radio" name="pns-2" value="3" onchange="calcularPNS()"><span class="checkmark"></span>Sim (Peso 3)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="pns-2" value="0" onchange="calcularPNS()" checked><span class="checkmark"></span>Não (Peso 0)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>3. Anticorpos Oncoespecíficos?</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">(Ex: Anti-Hu, Yo, Ri, CV2, Ma2, Anfimisina)</span>
                    <div class="opcao-radio"><label><input type="radio" name="pns-3" value="4" onchange="calcularPNS()"><span class="checkmark"></span>Sim (Peso 4)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="pns-3" value="0" onchange="calcularPNS()" checked><span class="checkmark"></span>Não (Peso 0)</label></div>
                </div>


            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>PNS-Care Score</h3>
                    
                    <div class="placar-numero" id="pns-placar-numero">0</div>
                    <div class="placar-detalhe" id="pns-placar-detalhe" style="font-size: 1.1em; line-height: 1.4; padding: 0 10px;">
                        Escore Total (0-10)
                    </div>
                    <div class="placar-classificacao" id="pns-placar-classificacao" style="font-size: 1.3em; margin-top: 15px;">
                        Improvável
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial (começa em 3, pois o "Sim" de Sintomas vem marcado)
    calcularPNS();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularPNS() {
    
    // 1. Obter os valores dos 3 itens
    const p1 = parseInt(document.querySelector('input[name="pns-1"]:checked').value);
    const p2 = parseInt(document.querySelector('input[name="pns-2"]:checked').value);
    const p3 = parseInt(document.querySelector('input[name="pns-3"]:checked').value);
    
    // 2. Calcular o total (Score 0-10)
    const total = p1 + p2 + p3;
    
    // 3. Definir a classificação
    let classificacao = '';
    if (total >= 6) {
        classificacao = 'Provável SNP';
    } else if (total >= 4) {
        classificacao = 'Possível SNP';
    } else { // 0-3
        classificacao = 'Improvável SNP';
    }

    // 4. Exibir o resultado
    document.getElementById('pns-placar-numero').innerText = total;
    document.getElementById('pns-placar-classificacao').innerText = classificacao;
}