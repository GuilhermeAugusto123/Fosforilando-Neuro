// ARQUIVO: calculadoras/nascet.js

function nascet() {
    const html = `
        <h2 style="color: #0056b3;">NASCET - Estenose de Carótida</h2>
        <p style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">
            Quantificação do grau de estenose da artéria carótida interna (ACI) baseada em diâmetros angiográficos/tomográficos.
        </p>

        <div class="calc-grid-container">

            <div class="calc-inputs">
                <label for="n_distal"><strong>(N) Diâmetro Normal Distal (mm)</strong></label>
                <p style="font-size:0.8rem; color:#888; margin-top:-5px;">Medida da ACI sadia, bem após a estenose, onde as paredes estão paralelas.</p>
                <input type="number" id="n_distal" placeholder="Ex: 5.0" step="0.1">

                <label for="d_stenosis" style="margin-top: 15px; display:block;"><strong>(D) Diâmetro da Estenose (mm)</strong></label>
                <p style="font-size:0.8rem; color:#888; margin-top:-5px;">Diâmetro do lúmen residual no ponto mais estreito.</p>
                <input type="number" id="d_stenosis" placeholder="Ex: 1.5" step="0.1">

                <button onclick="calcularNascet()" class="btn-calcular" style="margin-top: 25px;">Calcular Estenose</button>

                <div style="margin-top: 20px; font-size: 0.8rem; color: #777; background: #fff3cd; padding: 10px; border-radius: 5px;">
                    <strong>Nota:</strong> O método NASCET compara a estenose com a artéria distal. Não confundir com o método ECST (que usa o bulbo estimado).
                </div>
            </div>

            <div class="calc-sidebar">
                <img src="img/nascet_diagrama.png" alt="Diagrama explicativo NASCET: D=Estenose, N=Normal Distal" class="calc-image-explicativa" onerror="this.style.display='none'">
                <p style="font-size: 0.75rem; color: #999; text-align: center; margin-top: -10px; margin-bottom: 15px;">Diagrama de medidas NASCET</p>
                
                <div id="resultado-nascet" class="resultado-sidebar-box" style="display: none;">
                </div>
            </div>

        </div>
    `;

    injetarConteudo(html);
}

// Lógica do cálculo
window.calcularNascet = function() {
    const nInput = document.getElementById('n_distal');
    const dInput = document.getElementById('d_stenosis');
    const n = parseFloat(nInput.value);
    const d = parseFloat(dInput.value);
    const divResultado = document.getElementById('resultado-nascet');

    // Validações
    if (isNaN(n) || isNaN(d)) {
        alert("Por favor, preencha os dois diâmetros com valores numéricos.");
        return;
    }
    if (n <= 0) {
        alert("O diâmetro normal (N) deve ser maior que zero.");
        return;
    }
    if (d > n) {
        alert("Atenção: O diâmetro da estenose (D) não pode ser maior que o diâmetro normal (N). Verifique se os valores não foram invertidos.");
        return;
    }

    // Fórmula NASCET: (1 - d/n) * 100
    const porcentagem = (1 - (d / n)) * 100;
    let estenoseFormatted = porcentagem.toFixed(1);

    // Ajuste se der 100% ou muito perto de 0
    if (porcentagem < 0) estenoseFormatted = "0.0";
    if (porcentagem > 99.9) estenoseFormatted = "100";

    // Classificação Pura (Sem conduta clínica)
    let classificacao = "";
    let cor = "#0056b3"; // Azul padrão

    if (porcentagem < 50) {
        classificacao = "Estenose Leve (<50%)";
        cor = "#28a745"; // Verde
    } else if (porcentagem >= 50 && porcentagem < 70) {
        classificacao = "Estenose Moderada (50-69%)";
        cor = "#ffc107"; // Amarelo escuro
    } else if (porcentagem >= 70 && porcentagem < 99) {
        classificacao = "Estenose Grave (70-99%)";
        cor = "#dc3545"; // Vermelho
    } else if (porcentagem >= 99) {
        classificacao = "Pré-oclusão / Oclusão (≥99%)";
        cor = "#8b0000"; // Vermelho escuro
    }

    // Exibe o resultado na sidebar
    divResultado.style.display = "block";
    divResultado.style.borderLeftColor = cor;
    // Garante que a tela role se o resultado estiver escondido no celular
    divResultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); 

    divResultado.innerHTML = `
        <p style="font-size: 0.85rem; color: #666; margin-bottom: 5px;">Resultado NASCET:</p>
        <h3 style="color: ${cor}; margin: 0; font-size: 1.8rem;">${estenoseFormatted}%</h3>
        <p style="font-size: 1.1rem; margin: 5px 0 0 0; font-weight: bold; color: #333;">${classificacao}</p>
    `;
};