// Arquivo: /calculadoras/abcd2.js

/**
 * Função principal chamada pelo app.js
 */
function abcd2() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                
                <div class="grupo-radio">
                    <h4>(A) Age (Idade)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-age" value="0" onchange="calcularABCD2()" checked><span class="checkmark"></span>< 60 anos (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-age" value="1" onchange="calcularABCD2()"><span class="checkmark"></span>≥ 60 anos (1)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>(B) Blood Pressure (PA)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-bp" value="0" onchange="calcularABCD2()" checked><span class="checkmark"></span>PA < 140/90 mmHg (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-bp" value="1" onchange="calcularABCD2()"><span class="checkmark"></span>PA ≥ 140/90 mmHg (1)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>(C) Clinical Features (Clínica)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-clinical" value="0" onchange="calcularABCD2()" checked><span class="checkmark"></span>Outros sintomas (ex: AIT sensorial) (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-clinical" value="1" onchange="calcularABCD2()"><span class="checkmark"></span>Distúrbio de fala sem fraqueza (1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-clinical" value="2" onchange="calcularABCD2()"><span class="checkmark"></span>Fraqueza unilateral (2)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>(D) Duration (Duração)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-duration" value="0" onchange="calcularABCD2()" checked><span class="checkmark"></span>< 10 min (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-duration" value="1" onchange="calcularABCD2()"><span class="checkmark"></span>10 - 59 min (1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-duration" value="2" onchange="calcularABCD2()"><span class="checkmark"></span>≥ 60 min (2)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>(D) Diabetes</h4>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-diabetes" value="0" onchange="calcularABCD2()" checked><span class="checkmark"></span>Não (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="abcd2-diabetes" value="1" onchange="calcularABCD2()"><span class="checkmark"></span>Sim (1)</label></div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Resultado ABCD²</h3>
                    
                    <div class="placar-numero" id="abcd2-placar-numero">0</div>
                    <div class="placar-detalhe" id="abcd2-placar-detalhe">A:0 B:0 C:0 D1:0 D2:0</div>
                    <div class="placar-classificacao" id="abcd2-placar-classificacao">Risco Baixo</div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial (tudo '0' por padrão)
    calcularABCD2();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularABCD2() {
    
    // 1. Obter os valores
    const age = parseInt(document.querySelector('input[name="abcd2-age"]:checked').value);
    const bp = parseInt(document.querySelector('input[name="abcd2-bp"]:checked').value);
    const clinical = parseInt(document.querySelector('input[name="abcd2-clinical"]:checked').value);
    const duration = parseInt(document.querySelector('input[name="abcd2-duration"]:checked').value);
    const diabetes = parseInt(document.querySelector('input[name="abcd2-diabetes"]:checked').value);

    // 2. Calcular o total
    const total = age + bp + clinical + duration + diabetes;

    // 3. Definir a classificação (Risco de AVC em 2 dias)
    let classificacao = '';
    if (total <= 3) {
        classificacao = 'Risco Baixo (1.0% em 2 dias)';
    } else if (total <= 5) {
        classificacao = 'Risco Moderado (4.1% em 2 dias)';
    } else { // 6 ou 7
        classificacao = 'Risco Alto (8.1% em 2 dias)';
    }

    // 4. Exibir o resultado
    document.getElementById('abcd2-placar-numero').innerText = total;
    // O detalhe para o prontuário que você gostou
    document.getElementById('abcd2-placar-detalhe').innerText = `A:${age} B:${bp} C:${clinical} D1:${duration} D2:${diabetes}`;
    document.getElementById('abcd2-placar-classificacao').innerText = classificacao;
}