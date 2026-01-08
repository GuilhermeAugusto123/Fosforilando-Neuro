// Arquivo: /calculadoras/epworth.js

/**
 * Função principal chamada pelo app.js
 */
function epworth() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Instrução</h5>
                    <ul>
                        <li>Qual a chance de você cochilar nas seguintes situações? (0 = Nenhuma, 1 = Pequena, 2 = Moderada, 3 = Alta)</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Sentado e lendo</h4>
                    <div class="opcoes-horizontais">
                        <label><input type="radio" name="epworth-1" value="0" onchange="calcularEpworth()" checked><span class="checkmark"></span> 0</label>
                        <label><input type="radio" name="epworth-1" value="1" onchange="calcularEpworth()"><span class="checkmark"></span> 1</label>
                        <label><input type="radio" name="epworth-1" value="2" onchange="calcularEpworth()"><span class="checkmark"></span> 2</label>
                        <label><input type="radio" name="epworth-1" value="3" onchange="calcularEpworth()"><span class="checkmark"></span> 3</label>
                    </div>
                </div>
                
                <div class="grupo-radio">
                    <h4>2. Assistindo TV</h4>
                    <div class="opcoes-horizontais">
                        <label><input type="radio" name="epworth-2" value="0" onchange="calcularEpworth()" checked><span class="checkmark"></span> 0</label>
                        <label><input type="radio" name="epworth-2" value="1" onchange="calcularEpworth()"><span class="checkmark"></span> 1</label>
                        <label><input type="radio" name="epworth-2" value="2" onchange="calcularEpworth()"><span class="checkmark"></span> 2</label>
                        <label><input type="radio" name="epworth-2" value="3" onchange="calcularEpworth()"><span class="checkmark"></span> 3</label>
                    </div>
                </div>
                
                <div class="grupo-radio">
                    <h4>3. Sentado, inativo, em local público (ex: teatro, reunião)</h4>
                    <div class="opcoes-horizontais">
                        <label><input type="radio" name="epworth-3" value="0" onchange="calcularEpworth()" checked><span class="checkmark"></span> 0</label>
                        <label><input type="radio" name="epworth-3" value="1" onchange="calcularEpworth()"><span class="checkmark"></span> 1</label>
                        <label><input type="radio" name="epworth-3" value="2" onchange="calcularEpworth()"><span class="checkmark"></span> 2</label>
                        <label><input type="radio" name="epworth-3" value="3" onchange="calcularEpworth()"><span class="checkmark"></span> 3</label>
                    </div>
                </div>
                
                <div class="grupo-radio">
                    <h4>4. Como passageiro em carro por 1h sem parar</h4>
                    <div class="opcoes-horizontais">
                        <label><input type="radio" name="epworth-4" value="0" onchange="calcularEpworth()" checked><span class="checkmark"></span> 0</label>
                        <label><input type="radio" name="epworth-4" value="1" onchange="calcularEpworth()"><span class="checkmark"></span> 1</label>
                        <label><input type="radio" name="epworth-4" value="2" onchange="calcularEpworth()"><span class="checkmark"></span> 2</label>
                        <label><input type="radio" name="epworth-4" value="3" onchange="calcularEpworth()"><span class="checkmark"></span> 3</label>
                    </div>
                </div>
                
                <div class="grupo-radio">
                    <h4>5. Deitado para descansar à tarde, quando possível</h4>
                    <div class="opcoes-horizontais">
                        <label><input type="radio" name="epworth-5" value="0" onchange="calcularEpworth()" checked><span class="checkmark"></span> 0</label>
                        <label><input type="radio" name="epworth-5" value="1" onchange="calcularEpworth()"><span class="checkmark"></span> 1</label>
                        <label><input type="radio" name="epworth-5" value="2" onchange="calcularEpworth()"><span class="checkmark"></span> 2</label>
                        <label><input type="radio" name="epworth-5" value="3" onchange="calcularEpworth()"><span class="checkmark"></span> 3</label>
                    </div>
                </div>
                
                <div class="grupo-radio">
                    <h4>6. Sentado e conversando com alguém</h4>
                    <div class="opcoes-horizontais">
                        <label><input type="radio" name="epworth-6" value="0" onchange="calcularEpworth()" checked><span class="checkmark"></span> 0</label>
                        <label><input type="radio" name="epworth-6" value="1" onchange="calcularEpworth()"><span class="checkmark"></span> 1</label>
                        <label><input type="radio" name="epworth-6" value="2" onchange="calcularEpworth()"><span class="checkmark"></span> 2</label>
                        <label><input type="radio" name="epworth-6" value="3" onchange="calcularEpworth()"><span class="checkmark"></span> 3</label>
                    </div>
                </div>
                
                <div class="grupo-radio">
                    <h4>7. Sentado quieto após o almoço (sem álcool)</h4>
                    <div class="opcoes-horizontais">
                        <label><input type="radio" name="epworth-7" value="0" onchange="calcularEpworth()" checked><span class="checkmark"></span> 0</label>
                        <label><input type="radio" name="epworth-7" value="1" onchange="calcularEpworth()"><span class="checkmark"></span> 1</label>
                        <label><input type="radio" name="epworth-7" value="2" onchange="calcularEpworth()"><span class="checkmark"></span> 2</label>
                        <label><input type="radio" name="epworth-7" value="3" onchange="calcularEpworth()"><span class="checkmark"></span> 3</label>
                    </div>
                </div>
                
                <div class="grupo-radio">
                    <h4>8. Em um carro, parado por alguns minutos no trânsito</h4>
                    <div class="opcoes-horizontais">
                        <label><input type="radio" name="epworth-8" value="0" onchange="calcularEpworth()" checked><span class="checkmark"></span> 0</label>
                        <label><input type="radio" name="epworth-8" value="1" onchange="calcularEpworth()"><span class="checkmark"></span> 1</label>
                        <label><input type="radio" name="epworth-8" value="2" onchange="calcularEpworth()"><span class="checkmark"></span> 2</label>
                        <label><input type="radio" name="epworth-8" value="3" onchange="calcularEpworth()"><span class="checkmark"></span> 3</label>
                    </div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Sonolência de Epworth</h3>
                    
                    <div class="placar-numero" id="epworth-placar-numero">0</div>
                    <div class="placar-detalhe" id="epworth-placar-detalhe">Escore Total (0-24)</div>
                    <div class="placar-classificacao" id="epworth-placar-classificacao" style="font-size: 1.3em;">Normal</div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona o estilo para as opções 0-3 ficarem na horizontal
    adicionarEstiloEpworth();

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularEpworth();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularEpworth() {
    
    // 1. Obter os valores (são 8 perguntas)
    let total = 0;
    for (let i = 1; i <= 8; i++) {
        total += parseInt(document.querySelector(`input[name="epworth-${i}"]:checked`).value);
    }

    // 2. Definir a classificação
    let classificacao = '';
    if (total <= 5) {
        classificacao = 'Normal';
    } else if (total <= 9) {
        classificacao = 'Normal (limite superior)';
    } else if (total <= 15) {
        classificacao = 'Sonolência Leve a Moderada';
    } else { // 16-24
        classificacao = 'Sonolência Grave';
    }

    // 3. Exibir o resultado
    document.getElementById('epworth-placar-numero').innerText = total;
    document.getElementById('epworth-placar-detalhe').innerText = `Escore Total (0-24)`;
    document.getElementById('epworth-placar-classificacao').innerText = classificacao;
}

/**
 * Adiciona o estilo para as opções horizontais (0, 1, 2, 3)
 */
function adicionarEstiloEpworth() {
    // Verifica se o estilo já foi injetado
    if (document.getElementById('epworth-style')) return;

    const style = document.createElement('style');
    style.id = 'epworth-style';
    style.innerHTML = `
        .opcoes-horizontais {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around; /* Espaça os 4 botões */
            padding: 10px 15px 15px 15px;
        }
        .opcoes-horizontais label {
            position: relative;
            padding-left: 30px; /* Espaço para a "bolinha" */
            cursor: pointer;
            margin-right: 10px;
        }
        .opcoes-horizontais input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
        }
        .opcoes-horizontais .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 20px;
            width: 20px;
            background-color: #eee;
            border: 1px solid #ccc;
            border-radius: 50%;
        }
        .opcoes-horizontais label:hover input ~ .checkmark {
            background-color: #ccc;
        }
        .opcoes-horizontais input:checked ~ .checkmark {
            background-color: #007bff;
            border-color: #007bff;
        }
        .opcoes-horizontais .checkmark:after {
            content: "";
            position: absolute;
            display: none;
            top: 6px;
            left: 6px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
        }
        .opcoes-horizontais input:checked ~ .checkmark:after {
            display: block;
        }
    `;
    document.head.appendChild(style);
}