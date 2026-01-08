// Arquivo: /calculadoras/sprs.js

/**
 * Função principal chamada pelo app.js
 */
function sprs() {
    // 1. Defina o HTML da calculadora
    //
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Escala de Avaliação de Paraparesia Espástica (SPRS)</h5>
                    <ul>
                        <li>Selecione a pontuação para cada um dos 13 itens.</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Distância da caminhada sem pausa</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-1" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Normal (ilimitado)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-1" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Normal, anormal devido à espasticidade após mais de 500m</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-1" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Caminha menos de 500m</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-1" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Caminha menos de 10m</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-1" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Incapaz de andar</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>2. Qualidade da marcha</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-2" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-2" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Rigidez leve, correr ainda é possível</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-2" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Marcha claramente espástica, interferindo no correr</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-2" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Marcha espástica, com necessidade de dispositivos auxiliares</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-2" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Incapaz de andar (ou com apoio máximo)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>3. Velocidade máxima da marcha (10m)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-3" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Normal (< 10s)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-3" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Levemente reduzida (10s a ≤ 10s)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-3" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Moderadamente reduzida (10s a ≤ 20s)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-3" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Gravemente reduzida (> 20s)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-3" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Incapaz de andar 10m</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>4. Subir escadas (5 degraus)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-4" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Normal (sem apoio do corrimão)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-4" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Incapacidade leve, apoio intermitente do corrimão</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-4" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Incapacidade moderada, necessita de apoio contínuo</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-4" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Incapacidade grave, necessita de apoio/suporte</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-4" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Incapaz de subir escadas</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>5. Velocidade para subir escadas (5 degraus)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-5" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Normal (< 5s)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-5" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Levemente reduzida (≥ 5s)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-5" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Moderadamente reduzida (≥ 10s)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-5" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Gravemente reduzida (≥ 20s)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-5" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Incapaz de subir escadas</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>6. Levantar da cadeira</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-6" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-6" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Lento ou pode necessitar de mais de uma tentativa</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-6" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Levanta-se com apoio dos braços da cadeira</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-6" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Incapaz de se levantar sem ajuda</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>7. Espasticidade: adutores do quadril (Ashworth)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-7" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Tônus muscular normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-7" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Leve aumento do tônus</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-7" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Aumento mais marcante do tônus</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-7" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Considerável aumento do tônus</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-7" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Membro fixo em adução</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>8. Espasticidade: flexão do joelho (Ashworth mod.)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-8" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Tônus muscular normal</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-8" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Leve aumento do tônus (tensão momentânea)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-8" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Aumento mais marcante do tônus</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-8" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Considerável aumento do tônus</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-8" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Membro fixo em flexão ou extensão</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>9. Fraqueza: abdução do quadril (MRC)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-9" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Sem fraqueza (5/5)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-9" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Fraqueza leve (4/5)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-9" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Fraqueza moderada (3/5)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-9" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Fraqueza grave (1-2/5)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-9" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Plegia (0/5)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>10. Fraqueza: dorsiflexão do pé (MRC)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-10" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Sem fraqueza (5/5)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-10" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Fraqueza leve (4/5)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-10" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Fraqueza moderada (3/5)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-10" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Fraqueza grave (1-2/5)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-10" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Plegia (0/5)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>11. Contraturas dos membros inferiores</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-11" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Sem contratura</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-11" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Leve, posição anormal não fixa (uni/bilateral)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-11" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Contratura fixa de uma articulação (uni/bilateral)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-11" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Contratura fixa de duas articulações (uni/bilateral)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-11" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Contratura fixa de mais de duas articulações</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>12. Dor secundária (relacionada à paraparesia)</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-12" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Sem dor</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-12" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Presente em < 50% do dia</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-12" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Presente em ≥ 50% do dia</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-12" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Presente em < 50% do dia (EVA > 3)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-12" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Presente em ≥ 50% do dia (EVA > 3)</label></div>
                </div>

                <div class="grupo-radio">
                    <h4>13. Função vesical e intestinal</h4>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-13" value="0" onchange="calcularSPRS()" checked><span class="checkmark"></span>(0) Funções normais</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-13" value="1" onchange="calcularSPRS()"><span class="checkmark"></span>(1) Urgência urinária ou intestinal (ou dificuldade de chegar ao banheiro)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-13" value="2" onchange="calcularSPRS()"><span class="checkmark"></span>(2) Urge-incontinência rara (sem necessidade de fralda)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-13" value="3" onchange="calcularSPRS()"><span class="checkmark"></span>(3) Urge-incontinência moderada (fralda ocasional)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="sprs-13" value="4" onchange="calcularSPRS()"><span class="checkmark"></span>(4) Uso de cateter ou fralda permanente</label></div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>SPRS</h3>
                    
                    <div class="placar-classificacao" id="sprs-placar-classificacao" style="font-size: 1.1em; margin-top: 15px;">
                        Resumo
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="sprs-placar-detalhe" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                        </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilos necessários (reutilizando IDs de estilo que já criamos)
    if (!document.getElementById('edss-style')) {
         adicionarEstiloCopiaSPRS();
    }

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularSPRS();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularSPRS() {
    
    let detalhe = [];
    let total = 0; // Embora a soma total não seja o "resultado" principal, podemos calculá-la.
    const nomes = ["Cam", "Qua", "Vel", "Esc", "VelEsc", "Cad", "EspAdu", "EspJoe", "FraAbd", "FraDor", "Con", "Dor", "Ves"];

    // 1. Obter os valores dos 13 itens
    for (let i = 1; i <= 13; i++) {
        const p = parseInt(document.querySelector(`input[name="sprs-${i}"]:checked`).value);
        total += p;
        detalhe.push(`${nomes[i-1]}:${p}`);
    }

    // 2. Exibir o resultado
    document.getElementById('sprs-placar-classificacao').innerText = `Escore Total: ${total}`;
    document.getElementById('sprs-placar-detalhe').innerText = detalhe.join(' | ');
}

/**
 * Adiciona o estilo para a caixa de cópia
 * (Caso o estilo do EDSS não tenha sido carregado)
 */
function adicionarEstiloCopiaSPRS() {
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