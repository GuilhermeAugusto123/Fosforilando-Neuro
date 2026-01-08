// Arquivo: /calculadoras/corticoides.js

function corticoides() {
    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao">
                    <h5>Conversor de Corticosteroides</h5>
                    <p>Calcula a dose equivalente com base na potência anti-inflamatória.</p>
                </div>

                <div class="grupo-input">
                    <label class="label-destaque">Corticoide de Origem</label>
                    <select id="cort-origem" class="input-select" onchange="calcularCorticoides()">
                        <option value="20">Hidrocortisona (Curta)</option>
                        <option value="25">Cortisona (Curta)</option>
                        <option value="5" selected>Prednisona (Intermediária)</option>
                        <option value="5">Prednisolona (Intermediária)</option>
                        <option value="4">Metilprednisolona (Intermediária)</option>
                        <option value="4">Triancinolona (Intermediária)</option>
                        <option value="0.75">Dexametasona (Longa)</option>
                        <option value="0.75">Betametasona (Longa)</option>
                    </select>
                </div>

                <div class="grupo-input" style="margin-top: 15px;">
                    <label class="label-destaque">Dose Atual (mg)</label>
                    <input type="number" id="cort-dose" class="input-numero" placeholder="Ex: 40" oninput="calcularCorticoides()">
                </div>

                <div style="margin-top: 20px; font-size: 0.85em; color: #666; background: #f9f9f9; padding: 10px; border-radius: 5px;">
                    <strong>Referência de Base:</strong><br>
                    5 mg Prednisona ≈ 20 mg Hidrocortisona ≈ 0,75 mg Dexametasona.
                </div>
            </div>

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" style="padding: 0; overflow: hidden;">
                    <h3 style="padding: 15px; margin: 0; background: #f1f1f1; border-bottom: 1px solid #ccc;">Equivalências</h3>
                    
                    <div class="tabela-scroll">
                        <table class="tabela-corticoides">
                            <thead>
                                <tr>
                                    <th>Droga</th>
                                    <th>Dose Equiv.</th>
                                    <th style="font-size:0.8em; text-align:center;">Retenção<br>Salina*</th>
                                </tr>
                            </thead>
                            <tbody id="tabela-resultados">
                                </tbody>
                        </table>
                    </div>
                    
                    <div style="padding: 10px; font-size: 0.8em; color: #666; border-top: 1px solid #eee;">
                        *Potência Mineralocorticoide: 0 (Nula) a ++++ (Alta).
                    </div>
                </div>
            </div>
        </div>
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCorticoides();
    calcularCorticoides(); // Inicia zerado ou com padrão
}

function calcularCorticoides() {
    const fatorOrigem = parseFloat(document.getElementById('cort-origem').value);
    const doseInput = parseFloat(document.getElementById('cort-dose').value);

    const tabela = document.getElementById('tabela-resultados');
    tabela.innerHTML = ""; // Limpa tabela

    if (!doseInput) {
        tabela.innerHTML = `<tr><td colspan="3" style="text-align:center; padding:20px; color:#999;">Digite a dose para calcular</td></tr>`;
        return;
    }

    // Lista de Drogas com seus fatores (Base Prednisona 5 = Hidro 20 = Dexa 0.75)
    // Usaremos a lógica: DoseBase = DoseInput / FatorOrigem
    // DoseDestino = DoseBase * FatorDestino
    // Mas note: Fator deve ser inversamente proporcional à potência. 
    // Vamos usar a Tabela de Equivalência Padrão em mg (Quanto mg equivale a 5mg de prednisona?)
    
    // Fatores (mg equivalentes):
    // Hidro: 20
    // Pred: 5
    // Metil: 4
    // Dexa: 0.75
    
    // Cálculo: (DoseInput / EquivOrigem) * EquivDestino
    
    const drogas = [
        { nome: "Hidrocortisona", equiv: 20, min: "++++ (Alta)", class: "curta" },
        { nome: "Cortisona", equiv: 25, min: "++++", class: "curta" },
        { nome: "Prednisona", equiv: 5, min: "+ (Leve)", class: "inter" },
        { nome: "Prednisolona", equiv: 5, min: "+ (Leve)", class: "inter" },
        { nome: "Metilprednisolona", equiv: 4, min: "0 (Nula)", class: "inter" },
        { nome: "Triancinolona", equiv: 4, min: "0 (Nula)", class: "inter" },
        { nome: "Dexametasona", equiv: 0.75, min: "0 (Nula)", class: "longa" },
        { nome: "Betametasona", equiv: 0.75, min: "0 (Nula)", class: "longa" }
    ];

    drogas.forEach(droga => {
        let doseCalculada = (doseInput / fatorOrigem) * droga.equiv;
        
        // Formatação bonita para números pequenos vs grandes
        let doseShow = doseCalculada < 1 ? doseCalculada.toFixed(2) : doseCalculada.toFixed(1);
        if (doseCalculada % 1 === 0) doseShow = doseCalculada.toFixed(0);

        // Destaque se for a droga selecionada
        const isSelected = (droga.equiv === fatorOrigem) ? "style='background-color: #e3f2fd; font-weight:bold;'" : "";
        
        // Estilo da barra lateral baseada na duração
        let corBarra = "#ccc";
        if(droga.class === 'curta') corBarra = "#f0ad4e"; // Laranja
        if(droga.class === 'inter') corBarra = "#5bc0de"; // Azul claro
        if(droga.class === 'longa') corBarra = "#0275d8"; // Azul escuro

        const row = `
            <tr ${isSelected}>
                <td style="border-left: 4px solid ${corBarra};">
                    ${droga.nome}
                </td>
                <td>
                    <strong style="color: #333; font-size: 1.1em;">${doseShow} mg</strong>
                </td>
                <td style="text-align: center; color: #666; font-size: 0.9em;">
                    ${droga.min}
                </td>
            </tr>
        `;
        tabela.innerHTML += row;
    });
}

function adicionarEstiloCorticoides() {
    if (!document.getElementById('cort-style')) {
        const style = document.createElement('style');
        style.id = 'cort-style';
        style.innerHTML = `
            .input-select { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 1em; background: #fff; }
            .input-numero { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 1em; }
            .tabela-corticoides { width: 100%; border-collapse: collapse; }
            .tabela-corticoides th { text-align: left; padding: 10px; background: #f8f9fa; border-bottom: 2px solid #ddd; font-size: 0.9em; color: #555; }
            .tabela-corticoides td { padding: 12px 10px; border-bottom: 1px solid #eee; }
            .tabela-scroll { max-height: 400px; overflow-y: auto; }
        `;
        document.head.appendChild(style);
    }
}