// Arquivo: /calculadoras/pittsburgh.js (Versão 1.3 - CORREÇÃO DE SINTAXE)

/**
 * Função principal chamada pelo app.js
 */
function pittsburgh() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Índice de Qualidade do Sono de Pittsburgh (PSQI)</h5>
                    <ul>
                        <li>Avaliação referente ao último mês. Responda as perguntas abaixo.</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Hora que foi para a cama (habitual):</h4>
                    <div style="padding: 0 20px 20px;">
                        <input type="time" id="psqi-q1" class="form-input-time" onchange="calcularPittsburgh()">
                    </div>
                </div>

                <div class="grupo-radio">
                    <h4>2. Tempo para adormecer (minutos):</h4>
                    <div style="padding: 0 20px 20px;">
                        <input type="number" id="psqi-q2" class="form-input-number" min="0" value="0" onchange="calcularPittsburgh()">
                    </div>
                </div>

                <div class="grupo-radio">
                    <h4>3. Hora de acordar habitual:</h4>
                    <div style="padding: 0 20px 20px;">
                        <input type="time" id="psqi-q3" class="form-input-time" onchange="calcularPittsburgh()">
                    </div>
                </div>
                
                <div class="grupo-radio">
                    <h4>4. Horas de sono reais por noite:</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px; display: block;">(Não confunda com horas na cama)</span>
                    <div style="padding: 0 20px 20px;">
                        <input type="number" id="psqi-q4" class="form-input-number" min="0" value="0" step="0.5" onchange="calcularPittsburgh()">
                    </div>
                </div>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                <h4 style="color: #005a9c;">Perguntas 5a-5j: Frequência de problemas de sono (no último mês)</h4>
                <span class="sub-instrucao-titulo" style="padding: 0 0 15px; display: block;">(0 = Nenhuma; 1 = <1x/sem; 2 = 1-2x/sem; 3 = ≥3x/sem)</span>

                <div class="grupo-radio">
                    <h4>5a. Não conseguiu dormir em até 30 minutos?</h4>
                    ${opcoesHorizontais('psqi-5a')}
                </div>
                
                <div class="grupo-radio">
                    <h4>5b. Acordou no meio da noite ou de manhã cedo?</h4>
                    ${opcoesHorizontais('psqi-5b')}
                </div>
                
                <div class="grupo-radio">
                    <h4>5c. Precisou levantar para ir ao banheiro?</h4>
                    ${opcoesHorizontais('psqi-5c')}
                </div>
                
                <div class="grupo-radio">
                    <h4>5d. Não conseguiu respirar confortavelmente?</h4>
                    ${opcoesHorizontais('psqi-5d')}
                </div>
                
                <div class="grupo-radio">
                    <h4>5e. Tossiu ou roncou alto?</h4>
                    ${opcoesHorizontais('psqi-5e')}
                </div>
                
                <div class="grupo-radio">
                    <h4>5f. Sentiu muito frio?</h4>
                    ${opcoesHorizontais('psqi-5f')}
                </div>
                
                <div class="grupo-radio">
                    <h4>5g. Sentiu muito calor?</h4>
                    ${opcoesHorizontais('psqi-5g')}
                </div>
                
                <div class="grupo-radio">
                    <h4>5h. Teve sonhos ruins (pesadelos)?</h4>
                    ${opcoesHorizontais('psqi-5h')}
                </div>
                
                <div class="grupo-radio">
                    <h4>5i. Teve dor?</h4>
                    ${opcoesHorizontais('psqi-5i')}
                </div>
                
                <div class="grupo-radio">
                    <h4>5j. Outros motivos?</h4>
                    ${opcoesHorizontais('psqi-5j')}
                </div>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

                <div class="grupo-radio">
                    <h4>6. Como você classifica a qualidade geral do seu sono?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="psqi-6" value="0" onchange="calcularPittsburgh()" checked><span class="checkmark"></span>Muito boa (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="psqi-6" value="1" onchange="calcularPittsburgh()"><span class="checkmark"></span>Boa (1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="psqi-6" value="2" onchange="calcularPittsburgh()"><span class="checkmark"></span>Ruim (2)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="psqi-6" value="3" onchange="calcularPittsburgh()"><span class="checkmark"></span>Muito ruim (3)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>7. Com que frequência tomou medicação (prescrita ou não) para dormir?</h4>
                    ${opcoesHorizontais('psqi-7')}
                </div>

                <div class="grupo-radio">
                    <h4>8. Com que frequência teve dificuldade em ficar acordado (dirigindo, comendo, etc.)?</h4>
                    ${opcoesHorizontais('psqi-8')}
                </div>

                <div class="grupo-radio">
                    <h4>9. Quão problemático foi manter o entusiasmo para realizar tarefas?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="psqi-9" value="0" onchange="calcularPittsburgh()" checked><span class="checkmark"></span>Nenhum problema (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="psqi-9" value="1" onchange="calcularPittsburgh()"><span class="checkmark"></span>Problema leve (1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="psqi-9" value="2" onchange="calcularPittsburgh()"><span class="checkmark"></span>Problema moderado (2)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="psqi-9" value="3" onchange="calcularPittsburgh()"><span class="checkmark"></span>Problema grave (3)</label></div>
                </div>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                <h3 style="color: #005a9c;">Informações do(a) Companheiro(a)</h3>
                <span class="sub-instrucao-titulo" style="padding: 0 0 15px; display: block;">(Informação suplementar - NÃO entra no escore 0-21)</span>

                <div class="grupo-radio">
                    <h4>P1. Ronco alto?</h4>
                    ${opcoesHorizontais('psqi-p1')}
                </div>
                <div class="grupo-radio">
                    <h4>P2. Pausas longas na respiração?</h4>
                    ${opcoesHorizontais('psqi-p2')}
                </div>
                <div class="grupo-radio">
                    <h4>P3. "Pulos" ou "chutes" nas pernas?</h4>
                    ${opcoesHorizontais('psqi-p3')}
                </div>
                <div class="grupo-radio">
                    <h4>P4. Episódios de confusão ou desorientação?</h4>
                    ${opcoesHorizontais('psqi-p4')}
                </div>


            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Escore de Pittsburgh (PSQI)</h3>
                    
                    <div class="placar-numero" id="psqi-placar-numero">0</div>
                    <div class="placar-detalhe" id="psqi-placar-detalhe">Escore Total (0-21)</div>
                    <div class="placar-classificacao" id="psqi-placar-classificacao" style="font-size: 1.3em;">Qualidade Boa</div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Componentes (0-3):</h4>
                    <div class="placar-detalhe" id="psqi-componentes-detalhe" style="text-align: left; font-size: 0.9em; line-height: 1.5;">
                        C1 (Qualidade Subjetiva): 0<br>
                        C2 (Latência): 0<br>
                        C3 (Duração): 0<br>
                        C4 (Eficiência): 0<br>
                        C5 (Distúrbios): 0<br>
                        C6 (Uso de Medicação): 0<br>
                        C7 (Disfunção Diurna): 0
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);

    // 3. Adiciona o estilo para as opções horizontais (0-3) e inputs
    adicionarEstiloPittsburgh();
    
    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularPittsburgh();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularPittsburgh() {
    
    // --- Coleta de Dados Brutos ---
    const q1_time = document.getElementById('psqi-q1').value; // Hora de ir para a cama
    const q2_latencia = parseInt(document.getElementById('psqi-q2').value) || 0; 
    const q3_time = document.getElementById('psqi-q3').value; // Hora de acordar
    const q4_horasSono = parseFloat(document.getElementById('psqi-q4').value) || 0; 

    const q5a = parseInt(document.querySelector('input[name="psqi-5a"]:checked').value);
    const q5b = parseInt(document.querySelector('input[name="psqi-5b"]:checked').value);
    const q5c = parseInt(document.querySelector('input[name="psqi-5c"]:checked').value);
    const q5d = parseInt(document.querySelector('input[name="psqi-5d"]:checked').value);
    const q5e = parseInt(document.querySelector('input[name="psqi-5e"]:checked').value);
    const q5f = parseInt(document.querySelector('input[name="psqi-5f"]:checked').value);
    const q5g = parseInt(document.querySelector('input[name="psqi-5g"]:checked').value);
    const q5h = parseInt(document.querySelector('input[name="psqi-5h"]:checked').value);
    const q5i = parseInt(document.querySelector('input[name="psqi-5i"]:checked').value);
    const q5j = parseInt(document.querySelector('input[name="psqi-5j"]:checked').value);
    
    const q6_qualidade = parseInt(document.querySelector('input[name="psqi-6"]:checked').value);
    const q7_medicacao = parseInt(document.querySelector('input[name="psqi-7"]:checked').value);
    const q8_dificuldadeAcordado = parseInt(document.querySelector('input[name="psqi-8"]:checked').value);
    const q9_entusiasmo = parseInt(document.querySelector('input[name="psqi-9"]:checked').value);

    // --- Cálculo dos 7 Componentes (0-3 pontos cada) ---

    // C1: Qualidade Subjetiva do Sono (Pergunta 6)
    const C1 = q6_qualidade;

    // C2: Latência do Sono (Perguntas 2 e 5a)
    let C2 = 0;
    let score_q2 = 0;
    if (q2_latencia <= 15) score_q2 = 0;
    else if (q2_latencia <= 30) score_q2 = 1;
    else if (q2_latencia <= 60) score_q2 = 2;
    else score_q2 = 3;
    
    let score_q5a = q5a;
    let soma_c2 = score_q2 + score_q5a;
    
    if (soma_c2 === 0) C2 = 0;
    else if (soma_c2 <= 2) C2 = 1;
    else if (soma_c2 <= 4) C2 = 2;
    else C2 = 3;

    // C3: Duração do Sono (Pergunta 4)
    let C3 = 0;
    if (q4_horasSono > 7) C3 = 0;
    else if (q4_horasSono >= 6) C3 = 1;
    else if (q4_horasSono >= 5) C3 = 2;
    else C3 = 3;

    // C4: Eficiência Habitual do Sono (Perguntas 1, 3, 4)
    let C4 = 0;
    let horasNaCama = 0;
    if (q1_time && q3_time) {
        // Truque para calcular diferença de tempo que cruza a meia-noite
        const [h1, m1] = q1_time.split(':').map(Number);
        const [h2, m2] = q3_time.split(':').map(Number);

        let t1_minutos = (h1 * 60) + m1;
        let t2_minutos = (h2 * 60) + m2;
        
        let diffMinutos = t2_minutos - t1_minutos;
        if (diffMinutos < 0) { // Cruzou a meia-noite
            diffMinutos += 24 * 60; // Adiciona 24 horas em minutos
        }
        horasNaCama = diffMinutos / 60;
    }

    if (horasNaCama > 0 && q4_horasSono > 0) {
        const eficiencia = (q4_horasSono / horasNaCama) * 100;
        if (eficiencia >= 85) C4 = 0;
        else if (eficiencia >= 75) C4 = 1;
        else if (eficiencia >= 65) C4 = 2;
        else C4 = 3;
    } else {
        C4 = 0; // Default se os dados não puderem ser calculados
    }

    // C5: Distúrbios do Sono (Perguntas 5b a 5j)
    let C5 = 0;
    const soma_q5_disturbios = q5b + q5c + q5d + q5e + q5f + q5g + q5h + q5i + q5j;
    
    if (soma_q5_disturbios === 0) C5 = 0;
    else if (soma_q5_disturbios <= 9) C5 = 1;
    else if (soma_q5_disturbios <= 18) C5 = 2;
    else C5 = 3;

    // C6: Uso de Medicação para Dormir (Pergunta 7)
    const C6 = q7_medicacao;

    // C7: Disfunção Diurna (Perguntas 8 e 9)
    let C7 = 0;
    const soma_c7 = q8_dificuldadeAcordado + q9_entusiasmo;
    if (soma_c7 === 0) C7 = 0;
    else if (soma_c7 <= 2) C7 = 1;
    else if (soma_c7 <= 4) C7 = 2;
    else C7 = 3;

    // --- Cálculo Final ---
    const totalPSQI = C1 + C2 + C3 + C4 + C5 + C6 + C7;

    let classificacao = '';
    if (totalPSQI <= 4) {
        classificacao = 'Qualidade Boa';
    } else { // 5 ou mais
        classificacao = 'Qualidade Ruim';
    }

    // 3. Exibir o resultado
    document.getElementById('psqi-placar-numero').innerText = totalPSQI;
    document.getElementById('psqi-placar-detalhe').innerText = `Escore Total (0-21)`;
    document.getElementById('psqi-placar-classificacao').innerText = classificacao;

    document.getElementById('psqi-componentes-detalhe').innerHTML = `
        C1 (Qualidade Subjetiva): ${C1}<br>
        C2 (Latência): ${C2}<br>
        C3 (Duração): ${C3}<br>
        C4 (Eficiência): ${C4}<br>
        C5 (Distúrbios): ${C5}<br>
        C6 (Uso de Medicação): ${C6}<br>
        C7 (Disfunção Diurna): ${C7}
    `;
}

/**
 * Função auxiliar para criar as opções 0-3 horizontais
 * (CORRIGIDA - Sem a barra \ )
 */
function opcoesHorizontais(name) {
    return `
    <div class="opcoes-horizontais">
        <label><input type="radio" name="${name}" value="0" onchange="calcularPittsburgh()" checked><span class="checkmark"></span> 0</label>
        <label><input type="radio" name="${name}" value="1" onchange="calcularPittsburgh()"><span class="checkmark"></span> 1</label>
        <label><input type="radio" name="${name}" value="2" onchange="calcularPittsburgh()"><span class="checkmark"></span> 2</label>
        <label><input type="radio" name="${name}" value="3" onchange="calcularPittsburgh()"><span class="checkmark"></span> 3</label>
    </div>
    `;
}

/**
 * Adiciona o estilo para as opções horizontais (0-3) e inputs de tempo/número
 * (CORRIGIDA - Sem a barra \ )
 */
function adicionarEstiloPittsburgh() {
    // Verifica se o estilo já foi injetado
    if (document.getElementById('pittsburgh-style')) return;

    const style = document.createElement('style');
    style.id = 'pittsburgh-style';
    style.innerHTML = `
        /* Estilo para inputs de Tempo e Número */
        .form-input-time, .form-input-number {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1em;
            box-sizing: border-box;
        }

        /* Estilo para opções 0-3 horizontais (reutiliza do Epworth) */
        .opcoes-horizontais {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: 10px 15px 15px 15px;
        }
        .opcoes-horizontais label {
            position: relative;
            padding-left: 30px;
            cursor: pointer;
            margin-right: 10px;
        }
        .opcoes-horizontais input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
        }
        .opcoes-horizontais .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 20px;
            width: 20px;
            background-color: #eee;
            border: 1px solid #ccc;
            border-radius: 50%;
        }
        .opcoes-horizontais label:hover input ~ .checkmark {
            background-color: #ccc;
        }
        .opcoes-horizontais input:checked ~ .checkmark {
            background-color: #007bff;
            border-color: #007bff;
        }
        .opcoes-horizontais .checkmark:after {
            content: "";
            position: absolute;
            display: none;
            top: 6px;
            left: 6px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
        }
        .opcoes-horizontais input:checked ~ .checkmark:after {
            display: block;
        }
    `;
    document.head.appendChild(style);
}