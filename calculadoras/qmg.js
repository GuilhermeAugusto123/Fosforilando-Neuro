// Arquivo: /calculadoras/qmg.js

function qmgScore() {
    // 13 Itens do Escore QMG
    const qmgQuestions = [
        { id: "diplopia", titulo: "1. Diplopia (segundos de olhar lateral)",
          opcoes: [
              {v:0, l:"0: > 60 segundos (Normal)"},
              {v:1, l:"1: 11 a 59 segundos"},
              {v:2, l:"2: 1 a 10 segundos"},
              {v:3, l:"3: Espontânea (0 segundos)"}
          ]
        },
        { id: "ptose", titulo: "2. Ptose (segundos a olhar para cima)",
          opcoes: [
              {v:0, l:"0: > 60 segundos (Normal)"},
              {v:1, l:"1: 11 a 59 segundos"},
              {v:2, l:"2: 1 a 10 segundos"},
              {v:3, l:"3: Espontânea (0 segundos)"}
          ]
        },
        { id: "facial", titulo: "3. Músculos Faciais (fechar os olhos)",
          opcoes: [
              {v:0, l:"0: Normal (fecha bem os olhos e esconde as pestanas)"},
              {v:1, l:"1: Fraqueza leve na oclusão ocular"},
              {v:2, l:"2: Fraqueza moderada na oclusão ocular"},
              {v:3, l:"3: Fraqueza grave / perda completa de expressão facial"}
          ]
        },
        { id: "degluticao", titulo: "4. Deglutição (110 ml de água)",
          opcoes: [
              {v:0, l:"0: Normal (engole sem problemas)"},
              {v:1, l:"1: Tosse ou engasga-se após terminar de beber"},
              {v:2, l:"2: Tosse ou engasga-se durante a deglutição (bebe metade)"},
              {v:3, l:"3: Incapaz de engolir / necessita de sonda"}
          ]
        },
        { id: "fala", titulo: "5. Fala (contar em voz alta até 50)",
          opcoes: [
              {v:0, l:"0: Chega a 50 sem disartria ou voz anasalada"},
              {v:1, l:"1: Disartria notória entre o 30 e 49"},
              {v:2, l:"2: Disartria notória entre o 10 e 29"},
              {v:3, l:"3: Disartria severa / incapacidade no número 9"}
          ]
        },
        { id: "braco_dir", titulo: "6. Braço Direito estendido (90° sentado)",
          opcoes: [
              {v:0, l:"0: 240 segundos (4 min)"},
              {v:1, l:"1: 90 a 239 segundos"},
              {v:2, l:"2: 10 a 89 segundos"},
              {v:3, l:"3: 0 a 9 segundos (cai imediatamente)"}
          ]
        },
        { id: "braco_esq", titulo: "7. Braço Esquerdo estendido (90° sentado)",
          opcoes: [
              {v:0, l:"0: 240 segundos (4 min)"},
              {v:1, l:"1: 90 a 239 segundos"},
              {v:2, l:"2: 10 a 89 segundos"},
              {v:3, l:"3: 0 a 9 segundos"}
          ]
        },
        { id: "cap_vital", titulo: "8. Capacidade Vital (% do previsto)",
          opcoes: [
              {v:0, l:"0: ≥ 80%"},
              {v:1, l:"1: 65% a 79%"},
              {v:2, l:"2: 50% a 64%"},
              {v:3, l:"3: < 50% (ou suporte ventilatório)"}
          ]
        },
        { id: "preensao_dir", titulo: "9. Preensão - Mão Direita (Dinamometria)",
          opcoes: [
              {v:0, l:"0: Homem ≥ 45 kg / Mulher ≥ 30 kg"},
              {v:1, l:"1: Homem 15-44 kg / Mulher 10-29 kg"},
              {v:2, l:"2: Homem 5-14 kg / Mulher 5-9 kg"},
              {v:3, l:"3: Homem < 5 kg / Mulher < 5 kg"}
          ]
        },
        { id: "preensao_esq", titulo: "10. Preensão - Mão Esquerda (Dinamometria)",
          opcoes: [
              {v:0, l:"0: Homem ≥ 45 kg / Mulher ≥ 30 kg"},
              {v:1, l:"1: Homem 15-44 kg / Mulher 10-29 kg"},
              {v:2, l:"2: Homem 5-14 kg / Mulher 5-9 kg"},
              {v:3, l:"3: Homem < 5 kg / Mulher < 5 kg"}
          ]
        },
        { id: "perna_dir", titulo: "11. Perna Direita estendida (45° em supino)",
          opcoes: [
              {v:0, l:"0: 100 segundos"},
              {v:1, l:"1: 31 a 99 segundos"},
              {v:2, l:"2: 1 a 30 segundos"},
              {v:3, l:"3: 0 segundos (não consegue elevar)"}
          ]
        },
        { id: "perna_esq", titulo: "12. Perna Esquerda estendida (45° em supino)",
          opcoes: [
              {v:0, l:"0: 100 segundos"},
              {v:1, l:"1: 31 a 99 segundos"},
              {v:2, l:"2: 1 a 30 segundos"},
              {v:3, l:"3: 0 segundos"}
          ]
        },
        { id: "cabeca", titulo: "13. Elevação da Cabeça (em supino)",
          opcoes: [
              {v:0, l:"0: 120 segundos (2 min)"},
              {v:1, l:"1: 30 a 119 segundos"},
              {v:2, l:"2: 1 a 29 segundos"},
              {v:3, l:"3: 0 segundos (não consegue elevar a cabeça)"}
          ]
        }
    ];

    let htmlPerguntas = "";

    qmgQuestions.forEach((q) => {
        htmlPerguntas += `
            <div class="grupo-radio">
                <h4 style="font-size: 0.95rem;">${q.titulo}</h4>
        `;
        
        q.opcoes.forEach((opt, idx) => {
            // Inicia todas as opções no 0 (Normal) por predefinição para poupar tempo
            let checked = (idx === 0) ? "checked" : "";
            htmlPerguntas += `
                <div class="opcao-radio">
                    <label>
                        <input type="radio" name="qmg_${q.id}" value="${opt.v}" onchange="calcularQMG()" ${checked}>
                        <span class="checkmark"></span>${opt.l}
                    </label>
                </div>
            `;
        });
        
        htmlPerguntas += `</div>`;
    });

    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Escore QMG (0-39 pts)</h5>
                    <ul>
                        <li>Escore Quantitativo para Miastenia Gravis.</li>
                        <li>Valores iniciam no "0" (Normal). Altere apenas o que apresentar défice.</li>
                        <li>Pontuações mais elevadas indicam maior gravidade da doença.</li>
                    </ul>
                </div>
                ${htmlPerguntas}
            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="qmg-resultado-box">
                    <h3>QMG Score</h3>
                    
                    <div style="margin-top: 20px;">
                        <div class="placar-numero" id="qmg-resultado-total" style="font-size: 4rem; margin: 10px 0; color: #0056b3; line-height: 1;">0</div>
                        <div style="font-size: 1.1em; color: #666; line-height: 1.4; padding: 0 10px; font-weight: bold;">
                            / 39 Pontos
                        </div>
                    </div>

                    <h4 style="margin-top: 30px; margin-bottom: 5px; color: #333; font-size: 0.9em;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="qmg-copia" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                    </div>
                </div>
            </div> 
        </div> 
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCopiaQMG();
    
    window.listaQuestoesQMG = qmgQuestions;
    calcularQMG();
}

window.calcularQMG = function() {
    let total = 0;
    let detalhes = [];

    window.listaQuestoesQMG.forEach(q => {
        const selecionado = document.querySelector(`input[name="qmg_${q.id}"]:checked`);
        let valor = selecionado ? parseInt(selecionado.value) : 0;
        total += valor;
        detalhes.push(`- ${q.titulo.split(' (')[0]}: ${valor}`);
    });

    const resultadoTotal = document.getElementById('qmg-resultado-total');
    resultadoTotal.innerText = total;
    
    // Feedback visual de gravidade (sugestão de cores)
    if (total === 0) {
        resultadoTotal.style.color = "#28a745"; // Verde
    } else if (total < 15) {
        resultadoTotal.style.color = "#ffc107"; // Amarelo
    } else {
        resultadoTotal.style.color = "#dc3545"; // Vermelho
    }

    const textoCopia = `
        <strong>Escore QMG Total: ${total}/39</strong><br>
        <span style="font-size:0.9em;">
        ${detalhes.join('<br>')}
        </span>
    `;
    
    document.getElementById('qmg-copia').innerHTML = textoCopia;
};

function adicionarEstiloCopiaQMG() {
    if (document.getElementById('copia-style-qmg')) return;
    const style = document.createElement('style');
    style.id = 'copia-style-qmg';
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