// Arquivo: /calculadoras/nihss.js (Versão 2.4 - Com Resumo de Prontuário)

/**
 * Função principal chamada pelo app.js
 */
function nihss() {
    // 1. Defina o HTML da calculadora
    // (A estrutura de perguntas é a mesma que já tínhamos)
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>NIH Stroke Scale (NIHSS)</h5>
                    <ul>
                        <li>O examinador deve pontuar o primeiro esforço do paciente.</li>
                        <li>Não ajude o paciente (exceto com as instruções).</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1a. Nível de Consciência (Alerta)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-1a" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Alerta, responsivo</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-1a" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Sonolento, mas desperta ao estímulo verbal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-1a" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Estuporoso, desperta ao estímulo doloroso</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-1a" value="3" onchange="calcularNIHSS()"><span class="checkmark"></span>(3) Coma, não desperta</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>1b. Nível de Consciência (Perguntas)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Perguntar o mês e a idade)</span>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-1b" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Responde ambas corretamente</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-1b" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Responde uma corretamente</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-1b" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Não responde nenhuma corretamente (ou afásico)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>1c. Nível de Consciência (Comandos)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Pedir para abrir/fechar a mão e fechar/abrir os olhos)</span>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-1c" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Realiza ambos os comandos</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-1c" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Realiza um comando</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-1c" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Não realiza nenhum comando</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>2. Melhor Olhar Conjugado Horizontal</h4>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-2" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-2" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Paresia parcial do olhar (olhar anormal em 1 ou 2 direções)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-2" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Desvio forçado do olhar ou paresia total</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>3. Campos Visuais (Confrontação)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-3" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Sem perda visual</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-3" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Hemianopsia parcial</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-3" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Hemianopsia completa</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-3" value="3" onchange="calcularNIHSS()"><span class="checkmark"></span>(3) Hemianopsia bilateral (cegueira cortical)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>4. Paresia Facial</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Pedir para mostrar os dentes, sorrir, fechar os olhos)</span>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-4" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Movimentos simétricos</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-4" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Paresia menor (apagamento sulco nasolabial)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-4" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Paresia parcial (paralisia facial inferior)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-4" value="3" onchange="calcularNIHSS()"><span class="checkmark"></span>(3) Paresia completa (superior e inferior)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>5a. Força Motora (Braço Esquerdo)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Elevar a 90° sentado ou 45° deitado por 10s)</span>
                    ${gerarOpcoesMotor('nihss-5a')}
                </div>
                <div class="grupo-radio">
                    <h4>5b. Força Motora (Braço Direito)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Elevar a 90° sentado ou 45° deitado por 10s)</span>
                    ${gerarOpcoesMotor('nihss-5b')}
                </div>

                <div class="grupo-radio">
                    <h4>6a. Força Motora (Perna Esquerda)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Elevar a 30° deitado por 5s)</span>
                    ${gerarOpcoesMotor('nihss-6a')}
                </div>
                <div class="grupo-radio">
                    <h4>6b. Força Motora (Perna Direita)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Elevar a 30° deitado por 5s)</span>
                    ${gerarOpcoesMotor('nihss-6b')}
                </div>
                
                <div class="grupo-radio">
                    <h4>7. Ataxia de Membros</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Teste dedo-nariz e calcanhar-joelho)</span>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-7" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Ausente, sem ataxia</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-7" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Presente em 1 membro</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-7" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Presente em 2 ou mais membros</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-7" value="9" onchange="calcularNIHSS()"><span class="checkmark"></span>(NT) Amputação, paralisia (Não testável)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>8. Sensibilidade (Dor)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-8" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-8" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Hipoestesia leve a moderada</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-8" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Hipoestesia grave ou anestesia</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>9. Melhor Linguagem (Afasia)</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Descrever figuras, nomear itens, ler frases)</span>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-9" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Normal, sem afasia</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-9" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Afasia leve a moderada</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-9" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Afasia grave (fragmentado, jargões)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-9" value="3" onchange="calcularNIHSS()"><span class="checkmark"></span>(3) Afasia global / Mutismo</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>10. Disartria</h4>
                    <span class="sub-instrucao-titulo" style="padding: 0 20px 10px;">(Ler lista de palavras)</span>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-10" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Normal, articulação clara</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-10" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Disartria leve a moderada</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-10" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Disartria grave (ininteligível)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-10" value="9" onchange="calcularNIHSS()"><span class="checkmark"></span>(NT) Intubado, anartria (Não testável)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>11. Extinção e Negligência (Inatenção)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-11" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Normal, sem negligência</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-11" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Negligência leve (extinção em 1 modalidade)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="nihss-11" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Negligência grave (extinção em >1 modalidade)</label></div>
                </div>


            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>NIHSS</h3>
                    
                    <div class="placar-numero" id="nihss-placar-numero">0</div>
                    <div class="placar-classificacao" id="nihss-placar-classificacao" style="font-size: 1.3em;">
                        Sem AVC
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="nihss-placar-detalhe" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                        NIHSS: 0 (Detalhes...)
                    </div>
                    </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilos
    adicionarEstiloCopiaNIHSS(); // Adiciona o estilo da caixa de cópia

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularNIHSS();
}

/**
 * Função de CÁLCULO (v2.4) - Atualizada com Resumo
 */
function calcularNIHSS() {
    
    // 1. Coletar os valores (como já fazíamos)
    const p1a = parseInt(document.querySelector('input[name="nihss-1a"]:checked').value);
    const p1b = parseInt(document.querySelector('input[name="nihss-1b"]:checked').value);
    const p1c = parseInt(document.querySelector('input[name="nihss-1c"]:checked').value);
    const p2 = parseInt(document.querySelector('input[name="nihss-2"]:checked').value);
    const p3 = parseInt(document.querySelector('input[name="nihss-3"]:checked').value);
    const p4 = parseInt(document.querySelector('input[name="nihss-4"]:checked').value);
    const p5a = parseInt(document.querySelector('input[name="nihss-5a"]:checked').value);
    const p5b = parseInt(document.querySelector('input[name="nihss-5b"]:checked').value);
    const p6a = parseInt(document.querySelector('input[name="nihss-6a"]:checked').value);
    const p6b = parseInt(document.querySelector('input[name="nihss-6b"]:checked').value);
    const p7 = parseInt(document.querySelector('input[name="nihss-7"]:checked').value);
    const p8 = parseInt(document.querySelector('input[name="nihss-8"]:checked').value);
    const p9 = parseInt(document.querySelector('input[name="nihss-9"]:checked').value);
    const p10 = parseInt(document.querySelector('input[name="nihss-10"]:checked').value);
    const p11 = parseInt(document.querySelector('input[name="nihss-11"]:checked').value);

    // Tratar "Não testável" (NT=9) como 0 para a soma
    const p5a_soma = p5a === 9 ? 0 : p5a;
    const p5b_soma = p5b === 9 ? 0 : p5b;
    const p6a_soma = p6a === 9 ? 0 : p6a;
    const p6b_soma = p6b === 9 ? 0 : p6b;
    const p7_soma = p7 === 9 ? 0 : p7;
    const p10_soma = p10 === 9 ? 0 : p10;

    // 2. Calcular o total
    const totalNIHSS = p1a + p1b + p1c + p2 + p3 + p4 + p5a_soma + p5b_soma + p6a_soma + p6b_soma + p7_soma + p8 + p9 + p10_soma + p11;

    // 3. Classificação
    let classificacao = '';
    if (totalNIHSS === 0) classificacao = 'Sem AVC';
    else if (totalNIHSS <= 4) classificacao = 'AVC Leve';
    else if (totalNIHSS <= 15) classificacao = 'AVC Moderado';
    else if (totalNIHSS <= 20) classificacao = 'AVC Moderado a Grave';
    else classificacao = 'AVC Grave';

    // 4. (NOVO) Criar a linha de cópia para prontuário
    // Usamos os valores originais (com 9=NT, se marcado)
    const detalhe = `
        1a(NCon):${p1a} 1b(Per):${p1b} 1c(Com):${p1c}<br>
        2(Olhar):${p2} 3(Vis):${p3} 4(Fac):${p4}<br>
        5a(MSE):${p5a} 5b(MSD):${p5b} 6a(MIE):${p6a} 6b(MID):${p6b}<br>
        7(Ataxia):${p7} 8(Sens):${p8} 9(Afa):${p9}<br>
        10(Disart):${p10} 11(Negl):${p11}
    `;

    // 5. Exibir o resultado
    document.getElementById('nihss-placar-numero').innerText = totalNIHSS;
    document.getElementById('nihss-placar-classificacao').innerText = classificacao;
    
    // (NOVO) Exibir a linha de cópia
    document.getElementById('nihss-placar-detalhe').innerHTML = detalhe;
}


/**
 * Função auxiliar para gerar os 5 botões de rádio para os itens motores
 * (Esta função não mudou)
 */
function gerarOpcoesMotor(name) {
    return `
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="0" onchange="calcularNIHSS()" checked><span class="checkmark"></span>(0) Sem queda</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="1" onchange="calcularNIHSS()"><span class="checkmark"></span>(1) Queda antes do tempo limite, mas não atinge o leito</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="2" onchange="calcularNIHSS()"><span class="checkmark"></span>(2) Algum esforço contra gravidade, mas não sustenta</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="3" onchange="calcularNIHSS()"><span class="checkmark"></span>(3) Nenhum esforço contra gravidade, apenas movimento</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="4" onchange="calcularNIHSS()"><span class="checkmark"></span>(4) Nenhuma contração</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="9" onchange="calcularNIHSS()"><span class="checkmark"></span>(NT) Amputação, paralisia (Não testável)</label></div>
    `;
}

/**
 * (NOVO) Adiciona o estilo para a caixa de cópia
 * (Reutiliza o ID do EDSS para não duplicar, caso já exista)
 */
function adicionarEstiloCopiaNIHSS() {
    if (document.getElementById('edss-style')) return;
    const style = document.createElement('style');
    style.id = 'edss-style';
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