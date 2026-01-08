// Arquivo: /calculadoras/hipernatremia.js

function hipernatremia() {
    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="background-color: #e3f2fd; border-left: 5px solid #2196f3; color: #0d47a1;">
                    <h5 style="color: #0d47a1;">Hipernatremia (Deficit de Água)</h5>
                    <p>Cálculo de reposição de água livre para corrigir Sódio elevado.</p>
                </div>

                <div class="grupo-input">
                    <label class="label-destaque">Sexo Biológico</label>
                    <div class="grupo-radio">
                        <label style="margin-right: 15px;">
                            <input type="radio" name="hiper-sex" value="0.6" onchange="calcularHiper()" checked> Homem
                        </label>
                        <label>
                            <input type="radio" name="hiper-sex" value="0.5" onchange="calcularHiper()"> Mulher
                        </label>
                    </div>
                    <div style="font-size:0.8em; color:#666; margin-top:5px;">
                        *Idosos: considerar reduzir fator (Homem 0.5, Mulher 0.45) mentalmente.
                    </div>
                </div>

                <div class="grupo-input" style="margin-top: 15px;">
                    <label class="label-destaque">Peso (kg)</label>
                    <input type="number" id="hiper-peso" class="input-numero" placeholder="Ex: 70" oninput="calcularHiper()">
                </div>

                <div class="grupo-input" style="margin-top: 15px;">
                    <label class="label-destaque">Sódio Atual (mEq/L)</label>
                    <input type="number" id="hiper-atual" class="input-numero" placeholder="Ex: 155" oninput="sugerirAlvo()">
                </div>

                <div class="grupo-input" style="margin-top: 15px;">
                    <label class="label-destaque">Sódio Desejado em 24h</label>
                    <input type="number" id="hiper-alvo" class="input-numero" placeholder="Ex: 147">
                    <p style="font-size: 0.8em; color: #d9534f; margin-top: 5px;">
                       ⚠️ Recomendado reduzir máx 8-10 mEq nas primeiras 24h.
                    </p>
                </div>
                
                <button class="btn-calcular-grande" onclick="calcularHiper()" style="margin-top: 20px; background-color: #2196f3;">Calcular Reposição</button>

            </div>

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="box-resultados" style="display: none; border-color: #2196f3;">
                    <h3 style="color: #2196f3;">Volume para Correção (24h)</h3>
                    
                    <div style="margin-bottom: 20px; text-align: center;">
                        <span style="font-size: 0.9em; color: #666;">Déficit de Água Livre Calculado:</span><br>
                        <strong id="res-deficit-l" style="font-size: 1.8em; color: #333;">--</strong> <span style="font-size: 1.2em;">Litros</span>
                    </div>

                    <div class="lista-infusao">
                        
                        <div class="item-infusao" style="border-left: 4px solid #4caf50;">
                            <strong>Via Enteral (Água Potável)</strong> <span class="tag-recomendado">Preferencial</span>
                            <div class="detalhe-vol">Volume Total: <span id="vol-enteral">0</span> mL</div>
                            <div class="detalhe-vazao">Copos: Aprox. <span id="vazao-copos">0</span> mL a cada 3h</div>
                        </div>

                        <div class="item-infusao" style="border-left: 4px solid #2196f3;">
                            <strong>Endovenoso: Soro Glicosado 5%</strong>
                            <div style="font-size:0.8em; color:#666;">(100% Água Livre)</div>
                            <div class="detalhe-vol">Volume Total: <span id="vol-sg">0</span> mL</div>
                            <div class="detalhe-vazao">Bomba: <span id="vazao-sg">0</span> mL/hora</div>
                        </div>

                        <div class="item-infusao" style="border-left: 4px solid #ff9800;">
                            <strong>Endovenoso: NaCl 0,45%</strong>
                            <div style="font-size:0.8em; color:#666;">(Apenas 50% é água livre - dobro do volume)</div>
                            <div class="detalhe-vol">Volume Total: <span id="vol-salina">0</span> mL</div>
                            <div class="detalhe-vazao">Bomba: <span id="vazao-salina">0</span> mL/hora</div>
                            <div style="font-size: 0.75em; color: #d9534f; margin-top:3px;">*Cuidado com sobrecarga volêmica.</div>
                        </div>

                    </div>

                    <div style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px; font-size: 0.85em;">
                        <strong>Considerações:</strong>
                        <ul style="padding-left: 20px; margin-top: 5px;">
                            <li>Solicitar Na+ sérico a cada 2-4 horas.</li>
                            <li>Adicionar perdas insensíveis (+/- 1000ml) se necessário.</li>
                            <li>Se hipotensão: expandir com SF 0,9% antes.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloHiper();
}

// Sugere o alvo automaticamente (Atual - 8) para facilitar
function sugerirAlvo() {
    const atual = parseFloat(document.getElementById('hiper-atual').value);
    if (atual && atual > 145) {
        const inputAlvo = document.getElementById('hiper-alvo');
        // Se o campo alvo estiver vazio, sugere 8 a menos
        if(inputAlvo.value === "") {
            inputAlvo.value = atual - 8;
        }
    }
}

function calcularHiper() {
    const peso = parseFloat(document.getElementById('hiper-peso').value);
    const atual = parseFloat(document.getElementById('hiper-atual').value);
    const alvo = parseFloat(document.getElementById('hiper-alvo').value);
    const fator = parseFloat(document.querySelector('input[name="hiper-sex"]:checked').value);

    if (!peso || !atual || !alvo) return;

    // Fórmula Déficit de Água Livre:
    // Déficit = ACT * ((NaAtual / NaAlvo) - 1)
    // Onde ACT = Peso * Fator
    
    const act = peso * fator;
    let deficitLitros = act * ((atual / alvo) - 1);
    
    if (deficitLitros < 0) deficitLitros = 0;
    
    const deficitMl = deficitLitros * 1000;

    // Cálculos de Volume
    // 1. Água Pura / SG5% (100% livre) = O próprio déficit
    const volAguaSG = deficitMl;
    
    // 2. NaCl 0.45% (Aprox 50% livre) = Precisa do dobro do volume para dar a mesma água livre
    const volSalina045 = deficitMl * 2;

    // Vazão em 24h
    const vazaoSG = volAguaSG / 24;
    const vazaoSalina = volSalina045 / 24;
    const coposEnteral = volAguaSG / 8; // Dividido em 8 doses (3/3h)

    // Renderizar
    document.getElementById('box-resultados').style.display = 'block';
    
    document.getElementById('res-deficit-l').innerText = deficitLitros.toFixed(1);
    
    // Enteral
    document.getElementById('vol-enteral').innerText = volAguaSG.toFixed(0);
    document.getElementById('vazao-copos').innerText = coposEnteral.toFixed(0);

    // SG 5%
    document.getElementById('vol-sg').innerText = volAguaSG.toFixed(0);
    document.getElementById('vazao-sg').innerText = vazaoSG.toFixed(0);

    // Salina 0.45%
    document.getElementById('vol-salina').innerText = volSalina045.toFixed(0);
    document.getElementById('vazao-salina').innerText = vazaoSalina.toFixed(0);
}

function adicionarEstiloHiper() {
    if (!document.getElementById('hiper-style')) {
        const style = document.createElement('style');
        style.id = 'hiper-style';
        style.innerHTML = `
            .btn-calcular-grande {
                width: 100%; padding: 12px; border: none; border-radius: 5px; 
                color: white; font-weight: bold; cursor: pointer; font-size: 1.1em;
                transition: 0.3s;
            }
            .btn-calcular-grande:hover { opacity: 0.9; }
            .lista-infusao { display: flex; flex-direction: column; gap: 15px; margin-top: 15px; }
            .item-infusao { background: #f9f9f9; padding: 10px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .tag-recomendado { 
                background: #4caf50; color: white; padding: 2px 6px; border-radius: 4px; 
                font-size: 0.7em; text-transform: uppercase; float: right; 
            }
            .detalhe-vol { margin-top: 5px; font-size: 0.95em; color: #333; }
            .detalhe-vazao { font-weight: bold; color: #0056b3; font-size: 1em; }
            .input-numero { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 1em; }
        `;
        document.head.appendChild(style);
    }
}