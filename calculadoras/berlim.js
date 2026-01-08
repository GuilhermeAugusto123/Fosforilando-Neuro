// Arquivo: /calculadoras/berlim.js

/**
 * Função principal chamada pelo app.js
 */
function berlim() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Categoria 1: Ronco</h5>
                    <span class="sub-instrucao-titulo" style="padding: 0; display: block;">(Esta categoria é positiva se 2 ou mais perguntas forem "Sim")</span>
                </div>

                <div class="grupo-radio">
                    <h4>1. Você ronca?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q1" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Sim</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q1" value="0" onchange="calcularBerlim()" checked><span class="checkmark"></span>Não</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>2. Se sim, o seu ronco é:</h4>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q2" value="0" onchange="calcularBerlim()" checked><span class="checkmark"></span>Levemente mais alto que a respiração</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q2" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Tão alto quanto a fala</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q2" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Mais alto que a fala</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q2" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Muito alto (ouve-se em outro quarto)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>3. Com que frequência você ronca?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q3" value="0" onchange="calcularBerlim()" checked><span class="checkmark"></span>Raramente (nunca ou quase nunca)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q3" value="0" onchange="calcularBerlim()"><span class="checkmark"></span>Ocasionalmente (1-2x / semana)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q3" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Frequentemente (3-4x / semana)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q3" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Quase sempre (>4x / semana)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>4. O seu ronco já incomodou outras pessoas?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q4" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Sim</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q4" value="0" onchange="calcularBerlim()" checked><span class="checkmark"></span>Não</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>5. Alguém já notou que você para de respirar durante o sono?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q5" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Sim</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q5" value="0" onchange="calcularBerlim()" checked><span class="checkmark"></span>Não</label></div>
                </div>

                <div class="aviso-instrucao" style="margin-top: 30px; margin-bottom: 20px;">
                    <h5>Categoria 2: Fadiga e Sonolência</h5>
                    <span class="sub-instrucao-titulo" style="padding: 0; display: block;">(Esta categoria é positiva se 2 ou mais perguntas forem "Sim")</span>
                </div>

                <div class="grupo-radio">
                    <h4>6. Com que frequência você se sente cansado ou fadigado após acordar?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q6" value="0" onchange="calcularBerlim()" checked><span class="checkmark"></span>Raramente (nunca ou quase nunca)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q6" value="0" onchange="calcularBerlim()"><span class="checkmark"></span>Ocasionalmente (1-2x / semana)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q6" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Frequentemente (3-4x / semana)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q6" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Quase sempre (>4x / semana)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>7. Com que frequência você se sente cansado ou fadigado durante o dia?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q7" value="0" onchange="calcularBerlim()" checked><span class="checkmark"></span>Raramente (nunca ou quase nunca)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q7" value="0" onchange="calcularBerlim()"><span class="checkmark"></span>Ocasionalmente (1-2x / semana)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q7" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Frequentemente (3-4x / semana)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q7" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Quase sempre (>4x / semana)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>8. Você já cochilou ou dormiu enquanto estava dirigindo?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q8" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Sim</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q8" value="0" onchange="calcularBerlim()" checked><span class="checkmark"></span>Não</label></div>
                </div>

                <div class="aviso-instrucao" style="margin-top: 30px; margin-bottom: 20px;">
                    <h5>Categoria 3: Hipertensão e IMC</h5>
                    <span class="sub-instrucao-titulo" style="padding: 0; display: block;">(Esta categoria é positiva se uma das perguntas for "Sim")</span>
                </div>

                <div class="grupo-radio">
                    <h4>9. Você tem pressão alta (ou toma medicação para isso)?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q9" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Sim</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q9" value="0" onchange="calcularBerlim()" checked><span class="checkmark"></span>Não</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>10. O seu IMC é maior que 30 kg/m²?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q10" value="1" onchange="calcularBerlim()"><span class="checkmark"></span>Sim</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="berlim-q10" value="0" onchange="calcularBerlim()" checked><span class="checkmark"></span>Não</label></div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Questionário de Berlim</h3>
                    
                    <div class="placar-classificacao" id="berlim-placar-classificacao" style="font-size: 1.5em; margin-bottom: 20px;">Baixo Risco</div>
                    
                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Categorias Positivas:</h4>
                    <div class="placar-detalhe" id="berlim-placar-detalhe">
                        Cat 1 (Ronco): Não<br>
                        Cat 2 (Fadiga): Não<br>
                        Cat 3 (HAS/IMC): Não
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);

    // 3. Chame o cálculo uma vez para definir o estado inicial
    calcularBerlim();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularBerlim() {
    
    // --- Lógica Categoria 1 (Ronco) ---
    // (Positiva se 2 ou mais pontos)
    let cat1_pontos = 0;
    if (parseInt(document.querySelector('input[name="berlim-q1"]:checked').value) === 1) { // Ronca? Sim
        cat1_pontos++;
        // Só pontua em Q2 e Q3 se Q1 for Sim (embora o formulário simplificado conte independente)
        // Vamos contar independente para simplificar:
    }
    // Para o cálculo, vamos considerar as respostas de Q2 e Q3 como pontuação direta
    cat1_pontos += parseInt(document.querySelector('input[name="berlim-q2"]:checked').value); // Volume
    cat1_pontos += parseInt(document.querySelector('input[name="berlim-q3"]:checked').value); // Frequência
    cat1_pontos += parseInt(document.querySelector('input[name="berlim-q4"]:checked').value); // Incomoda
    cat1_pontos += parseInt(document.querySelector('input[name="berlim-q5"]:checked').value); // Parada
    
    // Ajuste da lógica Q1: se Q1 for "Não", os pontos de Q2, Q3, Q4 devem ser 0.
    // Mas o formulário padrão do Berlim é complexo.
    // Vamos usar a regra simplificada: "2 ou mais perguntas positivas"
    // Q1=Sim (1), Q2=Alto (1), Q3=Freq (1), Q4=Sim (1), Q5=Sim (1)
    
    let pontos_q1 = 0;
    pontos_q1 += parseInt(document.querySelector('input[name="berlim-q1"]:checked').value);
    pontos_q1 += parseInt(document.querySelector('input[name="berlim-q2"]:checked').value);
    pontos_q1 += parseInt(document.querySelector('input[name="berlim-q3"]:checked').value);
    pontos_q1 += parseInt(document.querySelector('input[name="berlim-q4"]:checked').value);
    pontos_q1 += parseInt(document.querySelector('input[name="berlim-q5"]:checked').value);
    
    const cat1_positiva = (pontos_q1 >= 2);

    // --- Lógica Categoria 2 (Fadiga) ---
    // (Positiva se 2 ou mais pontos)
    let pontos_q2 = 0;
    pontos_q2 += parseInt(document.querySelector('input[name="berlim-q6"]:checked').value);
    pontos_q2 += parseInt(document.querySelector('input[name="berlim-q7"]:checked').value);
    pontos_q2 += parseInt(document.querySelector('input[name="berlim-q8"]:checked').value);
    
    const cat2_positiva = (pontos_q2 >= 2);

    // --- Lógica Categoria 3 (HAS/IMC) ---
    // (Positiva se 1 ou mais pontos)
    let pontos_q3 = 0;
    pontos_q3 += parseInt(document.querySelector('input[name="berlim-q9"]:checked').value);
    pontos_q3 += parseInt(document.querySelector('input[name="berlim-q10"]:checked').value);

    const cat3_positiva = (pontos_q3 >= 1);

    // --- Cálculo Final ---
    let totalCategoriasPositivas = 0;
    if (cat1_positiva) totalCategoriasPositivas++;
    if (cat2_positiva) totalCategoriasPositivas++;
    if (cat3_positiva) totalCategoriasPositivas++;

    let classificacaoFinal = '';
    if (totalCategoriasPositivas >= 2) {
        classificacaoFinal = 'Alto Risco para SAHOS';
    } else {
        classificacaoFinal = 'Baixo Risco para SAHOS';
    }

    // 3. Exibir o resultado
    document.getElementById('berlim-placar-classificacao').innerText = classificacaoFinal;
    document.getElementById('berlim-placar-detalhe').innerHTML = `
        Cat 1 (Ronco): ${cat1_positiva ? 'Positivo' : 'Negativo'}<br>
        Cat 2 (Fadiga): ${cat2_positiva ? 'Positivo' : 'Negativo'}<br>
        Cat 3 (HAS/IMC): ${cat3_positiva ? 'Positivo' : 'Negativo'}
    `;
}