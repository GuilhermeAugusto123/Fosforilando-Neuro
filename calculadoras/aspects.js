// Arquivo: /calculadoras/aspects.js

/**
 * Função principal chamada pelo app.js
 */
function aspects() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">
                
                <h3>Nível Ganglionar</h3>
                <p>Selecione as áreas afetadas:</p>
                <img src="img/aspects_ganglionar.jpg" alt="Guia ASPECTS Nível Ganglionar" class="imagem-guia-aspects">
                
                <div class="toggle-container">
                    <input type="checkbox" id="aspects-c" onchange="calcularASPECTS()"><label for="aspects-c">C</label>
                    <input type="checkbox" id="aspects-i" onchange="calcularASPECTS()"><label for="aspects-i">I</label>
                    <input type="checkbox" id="aspects-l" onchange="calcularASPECTS()"><label for="aspects-l">L</label>
                    <input type="checkbox" id="aspects-ic" onchange="calcularASPECTS()"><label for="aspects-ic">IC</label>
                    <input type="checkbox" id="aspects-m1" onchange="calcularASPECTS()"><label for="aspects-m1">M1</label>
                    <input type="checkbox" id="aspects-m2" onchange="calcularASPECTS()"><label for="aspects-m2">M2</label>
                    <input type="checkbox" id="aspects-m3" onchange="calcularASPECTS()"><label for="aspects-m3">M3</label>
                </div>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

                <h3>Nível Supraganglionar</h3>
                <p>Selecione as áreas afetadas:</p>
                <img src="img/aspects_supraganglionar.jpg" alt="Guia ASPECTS Nível Supraganglionar" class="imagem-guia-aspects">

                <div class="toggle-container">
                    <input type="checkbox" id="aspects-m4" onchange="calcularASPECTS()"><label for="aspects-m4">M4</label>
                    <input type="checkbox" id="aspects-m5" onchange="calcularASPECTS()"><label for="aspects-m5">M5</label>
                    <input type="checkbox" id="aspects-m6" onchange="calcularASPECTS()"><label for="aspects-m6">M6</label>
                </div>


            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Pontuação ASPECTS</h3>
                    
                    <div class="placar-numero" id="aspects-placar-numero">10</div>
                    <div classs="placar-detalhe" id="aspects-placar-classificacao" style="margin-top:-10px; font-weight: 600;">(Risco Baixo de Hemorragia)</div>
                    
                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Áreas Afetadas</h4>
                    <div class="placar-detalhe nenhuma" id="aspects-placar-detalhe">Nenhuma área afetada</div>
                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial
    calcularASPECTS();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularASPECTS() {
    
    let score = 10;
    const areasAfetadas = [];
    
    // Lista de todas as 10 regiões
    const regioes = ['c', 'i', 'l', 'ic', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6'];

    // Loop para verificar cada checkbox
    regioes.forEach(regiao => {
        const checkbox = document.getElementById(`aspects-${regiao}`);
        if (checkbox.checked) {
            score--; // Subtrai 1 ponto se estiver checado
            areasAfetadas.push(regiao.toUpperCase()); // Adiciona a sigla (ex: "M1") na lista
        }
    });

    // 3. Definir a classificação
    let classificacao = '';
    if (score >= 8) {
        classificacao = '(Risco Baixo de Hemorragia)';
    } else if (score >= 5) {
        classificacao = '(Risco Moderado de Hemorragia)';
    } else {
        classificacao = '(Risco Alto de Hemorragia)';
    }

    // 4. Exibir o resultado
    document.getElementById('aspects-placar-numero').innerText = score;
    document.getElementById('aspects-placar-classificacao').innerText = classificacao;

    const detalheEl = document.getElementById('aspects-placar-detalhe');
    if (areasAfetadas.length === 0) {
        detalheEl.innerText = 'Nenhuma área afetada';
        detalheEl.className = 'placar-detalhe nenhuma'; // Adiciona a classe 'nenhuma' (verde)
    } else {
        detalheEl.innerText = areasAfetadas.join(', '); // Ex: "C, M1, M4"
        detalheEl.className = 'placar-detalhe'; // Remove a classe 'nenhuma'
    }
}