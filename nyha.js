// Arquivo: /calculadoras/nyha.js

function nyhaScale() {
    // Definição das Classes Funcionais da NYHA
    const classesNyha = [
        {
            id: 1,
            classe: "Classe I",
            titulo: "Ausência de limitação",
            texto: "Nenhuma limitação para atividades físicas. Atividades físicas habituais não causam fadiga indevida, palpitações ou dispneia.",
            cor: "#28a745" // Verde
        },
        {
            id: 2,
            classe: "Classe II",
            titulo: "Limitação leve",
            texto: "Leve limitação para atividades físicas. Confortável em repouso. Atividades físicas habituais resultam em fadiga, palpitações ou dispneia.",
            cor: "#ffc107" // Amarelo
        },
        {
            id: 3,
            classe: "Classe III",
            titulo: "Limitação moderada/marcada",
            texto: "Limitação acentuada para atividades físicas. Confortável em repouso. Atividades físicas menores do que as habituais causam fadiga, palpitações ou dispneia.",
            cor: "#fd7e14" // Laranja
        },
        {
            id: 4,
            classe: "Classe IV",
            titulo: "Limitação grave",
            texto: "Incapacidade de realizar qualquer atividade física sem desconforto. Sintomas de insuficiência cardíaca presentes mesmo em repouso. Se qualquer atividade física for realizada, o desconforto aumenta.",
            cor: "#dc3545" // Vermelho
        }
    ];

    let htmlPerguntas = `
        <div class="grupo-radio">
            <h4>Selecione a capacidade funcional do paciente baseada nos sintomas:</h4>
    `;

    classesNyha.forEach((item, index) => {
        htmlPerguntas += `
            <div class="opcao-radio" style="margin-bottom: 15px;">
                <label>
                    <input type="radio" name="nyha_classe" value="${index}" onchange="calcularNYHA()">
                    <span class="checkmark"></span>
                    <strong>${item.classe} (${item.titulo}):</strong> ${item.texto}
                </label>
            </div>
        `;
    });

    htmlPerguntas += `</div>`;

    const htmlConteudo = `
        <div class="calculadora-layout">
            <div class="perguntas-coluna">
                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Classificação Funcional da NYHA</h5>
                    <p>Avalia a gravidade da Insuficiência Cardíaca baseada na limitação da atividade física e sintomas (dispneia, fadiga, palpitação).</p>
                </div>
                ${htmlPerguntas}
            </div> 

            <div class="resultado-coluna">
                <div class="resultado-box-fixo" id="nyha-resultado-box">
                    <h3>Resultado NYHA</h3>
                    
                    <div style="margin-top: 20px;">
                        <span style="font-size: 1em; color: #555;">Classificação:</span>
                        <div class="placar-numero" id="nyha-resultado-classe" style="font-size: 2.5rem; margin: 10px 0; transition: color 0.3s;">-</div>
                        <div id="nyha-resultado-desc" style="font-size: 0.9em; color: #666; line-height: 1.4; padding: 0 10px; font-weight: bold;">
                            Selecione uma opção ao lado.
                        </div>
                    </div>

                    <h4 style="margin-top: 30px; margin-bottom: 5px; color: #333; font-size: 0.9em;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="nyha-copia" style="font-size: 0.85em; text-align: left; line-height: 1.6; display: none;">
                    </div>
                </div>
            </div> 
        </div> 
    `;

    injetarConteudo(htmlConteudo);
    adicionarEstiloCopiaNYHA();
    
    // Anexa a variável ao escopo da janela para usarmos na função de cálculo
    window.escalaNYHA = classesNyha;
}

window.calcularNYHA = function() {
    const selecionado = document.querySelector('input[name="nyha_classe"]:checked');
    if (!selecionado) return;

    const index = parseInt(selecionado.value);
    const item = window.escalaNYHA[index];

    // Atualiza o painel de resultados
    const resultadoClasse = document.getElementById('nyha-resultado-classe');
    resultadoClasse.innerText = item.classe;
    resultadoClasse.style.color = item.cor; // Muda a cor dependendo da gravidade
    
    document.getElementById('nyha-resultado-desc').innerText = item.titulo;

    // Atualiza texto de cópia
    const textoCopia = `<strong>Avaliação da Insuficiência Cardíaca:</strong><br>
    Classificação Funcional: NYHA ${item.classe}<br>
    <em>Quadro clínico: ${item.texto}</em>`;
    
    const divCopia = document.getElementById('nyha-copia');
    divCopia.innerHTML = textoCopia;
    divCopia.style.display = 'block';
};

function adicionarEstiloCopiaNYHA() {
    if (document.getElementById('copia-style-nyha')) return;
    const style = document.createElement('style');
    style.id = 'copia-style-nyha';
    style.innerHTML = `
        .placar-copia {
            font-size: 0.9em; font-family: 'Courier New', Courier, monospace;
            color: #333; padding: 10px; background-color: #f8f9fa;
            border: 1px dashed #ccc; border-radius: 4px;
            line-height: 1.5; text-align: left;
        }
    `;
    document.head.appendChild(style);
}