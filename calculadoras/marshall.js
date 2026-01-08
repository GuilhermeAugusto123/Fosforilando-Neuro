// Arquivo: /calculadoras/marshall.js

/**
 * Função principal chamada pelo app.js
 */
function marshall() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                
                <div class="grupo-radio">
                    <h4>Classificação de Marshall (TCE)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">Selecione a classificação tomográfica:</span>
                    
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="marshall-score" value="1" onchange="calcularMarshall()" checked>
                            <span class="checkmark"></span>
                            Grau I: Sem patologia intracraniana visível na TC.
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="marshall-score" value="2" onchange="calcularMarshall()">
                            <span class="checkmark"></span>
                            Grau II: Cisternas visíveis, desvio linha média 0-5mm. Lesões < 25cm³.
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="marshall-score" value="3" onchange="calcularMarshall()">
                            <span class="checkmark"></span>
                            Grau III (Swelling): Cisternas comprimidas/ausentes, desvio 0-5mm. Lesões < 25cm³.
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="marshall-score" value="4" onchange="calcularMarshall()">
                            <span class="checkmark"></span>
                            Grau IV (Shift): Desvio linha média > 5mm. Lesões < 25cm³.
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="marshall-score" value="5" onchange="calcularMarshall()">
                            <span class="checkmark"></span>
                            Grau V (Lesão Evacuada): Qualquer lesão evacuada cirurgicamente.
                        </label>
                    </div>
                    <div class="opcao-radio">
                        <label>
                            <input type="radio" name="marshall-score" value="6" onchange="calcularMarshall()">
                            <span class="checkmark"></span>
                            Grau VI (Lesão Não-Evacuada): Lesão > 25cm³ não evacuada.
                        </label>
                    </div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Classificação de Marshall</h3>
                    
                    <div class="placar-numero" id="marshall-placar-numero" style="font-size: 4em;">I</div>
                    <div class="placar-detalhe" id="marshall-placar-detalhe">Diffuse Injury I</div>
                    <div class="placar-classificacao" id="marshall-placar-classificacao" style="font-size: 1.3em;">Risco Baixo</div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial (Grau I por padrão)
    calcularMarshall();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularMarshall() {
    
    // 1. Obter o valor
    const score = parseInt(document.querySelector('input[name="marshall-score"]:checked').value);

    // 2. Definir as descrições e prognósticos
    const numerosRomanos = {
        1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI"
    };
    
    const titulos = {
        1: "Diffuse Injury I",
        2: "Diffuse Injury II",
        3: "Diffuse Injury III (Swelling)",
        4: "Diffuse Injury IV (Shift)",
        5: "Evacuated Mass V",
        6: "Non-evacuated Mass VI"
    };

    const prognostico = {
        1: "Risco Baixo",
        2: "Risco Baixo",
        3: "Risco de Hipertensão Intracraniana",
        4: "Risco Elevado (Mortalidade ~50%)",
        5: "Prognóstico Variável (Pós-Op)",
        6: "Prognóstico Muito Grave (Mortalidade >60%)"
    };
    
    // 3. Exibir o resultado
    document.getElementById('marshall-placar-numero').innerText = numerosRomanos[score];
    document.getElementById('marshall-placar-detalhe').innerText = titulos[score];
    document.getElementById('marshall-placar-classificacao').innerText = prognostico[score];
}