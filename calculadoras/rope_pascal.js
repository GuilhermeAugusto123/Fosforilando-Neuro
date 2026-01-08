// Arquivo: /calculadoras/rope_pascal.js

function rope_pascal() {
    
    // HTML da Calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>RoPE Score & PASCAL</h5>
                    <p>Avaliação da probabilidade de um FOP (Forame Oval Patente) ser a causa de um AVC criptogênico.</p>
                </div>

                <div class="grupo-input">
                    <label class="label-destaque">Idade do Paciente</label>
                    <select id="rope-idade" onchange="calcularRoPE()" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc;">
                        <option value="5">18 a 29 anos (+5 pontos)</option>
                        <option value="4">30 a 39 anos (+4 pontos)</option>
                        <option value="3">40 a 49 anos (+3 pontos)</option>
                        <option value="2">50 a 59 anos (+2 pontos)</option>
                        <option value="1">60 a 69 anos (+1 ponto)</option>
                        <option value="0">≥ 70 anos (0 pontos)</option>
                    </select>
                </div>

                <div style="margin-top: 20px;">
                    <p class="label-destaque">Características Clínicas (Marque para pontuar)</p>
                    
                    <div class="grupo-checkbox">
                        <label>
                            <input type="checkbox" id="rope-has" onchange="calcularRoPE()">
                            <span class="checkmark-box"></span>
                            <strong>Sem</strong> Histórico de Hipertensão (+1)
                        </label>
                    </div>

                    <div class="grupo-checkbox">
                        <label>
                            <input type="checkbox" id="rope-dm" onchange="calcularRoPE()">
                            <span class="checkmark-box"></span>
                            <strong>Sem</strong> Histórico de Diabetes (+1)
                        </label>
                    </div>

                    <div class="grupo-checkbox">
                        <label>
                            <input type="checkbox" id="rope-avc" onchange="calcularRoPE()">
                            <span class="checkmark-box"></span>
                            <strong>Sem</strong> Histórico prévio de AVC/AIT (+1)
                        </label>
                    </div>

                    <div class="grupo-checkbox">
                        <label>
                            <input type="checkbox" id="rope-tabagismo" onchange="calcularRoPE()">
                            <span class="checkmark-box"></span>
                            <strong>Não</strong> Tabagista (+1)
                        </label>
                    </div>

                    <div class="grupo-checkbox">
                        <label>
                            <input type="checkbox" id="rope-cortical" onchange="calcularRoPE()">
                            <span class="checkmark-box"></span>
                            Infarto Cortical na Imagem (+1)
                        </label>
                    </div>
                </div>

                <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">

                <div class="grupo-input">
                    <label class="label-destaque" style="color: #0056b3;">Classificação PASCAL</label>
                    <p style="font-size: 0.9em; color: #666; margin-bottom: 10px;">O ecocardiograma demonstrou características de alto risco ("High-Risk PFO")?</p>
                    
                    <div class="grupo-radio">
                        <div class="opcao-radio">
                            <label>
                                <input type="radio" name="pascal-risk" value="nao" onchange="calcularRoPE()" checked>
                                <span class="checkmark"></span>
                                <strong>Não</strong> (Ausência de ASA ou Shunt Largo)
                            </label>
                        </div>
                        <div class="opcao-radio">
                            <label>
                                <input type="radio" name="pascal-risk" value="sim" onchange="calcularRoPE()">
                                <span class="checkmark"></span>
                                <strong>Sim</strong> (Presença de ASA e/ou Shunt Largo)
                            </label>
                        </div>
                    </div>

                    <div style="background: #f1f8ff; padding: 10px; border-left: 3px solid #0056b3; margin-top: 12px; font-size: 0.85em; color: #444; border-radius: 0 4px 4px 0;">
                        <strong>Critérios de Alto Risco:</strong><br>
                        • <strong>ASA (Aneurisma):</strong> Excursão ≥ 10 mm da linha média.<br>
                        • <strong>Shunt Largo:</strong> > 20 bolhas no átrio esquerdo (Ecocardiograma Transesofágico).
                    </div>
                </div>

            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Resultado RoPE</h3>
                    
                    <div class="placar-numero" id="rope-placar">0</div>
                    <div class="placar-classificacao" id="rope-probabilidade">...</div>

                    <hr style="margin: 15px 0; border-color: rgba(255,255,255,0.3);">

                    <h3>Classificação PASCAL</h3>
                    <div class="placar-classificacao" id="pascal-resultado" style="font-size: 1.2em; margin-top: 10px;">
                        --
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Cópia:</h4>
                    <div class="placar-copia" id="rope-resumo">
                        RoPE: 0 pts | PASCAL: --
                    </div>
                </div>
            </div> 

        </div>
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloRoPE();
    calcularRoPE(); // Calcular inicial
}

function calcularRoPE() {
    let score = 0;

    // 1. Idade
    const idadeVal = parseInt(document.getElementById('rope-idade').value);
    score += idadeVal;

    // 2. Fatores (Checkbox marcado = +1 ponto)
    if (document.getElementById('rope-has').checked) score++;
    if (document.getElementById('rope-dm').checked) score++;
    if (document.getElementById('rope-avc').checked) score++;
    if (document.getElementById('rope-tabagismo').checked) score++;
    if (document.getElementById('rope-cortical').checked) score++;

    // Probabilidade RoPE (Baseado na tabela original do estudo)
    let probabilidade = "";
    if (score <= 3) probabilidade = "0% (PFO Incidental)";
    else if (score === 4) probabilidade = "~12% Probabilidade Causal";
    else if (score === 5) probabilidade = "~25% Probabilidade Causal";
    else if (score === 6) probabilidade = "~40% Probabilidade Causal";
    else if (score === 7) probabilidade = "~62% Probabilidade Causal";
    else if (score === 8) probabilidade = "~75% Probabilidade Causal";
    else if (score >= 9)  probabilidade = "~88% Probabilidade Causal";

    // 3. Lógica PASCAL
    // Unlikely: RoPE < 7 E Sem Risco
    // Possible: RoPE < 7 E Com Risco OU RoPE >= 7 E Sem Risco
    // Probable: RoPE >= 7 E Com Risco

    const temRiscoAlto = document.querySelector('input[name="pascal-risk"]:checked').value === 'sim';
    const ropeAlto = score >= 7;

    let pascalClass = "";
    let pascalCor = "";

    if (!ropeAlto && !temRiscoAlto) {
        pascalClass = "Unlikely (Improvável)";
        pascalCor = "#5cb85c"; // Verde
    } else if (ropeAlto && temRiscoAlto) {
        pascalClass = "Probable (Provável)";
        pascalCor = "#d9534f"; // Vermelho
    } else {
        pascalClass = "Possible (Possível)";
        pascalCor = "#f0ad4e"; // Laranja
    }

    // Atualizar HTML
    document.getElementById('rope-placar').innerText = score;
    document.getElementById('rope-probabilidade').innerText = probabilidade;
    
    const divPascal = document.getElementById('pascal-resultado');
    divPascal.innerText = pascalClass;
    divPascal.style.color = pascalCor;
    divPascal.style.fontWeight = "bold";

    document.getElementById('rope-resumo').innerText = `RoPE Score: ${score}/10 (${probabilidade})\nClassificação PASCAL: ${pascalClass}`;
}

function adicionarEstiloRoPE() {
    if (!document.getElementById('rope-style')) {
        const style = document.createElement('style');
        style.id = 'rope-style';
        style.innerHTML = `
            .grupo-checkbox { margin-bottom: 12px; }
            .grupo-checkbox label { display: flex; align-items: center; cursor: pointer; font-size: 1rem; color: #444; }
            .checkmark-box {
                height: 20px; width: 20px; background-color: #eee; border: 1px solid #ccc; border-radius: 3px;
                margin-right: 10px; display: inline-block; position: relative;
            }
            .grupo-checkbox input { display: none; }
            .grupo-checkbox input:checked ~ .checkmark-box { background-color: #007bff; border-color: #007bff; }
            .grupo-checkbox input:checked ~ .checkmark-box:after {
                content: ""; position: absolute; display: block;
                left: 6px; top: 2px; width: 6px; height: 12px;
                border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg);
            }
            .label-destaque { font-weight: bold; display: block; margin-bottom: 8px; color: #333; }
        `;
        document.head.appendChild(style);
    }
}