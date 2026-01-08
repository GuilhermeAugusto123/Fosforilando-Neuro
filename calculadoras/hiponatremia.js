// Arquivo: /calculadoras/hiponatremia.js

function hiponatremia() {
    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="background-color: #fff3cd; border-left: 5px solid #ff9800; color: #856404;">
                    <h5 style="color: #856404;">Hiponatremia (Reposição de Na+)</h5>
                    <p>Cálculo de déficit e solução hipertônica (3%).</p>
                </div>

                <div class="grupo-input">
                    <label class="label-destaque">Sexo Biológico</label>
                    <div class="grupo-radio">
                        <label style="margin-right: 15px;">
                            <input type="radio" name="hipo-sex" value="0.6" onchange="calcularHipo()" checked> Homem (ACT 0.6)
                        </label>
                        <label>
                            <input type="radio" name="hipo-sex" value="0.5" onchange="calcularHipo()"> Mulher (ACT 0.5)
                        </label>
                    </div>
                    <div style="font-size:0.8em; color:#666; margin-top:5px;">
                        *Idosos: considerar fator menor (0.5 H / 0.45 M).
                    </div>
                </div>

                <div class="grupo-input" style="margin-top: 15px;">
                    <label class="label-destaque">Peso (kg)</label>
                    <input type="number" id="hipo-peso" class="input-numero" placeholder="Ex: 70" oninput="calcularHipo()">
                </div>

                <div class="grupo-input" style="margin-top: 15px;">
                    <label class="label-destaque">Sódio Atual (mEq/L)</label>
                    <input type="number" id="hipo-atual" class="input-numero" placeholder="Ex: 115" oninput="sugerirAlvoHipo()">
                </div>

                <div class="grupo-input" style="margin-top: 15px;">
                    <label class="label-destaque">Sódio Desejado (Alvo)</label>
                    <input type="number" id="hipo-alvo" class="input-numero" placeholder="Ex: 123">
                    <p style="font-size: 0.8em; color: #d9534f; margin-top: 5px;">
                       ⚠️ Meta segura: elevar máx 8-10 mEq nas primeiras 24h.
                    </p>
                </div>

                <button class="btn-calcular-grande-hipo" onclick="calcularHipo()" style="margin-top: 20px;">Calcular Reposição</button>

            </div>

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="box-resultados-hipo" style="display: none; border-color: #ff9800;">
                    <h3 style="color: #e65100;">Prescrição Sugerida</h3>
                    
                    <div style="margin-bottom: 20px; text-align: center;">
                        <span style="font-size: 0.9em; color: #666;">Déficit Calculado:</span><br>
                        <strong id="res-deficit-mEq" style="font-size: 1.6em; color: #333;">0</strong> <span style="font-size: 1em;">mEq</span>
                    </div>

                    <div style="background: #fff; padding: 10px; border: 1px solid #eee; border-radius: 5px; margin-bottom: 15px;">
                        <span style="font-size: 0.9em; color: #666;">Volume total de NaCl 3% necessário:</span><br>
                        <strong id="res-vol-necessario" style="color: #0056b3; font-size: 1.2em;">0</strong> mL
                    </div>

                    <div class="receita-box">
                        <div class="receita-titulo">1. Preparar Solução Padrão (500mL a 3%)</div>
                        <div class="receita-ingredientes">
                            • <strong>445 mL</strong> de Soro Fisiológico 0,9%<br>
                            • <strong>55 mL</strong> de NaCl 20%
                        </div>
                        
                        <div class="receita-titulo" style="margin-top: 10px; color: #d9534f;">2. Velocidade na Bomba (BIC)</div>
                        <div class="receita-vazao">
                            <span id="res-vazao">0</span> mL/hora
                        </div>
                        <p style="font-size: 0.8em; color: #666; margin-top: 5px; text-align: center;">
                            (Correr nas próximas 24 horas)
                        </p>
                    </div>

                    <div style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px; font-size: 0.85em;">
                        <strong>Cuidados:</strong>
                        <ul style="padding-left: 20px; margin-top: 5px; color: #444;">
                            <li>Monitorar Na+ sérico a cada 2-4 horas.</li>
                            <li>Suspender se correção atingir a meta antes do tempo.</li>
                            <li>Risco de Mielinólise se correção rápida.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloHipo();
}

// Sugere alvo seguro (+8)
function sugerirAlvoHipo() {
    const atual = parseFloat(document.getElementById('hipo-atual').value);
    if (atual && atual < 135) {
        const inputAlvo = document.getElementById('hipo-alvo');
        if(inputAlvo.value === "") {
            inputAlvo.value = atual + 8;
        }
    }
}

function calcularHipo() {
    const peso = parseFloat(document.getElementById('hipo-peso').value);
    const atual = parseFloat(document.getElementById('hipo-atual').value);
    const alvo = parseFloat(document.getElementById('hipo-alvo').value);
    const fator = parseFloat(document.querySelector('input[name="hipo-sex"]:checked').value);

    if (!peso || !atual || !alvo) return;

    // 1. Déficit de Sódio (Adrogué-Madias simplificado para déficit total)
    // Déficit = ACT * (Alvo - Atual)
    const tbw = peso * fator;
    const delta = alvo - atual;
    
    // Proteção contra valores negativos (caso o usuário coloque alvo menor que atual)
    if (delta <= 0) {
        alert("O Alvo deve ser maior que o Sódio Atual para correção de Hiponatremia.");
        return;
    }

    const deficit = tbw * delta;

    // 2. Volume de Solução Salina 3%
    // Concentração NaCl 3% = 513 mEq/L (0.513 mEq/mL)
    // Volume (mL) = Deficit / 0.513
    const volNecessario = deficit / 0.513;

    // 3. Vazão para 24h
    // Vazão = VolumeNecessario / 24
    const vazao = volNecessario / 24;

    // Renderizar
    document.getElementById('box-resultados-hipo').style.display = 'block';
    document.getElementById('res-deficit-mEq').innerText = deficit.toFixed(0);
    document.getElementById('res-vol-necessario').innerText = volNecessario.toFixed(0);
    document.getElementById('res-vazao').innerText = vazao.toFixed(1);
}

function adicionarEstiloHipo() {
    if (!document.getElementById('hipo-style')) {
        const style = document.createElement('style');
        style.id = 'hipo-style';
        style.innerHTML = `
            .btn-calcular-grande-hipo {
                width: 100%; padding: 12px; border: none; border-radius: 5px; 
                background-color: #ff9800; color: white; font-weight: bold; 
                cursor: pointer; font-size: 1.1em; transition: 0.3s;
            }
            .btn-calcular-grande-hipo:hover { background-color: #e65100; }
            
            .receita-box { background: #fdfdfe; border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-top: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
            .receita-titulo { font-weight: bold; font-size: 0.95em; color: #333; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
            .receita-ingredientes { background: #f4f4f4; padding: 10px; border-radius: 5px; line-height: 1.6; color: #444; }
            .receita-vazao { font-size: 1.8em; font-weight: bold; color: #d9534f; text-align: center; margin-top: 5px; }
            
            .input-numero { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 1em; }
        `;
        document.head.appendChild(style);
    }
}