// Arquivo: /calculadoras/funcao_renal.js

function funcao_renal() {
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                <div class="aviso-instrucao">
                    <h5>Função Renal Global</h5>
                    <p>Preencha os dados abaixo para calcular Cockcroft-Gault e CKD-EPI simultaneamente.</p>
                </div>

                <div class="grupo-input">
                    <label class="label-destaque">Sexo Biológico</label>
                    <div class="grupo-radio">
                        <label style="margin-right: 15px;">
                            <input type="radio" name="fr-sex" value="m" onchange="calcularRenal()" checked> Masculino
                        </label>
                        <label>
                            <input type="radio" name="fr-sex" value="f" onchange="calcularRenal()"> Feminino
                        </label>
                    </div>
                </div>

                <div class="grupo-input" style="margin-top: 15px;">
                    <label class="label-destaque">Idade (anos)</label>
                    <input type="number" id="fr-idade" class="input-numero" placeholder="Ex: 65" oninput="calcularRenal()">
                </div>

                <div class="grupo-input" style="margin-top: 15px;">
                    <label class="label-destaque">Creatinina Sérica (mg/dL)</label>
                    <input type="number" id="fr-creat" class="input-numero" placeholder="Ex: 1.0" step="0.1" oninput="calcularRenal()">
                </div>

                <div class="grupo-input" style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 15px;">
                    <label class="label-destaque">Peso (kg)</label>
                    <span style="font-size: 0.8em; color: #666;">(Necessário apenas para Cockcroft-Gault)</span>
                    <input type="number" id="fr-peso" class="input-numero" placeholder="Ex: 70" oninput="calcularRenal()" style="margin-top: 5px;">
                </div>

            </div>

            <div class="resultado-coluna">
                
                <div class="resultado-box-fixo" style="margin-bottom: 20px;">
                    <h3 style="font-size: 1.1em; color: #0056b3; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                        1. Cockcroft-Gault
                    </h3>
                    <p style="font-size: 0.8em; color: #666; margin-bottom: 5px;">Para ajuste de dose de medicações</p>
                    
                    <div class="placar-numero" id="res-cg">--</div>
                    <span style="font-size: 0.9em; color: #333;">mL/min</span>
                </div>

                <div class="resultado-box-fixo">
                    <h3 style="font-size: 1.1em; color: #28a745; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                        2. CKD-EPI (2021)
                    </h3>
                    <p style="font-size: 0.8em; color: #666; margin-bottom: 5px;">Para estadiamento renal (Race-Free)</p>
                    
                    <div class="placar-numero" id="res-ckd">--</div>
                    <span style="font-size: 0.9em; color: #333;">mL/min/1.73m²</span>
                    
                    <div id="msg-ckd" style="margin-top: 10px; font-weight: bold; font-size: 0.9em; color: #333;"></div>

                    <h4 style="margin-top: 20px; color: #333;">Cópia:</h4>
                    <div class="placar-copia" id="fr-resumo">
                        ClCr: -- | CKD-EPI: --
                    </div>
                </div>

            </div>
        </div>
    `;

    injetarConteudo(htmlConteudo);
    
    // Adicionar estilos locais se necessário
    if (!document.getElementById('renal-style')) {
        const style = document.createElement('style');
        style.id = 'renal-style';
        style.innerHTML = `
            .input-numero { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 1em; }
        `;
        document.head.appendChild(style);
    }
}

function calcularRenal() {
    // 1. Coletar Inputs
    const sexo = document.querySelector('input[name="fr-sex"]:checked').value; // 'm' ou 'f'
    const idade = parseFloat(document.getElementById('fr-idade').value);
    const creat = parseFloat(document.getElementById('fr-creat').value);
    const peso = parseFloat(document.getElementById('fr-peso').value); // Pode ser NaN se vazio

    // Elementos de Saída
    const elCG = document.getElementById('res-cg');
    const elCKD = document.getElementById('res-ckd');
    const elMsgCKD = document.getElementById('msg-ckd');
    const elResumo = document.getElementById('fr-resumo');

    let resultadoCG = "--";
    let resultadoCKD = "--";
    let textoResumo = "Preencha os dados";

    // Validação básica
    if (!idade || !creat || creat <= 0) {
        elCG.innerText = "--";
        elCKD.innerText = "--";
        return;
    }

    // --- CÁLCULO COCKCROFT-GAULT ---
    // Requer Peso
    if (peso > 0) {
        let fatorSexoCG = (sexo === 'f') ? 0.85 : 1.0;
        let cgVal = ((140 - idade) * peso) / (72 * creat);
        cgVal = cgVal * fatorSexoCG;
        resultadoCG = cgVal.toFixed(1);
        elCG.innerText = resultadoCG;
    } else {
        elCG.innerText = "--"; // Indica que falta peso
    }

    // --- CÁLCULO CKD-EPI (2021) ---
    // Não requer peso
    let kappa = (sexo === 'f') ? 0.7 : 0.9;
    let alpha = (sexo === 'f') ? -0.241 : -0.302;
    let fatorSexoCKD = (sexo === 'f') ? 1.012 : 1;

    let parte1 = Math.min(creat / kappa, 1);
    let parte2 = Math.max(creat / kappa, 1);
    
    let ckdVal = 142 * Math.pow(parte1, alpha) * Math.pow(parte2, -1.200) * Math.pow(0.9938, idade) * fatorSexoCKD;
    resultadoCKD = ckdVal.toFixed(1);
    elCKD.innerText = resultadoCKD;

    // Estadiamento CKD
    let estagio = "";
    if (ckdVal >= 90) estagio = "G1 (Normal)";
    else if (ckdVal >= 60) estagio = "G2 (Leve)";
    else if (ckdVal >= 45) estagio = "G3a (Leve-Mod)";
    else if (ckdVal >= 30) estagio = "G3b (Mod-Grave)";
    else if (ckdVal >= 15) estagio = "G4 (Grave)";
    else estagio = "G5 (Falência)";
    
    elMsgCKD.innerText = "Estágio: " + estagio;

    // --- RESUMO FINAL ---
    elResumo.innerText = `Função Renal (Cr ${creat}):\nCockcroft: ${resultadoCG} mL/min\nCKD-EPI: ${resultadoCKD} ml/min (${estagio})`;
}