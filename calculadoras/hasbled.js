// Arquivo: /calculadoras/hasbled.js

function hasbled() {
    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao">
                    <h5>HAS-BLED</h5>
                    <p>Avaliação do risco de sangramento em pacientes anticoagulados.</p>
                </div>

                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="hb-h" onchange="calcularHasbled()">
                        <span class="checkmark-box"></span>
                        <strong>H</strong> - Hipertensão não controlada (PAS > 160 mmHg)
                    </label>
                </div>

                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="hb-a1" onchange="calcularHasbled()">
                        <span class="checkmark-box"></span>
                        <strong>A</strong> - Função Renal Anormal (Diálise, Tx ou Cr > 2.26)
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="hb-a2" onchange="calcularHasbled()">
                        <span class="checkmark-box"></span>
                        <strong>A</strong> - Função Hepática Anormal (Cirrose, Bilirrubina > 2x, TGO/TGP > 3x)
                    </label>
                </div>

                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="hb-s" onchange="calcularHasbled()">
                        <span class="checkmark-box"></span>
                        <strong>S</strong> - Stroke (AVC prévio)
                    </label>
                </div>

                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="hb-b" onchange="calcularHasbled()">
                        <span class="checkmark-box"></span>
                        <strong>B</strong> - Bleeding (Sangramento prévio ou predisposição)
                    </label>
                </div>

                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="hb-l" onchange="calcularHasbled()">
                        <span class="checkmark-box"></span>
                        <strong>L</strong> - Labile INR (Se em uso de varfarina: TTR < 60%)
                    </label>
                </div>

                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="hb-e" onchange="calcularHasbled()">
                        <span class="checkmark-box"></span>
                        <strong>E</strong> - Elderly (Idade > 65 anos)
                    </label>
                </div>

                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="hb-d1" onchange="calcularHasbled()">
                        <span class="checkmark-box"></span>
                        <strong>D</strong> - Drogas (Antiplaquetários ou AINEs concomitantes)
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="hb-d2" onchange="calcularHasbled()">
                        <span class="checkmark-box"></span>
                        <strong>D</strong> - Drink (Álcool em excesso)
                    </label>
                </div>

            </div>

            <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>HAS-BLED Score</h3>
                    
                    <div class="placar-numero" id="hb-placar">0</div>
                    <div class="placar-classificacao" id="hb-msg">Risco Baixo</div>

                    <div style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px;">
                        <strong>Interpretação:</strong><br>
                        <span id="hb-conduta" style="font-size: 0.9em;">Monitore anualmente.</span>
                    </div>

                    <h4 style="margin-top: 20px; color: #333;">Cópia:</h4>
                    <div class="placar-copia" id="hb-resumo">HAS-BLED: 0</div>
                </div>
            </div>
        </div>
    `;

    injetarConteudo(htmlConteudo);
    // Usa o estilo padrão de checkboxes já definido anteriormente
    calcularHasbled();
}

function calcularHasbled() {
    const ids = ['hb-h', 'hb-a1', 'hb-a2', 'hb-s', 'hb-b', 'hb-l', 'hb-e', 'hb-d1', 'hb-d2'];
    let score = 0;

    ids.forEach(id => {
        if (document.getElementById(id).checked) score++;
    });

    // Atualiza Placar
    document.getElementById('hb-placar').innerText = score + "/9";

    // Lógica de Interpretação
    const divMsg = document.getElementById('hb-msg');
    const divConduta = document.getElementById('hb-conduta');
    let riscoTxt = "";
    let condutaTxt = "";
    let cor = "";

    if (score >= 3) {
        riscoTxt = "Alto Risco de Sangramento";
        condutaTxt = "Atenção redobrada. Corrija fatores modificáveis (PA, Álcool, AINEs). Revise o paciente com maior frequência.";
        cor = "#d9534f"; // Vermelho
    } else {
        riscoTxt = "Risco Baixo/Moderado";
        condutaTxt = "Seguimento padrão.";
        cor = "#5cb85c"; // Verde
    }

    divMsg.innerText = riscoTxt;
    divMsg.style.color = cor;
    divConduta.innerText = condutaTxt;

    document.getElementById('hb-resumo').innerText = `HAS-BLED: ${score}/9 (${riscoTxt})`;
}