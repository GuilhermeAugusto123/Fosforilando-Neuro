// Arquivo: /calculadoras/gds15.js

/**
 * Função principal chamada pelo app.js
 */
function gds15() {
    // 1. Defina o HTML da calculadora
    // A pontuação (0 ou 1) está no 'value' de cada opção
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Escala de Depressão Geriátrica (GDS-15)</h5>
                    <ul>
                        <li>Responda "Sim" ou "Não" para as perguntas abaixo, pensando em como se sentiu na última semana.</li>
                    </ul>
                </div>

                <div class="grupo-radio">
                    <h4>1. Você está basicamente satisfeito com a sua vida?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-1" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Sim</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-1" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Não (+1)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>2. Você abandonou muitas de suas atividades e interesses?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-2" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-2" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Não</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>3. Você sente que sua vida está vazia?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-3" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-3" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Não</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>4. Você se sente aborrecido(a) frequentemente?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-4" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-4" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Não</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>5. Você está de bom humor a maior parte do tempo?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-5" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Sim</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-5" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Não (+1)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>6. Você tem medo que algo ruim lhe aconteça?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-6" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-6" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Não</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>7. Você se sente feliz a maior parte do tempo?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-7" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Sim</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-7" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Não (+1)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>8. Você se sente desamparado(a) frequentemente?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-8" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-8" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Não</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>9. Você prefere ficar em casa a sair e fazer coisas novas?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-9" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-9" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Não</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>10. Você sente que tem mais problemas de memória do que a maioria?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-10" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-10" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Não</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>11. Você acha que é maravilhoso estar vivo?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-11" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Sim</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-11" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Não (+1)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>12. Você se sente inútil ou sem valor?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-12" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-12" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Não</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>13. Você se sente cheio(a) de energia?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-13" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Sim</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-13" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Não (+1)</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>14. Você acha que sua situação não tem esperança?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-14" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-14" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Não</label></div>
                </div>
                
                <div class="grupo-radio">
                    <h4>15. Você acha que a maioria das pessoas está melhor do que você?</h4>
                    <div class="opcao-radio"><label><input type="radio" name="gds-15" value="1" onchange="calcularGDS15()"><span class="checkmark"></span>Sim (+1)</label></div>
                    <div class="opcao-radio"><label><input type="radio" name="gds-15" value="0" onchange="calcularGDS15()" checked><span class="checkmark"></span>Não</label></div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>GDS-15</h3>
                    
                    <div class="placar-numero" id="gds-placar-numero">0</div>
                    <div class="placar-detalhe" style="font-size: 1.1em; line-height: 1.4; padding: 0 10px;">
                        Escore Total (0-15)
                    </div>
                    <div class="placar-classificacao" id="gds-placar-classificacao" style="font-size: 1.3em; margin-top: 15px;">
                        Normal
                    </div>

                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Chame o cálculo uma vez para definir o estado inicial
    calcularGDS15();
}

/**
 * Função de cálculo (chamada automaticamente)
 */
function calcularGDS15() {
    
    let total = 0;
    
    // 1. Obter os valores dos 15 itens
    // O valor (0 ou 1) já está definido no HTML
    for (let i = 1; i <= 15; i++) {
        total += parseInt(document.querySelector(`input[name="gds-${i}"]:checked`).value);
    }
    
    // 2. Definir a classificação
    let classificacao = '';
    if (total <= 5) {
        classificacao = 'Normal';
    } else if (total <= 10) {
        classificacao = 'Sugestivo de Depressão Leve';
    } else { // 11-15
        classificacao = 'Sugestivo de Depressão Grave';
    }

    // 3. Exibir o resultado
    document.getElementById('gds-placar-numero').innerText = total;
    document.getElementById('gds-placar-classificacao').innerText = classificacao;
}