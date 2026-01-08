// Arquivo: /calculadoras/alsfrs.js

/**
 * Função principal chamada pelo app.js
 */
function alsfrs() {
    // 1. Defina o HTML da calculadora
    // Itens baseados na versão revisada (ALSFRS-R)
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>ALSFRS-R (0-48 pts)</h5>
                    <ul>
                        <li>Avalie os 12 itens de função motora e respiratória. (4 = Normal, 0 = Incapaz)</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Fala</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-1" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Processo da fala normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-1" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Distúrbio da fala detectável</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-1" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Compreensível com repetição</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-1" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) Fala + comunicação não-vocal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-1" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Perda da utilidade da fala</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>2. Salivação</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-2" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-2" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Excesso leve (pode babar à noite)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-2" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Excesso moderado (mínima baba diurna)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-2" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) Excesso acentuado com alguma baba</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-2" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Baba acentuada (exige lenço)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>3. Deglutição</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-3" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-3" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Problemas precoces (engasgos ocasionais)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-3" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Alteração na consistência da dieta</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-3" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) Necessidade de suplemento (GTT)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-3" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Nada pela boca (NPO)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>4. Escrita (Caligrafia)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-4" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-4" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Lentificada ou descuidada (legível)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-4" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Nem todas as palavras são legíveis</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-4" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) Capaz de segurar caneta, mas incapaz de escrever</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-4" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Incapaz de segurar caneta</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>5. Cortar Alimentos / Manusear Utensílios</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-5" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-5" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Lento e desajeitado, sem ajuda</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-5" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Consegue cortar, mas precisa de ajuda</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-5" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) Alimento deve ser cortado, alimenta-se sozinho</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-5" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Precisa ser alimentado</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>6. Vestir-se e Higiene</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-6" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-6" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Independente, mas com esforço</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-6" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Assistência intermitente</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-6" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) Necessita de ajuda para autocuidado</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-6" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Dependência total</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>7. Virar na Cama / Ajustar Cobertas</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-7" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-7" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Lento e desajeitado, sem ajuda</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-7" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Consegue virar, mas com grande dificuldade</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-7" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) Consegue iniciar, mas não completa sozinho</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-7" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Incapaz (dependente)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>8. Marcha (Andar)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-8" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-8" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Dificuldades precoces na marcha</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-8" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Anda com assistência</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-8" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) Movimento funcional não-ambulatório</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-8" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Sem movimento proposital das pernas</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>9. Subir Escadas</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-9" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-9" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Lento</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-9" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Instabilidade leve ou fadiga</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-9" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) Necessita de assistência</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-9" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Incapaz</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>10. Dispneia</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-10" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Nenhuma</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-10" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Ocorre ao andar</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-10" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Ocorre com AVDs (comer, vestir)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-10" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) Ocorre em repouso (sentado ou deitado)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-10" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Dificuldade significativa (considerando suporte)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>11. Ortopneia</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-11" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Nenhuma</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-11" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Dificuldade leve (até 2 travesseiros)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-11" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Necessita mais de 2 travesseiros</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-11" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) Só consegue dormir sentado</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-11" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Incapaz de dormir</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>12. Insuficiência Respiratória</h4>
                    <div class="opcao-radio"><label><input type="radio" name="als-12" value="4" onchange="calcularALSFRS()" checked><span class="checkmark"></span>(4) Nenhuma</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-12" value="3" onchange="calcularALSFRS()"><span class="checkmark"></span>(3) Uso intermitente de BiPAP</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-12" value="2" onchange="calcularALSFRS()"><span class="checkmark"></span>(2) Uso contínuo de BiPAP (noite E dia)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-12" value="1" onchange="calcularALSFRS()"><span class="checkmark"></span>(1) -- (Item original removido na R)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="als-12" value="0" onchange="calcularALSFRS()"><span class="checkmark"></span>(0) Ventilação invasiva (Traqueostomia)</label></div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>ALSFRS-R</h3>
                    
                    <div class="placar-numero" id="alsfrs-placar-numero">48</div>
                    <div class="placar-detalhe" id="alsfrs-placar-classificacao" style="font-size: 1.1em; line-height: 1.4; padding: 0 10px;">
                        Escore Total (0-48)
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="alsfrs-placar-detalhe" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                        </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilo para a caixa de cópia (reutiliza o estilo do EDSS)
    if (!document.getElementById('edss-style')) {
         adicionarEstiloCopiaALS();
    }

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularALSFRS();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularALSFRS() {
    
    // 1. Obter os valores dos 12 itens
    const p1 = parseInt(document.querySelector('input[name="als-1"]:checked').value);
    const p2 = parseInt(document.querySelector('input[name="als-2"]:checked').value);
    const p3 = parseInt(document.querySelector('input[name="als-3"]:checked').value);
    const p4 = parseInt(document.querySelector('input[name="als-4"]:checked').value);
    const p5 = parseInt(document.querySelector('input[name="als-5"]:checked').value);
    const p6 = parseInt(document.querySelector('input[name="als-6"]:checked').value);
    const p7 = parseInt(document.querySelector('input[name="als-7"]:checked').value);
    const p8 = parseInt(document.querySelector('input[name="als-8"]:checked').value);
    const p9 = parseInt(document.querySelector('input[name="als-9"]:checked').value);
    const p10 = parseInt(document.querySelector('input[name="als-10"]:checked').value);
    const p11 = parseInt(document.querySelector('input[name="als-11"]:checked').value);
    const p12 = parseInt(document.querySelector('input[name="als-12"]:checked').value);
    
    // 2. Calcular o total (Score 0-48)
    const total = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9 + p10 + p11 + p12;
    
    // 3. Criar a linha de cópia
    const bulbar = p1 + p2 + p3;
    const motorFino = p4 + p5 + p6;
    const motorGrosseiro = p7 + p8 + p9;
    const respiratorio = p10 + p11 + p12;
    
    const detalhe = `
        Bulbar: ${bulbar} (F:${p1} S:${p2} D:${p3})<br>
        Motor Fino: ${motorFino} (E:${p4} C:${p5} V:${p6})<br>
        Motor Grosseiro: ${motorGrosseiro} (Vi:${p7} Ma:${p8} Es:${p9})<br>
        Respiratório: ${respiratorio} (Di:${p10} Or:${p11} IR:${p12})
    `;

    // 4. Exibir o resultado
    document.getElementById('alsfrs-placar-numero').innerText = total;
    document.getElementById('alsfrs-placar-detalhe').innerHTML = detalhe;
    document.getElementById('alsfrs-placar-classificacao').innerText = "Escore Total (0-48)";
}

/**
 * Adiciona o estilo para a caixa de cópia
 * (Caso o estilo do EDSS não tenha sido carregado)
 */
function adicionarEstiloCopiaALS() {
    if (document.getElementById('edss-style')) return;
    const style = document.createElement('style');
    style.id = 'edss-style'; // Reutiliza o ID para não duplicar
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