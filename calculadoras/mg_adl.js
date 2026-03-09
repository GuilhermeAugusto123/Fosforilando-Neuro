// Arquivo: /calculadoras/mg_adl.js

function mg_adl() {
    // Textos oficiais e validados da escala MG-ADL (padrão AZMed / Ensaios Clínicos)
    const questoesMGADL = [
        { id: "falar", titulo: "1. Falar",
          opcoes: [
              {v:0, l:"Normal"},
              {v:1, l:"Fadiga intermitente ou fala arrastada / anasalada"},
              {v:2, l:"Fadiga constante ou fala arrastada / anasalada, mas compreensível"},
              {v:3, l:"Difícil compreensão"}
          ]
        },
        { id: "mastigar", titulo: "2. Mastigar",
          opcoes: [
              {v:0, l:"Normal"},
              {v:1, l:"Fadiga com alimentos sólidos"},
              {v:2, l:"Fadiga com alimentos macios"},
              {v:3, l:"Sonda gástrica"}
          ]
        },
        { id: "engolir", titulo: "3. Engolir",
          opcoes: [
              {v:0, l:"Normal"},
              {v:1, l:"Raros episódios de engasgo"},
              {v:2, l:"Frequentes engasgos, necessitando de alterações na dieta"},
              {v:3, l:"Sonda gástrica"}
          ]
        },
        { id: "respirar", titulo: "4. Respirar",
          opcoes: [
              {v:0, l:"Normal"},
              {v:1, l:"Falta de ar com esforço"},
              {v:2, l:"Falta de ar no repouso"},
              {v:3, l:"Necessidade de suporte ventilatório"}
          ]
        },
        { id: "higiene", titulo: "5. Escovar os dentes ou pentear os cabelos",
          opcoes: [
              {v:0, l:"Normal"},
              {v:1, l:"Esforço extra, sem necessidade de repouso"},
              {v:2, l:"Necessidade de períodos de repouso"},
              {v:3, l:"Incapaz de realizar a tarefa"}
          ]
        },
        { id: "levantar", titulo: "6. Levantar-se de uma cadeira",
          opcoes: [
              {v:0, l:"Normal"},
              {v:1, l:"Esforço leve, às vezes necessita usar os braços"},
              {v:2, l:"Esforço moderado, sempre necessita usar os braços"},
              {v:3, l:"Grave, necessita de ajuda de outra pessoa"}
          ]
        },
        { id: "diplopia", titulo: "7. Visão dupla",
          opcoes: [
              {v:0, l:"Nenhuma"},
              {v:1, l:"Ocorre, mas não diariamente"},
              {v:2, l:"Diária, mas não constante"},
              {v:3, l:"Constante"}
          ]
        },
        { id: "ptose", titulo: "8. Pálpebra caída (Ptose)",
          opcoes: [
              {v:0, l:"Nenhuma"},
              {v:1, l:"Ocorre, mas não diariamente"},
              {v:2, l:"Diária, mas não constante"},
              {v:3, l:"Constante"}
          ]
        }
    ];

    let htmlPerguntas = "";

    // Gera o HTML das perguntas de forma dinâmica
    questoesMGADL.forEach((q) => {
        htmlPerguntas += `
            <div class="grupo-radio">
                <h4 style="font-size: 0.95rem; color: #333;">${q.titulo}</h4>
        `;
        
        q.opcoes.forEach((opt, idx) => {
            let checked = (idx === 0) ? "checked" : ""; // Inicia tudo como Normal
            htmlPerguntas += `
                <div class="opcao-radio">
                    <label>
                        <input type="radio" name="mgadl_${q.id}" value="${opt.v}" onchange="calcularMgAdl()" ${checked}>
                        <span class="checkmark"></span>(${opt.v}) ${opt.l}
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
                    <h5>MG-ADL (0 a 24 pts)</h5>
                    <ul>
                        <li>Atividades de Vida Diária na Miastenia Gravis.</li>
                        <li>Avalie o impacto dos sintomas na <strong>última semana</strong>.</li>
                        <li>Valores iniciam no "0" (Normal). Altere apenas o que apresentar alteração.</li>
                    </ul>
                </div>
                ${htmlPerguntas}
            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="mgadl-resultado-box">
                    <h3>Escore MG-ADL</h3>
                    
                    <div style="margin-top: 20px;">
                        <div class="placar-numero" id="mgadl-placar-numero" style="font-size: 4rem; margin: 10px 0; color: #0056b3; line-height: 1;">0</div>
                        <div style="font-size: 1.1em; color: #666; line-height: 1.4; padding: 0 10px; font-weight: bold;">
                            Escore Total (0-24)
                        </div>
                    </div>

                    <h4 style="margin-top: 30px; margin-bottom: 5px; color: #333; font-size: 0.9em;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="mgadl-placar-detalhe" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                    </div>
                </div>
            </div> 
        </div> 
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCopiaMgAdl();
    
    // Anexa as questões para uso no cálculo
    window.listaQuestoesMGADL = questoesMGADL;
    calcularMgAdl();
}

window.calcularMgAdl = function() {
    let total = 0;
    let detalhesFormato = [];

    window.listaQuestoesMGADL.forEach(q => {
        const selecionado = document.querySelector(`input[name="mgadl_${q.id}"]:checked`);
        let valor = selecionado ? parseInt(selecionado.value) : 0;
        total += valor;
        
        // Pega apenas o nome da atividade (ex: "Falar", "Mastigar")
        let nomeLimpo = q.titulo.split('. ')[1]; 
        detalhesFormato.push(`- ${nomeLimpo}: ${valor}`);
    });

    const resultadoTotal = document.getElementById('mgadl-placar-numero');
    resultadoTotal.innerText = total;
    
    // Ajusta a cor do número baseado na pontuação (Feedback Visual)
    if (total === 0) {
        resultadoTotal.style.color = "#28a745"; // Verde
    } else if (total <= 5) {
        resultadoTotal.style.color = "#ffc107"; // Amarelo
    } else {
        resultadoTotal.style.color = "#dc3545"; // Vermelho
    }

    // Monta o texto bonito para o prontuário
    const textoCopia = `
        <strong>MG-ADL Total: ${total}/24</strong><br>
        <div style="column-count: 2; column-gap: 10px; margin-top: 5px;">
            ${detalhesFormato.join('<br>')}
        </div>
    `;
    
    document.getElementById('mgadl-placar-detalhe').innerHTML = textoCopia;
};

function adicionarEstiloCopiaMgAdl() {
    if (document.getElementById('copia-style-mgadl')) return;
    const style = document.createElement('style');
    style.id = 'copia-style-mgadl';
    style.innerHTML = `
        .placar-copia {
            font-size: 0.85em; font-family: 'Courier New', Courier, monospace;
            color: #333; padding: 10px; background-color: #f8f9fa;
            border: 1px dashed #ccc; border-radius: 4px;
            line-height: 1.4; text-align: left;
        }
    `;
    document.head.appendChild(style);
}