// Arquivo: /calculadoras/ich_score.js

/**
 * Função principal chamada pelo app.js
 */
function ich_score() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                
                <div class="grupo-radio">
                    <h4>Escala de Coma de Glasgow (GCS)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="ich-gcs" value="2" onchange="calcularICH()"><span class="checkmark"></span>3 - 4 (+2)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="ich-gcs" value="1" onchange="calcularICH()"><span class="checkmark"></span>5 - 12 (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="ich-gcs" value="0" onchange="calcularICH()" checked><span class="checkmark"></span>13 - 15 (0)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>Idade</h4>
                    <div class="opcao-radio"><label><input type="radio" name="ich-age" value="1" onchange="calcularICH()"><span class="checkmark"></span>≥ 80 anos (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="ich-age" value="0" onchange="calcularICH()" checked><span class="checkmark"></span>< 80 anos (0)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>Volume do ICH</h4>
                    <div class="opcao-radio"><label><input type="radio" name="ich-volume" value="1" onchange="calcularICH()"><span class="checkmark"></span>≥ 30 cm³ (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="ich-volume" value="0" onchange="calcularICH()" checked><span class="checkmark"></span>< 30 cm³ (0)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>Hemorragia Intraventricular (IVH)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="ich-ivh" value="1" onchange="calcularICH()"><span class="checkmark"></span>Presente (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="ich-ivh" value="0" onchange="calcularICH()" checked><span class="checkmark"></span>Ausente (0)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>Origem Infratentorial</h4>
                    <div class="opcao-radio"><label><input type="radio" name="ich-infra" value="1" onchange="calcularICH()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="ich-infra" value="0" onchange="calcularICH()" checked><span class="checkmark"></span>Não (0)</label></div>
                </div>


            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>ICH Score</h3>
                    
                    <div class="placar-numero" id="ich-placar-numero">0</div>
                    <div class="placar-detalhe" id="ich-placar-detalhe">Escore: 0</div>
                    <div class="placar-classificacao" id="ich-placar-classificacao" style="font-size: 1.3em;">Mortalidade em 30d: 0%</div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial
    calcularICH();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularICH() {
    
    // 1. Obter os valores
    const gcs = parseInt(document.querySelector('input[name="ich-gcs"]:checked').value);
    const age = parseInt(document.querySelector('input[name="ich-age"]:checked').value);
    const volume = parseInt(document.querySelector('input[name="ich-volume"]:checked').value);
    const ivh = parseInt(document.querySelector('input[name="ich-ivh"]:checked').value);
    const infra = parseInt(document.querySelector('input[name="ich-infra"]:checked').value);

    // 2. Calcular o total
    const total = gcs + age + volume + ivh + infra;

    // 3. Definir a mortalidade
    // (Baseado no estudo original de Hemphill et al., Stroke 2001)
    const mortalidade = {
        0: "0%",
        1: "13%",
        2: "26%",
        3: "72%",
        4: "97%",
        5: "100%",
        6: "100%" // (Estimado, pois nenhum paciente no estudo original teve pontuação 6)
    };
    
    const classificacao = `Mortalidade em 30d: ${mortalidade[total]}`;

    // 4. Exibir o resultado
    document.getElementById('ich-placar-numero').innerText = total;
    document.getElementById('ich-placar-detalhe').innerText = `Escore: ${total}`;
    document.getElementById('ich-placar-classificacao').innerText = classificacao;
}