// Arquivo: /calculadoras/lanss.js

/**
 * Função principal chamada pelo app.js
 */
function lanss() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Escala LANSS (Dor Neuropática)</h5>
                    <ul>
                        <li>Responda 'Sim' apenas se o sintoma estiver presente na área dolorosa.</li>
                        <li>Itens 6 e 7 requerem exame físico comparativo.</li>
                    </ul>
                </div>

                <h4 style="color: #005a9c; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 20px;">A. Questionário de Dor</h4>

                <div class="grupo-radio">
                    <h4>1. Sensações estranhas ou desagradáveis (agulhadas, formigamento, alfinetadas)?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-1" value="0" onchange="calcularLANSS()" checked><span class="checkmark"></span>(0) Não</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-1" value="5" onchange="calcularLANSS()"><span class="checkmark"></span>(5) Sim</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>2. A pele da área dolorosa muda de cor (vermelha, rosa, manchada)?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-2" value="0" onchange="calcularLANSS()" checked><span class="checkmark"></span>(0) Não</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-2" value="5" onchange="calcularLANSS()"><span class="checkmark"></span>(5) Sim</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>3. A pele é sensível ao toque leve (ex: roçar da roupa, passar a mão)?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-3" value="0" onchange="calcularLANSS()" checked><span class="checkmark"></span>(0) Não</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-3" value="3" onchange="calcularLANSS()"><span class="checkmark"></span>(3) Sim</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>4. A dor vem de repente, como explosões, choques ou descargas elétricas?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-4" value="0" onchange="calcularLANSS()" checked><span class="checkmark"></span>(0) Não</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-4" value="2" onchange="calcularLANSS()"><span class="checkmark"></span>(2) Sim</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>5. Sente queimação ou temperatura alterada na área dolorosa?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-5" value="0" onchange="calcularLANSS()" checked><span class="checkmark"></span>(0) Não</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-5" value="1" onchange="calcularLANSS()"><span class="checkmark"></span>(1) Sim</label></div>
                </div>

                <h4 style="color: #005a9c; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">B. Exame Sensitivo</h4>

                <div class="grupo-radio">
                    <h4>6. Alodínia (passar algodão levemente)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">Compare o lado doloroso com o lado normal. Há dor/desconforto no lado afetado?</span>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-6" value="0" onchange="calcularLANSS()" checked><span class="checkmark"></span>(0) Não (sensação normal)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-6" value="5" onchange="calcularLANSS()"><span class="checkmark"></span>(5) Sim (alodínia presente)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>7. Limiar de agulhada alterado (picada de agulha - PPT)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">Compare a sensação de picada (agulha calibre 23G). A sensação é mais aguda/intensa no lado doloroso?</span>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-7" value="0" onchange="calcularLANSS()" checked><span class="checkmark"></span>(0) Não (sensação igual)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="lanss-7" value="3" onchange="calcularLANSS()"><span class="checkmark"></span>(3) Sim (hiperalgesia presente)</label></div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Escore LANSS</h3>
                    
                    <div class="placar-numero" id="lanss-placar-numero">0</div>
                    <div class="placar-classificacao" id="lanss-placar-classificacao" style="font-size: 1.1em; margin-top: 15px;">
                        Dor Nociceptiva Provável
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="lanss-placar-detalhe" style="font-size: 1.0em; text-align: center;">
                        LANSS: 0 (Mecanismos neuropáticos improváveis)
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilos
    adicionarEstiloLANSS();

    // 4. Inicia cálculo
    calcularLANSS();
}

/**
 * Função de cálculo
 */
function calcularLANSS() {
    
    let total = 0;
    
    // Soma os 7 itens
    for (let i = 1; i <= 7; i++) {
        total += parseInt(document.querySelector(`input[name="lanss-${i}"]:checked`).value);
    }
    
    // Classificação
    // Score total máximo = 24.
    // Cut-off >= 12 sugere mecanismos neuropáticos.
    let classificacao = '';
    let cor = '';

    if (total >= 12) {
        classificacao = 'Mecanismos NEUROPÁTICOS prováveis';
        cor = '#d9534f'; // Vermelho/Alerta
    } else {
        classificacao = 'Mecanismos neuropáticos improváveis';
        cor = '#5cb85c'; // Verde
    }

    // Exibir
    document.getElementById('lanss-placar-numero').innerText = `${total}/24`;
    const divClass = document.getElementById('lanss-placar-classificacao');
    divClass.innerText = classificacao;
    divClass.style.color = cor;
    divClass.style.fontWeight = 'bold';

    document.getElementById('lanss-placar-detalhe').innerText = `LANSS: ${total}/24 (${classificacao})`;
}

/**
 * Adiciona estilos
 */
function adicionarEstiloLANSS() {
    if (!document.getElementById('edss-style')) {
        const styleCopia = document.createElement('style');
        styleCopia.id = 'edss-style';
        styleCopia.innerHTML = `
            .placar-copia {
                font-size: 0.9em; font-family: 'Courier New', Courier, monospace;
                color: #333; padding: 8px; background-color: #f8f9fa;
                border: 1px dashed #ccc; border-radius: 4px;
                line-height: 1.5; text-align: left;
            }
        `;
        document.head.appendChild(styleCopia);
    }
}