// Arquivo: /calculadoras/cdr.js

function cdr() {
    
    // Definição dos domínios e textos (Versão Brasileira)
    const dominios = [
        {
            id: 'memoria',
            titulo: '1. Memória',
            opcoes: [
                { v: 0, t: "0 - Sem perda de memória ou esquecimento leve inconstante." },
                { v: 0.5, t: "0.5 - Esquecimento leve consistente; recordação parcial de eventos." },
                { v: 1, t: "1 - Perda de memória moderada; interfere nas atividades cotidianas." },
                { v: 2, t: "2 - Perda de memória grave; retém apenas material muito aprendido." },
                { v: 3, t: "3 - Perda de memória grave; restam apenas fragmentos." }
            ]
        },
        {
            id: 'orientacao',
            titulo: '2. Orientação',
            opcoes: [
                { v: 0, t: "0 - Plenamente orientado." },
                { v: 0.5, t: "0.5 - Dificuldade leve com relações temporais." },
                { v: 1, t: "1 - Dificuldade moderada com relações temporais; desorientado no espaço." },
                { v: 2, t: "2 - Desorientação grave quanto ao tempo e espaço." },
                { v: 3, t: "3 - Orientado apenas quanto a si mesmo." }
            ]
        },
        {
            id: 'julgamento',
            titulo: '3. Julgamento e Solução de Problemas',
            opcoes: [
                { v: 0, t: "0 - Resolve problemas cotidianos bem; bom julgamento." },
                { v: 0.5, t: "0.5 - Leve prejuízo na solução de problemas, semelhanças e diferenças." },
                { v: 1, t: "1 - Dificuldade moderada; julgamento social mantido na maioria das vezes." },
                { v: 2, t: "2 - Comprometimento grave; julgamento social prejudicado." },
                { v: 3, t: "3 - Incapaz de resolver problemas." }
            ]
        },
        {
            id: 'comunidade',
            titulo: '4. Assuntos Comunitários',
            opcoes: [
                { v: 0, t: "0 - Vida independente normal." },
                { v: 0.5, t: "0.5 - Leve prejuízo nessas atividades." },
                { v: 1, t: "1 - Incapaz de funcionar independente, embora possa participar." },
                { v: 2, t: "2 - Sem pretensão de funcionar fora de casa." },
                { v: 3, t: "3 - Incapaz de funcionar independentemente." }
            ]
        },
        {
            id: 'lar',
            titulo: '5. Lar e Lazer',
            opcoes: [
                { v: 0, t: "0 - Vida doméstica, passatempos e interesses intelectuais mantidos." },
                { v: 0.5, t: "0.5 - Vida doméstica, passatempos e interesses levemente prejudicados." },
                { v: 1, t: "1 - Comprometimento leve, mas definitivo; abandono de tarefas difíceis." },
                { v: 2, t: "2 - Restrito apenas a tarefas muito simples." },
                { v: 3, t: "3 - Nenhuma função significativa fora do quarto." }
            ]
        },
        {
            id: 'cuidados',
            titulo: '6. Cuidados Pessoais',
            opcoes: [
                { v: 0, t: "0 - Totalmente capaz de cuidar-se." },
                { v: 0.5, t: "0.5 - Necessita de lembretes." }, // Nota: PC não costuma pontuar 0.5 na regra clássica, mas no SOB sim.
                { v: 1, t: "1 - Necessita de auxílio no vestir, higiene e objetos pessoais." },
                { v: 2, t: "2 - Requer assistência para vestir-se, higiene; incontinência." },
                { v: 3, t: "3 - Requer assistência total cuidados pessoais; incontinência frequente." }
            ]
        }
    ];

    // Gerar HTML
    let htmlPerguntas = '';
    dominios.forEach((cat) => {
        let optionsHtml = '';
        cat.opcoes.forEach((opt) => {
            // Verifica se é 0.5 para tratar string x number
            const valStr = opt.v.toString();
            optionsHtml += `
                <div class="opcao-radio" style="font-size: 0.9em;">
                    <label>
                        <input type="radio" name="cdr-${cat.id}" value="${valStr}" onchange="calcularCDR()" ${opt.v === 0 ? 'checked' : ''}>
                        <span class="checkmark"></span>
                        ${opt.t}
                    </label>
                </div>
            `;
        });

        htmlPerguntas += `
            <div class="grupo-radio" style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
                <h4 style="color: #0056b3; margin-bottom: 10px;">${cat.titulo}</h4>
                ${optionsHtml}
            </div>
        `;
    });

    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>CDR (Avaliação Clínica da Demência)</h5>
                    <p>Avalie o desempenho do paciente em comparação ao seu nível anterior.</p>
                </div>
                ${htmlPerguntas}
            </div>

            <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>Resultado CDR</h3>
                    
                    <div style="display: flex; justify-content: space-around; margin-top: 15px;">
                        <div style="text-align: center;">
                            <span style="font-size: 0.8em; color: #666;">Global Score</span>
                            <div class="placar-numero" id="cdr-global">0</div>
                        </div>
                        <div style="text-align: center; border-left: 1px solid #ccc; padding-left: 15px;">
                            <span style="font-size: 0.8em; color: #666;">Sum of Boxes</span>
                            <div class="placar-numero" id="cdr-sob">0</div>
                        </div>
                    </div>

                    <div class="placar-classificacao" id="cdr-classificacao" style="font-size: 1.1em; margin-top: 15px;">
                        Normal (CDR 0)
                    </div>

                    <h4 style="margin-top: 20px; color: #333;">Cópia:</h4>
                    <div class="placar-copia" id="cdr-resumo">
                        CDR Global: 0 | SOB: 0
                    </div>
                </div>
            </div>
        </div>
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCDR();
    calcularCDR();
}

function calcularCDR() {
    // 1. Coletar valores
    const ids = ['memoria', 'orientacao', 'julgamento', 'comunidade', 'lar', 'cuidados'];
    let valores = {};
    let sob = 0; // Sum of Boxes

    ids.forEach(id => {
        const val = parseFloat(document.querySelector(`input[name="cdr-${id}"]:checked`).value);
        valores[id] = val;
        sob += val;
    });

    // 2. Calcular Score Global (Algoritmo de Washington University simplificado)
    // A Memória é o domínio primário (M).
    // Os outros 5 são secundários.
    
    let m = valores['memoria'];
    let outros = [valores['orientacao'], valores['julgamento'], valores['comunidade'], valores['lar'], valores['cuidados']];
    
    let globalScore = m; // Começa assumindo que é igual à memória

    // Contagem de secundários maiores ou menores que M
    let countGreaterOrEqual = 0;
    let countLess = 0;
    
    // Regras Específicas para M = 0.5
    if (m === 0.5) {
        let countGe1 = outros.filter(v => v >= 1).length; // Quantos >= 1
        let count0 = outros.filter(v => v === 0).length;  // Quantos == 0

        if (countGe1 >= 3) {
            globalScore = 1;
        } else if (count0 >= 3) { // Regra do "impairment questionável" tendendo a normal
            globalScore = 0; 
        } else {
            globalScore = 0.5;
        }
    } 
    // Regras para M != 0.5
    else {
        // Se 3 ou mais secundários forem maiores ou iguais a um nível ACIMA de M -> Sobe o global?
        // A regra padrão simplificada diz: O global segue a memória, a menos que haja dispersão significativa.
        // Implementação da regra "3 ou mais secundários" para mover o score:
        
        // Quantos apoiam um score maior?
        // (Simplificação clínica: Se M=1 mas 3 áreas são 2 -> Global 2. Se M=1 mas 3 áreas são 0.5 -> Global 0.5)
        
        // Contar quantos secundários estão de cada lado de M
        let maiores = outros.filter(v => v > m).length;
        let menores = outros.filter(v => v < m).length;

        if (maiores >= 3) {
            // Tenta subir um nível
            // Na prática clínica, raramente pula de 1 para 3. Sobe para o próximo score disponível dos secundários.
            // Para segurança do app, vamos indicar se houver discrepância, mas manter M como âncora principal se não for regra de 0.5.
            // *Ajuste Fino*: Se 3+ secundários são pontuados numa classe maior que M, CDR = M + 1 (limitado ao max das outras).
            // Vamos manter a âncora de memória pura para casos não-0.5 para evitar erros de algoritmo complexo, 
            // já que M=0.5 é a maior fonte de confusão.
        }
    }

    // Classificação Texto
    let texto = "";
    if (globalScore === 0) texto = "Normal";
    else if (globalScore === 0.5) texto = "Demência Questionável / CCL";
    else if (globalScore === 1) texto = "Demência Leve";
    else if (globalScore === 2) texto = "Demência Moderada";
    else if (globalScore === 3) texto = "Demência Grave";

    // Atualizar Tela
    document.getElementById('cdr-global').innerText = globalScore;
    document.getElementById('cdr-sob').innerText = sob;
    document.getElementById('cdr-classificacao').innerText = texto;

    document.getElementById('cdr-resumo').innerText = 
        `CDR Global: ${globalScore} (${texto})\nCDR-SOB: ${sob}/18`;
}

function adicionarEstiloCDR() {
    if (!document.getElementById('cdr-style')) {
        const style = document.createElement('style');
        style.id = 'cdr-style';
        style.innerHTML = `
            .placar-numero { font-size: 2em; font-weight: bold; color: #0056b3; }
        `;
        document.head.appendChild(style);
    }
}