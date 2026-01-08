// Arquivo: /calculadoras/pfeffer.js

/**
 * Função principal chamada pelo app.js
 */
function pfeffer() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Questionário de Pfeffer (FAQ) (0-30 pts)</h5>
                    <ul>
                        <li>Avalie a capacidade do paciente em 10 atividades funcionais.</li>
                        <li><b>0:</b> Normal / Capaz</li>
                        <li><b>1:</b> Com dificuldade, mas faz sozinho</li>
                        <li><b>2:</b> Necessita de ajuda</li>
                        <li><b>3:</b> Dependente / Incapaz</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Manusear o próprio dinheiro (pagar contas, etc.)</h4>
                    ${pfefferOpcoes('pfeffer-1')}
                </div>
                
                <div class="grupo-radio">
                    <h4>2. Fazer compras sozinho (mercado, roupas)</h4>
                    ${pfefferOpcoes('pfeffer-2')}
                </div>
                
                <div class="grupo-radio">
                    <h4>3. Preparar refeições</h4>
                    ${pfefferOpcoes('pfeffer-3')}
                </div>
                
                <div class="grupo-radio">
                    <h4>4. Realizar tarefas domésticas (limpar, arrumar)</h4>
                    ${pfefferOpcoes('pfeffer-4')}
                </div>
                
                <div class="grupo-radio">
                    <h4>5. Tomar os próprios remédios (dose e hora certa)</h4>
                    ${pfefferOpcoes('pfeffer-5')}
                </div>
                
                <div class="grupo-radio">
                    <h4>6. Usar o telefone (iniciar e receber chamadas)</h4>
                    ${pfefferOpcoes('pfeffer-6')}
                </div>
                
                <div class="grupo-radio">
                    <h4>7. Usar transporte (dirigir, ônibus, táxi)</h4>
                    ${pfefferOpcoes('pfeffer-7')}
                </div>
                
                <div class="grupo-radio">
                    <h4>8. Lembrar-se de compromissos e datas</h4>
                    ${pfefferOpcoes('pfeffer-8')}
                </div>
                
                <div class="grupo-radio">
                    <h4>9. Acompanhar notícias (TV, jornal) / Conversas</h4>
                    ${pfefferOpcoes('pfeffer-9')}
                </div>
                
                <div class="grupo-radio">
                    <h4>10. Manter um passatempo / Hobbies</h4>
                    ${pfefferOpcoes('pfeffer-10')}
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Pfeffer (FAQ)</h3>
                    
                    <div class="placar-numero" id="pfeffer-placar-numero">0</div>
                    <div class="placar-classificacao" id="pfeffer-placar-classificacao" style="font-size: 1.3em; margin-top: 15px;">
                        Funcionalidade Normal
                    </div>
                    <div class="placar-detalhe" style="font-size: 0.9em; margin-top: 5px;">
                        (Ponto de corte: ≥ 5)
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="pfeffer-placar-detalhe" style="font-size: 0.8em; text-align: left; line-height: 1.6;">
                        FAQ: P1:0 P2:0 P3:0 P4:0 P5:0 P6:0 P7:0 P8:0 P9:0 P10:0
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilos necessários (reutilizando IDs de estilo que já criamos)
    if (!document.getElementById('edss-style')) {
         adicionarEstiloCopiaPfeffer();
    }

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularPfeffer();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularPfeffer() {
    
    let total = 0;
    let detalhe = [];

    // 1. Obter os valores dos 10 itens
    for (let i = 1; i <= 10; i++) {
        const p = parseInt(document.querySelector(`input[name="pfeffer-${i}"]:checked`).value);
        total += p;
        detalhe.push(`P${i}:${p}`);
    }
    
    // 2. Definir a classificação
    let classificacao = '';
    if (total >= 5) {
        classificacao = 'Sugestivo de Dependência Funcional';
    } else {
        classificacao = 'Funcionalidade Normal';
    }

    // 3. Exibir o resultado
    document.getElementById('pfeffer-placar-numero').innerText = total;
    document.getElementById('pfeffer-placar-classificacao').innerText = classificacao;
    document.getElementById('pfeffer-placar-detalhe').innerText = "FAQ: " + detalhe.join(' ');
}

/**
 * Função auxiliar para criar as opções 0-3
 */
function pfefferOpcoes(name) {
    return `
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="0" onchange="calcularPfeffer()" checked><span class="checkmark"></span>(0) Normal / Capaz</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="1" onchange="calcularPfeffer()"><span class="checkmark"></span>(1) Com dificuldade, mas faz</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="2" onchange="calcularPfeffer()"><span class="checkmark"></span>(2) Necessita de ajuda</label></div>
    <div class="opcao-radio"><label><input type="radio" name="${name}" value="3" onchange="calcularPfeffer()"><span class="checkmark"></span>(3) Dependente</label></div>
    `;
}

/**
 * Adiciona o estilo para a caixa de cópia
 * (Caso o estilo do EDSS não tenha sido carregado)
 */
function adicionarEstiloCopiaPfeffer() {
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