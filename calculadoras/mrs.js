// Arquivo: /calculadoras/mrs.js

/**
 * Função principal chamada pelo app.js
 */
function mrs() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                
                <div class="grupo-radio">
                    <h4>Escala de Rankin Modificada (mRS)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">Selecione o nível de incapacidade:</span>
                    
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="mrs-score" value="0" onchange="calcularMRS()" checked>
                            <span class="checkmark"></span>
                            Nenhuma incapacidade (0)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="mrs-score" value="1" onchange="calcularMRS()">
                            <span class="checkmark"></span>
                            Sintomas não interferem nas atividades (1)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="mrs-score" value="2" onchange="calcularMRS()">
                            <span class="checkmark"></span>
                            Incapacidade leve (não realiza algumas atividades) (2)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="mrs-score" value="3" onchange="calcularMRS()">
                            <span class="checkmark"></span>
                            Incapacidade moderada (requer ajuda, mas anda sozinho) (3)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="mrs-score" value="4" onchange="calcularMRS()">
                            <span class="checkmark"></span>
                            Incapacidade moderada a grave (não anda sem ajuda) (4)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="mrs-score" value="5" onchange="calcularMRS()">
                            <span class="checkmark"></span>
                            Incapacidade grave (acamado, incontinente) (5)
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="mrs-score" value="6" onchange="calcularMRS()">
                            <span class="checkmark"></span>
                            Óbito (6)
                        </label>
                    </div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Resultado mRS</h3>
                    
                    <div class="placar-numero" id="mrs-placar-numero">0</div>
                    <div class="placar-detalhe" id="mrs-placar-detalhe">mRS: 0</div>
                    <div class="placar-classificacao" id="mrs-placar-classificacao">Nenhuma incapacidade</div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial (0 por padrão)
    calcularMRS();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularMRS() {
    
    // 1. Obter o valor
    const score = parseInt(document.querySelector('input[name="mrs-score"]:checked').value);

    // 2. Definir a classificação (vamos usar um array para buscar a descrição)
    const classificacoes = [
        "Nenhuma incapacidade",
        "Sintomas não interferem nas atividades",
        "Incapacidade leve",
        "Incapacidade moderada",
        "Incapacidade moderada a grave",
        "Incapacidade grave",
        "Óbito"
    ];
    
    const classificacao = classificacoes[score];

    // 3. Exibir o resultado
    document.getElementById('mrs-placar-numero').innerText = score;
    document.getElementById('mrs-placar-detalhe').innerText = `mRS: ${score}`;
    document.getElementById('mrs-placar-classificacao').innerText = classificacao;
}