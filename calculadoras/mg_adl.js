// Arquivo: /calculadoras/mg_adl.js (Versão 2.0 - Com Descrições)

/**
 * Função principal chamada pelo app.js
 */
function mg_adl() {
    // 1. Defina o HTML da calculadora
    //
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>MG-ADL (Atividades de Vida Diária)</h5>
                    <ul>
                        <li>Avalie o impacto dos sintomas na última semana.</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Falar</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-1" value="0" onchange="calcularMgAdl()" checked><span class="checkmark"></span>(0) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-1" value="1" onchange="calcularMgAdl()"><span class="checkmark"></span>(1) Disartria leve/intermitente</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-1" value="2" onchange="calcularMgAdl()"><span class="checkmark"></span>(2) Disartria moderada/constante</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-1" value="3" onchange="calcularMgAdl()"><span class="checkmark"></span>(3) Anartria ou fala ininteligível</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>2. Mastigar</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-2" value="0" onchange="calcularMgAdl()" checked><span class="checkmark"></span>(0) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-2" value="1" onchange="calcularMgAdl()"><span class="checkmark"></span>(1) Fadiga leve (ex: com carnes)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-2" value="2" onchange="calcularMgAdl()"><span class="checkmark"></span>(2) Fadiga com sólidos moles</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-2" value="3" onchange="calcularMgAdl()"><span class="checkmark"></span>(3) Dieta líquida ou GTT</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>3. Engolir</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-3" value="0" onchange="calcularMgAdl()" checked><span class="checkmark"></span>(0) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-3" value="1" onchange="calcularMgAdl()"><span class="checkmark"></span>(1) Engasgos muito raros</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-3" value="2" onchange="calcularMgAdl()"><span class="checkmark"></span>(2) Engasgos frequentes (espec. líquidos)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-3" value="3" onchange="calcularMgAdl()"><span class="checkmark"></span>(3) Incapaz de engolir (saliva ou GTT)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>4. Respirar</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-4" value="0" onchange="calcularMgAdl()" checked><span class="checkmark"></span>(0) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-4" value="1" onchange="calcularMgAdl()"><span class="checkmark"></span>(1) Dispneia leve (aos esforços)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-4" value="2" onchange="calcularMgAdl()"><span class="checkmark"></span>(2) Dispneia moderada (com AVDs)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-4" value="3" onchange="calcularMgAdl()"><span class="checkmark"></span>(3) Dispneia grave (em repouso, BiPAP)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>5. Higiene (Escovar dentes ou pentear cabelo)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-5" value="0" onchange="calcularMgAdl()" checked><span class="checkmark"></span>(0) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-5" value="1" onchange="calcularMgAdl()"><span class="checkmark"></span>(1) Fadiga leve ao final da tarefa</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-5" value="2" onchange="calcularMgAdl()"><span class="checkmark"></span>(2) Necessita pausas para descansar</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-5" value="3" onchange="calcularMgAdl()"><span class="checkmark"></span>(3) Incapaz de realizar sozinho</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>6. Levantar-se de uma cadeira</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-6" value="0" onchange="calcularMgAdl()" checked><span class="checkmark"></span>(0) Normal (sem usar os braços)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-6" value="1" onchange="calcularMgAdl()"><span class="checkmark"></span>(1) Consegue, mas com alguma fraqueza</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-6" value="2" onchange="calcularMgAdl()"><span class="checkmark"></span>(2) Necessita usar os braços</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-6" value="3" onchange="calcularMgAdl()"><span class="checkmark"></span>(3) Incapaz de levantar sem ajuda</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>7. Visão dupla</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-7" value="0" onchange="calcularMgAdl()" checked><span class="checkmark"></span>(0) Nenhuma</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-7" value="1" onchange="calcularMgAdl()"><span class="checkmark"></span>(1) Intermitente (não afeta AVDs)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-7" value="2" onchange="calcularMgAdl()"><span class="checkmark"></span>(2) Frequente (afeta AVDs, ex: ler)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-7" value="3" onchange="calcularMgAdl()"><span class="checkmark"></span>(3) Constante (usa oclusor)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>8. Pálpebras caídas (Ptose)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-8" value="0" onchange="calcularMgAdl()" checked><span class="checkmark"></span>(0) Nenhuma</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-8" value="1" onchange="calcularMgAdl()"><span class="checkmark"></span>(1) Leve/intermitente (não afeta AVDs)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-8" value="2" onchange="calcularMgAdl()"><span class="checkmark"></span>(2) Moderada/frequente (afeta AVDs)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="mgadl-8" value="3" onchange="calcularMgAdl()"><span class="checkmark"></span>(3) Grave (cobre pupila, levanta pálpebra)</label></div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Escore MG-ADL</h3>
                    
                    <div class="placar-numero" id="mgadl-placar-numero">0</div>
                    <div class="placar-detalhe" id="mgadl-placar-classificacao" style="font-size: 1.1em; line-height: 1.4; padding: 0 10px;">
                        Escore Total (0-24)
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="mgadl-placar-detalhe">
                        Fal:0 Mas:0 Eng:0 Res:0 Hig:0 Lev:0 Dip:0 Pto:0
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilo para a caixa de cópia (reutiliza o estilo do EDSS)
    if (!document.getElementById('edss-style')) {
         adicionarEstiloCopiaMgAdl();
    }

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularMgAdl();
}

/**
 * Função de cálculo (chamada automaticamente)
 * (Esta função NÃO mudou)
 */
function calcularMgAdl() {
    
    // 1. Obter os valores dos 8 itens
    const p1 = parseInt(document.querySelector('input[name="mgadl-1"]:checked').value); // Falar
    const p2 = parseInt(document.querySelector('input[name="mgadl-2"]:checked').value); // Mastigar
    const p3 = parseInt(document.querySelector('input[name="mgadl-3"]:checked').value); // Engolir
    const p4 = parseInt(document.querySelector('input[name="mgadl-4"]:checked').value); // Respirar
    const p5 = parseInt(document.querySelector('input[name="mgadl-5"]:checked').value); // Higiene
    const p6 = parseInt(document.querySelector('input[name="mgadl-6"]:checked').value); // Levantar
    const p7 = parseInt(document.querySelector('input[name="mgadl-7"]:checked').value); // Diplopia
    const p8 = parseInt(document.querySelector('input[name="mgadl-8"]:checked').value); // Ptose
    
    // 2. Calcular o total (Score 0-24)
    const total = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
    
    // 3. Criar a linha de cópia
    const detalhe = `Fal:${p1} Mas:${p2} Eng:${p3} Res:${p4} Hig:${p5} Lev:${p6} Dip:${p7} Pto:${p8}`;

    // 4. Exibir o resultado
    document.getElementById('mgadl-placar-numero').innerText = total;
    document.getElementById('mgadl-placar-detalhe').innerText = detalhe;
    document.getElementById('mgadl-placar-classificacao').innerText = "Escore Total (0-24)";
}

/**
 * Adiciona o estilo para a caixa de cópia
 * (Caso o estilo do EDSS não tenha sido carregado)
 */
function adicionarEstiloCopiaMgAdl() {
    if (document.getElementById('edss-style')) return;
    const style = document.createElement('style');
    style.id = 'edss-style'; // Reutiliza o ID
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