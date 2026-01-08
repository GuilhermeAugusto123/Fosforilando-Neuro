// Arquivo: /calculadoras/mg_composite.js

/**
 * Função principal chamada pelo app.js
 */
function mg_composite() {
    // 1. Defina o HTML da calculadora
    //
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Escore Composto da Miastenia Gravis (MG Composite)</h5>
                    <ul>
                        <li>Selecione o grau de fraqueza para cada item.</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Ptose (olhar p/ cima)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-1" value="0" onchange="calcularMgComposite()" checked><span class="checkmark"></span>Normal (> 45s) (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-1" value="1" onchange="calcularMgComposite()"><span class="checkmark"></span>Leve (11-45s) (1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-1" value="2" onchange="calcularMgComposite()"><span class="checkmark"></span>Moderado (1-10s) (2)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-1" value="3" onchange="calcularMgComposite()"><span class="checkmark"></span>Grave (Imediata) (3)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>2. Visão Dupla (olhar lateral)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-2" value="0" onchange="calcularMgComposite()" checked><span class="checkmark"></span>Normal (> 45s) (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-2" value="1" onchange="calcularMgComposite()"><span class="checkmark"></span>Leve (11-45s) (1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-2" value="3" onchange="calcularMgComposite()"><span class="checkmark"></span>Moderado (1-10s) (3)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-2" value="4" onchange="calcularMgComposite()"><span class="checkmark"></span>Grave (Imediata) (4)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>3. Fechamento dos Olhos</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-3" value="0" onchange="calcularMgComposite()" checked><span class="checkmark"></span>Normal / Leve (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-3" value="1" onchange="calcularMgComposite()"><span class="checkmark"></span>Moderado (abre facilmente) (1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-3" value="2" onchange="calcularMgComposite()"><span class="checkmark"></span>Grave (incapaz de fechar) (2)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>4. Fala (História do paciente)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-4" value="0" onchange="calcularMgComposite()" checked><span class="checkmark"></span>Normal (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-4" value="2" onchange="calcularMgComposite()"><span class="checkmark"></span>Gagueira intermitente (2)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-4" value="4" onchange="calcularMgComposite()"><span class="checkmark"></span>Gagueira constante / nasal (4)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-4" value="6" onchange="calcularMgComposite()"><span class="checkmark"></span>Dificuldade de entendimento (6)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>5. Mastigação (História do paciente)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-5" value="0" onchange="calcularMgComposite()" checked><span class="checkmark"></span>Normal (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-5" value="2" onchange="calcularMgComposite()"><span class="checkmark"></span>Fadiga com sólidos (2)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-5" value="4" onchange="calcularMgComposite()"><span class="checkmark"></span>Fadiga com moles (4)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-5" value="6" onchange="calcularMgComposite()"><span class="checkmark"></span>Tubo gástrico (6)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>6. Deglutição (História do paciente)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-6" value="0" onchange="calcularMgComposite()" checked><span class="checkmark"></span>Normal (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-6" value="2" onchange="calcularMgComposite()"><span class="checkmark"></span>Raros engasgos (2)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-6" value="5" onchange="calcularMgComposite()"><span class="checkmark"></span>Engasgos frequentes (5)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-6" value="6" onchange="calcularMgComposite()"><span class="checkmark"></span>Tubo gástrico (6)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>7. Respiração (Consequência da MG)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-7" value="0" onchange="calcularMgComposite()" checked><span class="checkmark"></span>Normal (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-7" value="2" onchange="calcularMgComposite()"><span class="checkmark"></span>Dispneia de esforço (2)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-7" value="4" onchange="calcularMgComposite()"><span class="checkmark"></span>Dispneia em repouso (4)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-7" value="9" onchange="calcularMgComposite()"><span class="checkmark"></span>Ventilador dependente (9)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>8. Flexão ou Extensão do Pescoço</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-8" value="0" onchange="calcularMgComposite()" checked><span class="checkmark"></span>Normal (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-8" value="1" onchange="calcularMgComposite()"><span class="checkmark"></span>Fraqueza leve (1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-8" value="3" onchange="calcularMgComposite()"><span class="checkmark"></span>Fraqueza moderada (3)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-8" value="4" onchange="calcularMgComposite()"><span class="checkmark"></span>Fraqueza grave (4)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>9. Abdução de Ombros</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-9" value="0" onchange="calcularMgComposite()" checked><span class="checkmark"></span>Normal (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-9" value="2" onchange="calcularMgComposite()"><span class="checkmark"></span>Fraqueza leve (2)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-9" value="4" onchange="calcularMgComposite()"><span class="checkmark"></span>Fraqueza moderada (4)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-9" value="5" onchange="calcularMgComposite()"><span class="checkmark"></span>Fraqueza grave (5)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>10. Flexão do Quadril</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-10" value="0" onchange="calcularMgComposite()" checked><span class="checkmark"></span>Normal (0)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-10" value="2" onchange="calcularMgComposite()"><span class="checkmark"></span>Fraqueza leve (2)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-10" value="4" onchange="calcularMgComposite()"><span class="checkmark"></span>Fraqueza moderada (4)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgc-10" value="5" onchange="calcularMgComposite()"><span class="checkmark"></span>Fraqueza grave (5)</label></div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>MG Composite</h3>
                    
                    <div class="placar-numero" id="mgc-placar-numero">0</div>
                    <div class="placar-detalhe" id="mgc-placar-classificacao" style="font-size: 1.1em; line-height: 1.4; padding: 0 10px;">
                        Uma mudança de 3 pts é clinicamente significativa.
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="mgc-placar-detalhe">
                        Pto:0 Dip:0 Olh:0 Fal:0 Mas:0 Deg:0 Res:0 Pes:0 Omb:0 Qua:0
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilo para a caixa de cópia (já deve existir do EDSS)
    // Se não existir, a linha abaixo não fará mal.
    if (!document.getElementById('edss-style')) {
         adicionarEstiloCopia(); // Adiciona um estilo genérico de cópia
    }

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularMgComposite();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularMgComposite() {
    
    // 1. Obter os valores dos 10 itens
    const p1 = parseInt(document.querySelector('input[name="mgc-1"]:checked').value); // Ptose (0-3)
    const p2 = parseInt(document.querySelector('input[name="mgc-2"]:checked').value); // Visão Dupla (0-4)
    const p3 = parseInt(document.querySelector('input[name="mgc-3"]:checked').value); // Olhos (0-2)
    const p4 = parseInt(document.querySelector('input[name="mgc-4"]:checked').value); // Fala (0-6)
    const p5 = parseInt(document.querySelector('input[name="mgc-5"]:checked').value); // Mastigação (0-6)
    const p6 = parseInt(document.querySelector('input[name="mgc-6"]:checked').value); // Deglutição (0-6)
    const p7 = parseInt(document.querySelector('input[name="mgc-7"]:checked').value); // Respiração (0-9)
    const p8 = parseInt(document.querySelector('input[name="mgc-8"]:checked').value); // Pescoço (0-4)
    const p9 = parseInt(document.querySelector('input[name="mgc-9"]:checked').value); // Ombros (0-5)
    const p10 = parseInt(document.querySelector('input[name="mgc-10"]:checked').value); // Quadril (0-5)
    
    // 2. Calcular o total (Score 0-50)
    const total = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9 + p10;
    
    // 3. Criar a linha de cópia
    const detalhe = `Pto:${p1} Dip:${p2} Olh:${p3} Fal:${p4} Mas:${p5} Deg:${p6} Res:${p7} Pes:${p8} Omb:${p9} Qua:${p10}`;

    // 4. Exibir o resultado
    document.getElementById('mgc-placar-numero').innerText = total;
    document.getElementById('mgc-placar-detalhe').innerText = detalhe;
    document.getElementById('mgc-placar-classificacao').innerText = "Uma mudança de 3 pts é clinicamente significativa.";
}

/**
 * Adiciona o estilo para a caixa de cópia
 * (Caso o estilo do EDSS não tenha sido carregado)
 */
function adicionarEstiloCopia() {
    const style = document.createElement('style');
    style.id = 'edss-style'; // Reutiliza o ID para não duplicar
    style.innerHTML = `
        .placar-copia {
            font-size: 0.9em;
            font-family: 'Courier New', Courier, monospace;
            color: #333;
            padding: 8px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            border-radius: 4px;
            line-height: 1.5;
            text-align: left;
        }
    `;
    document.head.appendChild(style);
}