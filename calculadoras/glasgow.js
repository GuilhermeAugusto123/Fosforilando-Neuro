// Arquivo: /calculadoras/glasgow.js (Versão 2)

/**
 * Função principal chamada pelo app.js
 */
function glasgow() {
    // 1. Defina o HTML da calculadora com o novo layout
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                
                <div class="grupo-radio">
                    <h4>Abertura Ocular (O)</h4>
                    
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-olhos" value="4" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            Espontânea (4)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-olhos" value="3" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            Ao comando verbal (3)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-olhos" value="2" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            À pressão (2)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-olhos" value="1" onchange="calcularGlasgow()" checked>
                            <span class="checkmark"></span>
                            Nenhuma (1)
                        </label>
                    </div>
                </div>

                <div class="grupo-radio">
                    <h4>Resposta Verbal (V)</h4>
                    <div class.="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-verbal" value="5" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            Orientada (5)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-verbal" value="4" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            Confusa (4)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-verbal" value="3" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            Palavras (3)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-verbal" value="2" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            Sons (2)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-verbal" value="1" onchange="calcularGlasgow()" checked>
                            <span class="checkmark"></span>
                            Nenhuma (1)
                        </label>
                    </div>
                </div>

                <div class="grupo-radio">
                    <h4>Resposta Motora (M)</h4>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-motora" value="6" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            Obedece a comandos (6)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-motora" value="5" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            Localiza dor (5)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-motora" value="4" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            Retirada flexora (4)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-motora" value="3" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            Flexão anormal (3)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-motora" value="2" onchange="calcularGlasgow()">
                            <span class="checkmark"></span>
                            Extensão anormal (2)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="glasgow-motora" value="1" onchange="calcularGlasgow()" checked>
                            <span class="checkmark"></span>
                            Nenhuma (1)
                        </label>
                    </div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Resultado</h3>
                    
                    <div class="placar-numero" id="glasgow-placar-numero">3</div>
                    <div class="placar-detalhe" id="glasgow-placar-detalhe">O1 V1 M1</div>
                    <div class="placar-classificacao" id="glasgow-placar-classificacao">Trauma Grave</div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial (já que marcamos '1' como padrão)
    calcularGlasgow();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularGlasgow() {
    
    // 1. Obter os valores dos grupos de radio
    // A sintaxe para pegar o valor de um grupo de radio checado é um pouco diferente
    
    const olhos = parseInt(document.querySelector('input[name="glasgow-olhos"]:checked').value);
    const verbal = parseInt(document.querySelector('input[name="glasgow-verbal"]:checked').value);
    const motora = parseInt(document.querySelector('input[name="glasgow-motora"]:checked').value);

    // 2. Calcular o total
    const total = olhos + verbal + motora;

    // 3. Definir a classificação
    let classificacao = '';
    if (total >= 13) {
        classificacao = 'Trauma Leve';
    } else if (total >= 9) {
        classificacao = 'Trauma Moderado';
    } else {
        classificacao = 'Trauma Grave';
    }

    // 4. Exibir o resultado nos locais corretos
    document.getElementById('glasgow-placar-numero').innerText = total;
    document.getElementById('glasgow-placar-detalhe').innerText = `O${olhos} V${verbal} M${motora}`;
    document.getElementById('glasgow-placar-classificacao').innerText = classificacao;
}