// Arquivo: /calculadoras/hughes.js

/**
 * Função principal chamada pelo app.js
 */
function hughes() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                
                <div class="grupo-radio">
                    <h4>Escore de Hughes (GBS Disability Score)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">Selecione o nível de incapacidade do paciente:</span>
                    
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="hughes-score" value="0" onchange="calcularHughes()">
                            <span class="checkmark"></span>
                            <b>Grau 0:</b> Normal. Exame neurológico normal.
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="hughes-score" value="1" onchange="calcularHughes()" checked>
                            <span class="checkmark"></span>
                            <b>Grau 1:</b> Sinais/sintomas leves. Capaz de correr e realizar tarefas manuais.
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="hughes-score" value="2" onchange="calcularHughes()">
                            <span class="checkmark"></span>
                            <b>Grau 2:</b> Capaz de andar 10m sem apoio, mas incapaz de correr.
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="hughes-score" value="3" onchange="calcularHughes()">
                            <span class="checkmark"></span>
                            <b>Grau 3:</b> Capaz de andar 10m com apoio (bengala, andador, auxílio).
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="hughes-score" value="4" onchange="calcularHughes()">
                            <span class="checkmark"></span>
                            <b>Grau 4:</b> Restrito ao leito ou cadeira de rodas (incapaz de andar 10m com apoio).
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="hughes-score" value="5" onchange="calcularHughes()">
                            <span class="checkmark"></span>
                            <b>Grau 5:</b> Ventilação mecânica (parcial ou total).
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="hughes-score" value="6" onchange="calcularHughes()">
                            <span class="checkmark"></span>
                            <b>Grau 6:</b> Óbito.
                        </label>
                    </div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Escore de Hughes (GBS)</h3>
                    
                    <div class="placar-numero" id="hughes-placar-numero">1</div>
                    <div class="placar-detalhe" id="hughes-placar-descricao" style="font-size: 1.1em; line-height: 1.4; padding: 0 10px;">
                        Sinais/sintomas leves. Capaz de correr e realizar tarefas manuais.
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial (Grau 1 por padrão)
    calcularHughes();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularHughes() {
    
    // 1. Obter o valor e a descrição
    const selectedRadio = document.querySelector('input[name="hughes-score"]:checked');
    const score = parseInt(selectedRadio.value);
    const descricao = selectedRadio.closest('label').innerText; // Pega o texto da label

    // 2. Exibir o resultado
    document.getElementById('hughes-placar-numero').innerText = score;
    document.getElementById('hughes-placar-descricao').innerText = descricao;
}