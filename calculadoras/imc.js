// Arquivo: /calculadoras/imc.js

/**
 * Função principal chamada pelo app.js
 */
function imc() {
    // 1. Defina o HTML da calculadora
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Cálculo do IMC</h5>
                    <ul>
                        <li>Insira o peso (kg) e a altura (m). O cálculo é automático.</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>Peso (kg)</h4>
                    <div style="padding: 0 20px 20px;">
                        <input type="number" id="imc-peso" class="form-input-number" placeholder="Ex: 80.5" step="0.1" oninput="calcularIMC()">
                    </div>
                </div>

                <div class="grupo-radio">
                    <h4>Altura (m)</h4>
                    <div style="padding: 0 20px 20px;">
                        <input type="number" id="imc-altura" class="form-input-number" placeholder="Ex: 1.75" step="0.01" oninput="calcularIMC()">
                    </div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Resultado IMC</h3>
                    
                    <div class="placar-numero" id="imc-placar-numero">--</div>
                    <div class="placar-classificacao" id="imc-placar-classificacao" style="font-size: 1.3em; margin-top: 15px;">
                        Aguardando dados...
                    </div>

                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="imc-placar-detalhe" style="font-size: 1.0em; text-align: center;">
                        IMC: -- kg/m²
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilos necessários (reutilizando IDs de estilo que já criamos para inputs)
    adicionarEstiloIMC();

    // 4. Inicia sem cálculo (aguarda input)
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularIMC() {
    
    // 1. Obter valores
    const peso = parseFloat(document.getElementById('imc-peso').value);
    let altura = parseFloat(document.getElementById('imc-altura').value);

    // Validação básica
    if (!peso || !altura || altura <= 0) {
        document.getElementById('imc-placar-numero').innerText = "--";
        document.getElementById('imc-placar-classificacao').innerText = "Aguardando dados...";
        document.getElementById('imc-placar-detalhe').innerText = "IMC: --";
        return;
    }

    // Ajuste inteligente: se o usuário digitar "175" (cm) em vez de "1.75" (m), corrigimos.
    if (altura > 3) {
        altura = altura / 100;
    }

    // 2. Calcular IMC
    const imcValor = peso / (altura * altura);
    const imcFormatado = imcValor.toFixed(1); // Ex: 28.4

    // 3. Classificação (OMS)
    let classificacao = '';
    if (imcValor < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imcValor < 25) {
        classificacao = 'Peso normal';
    } else if (imcValor < 30) {
        classificacao = 'Sobrepeso';
    } else if (imcValor < 35) {
        classificacao = 'Obesidade Grau I';
    } else if (imcValor < 40) {
        classificacao = 'Obesidade Grau II';
    } else {
        classificacao = 'Obesidade Grau III (Mórbida)';
    }

    // 4. Exibir resultados
    document.getElementById('imc-placar-numero').innerText = imcFormatado;
    document.getElementById('imc-placar-classificacao').innerText = classificacao;
    document.getElementById('imc-placar-detalhe').innerText = `Peso: ${peso}kg | Alt: ${altura.toFixed(2)}m | IMC: ${imcFormatado} kg/m² (${classificacao})`;
}

/**
 * Adiciona estilos necessários (inputs e caixa de cópia)
 */
function adicionarEstiloIMC() {
    // Reutiliza estilo de input numérico do MoCA/Pittsburgh
    if (!document.getElementById('pittsburgh-style')) {
        const styleNum = document.createElement('style');
        styleNum.id = 'pittsburgh-style';
        styleNum.innerHTML = `
            .form-input-number {
                width: 100%; padding: 10px; border: 1px solid #ccc;
                border-radius: 5px; font-size: 1em; box-sizing: border-box;
            }
        `;
        document.head.appendChild(styleNum);
    }

    // Reutiliza estilo da caixa de cópia
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