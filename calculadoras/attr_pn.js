// Arquivo: /calculadoras/attr_pn.js

function attrPnEstagios() {
    // Definimos as opções baseadas na capacidade de marcha (que dita as duas escalas)
    const estagios = [
        {
            id: 1,
            texto: "Distúrbios sensoriais, mas capacidade de locomoção preservada (sem comprometimento motor).",
            mpnd: "Estágio I",
            coutinho: "Estágio I",
            coutinhoDesc: "Estágio inicial: neuropatia sensorial e motora limitada aos membros inferiores. Comprometimento motor leve. Deambulação sem auxílio."
        },
        {
            id: 2,
            texto: "Dificuldade para andar, mas não há necessidade de auxílio para marcha.",
            mpnd: "Estágio II",
            coutinho: "Estágio I",
            coutinhoDesc: "Estágio inicial: neuropatia sensorial e motora limitada aos membros inferiores. Comprometimento motor leve. Deambulação sem auxílio."
        },
        {
            id: 3,
            texto: "É necessária UMA bengala ou muleta para caminhar.",
            mpnd: "Estágio IIIa",
            coutinho: "Estágio II",
            coutinhoDesc: "Estágio intermediário: é necessário auxílio para marcha. A neuropatia progride para membros superiores e tronco. Amiotrofia em membros superiores e inferiores. Comprometimento motor moderado."
        },
        {
            id: 4,
            texto: "São necessárias DUAS bengalas, duas muletas ou um andador para caminhar.",
            mpnd: "Estágio IIIb",
            coutinho: "Estágio II",
            coutinhoDesc: "Estágio intermediário: é necessário auxílio para marcha. A neuropatia progride para membros superiores e tronco. Amiotrofia em membros superiores e inferiores. Comprometimento motor moderado."
        },
        {
            id: 5,
            texto: "Paciente confinado a uma cadeira de rodas ou cama.",
            mpnd: "Estágio IV",
            coutinho: "Estágio III",
            coutinhoDesc: "Estágio avançado (terminal): acamado ou em cadeira de rodas. Neuropatia sensorial, motora e autonômica grave em todos os membros."
        }
    ];

    let htmlPerguntas = `
        <div class="grupo-radio">
            <h4>Selecione o nível de locomoção / comprometimento do paciente:</h4>
    `;

    estagios.forEach((est, index) => {
        htmlPerguntas += `
            <div class="opcao-radio" style="margin-bottom: 12px;">
                <label>
                    <input type="radio" name="attr_locomocao" value="${index}" onchange="calcularATTR()">
                    <span class="checkmark"></span>
                    <strong>Opção ${est.id}:</strong> ${est.texto}
                </label>
            </div>
        `;
    });

    htmlPerguntas += `</div>`;

    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Estadiamento Clínico da ATTR-PN</h5>
                    <p>Baseado no Quadro 1 do PCDT 2025 para Amiloidose Hereditária associada à Transtirretina. Selecione o quadro clínico para obter o estadiamento simultâneo.</p>
                </div>
                ${htmlPerguntas}
            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="attr-resultado-box">
                    <h3>Estadiamento ATTR-PN</h3>
                    
                    <div style="margin-top: 20px;">
                        <span style="font-size: 1em; color: #555;">Estágio mPND:</span>
                        <div class="placar-numero" id="attr-mpnd" style="font-size: 2.2rem; margin: 5px 0 15px 0;">-</div>
                    </div>

                    <div style="border-top: 1px solid #ddd; padding-top: 15px;">
                        <span style="font-size: 1em; color: #555;">Estágio de Coutinho:</span>
                        <div class="placar-numero" id="attr-coutinho" style="font-size: 2.2rem; margin: 5px 0; color: #0056b3;">-</div>
                        <div id="attr-coutinho-desc" style="font-size: 0.85em; color: #666; line-height: 1.4; padding: 0 10px;">
                            Selecione uma opção ao lado.
                        </div>
                    </div>

                    <h4 style="margin-top: 25px; margin-bottom: 5px; color: #333; font-size: 0.9em;">Cópia p/ Prontuário:</h4>
                    <div class="placar-copia" id="attr-copia" style="font-size: 0.8em; text-align: left; line-height: 1.6; display: none;">
                    </div>
                </div>
            </div> 
        </div> 
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCopiaATTR();
    
    // Anexa a variável estagios ao escopo da janela para usarmos na função de cálculo
    window.estagiosATTR = estagios;
}

window.calcularATTR = function() {
    const selecionado = document.querySelector('input[name="attr_locomocao"]:checked');
    if (!selecionado) return;

    const index = parseInt(selecionado.value);
    const est = window.estagiosATTR[index];

    // Atualiza mPND
    document.getElementById('attr-mpnd').innerText = est.mpnd;
    
    // Atualiza Coutinho
    document.getElementById('attr-coutinho').innerText = est.coutinho;
    document.getElementById('attr-coutinho-desc').innerText = est.coutinhoDesc;

    // Atualiza texto de cópia
    const textoCopia = `Estadiamento ATTR-PN:<br>
    - mPND: ${est.mpnd}<br>
    - Coutinho: ${est.coutinho}<br>
    Clínica: ${est.texto}`;
    
    const divCopia = document.getElementById('attr-copia');
    divCopia.innerHTML = textoCopia;
    divCopia.style.display = 'block';
};

function adicionarEstiloCopiaATTR() {
    if (document.getElementById('copia-style-attr')) return;
    const style = document.createElement('style');
    style.id = 'copia-style-attr';
    style.innerHTML = `
        .placar-copia {
            font-size: 0.9em; font-family: 'Courier New', Courier, monospace;
            color: #333; padding: 8px; background-color: #f8f9fa;
            border: 1px dashed #ccc; border-radius: 4px;
            line-height: 1.5; text-align: left;
        }
    `;
    document.head.appendChild(style);
}