// Arquivo: /calculadoras/mrc.js

function mrcSumScore() {
    // Grupos musculares avaliados no MRC Sum Score
    const musculos = [
        { id: "ombro_dir", nome: "Abdução do Ombro (Direito)", grupo: "Membros Superiores" },
        { id: "ombro_esq", nome: "Abdução do Ombro (Esquerdo)", grupo: "Membros Superiores" },
        { id: "cotovelo_dir", nome: "Flexão do Cotovelo (Direito)", grupo: "Membros Superiores" },
        { id: "cotovelo_esq", nome: "Flexão do Cotovelo (Esquerdo)", grupo: "Membros Superiores" },
        { id: "punho_dir", nome: "Extensão do Punho (Direito)", grupo: "Membros Superiores" },
        { id: "punho_esq", nome: "Extensão do Punho (Esquerdo)", grupo: "Membros Superiores" },
        { id: "quadril_dir", nome: "Flexão do Quadril (Direito)", grupo: "Membros Inferiores" }, // Atualizado
        { id: "quadril_esq", nome: "Flexão do Quadril (Esquerdo)", grupo: "Membros Inferiores" }, // Atualizado
        { id: "joelho_dir", nome: "Extensão do Joelho (Direito)", grupo: "Membros Inferiores" },
        { id: "joelho_esq", nome: "Extensão do Joelho (Esquerdo)", grupo: "Membros Inferiores" },
        { id: "tornozelo_dir", nome: "Dorsiflexão do Tornozelo (Direito)", grupo: "Membros Inferiores" },
        { id: "tornozelo_esq", nome: "Dorsiflexão do Tornozelo (Esquerdo)", grupo: "Membros Inferiores" }
    ];

    let htmlPerguntas = "";
    let grupoAtual = "";

    musculos.forEach((m) => {
        if (m.grupo !== grupoAtual) {
            htmlPerguntas += `
                <div style="margin-top: 25px; margin-bottom: 10px;">
                    <h4 style="color: #0056b3; border-bottom: 2px solid #e0e0e0; padding-bottom: 5px;">${m.grupo}</h4>
                </div>
            `;
            grupoAtual = m.grupo;
        }

        htmlPerguntas += `
            <div class="grupo-radio">
                <h4 style="font-size: 0.95rem;">${m.nome}</h4>
                
                <div class="opcao-radio"><label><input type="radio" name="mrc_${m.id}" value="5" onchange="calcularMRC()" checked><span class="checkmark"></span>Grau 5: Força normal contra resistência total</label></div>
                <div class="opcao-radio"><label><input type="radio" name="mrc_${m.id}" value="4" onchange="calcularMRC()"><span class="checkmark"></span>Grau 4: Movimento ativo contra a gravidade e alguma resistência</label></div>
                <div class="opcao-radio"><label><input type="radio" name="mrc_${m.id}" value="3" onchange="calcularMRC()"><span class="checkmark"></span>Grau 3: Movimento ativo contra a gravidade</label></div>
                <div class="opcao-radio"><label><input type="radio" name="mrc_${m.id}" value="2" onchange="calcularMRC()"><span class="checkmark"></span>Grau 2: Movimento ativo com a gravidade eliminada</label></div>
                <div class="opcao-radio"><label><input type="radio" name="mrc_${m.id}" value="1" onchange="calcularMRC()"><span class="checkmark"></span>Grau 1: Contração visível/palpável, sem movimento</label></div>
                <div class="opcao-radio"><label><input type="radio" name="mrc_${m.id}" value="0" onchange="calcularMRC()"><span class="checkmark"></span>Grau 0: Nenhuma contração visível ou palpável</label></div>
            </div>
        `;
    });

    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Escore MRC (0-60 pts)</h5>
                    <ul>
                        <li>Avaliação da força muscular periférica.</li>
                        <li>Por padrão, os valores iniciam em "Grau 5" (Normal) para poupar cliques. Altere apenas os que tiverem déficit.</li>
                        <li><strong>< 48 pontos:</strong> Sugestivo de Fraqueza Adquirida na UTI (ICUAW).</li>
                    </ul>
                </div>
                ${htmlPerguntas}
            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="mrc-resultado-box">
                    <h3>Escore MRC Sum Score</h3>
                    
                    <div style="margin-top: 20px;">
                        <div class="placar-numero" id="mrc-resultado-total" style="font-size: 4rem; margin: 10px 0; color: #0056b3; line-height: 1;">60</div>
                        <div id="mrc-resultado-desc" style="font-size: 1.1em; color: #666; line-height: 1.4; padding: 0 10px; font-weight: bold;">
                            / 60 Pontos
                        </div>
                    </div>

                    <h4 style="margin-top: 30px; margin-bottom: 5px; color: #333; font-size: 0.9em;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="mrc-copia" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                    </div>
                </div>
            </div> 
        </div> 
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCopiaMRC();
    
    window.listaMusculosMRC = musculos;
    calcularMRC();
}

window.calcularMRC = function() {
    let total = 0;
    let detalhesMembros = {};

    window.listaMusculosMRC.forEach(m => {
        const selecionado = document.querySelector(`input[name="mrc_${m.id}"]:checked`);
        let valor = selecionado ? parseInt(selecionado.value) : 0;
        total += valor;
        detalhesMembros[m.id] = valor;
    });

    const resultadoTotal = document.getElementById('mrc-resultado-total');
    resultadoTotal.innerText = total;
    
    if (total < 48) {
        resultadoTotal.style.color = "#dc3545"; 
        document.getElementById('mrc-resultado-desc').innerHTML = "/ 60 Pontos<br><span style='color:#dc3545; font-size:0.8em;'>Sugestivo de ICUAW (<48)</span>";
    } else {
        resultadoTotal.style.color = "#0056b3"; 
        document.getElementById('mrc-resultado-desc').innerHTML = "/ 60 Pontos<br><span style='color:#28a745; font-size:0.8em;'>Força Preservada</span>";
    }

    // Atualizado com "Quadril" no texto final
    const textoCopia = `
        <strong>Escore MRC: ${total}/60</strong><br>
        <span style="font-size:0.9em;">
        <strong>Membros Superiores:</strong><br>
        - Ombro: Dir ${detalhesMembros['ombro_dir']} | Esq ${detalhesMembros['ombro_esq']}<br>
        - Cotovelo: Dir ${detalhesMembros['cotovelo_dir']} | Esq ${detalhesMembros['cotovelo_esq']}<br>
        - Punho: Dir ${detalhesMembros['punho_dir']} | Esq ${detalhesMembros['punho_esq']}<br>
        <strong>Membros Inferiores:</strong><br>
        - Quadril: Dir ${detalhesMembros['quadril_dir']} | Esq ${detalhesMembros['quadril_esq']}<br>
        - Joelho: Dir ${detalhesMembros['joelho_dir']} | Esq ${detalhesMembros['joelho_esq']}<br>
        - Tornozelo: Dir ${detalhesMembros['tornozelo_dir']} | Esq ${detalhesMembros['tornozelo_esq']}
        </span>
    `;
    
    document.getElementById('mrc-copia').innerHTML = textoCopia;
};

function adicionarEstiloCopiaMRC() {
    if (document.getElementById('copia-style-mrc')) return;
    const style = document.createElement('style');
    style.id = 'copia-style-mrc';
    style.innerHTML = `
        .placar-copia {
            font-size: 0.9em; font-family: 'Courier New', Courier, monospace;
            color: #333; padding: 10px; background-color: #f8f9fa;
            border: 1px dashed #ccc; border-radius: 4px;
            line-height: 1.5; text-align: left;
        }
    `;
    document.head.appendChild(style);
}