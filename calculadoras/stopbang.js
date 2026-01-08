// Arquivo: /calculadoras/stopbang.js

/**
 * Função principal chamada pelo app.js
 */
function stopbang() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Instrução</h5>
                    <ul>
                        <li>Responda "Sim" ou "Não" para as 8 perguntas abaixo.</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>(S) Ronco alto?</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">(Alto o suficiente para ser ouvido através de portas fechadas)</span>
                    <div class="opcao-radio"><label><input type="radio" name="sb-1" value="1" onchange="calcularStopBang()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sb-1" value="0" onchange="calcularStopBang()" checked><span class="checkmark"></span>Não (0)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>(T) Cansaço diurno?</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">(Sente-se frequentemente cansado ou sonolento durante o dia)</span>
                    <div class="opcao-radio"><label><input type="radio" name="sb-2" value="1" onchange="calcularStopBang()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sb-2" value="0" onchange="calcularStopBang()" checked><span class="checkmark"></span>Não (0)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>(O) Observado parar de respirar?</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">(Alguém já observou você parar de respirar durante o sono)</span>
                    <div class="opcao-radio"><label><input type="radio" name="sb-3" value="1" onchange="calcularStopBang()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sb-3" value="0" onchange="calcularStopBang()" checked><span class="checkmark"></span>Não (0)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>(P) Pressão alta?</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">(Tratamento ou diagnóstico de Hipertensão Arterial)</span>
                    <div class="opcao-radio"><label><input type="radio" name="sb-4" value="1" onchange="calcularStopBang()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sb-4" value="0" onchange="calcularStopBang()" checked><span class="checkmark"></span>Não (0)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>(B) IMC > 35 kg/m²?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sb-5" value="1" onchange="calcularStopBang()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sb-5" value="0" onchange="calcularStopBang()" checked><span class="checkmark"></span>Não (0)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>(A) Idade > 50 anos?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sb-6" value="1" onchange="calcularStopBang()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sb-6" value="0" onchange="calcularStopBang()" checked><span class="checkmark"></span>Não (0)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>(N) Circunferência do Pescoço > 40 cm?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sb-7" value="1" onchange="calcularStopBang()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sb-7" value="0" onchange="calcularStopBang()" checked><span class="checkmark"></span>Não (0)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>(G) Gênero Masculino?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sb-8" value="1" onchange="calcularStopBang()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sb-8" value="0" onchange="calcularStopBang()" checked><span class="checkmark"></span>Não (0)</label></div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Escore STOP-BANG</h3>
                    
                    <div class="placar-numero" id="stopbang-placar-numero">0</div>
                    <div class="placar-detalhe" id="stopbang-placar-detalhe">Escore Total (0-8)</div>
                    <div class="placar-classificacao" id="stopbang-placar-classificacao" style="font-size: 1.3em;">Baixo Risco de SAHOS</div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);

    // 3. Chame o cálculo uma vez para definir o estado inicial
    calcularStopBang();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularStopBang() {
    
    // 1. Obter os valores (são 8 perguntas, de sb-1 a sb-8)
    let total = 0;
    for (let i = 1; i <= 8; i++) {
        total += parseInt(document.querySelector(`input[name="sb-${i}"]:checked`).value);
    }

    // 2. Definir a classificação
    let classificacao = '';
    if (total <= 2) {
        classificacao = 'Baixo Risco de SAHOS';
    } else if (total <= 4) {
        classificacao = 'Risco Intermediário de SAHOS';
    } else { // 5-8
        classificacao = 'Alto Risco de SAHOS';
    }

    // 3. Exibir o resultado
    document.getElementById('stopbang-placar-numero').innerText = total;
    document.getElementById('stopbang-placar-detalhe').innerText = `Escore Total (0-8)`;
    document.getElementById('stopbang-placar-classificacao').innerText = classificacao;
}