// Arquivo: /calculadoras/chads.js

function chads() {
    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao">
                    <h5>CHA₂DS₂-VA (Atualizado)</h5>
                    <p>O critério "Sexo Feminino" foi removido das novas diretrizes como pontuação isolada.</p>
                </div>

                <div class="grupo-input">
                    <label class="label-destaque">Idade</label>
                    <select id="chads-age" onchange="calcularChads()" style="width:100%; padding:10px; border-radius:5px; border:1px solid #ccc;">
                        <option value="0">< 65 anos (0)</option>
                        <option value="1">65 a 74 anos (+1)</option>
                        <option value="2">≥ 75 anos (+2)</option>
                    </select>
                </div>

                <hr style="margin: 15px 0;">

                <div class="grupo-checkbox">
                    <label><input type="checkbox" id="chads-c" onchange="calcularChads()"> <span class="checkmark-box"></span> <strong>C</strong> - Insuficiência Cardíaca (+1)</label>
                </div>
                <div class="grupo-checkbox">
                    <label><input type="checkbox" id="chads-h" onchange="calcularChads()"> <span class="checkmark-box"></span> <strong>H</strong> - Hipertensão (+1)</label>
                </div>
                <div class="grupo-checkbox">
                    <label><input type="checkbox" id="chads-a2" onchange="calcularChads()"> <span class="checkmark-box"></span> <strong>A₂</strong> - AVC / AIT / Tromboembolismo (+2)</label>
                </div>
                <div class="grupo-checkbox">
                    <label><input type="checkbox" id="chads-d" onchange="calcularChads()"> <span class="checkmark-box"></span> <strong>D</strong> - Diabetes (+1)</label>
                </div>
                <div class="grupo-checkbox">
                    <label><input type="checkbox" id="chads-v" onchange="calcularChads()"> <span class="checkmark-box"></span> <strong>V</strong> - Doença Vascular (IAM, DAP, Placa) (+1)</label>
                </div>

            </div>

            <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>CHA₂DS₂-VA</h3>
                    <div class="placar-numero" id="chads-placar">0</div>
                    
                    <div style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px;">
                        <strong>Recomendação:</strong><br>
                        <span id="chads-conduta" style="font-weight: bold; font-size: 1.1em;">--</span>
                    </div>

                    <h4 style="margin-top: 20px; color: #333;">Cópia:</h4>
                    <div class="placar-copia" id="chads-resumo">CHA2DS2-VA: 0 pts</div>
                </div>
            </div>
        </div>
    `;
    injetarConteudo(htmlConteudo);
    adicionarEstiloChads(); 
    calcularChads();
}

function calcularChads() {
    let score = 0;
    
    // Idade (0, 1 ou 2 pontos)
    score += parseInt(document.getElementById('chads-age').value);
    
    // Fatores (C, H, D, V = 1 ponto cada)
    if (document.getElementById('chads-c').checked) score += 1;
    if (document.getElementById('chads-h').checked) score += 1;
    if (document.getElementById('chads-d').checked) score += 1;
    if (document.getElementById('chads-v').checked) score += 1;
    
    // AVC prévio (2 pontos)
    if (document.getElementById('chads-a2').checked) score += 2;

    // Lógica de Decisão (Diretrizes Modernas - unissex)
    let conduta = "";
    let cor = "";

    if (score === 0) {
        conduta = "Risco Baixo.\nNenhuma terapia antitrombótica indicada.";
        cor = "#5cb85c"; // Verde
    } else if (score === 1) {
        conduta = "Risco Intermediário.\nConsiderar Anticoagulação (Classe IIa) ou não tratar, individualizar caso.";
        cor = "#f0ad4e"; // Laranja
    } else {
        conduta = "Risco Alto (Score ≥ 2).\nAnticoagulação Oral Indicada (Classe I).";
        cor = "#d9534f"; // Vermelho
    }

    // Atualiza
    document.getElementById('chads-placar').innerText = score;
    const divConduta = document.getElementById('chads-conduta');
    divConduta.innerText = conduta;
    divConduta.style.color = cor;

    document.getElementById('chads-resumo').innerText = `CHA2DS2-VA: ${score} pts - ${conduta.split('\n')[0]}`;
}

function adicionarEstiloChads() {
     if (!document.getElementById('chads-style')) {
        const style = document.createElement('style');
        style.id = 'chads-style';
        style.innerHTML = `.label-destaque { font-weight: bold; margin-bottom: 5px; display: block; color: #0056b3; }`;
        document.head.appendChild(style);
    }
}