// Arquivo: /calculadoras/nis_ll.js

function nisScore() {
    // Definição dos itens do NIS-LL (Membros Inferiores)
    const forca = [
        { id: "flex_quadril", nome: "Flexão do Quadril" },
        { id: "ext_quadril", nome: "Extensão do Quadril" },
        { id: "flex_joelho", nome: "Flexão do Joelho" },
        { id: "ext_joelho", nome: "Extensão do Joelho" },
        { id: "dorsi_torno", nome: "Dorsiflexão do Tornozelo" },
        { id: "flex_plantar", nome: "Flexão Plantar do Tornozelo" },
        { id: "ext_halux", nome: "Extensão dos Dedos (Hálux)" },
        { id: "flex_halux", nome: "Flexão dos Dedos (Hálux)" }
    ];

    const reflexos = [
        { id: "patelar", nome: "Patelar (Joelho)" },
        { id: "aquileu", nome: "Aquileu (Tornozelo)" }
    ];

    const sensibilidade = [
        { id: "tatil", nome: "Tátil (Pressão no Hálux)" },
        { id: "dor", nome: "Dolorosa (Picada no Hálux)" },
        { id: "vibratoria", nome: "Vibratória (Hálux)" },
        { id: "proprio", nome: "Propriocepção (Articular do Hálux)" }
    ];

    let htmlPerguntas = "";

    // 1. FORÇA MUSCULAR (0 a 4)
    htmlPerguntas += `
        <div style="margin-top: 25px; margin-bottom: 15px;">
            <h4 style="color: #0056b3; border-bottom: 2px solid #e0e0e0; padding-bottom: 5px;">1. Força Muscular (0-4)</h4>
            <p style="font-size: 0.8rem; color: #666;">0=Normal | 1=Fraqueza Leve (25%) | 2=Fraqueza Moderada (50%) | 3=Fraqueza Grave (75%) | 4=Paralisia</p>
        </div>
    `;
    forca.forEach(item => {
        ['Dir', 'Esq'].forEach(lado => {
            htmlPerguntas += `
                <div class="grupo-radio">
                    <h4 style="font-size: 0.95rem;">${item.nome} (${lado})</h4>
                    <div class="opcao-radio"><label><input type="radio" name="nis_f_${item.id}_${lado}" value="0" data-nome="${item.nome} (${lado})" onchange="calcularNIS()" checked><span class="checkmark"></span>0: Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nis_f_${item.id}_${lado}" value="1" data-nome="${item.nome} (${lado})" onchange="calcularNIS()"><span class="checkmark"></span>1: Leve</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nis_f_${item.id}_${lado}" value="2" data-nome="${item.nome} (${lado})" onchange="calcularNIS()"><span class="checkmark"></span>2: Moderada</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nis_f_${item.id}_${lado}" value="3" data-nome="${item.nome} (${lado})" onchange="calcularNIS()"><span class="checkmark"></span>3: Grave</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nis_f_${item.id}_${lado}" value="4" data-nome="${item.nome} (${lado})" onchange="calcularNIS()"><span class="checkmark"></span>4: Paralisia</label></div>
                </div>
            `;
        });
    });

    // 2. REFLEXOS (0 a 2)
    htmlPerguntas += `
        <div style="margin-top: 35px; margin-bottom: 15px;">
            <h4 style="color: #0056b3; border-bottom: 2px solid #e0e0e0; padding-bottom: 5px;">2. Reflexos Profundos (0-2)</h4>
        </div>
    `;
    reflexos.forEach(item => {
        ['Dir', 'Esq'].forEach(lado => {
            htmlPerguntas += `
                <div class="grupo-radio">
                    <h4 style="font-size: 0.95rem;">${item.nome} (${lado})</h4>
                    <div class="opcao-radio"><label><input type="radio" name="nis_r_${item.id}_${lado}" value="0" data-nome="${item.nome} (${lado})" onchange="calcularNIS()" checked><span class="checkmark"></span>0: Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nis_r_${item.id}_${lado}" value="1" data-nome="${item.nome} (${lado})" onchange="calcularNIS()"><span class="checkmark"></span>1: Reduzido</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nis_r_${item.id}_${lado}" value="2" data-nome="${item.nome} (${lado})" onchange="calcularNIS()"><span class="checkmark"></span>2: Ausente</label></div>
                </div>
            `;
        });
    });

    // 3. SENSIBILIDADE (0 a 2)
    htmlPerguntas += `
        <div style="margin-top: 35px; margin-bottom: 15px;">
            <h4 style="color: #0056b3; border-bottom: 2px solid #e0e0e0; padding-bottom: 5px;">3. Sensibilidade no Hálux (0-2)</h4>
        </div>
    `;
    sensibilidade.forEach(item => {
        ['Dir', 'Esq'].forEach(lado => {
            htmlPerguntas += `
                <div class="grupo-radio">
                    <h4 style="font-size: 0.95rem;">${item.nome} (${lado})</h4>
                    <div class="opcao-radio"><label><input type="radio" name="nis_s_${item.id}_${lado}" value="0" data-nome="${item.nome} (${lado})" onchange="calcularNIS()" checked><span class="checkmark"></span>0: Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nis_s_${item.id}_${lado}" value="1" data-nome="${item.nome} (${lado})" onchange="calcularNIS()"><span class="checkmark"></span>1: Reduzida</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nis_s_${item.id}_${lado}" value="2" data-nome="${item.nome} (${lado})" onchange="calcularNIS()"><span class="checkmark"></span>2: Ausente</label></div>
                </div>
            `;
        });
    });

    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Escore NIS-LL (0-88 pts)</h5>
                    <ul>
                        <li>Neuropathy Impairment Score (Lower Limbs).</li>
                        <li>Focado nos Membros Inferiores (Padrão para ATTR, Diabética).</li>
                        <li>Por padrão, os valores iniciam em "0 (Normal)". Altere apenas o que apresentar déficit.</li>
                    </ul>
                </div>
                ${htmlPerguntas}
            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="nis-resultado-box">
                    <h3>Escore NIS-LL</h3>
                    
                    <div style="margin-top: 20px;">
                        <div class="placar-numero" id="nis-placar-numero" style="font-size: 4rem; margin: 10px 0; color: #0056b3; line-height: 1;">0</div>
                        <div style="font-size: 1.1em; color: #666; line-height: 1.4; padding: 0 10px; font-weight: bold;">
                            / 88 Pontos
                        </div>
                    </div>

                    <h4 style="margin-top: 30px; margin-bottom: 5px; color: #333; font-size: 0.9em;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="nis-placar-detalhe" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                    </div>
                </div>
            </div> 
        </div> 
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCopiaNIS();
    calcularNIS();
}

window.calcularNIS = function() {
    let totalForca = 0;
    let totalReflexos = 0;
    let totalSensibilidade = 0;
    let alterados = [];

    // Pega todos os inputs selecionados
    const selecionados = document.querySelectorAll('input[type="radio"]:checked');
    
    selecionados.forEach(radio => {
        let valor = parseInt(radio.value);
        if (valor > 0) {
            let nome = radio.getAttribute('data-nome');
            alterados.push(`- ${nome}: ${valor}`);
            
            // Soma na categoria correta baseado no 'name'
            if (radio.name.startsWith('nis_f_')) totalForca += valor;
            else if (radio.name.startsWith('nis_r_')) totalReflexos += valor;
            else if (radio.name.startsWith('nis_s_')) totalSensibilidade += valor;
        }
    });

    let totalGeral = totalForca + totalReflexos + totalSensibilidade;

    const resultadoTotal = document.getElementById('nis-placar-numero');
    resultadoTotal.innerText = totalGeral;
    
    // Cores de Gravidade
    if (totalGeral === 0) {
        resultadoTotal.style.color = "#28a745"; // Verde
    } else if (totalGeral <= 20) {
        resultadoTotal.style.color = "#ffc107"; // Amarelo
    } else {
        resultadoTotal.style.color = "#dc3545"; // Vermelho
    }

    // Texto dinâmico: Só mostra o que está alterado!
    let textoProntuario = `<strong>Escore NIS-LL Total: ${totalGeral}/88</strong><br>`;
    textoProntuario += `<span style="font-size: 0.85em; color: #666;">(Força: ${totalForca}/64 | Reflexos: ${totalReflexos}/8 | Sensibilidade: ${totalSensibilidade}/16)</span><br><br>`;
    
    if (totalGeral === 0) {
        textoProntuario += `<span style="color:#28a745;">Exame normal. Nenhum déficit pontuado.</span>`;
    } else {
        textoProntuario += `<strong>Déficits observados:</strong><br>`;
        textoProntuario += `<div style="margin-top: 5px;">${alterados.join('<br>')}</div>`;
    }

    document.getElementById('nis-placar-detalhe').innerHTML = textoProntuario;
};

function adicionarEstiloCopiaNIS() {
    if (document.getElementById('copia-style-nis')) return;
    const style = document.createElement('style');
    style.id = 'copia-style-nis';
    style.innerHTML = `
        .placar-copia {
            font-size: 0.85em; font-family: 'Courier New', Courier, monospace;
            color: #333; padding: 10px; background-color: #f8f9fa;
            border: 1px dashed #ccc; border-radius: 4px;
            line-height: 1.4; text-align: left;
            max-height: 250px;
            overflow-y: auto;
        }
    `;
    document.head.appendChild(style);
}