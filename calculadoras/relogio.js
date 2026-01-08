// Arquivo: /calculadoras/relogio.js

function relogio() {
    
    // HTML Base
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Teste do Relógio (Escore Estruturado)</h5>
                    <p>Solicite ao paciente: "Desenhe um relógio grande, coloque todos os números e marque a hora 11:10".</p>
                    <p style="font-size:0.9em;">Marque os itens que o paciente <strong>ACERTOU</strong>.</p>
                </div>

                <h4 class="titulo-secao-relogio">1. Contorno (Máx 2)</h4>
                
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-contorno1" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Desenho de contorno aceitável (fechado)
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-contorno2" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Contorno com tamanho médio (suficiente)
                    </label>
                </div>

                <h4 class="titulo-secao-relogio">2. Números (Máx 6)</h4>

                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-num1" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        1-12 presentes (sem adição ou omissão)
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-num2" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Números Arábicos (1, 2, 3...)
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-num3" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Ordem correta
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-num4" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        O papel não é rodado quando escreve
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-num5" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Posição correta (configuração espacial)
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-num6" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Todos os números dentro do contorno
                    </label>
                </div>

                <h4 class="titulo-secao-relogio">3. Ponteiros (Máx 6)</h4>

                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-pont1" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        2 ponteiros e/ou marcas presentes
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-pont2" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Hora indicada de alguma maneira (marca/ponteiro)
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-pont3" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Minutos indicados de alguma maneira (marca/ponteiro)
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-pont4" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Proporção correta (minutos maior que hora)
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-pont5" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Sem marcas supérfluas (riscos extras)
                    </label>
                </div>
                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-pont6" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Ligados ou até 2mm de aproximação (união central)
                    </label>
                </div>

                <h4 class="titulo-secao-relogio">4. Centro (Máx 1)</h4>

                <div class="grupo-checkbox">
                    <label>
                        <input type="checkbox" id="cdt-centro1" onchange="calcularRelogio()">
                        <span class="checkmark-box"></span>
                        Desenhado, inferido ou extrapolado onde os ponteiros se encontram
                    </label>
                </div>

            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Pontuação Total</h3>
                    
                    <div class="placar-numero" id="cdt-placar">0/15</div>
                    <div class="placar-classificacao" id="cdt-msg">--</div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Cópia:</h4>
                    <div class="placar-copia" id="cdt-resumo">
                        Teste do Relógio: 0/15
                    </div>
                </div>
            </div> 

        </div>
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloRelogio();
    calcularRelogio();
}

function calcularRelogio() {
    const ids = [
        'cdt-contorno1', 'cdt-contorno2',
        'cdt-num1', 'cdt-num2', 'cdt-num3', 'cdt-num4', 'cdt-num5', 'cdt-num6',
        'cdt-pont1', 'cdt-pont2', 'cdt-pont3', 'cdt-pont4', 'cdt-pont5', 'cdt-pont6',
        'cdt-centro1'
    ];

    let total = 0;
    ids.forEach(id => {
        if (document.getElementById(id).checked) total++;
    });

    // Atualiza Placar
    document.getElementById('cdt-placar').innerText = total + "/15";
    
    // Sugestão de corte (Freedman et al., 1994): < 12 sugere comprometimento cognitivo
    // Ajuste conforme sua prática clínica, mas deixei um feedback visual.
    const divMsg = document.getElementById('cdt-msg');
    if (total >= 13) {
        divMsg.innerText = "Desempenho Preservado";
        divMsg.style.color = "#5cb85c"; // Verde
    } else {
        divMsg.innerText = "Sugestivo de Déficit";
        divMsg.style.color = "#d9534f"; // Vermelho
    }

    document.getElementById('cdt-resumo').innerText = `Teste do Relógio (Estruturado): ${total}/15`;
}

function adicionarEstiloRelogio() {
    if (!document.getElementById('relogio-style')) {
        const style = document.createElement('style');
        style.id = 'relogio-style';
        style.innerHTML = `
            .titulo-secao-relogio { color: #0056b3; margin-top: 20px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            .grupo-checkbox { margin-bottom: 8px; }
            .grupo-checkbox label { display: flex; align-items: start; cursor: pointer; font-size: 0.95em; color: #444; line-height: 1.4; }
            .checkmark-box {
                min-width: 18px; height: 18px; background-color: #eee; border: 1px solid #ccc; border-radius: 3px;
                margin-right: 10px; margin-top: 2px; position: relative;
            }
            .grupo-checkbox input { display: none; }
            .grupo-checkbox input:checked ~ .checkmark-box { background-color: #007bff; border-color: #007bff; }
            .grupo-checkbox input:checked ~ .checkmark-box:after {
                content: ""; position: absolute; display: block;
                left: 5px; top: 1px; width: 5px; height: 10px;
                border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg);
            }
        `;
        document.head.appendChild(style);
    }
}