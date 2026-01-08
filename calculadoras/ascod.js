// Arquivo: /calculadoras/ascod.js (Versão 3.3 - COMPLETA A+S+C+O+D)

/**
 * Função principal chamada pelo app.js
 */
function ascod() {
    // 1. Defina o HTML da calculadora
    //
    const htmlConteudo = `
        <div class="calculadora-layout">
            
            <div class="perguntas-coluna">

                <div class="aviso-instrucao" style="margin-bottom: 20px;">
                    <h5>Classificação ASCOD (Etiologia do AVC)</h5>
                    <ul>
                        <li>Clique em uma categoria para expandir e marque os achados presentes.</li>
                    </ul>
                </div>

                <div class="ascod-accordion-container">
                    <button class="ascod-accordion" onclick="toggleAscodCategory(this)">A - Aterotrombose</button>
                    <div class="ascod-panel">
                        <h5 class="ascod-subtitulo">A1 (Potencialmente Causal)</h5>
                        ${ascodCheckbox('ascod-a1-1', 'Estenose ipsilateral 50-99% (intra/extra) irrigando área isquêmica')}
                        ${ascodCheckbox('ascod-a1-2', 'Estenose ipsilateral <50% (intra/extra) COM trombo endoluminal')}
                        ${ascodCheckbox('ascod-a1-3', 'Trombo móvel na aorta')}
                        ${ascodCheckbox('ascod-a1-4', 'Oclusão ipsilateral (intra/extra) com evidência de placa subjacente')}
                        <h5 class="ascod-subtitulo">A2 (Causa Provável Incerta)</h5>
                        ${ascodCheckbox('ascod-a2-1', 'Estenose ipsilateral 30-50% (intra/extra)')}
                        ${ascodCheckbox('ascod-a2-2', 'Placa aórtica > 4 mm sem trombo móvel')}
                        <h5 class="ascod-subtitulo">A3 (Causa Improvável, Doença Presente)</h5>
                        ${ascodCheckbox('ascod-a3-1', 'Placa (estenose <30%) (intra/extra), ipsilateral')}
                        ${ascodCheckbox('ascod-a3-2', 'Placa aórtica < 4 mm sem trombo móvel')}
                        ${ascodCheckbox('ascod-a3-3', 'Estenose/Oclusão em artéria que NÃO irriga área do infarto (ex: colateral)')}
                        ${ascodCheckbox('ascod-a3-4', 'Histórico de IAM, revascularização ou doença arterial periférica')}
                        ${ascodCheckbox('ascod-a3-5', 'Estenose 50-99% ipsi/bilateral com lesão bi-hemisférica (RM-DWI)')}
                        <h5 class="ascod-subtitulo">A9 (Investigação Incompleta)</h5>
                        ${ascodCheckbox('ascod-a9-1', 'US-Duplex, US-TCD, CTA, MRA ou XRA não realizados')}
                    </div>
                </div>
                
                <div class="ascod-accordion-container">
                    <button class="ascod-accordion" onclick="toggleAscodCategory(this)">S - Doença de Pequenos Vasos</button>
                    <div class="ascod-panel">
                        <h5 class="ascod-subtitulo">S1 (Potencialmente Causal)</h5>
                        <span class="sub-instrucao-titulo" style="padding: 0 0 10px;">Marque (1) + (pelo menos um dos 3 abaixo):</span>
                        ${ascodCheckbox('ascod-s1-1', '(1) Infarto lacunar recente (<15mm) sintomático (RM-DWI ou TC)')}
                        ${ascodCheckbox('ascod-s1-2', '(+) E/OU: Um ou mais infartos lacunares antigos')}
                        ${ascodCheckbox('ascod-s1-3', '(+) E/OU: Leucoaraiose grave (Fazekas III), ou microssangramentos, ou "état criblé"')}
                        ${ascodCheckbox('ascod-s1-4', '(+) E/OU: AITs repetidos recentes (<1 mês) no mesmo território')}
                        <h5 class="ascod-subtitulo">S2 (Ligação Causal Incerta)</h5>
                        ${ascodCheckbox('ascod-s2-1', 'Apenas um infarto lacunar recente E NENHUMA outra anormalidade na RM/TC')}
                        ${ascodCheckbox('ascod-s2-2', 'Síndrome lacunar clínica (hemiparesia pura, etc.) SEM lesão isquêmica visível')}
                        <h5 class="ascod-subtitulo">S3 (Ligação Causal Improvável)</h5>
                        ${ascodCheckbox('ascod-s3-1', 'Evidência de doença de pequenos vasos (Leucoaraiose, microssangramentos, lacunas antigas) SEM infarto lacunar recente sintomático')}
                        <h5 class="ascod-subtitulo">S9 (Investigação Incompleta)</h5>
                        ${ascodCheckbox('ascod-s9-1', 'RM (ou TC) não realizada')}
                    </div>
                </div>

                <div class="ascod-accordion-container">
                    <button class="ascod-accordion" onclick="toggleAscodCategory(this)">C - Fonte Cardíaca</button>
                    <div class="ascod-panel">
                        <h5 class="ascod-subtitulo">C1 (Potencialmente Causal)</h5>
                        <span class="sub-instrucao-titulo" style="padding: 0 0 10px;">AVC cardioembólico definido (lesões bi-hemisféricas, etc.) com <b>pelo menos uma</b> das seguintes:</span>
                        ${ascodCheckbox('ascod-c1-1', '(1) Estenose mitral (superfície <1,5 cm²)')}
                        ${ascodCheckbox('ascod-c1-2', '(2) Válvula mecânica')}
                        ${ascodCheckbox('ascod-c1-3', '(3) Infarto do miocárdio (< 4 semanas)')}
                        ${ascodCheckbox('ascod-c1-4', '(4) Trombo mural nas câmaras esquerdas')}
                        ${ascodCheckbox('ascod-c1-5', '(5) Aneurisma do ventrículo esquerdo')}
                        ${ascodCheckbox('ascod-c1-6', '(6) Fibrilação Atrial (>60 s) ou Flutter')}
                        ${ascodCheckbox('ascod-c1-7', '(7) Doença atrial (síndrome de bradicardia-taquicardia)')}
                        ${ascodCheckbox('ascod-c1-8', '(8) Cardiomiopatias dilatadas ou hipertróficas')}
                        ${ascodCheckbox('ascod-c1-9', '(9) Fração de ejeção do ventrículo esquerdo <35%')}
                        ${ascodCheckbox('ascod-c1-10', '(10) Endocardite')}
                        ${ascodCheckbox('ascod-c1-11', '(11) Massa intracardíaca')}
                        ${ascodCheckbox('ascod-c1-12', '(12) PFO e trombo in situ')}
                        ${ascodCheckbox('ascod-c1-13', '(13) PFO e embolia pulmonar/TVP precedendo o infarto')}
                        ${ascodCheckbox('ascod-c1-14', '(14) Patologias C1 com lesão isquêmica única/sem lesão óbvia')}
                        <h5 class="ascod-subtitulo">C2 (Ligação Causal Incerta)</h5>
                        ${ascodCheckbox('ascod-c2-1', '(1) PFO + aneurisma do septo atrial')}
                        ${ascodCheckbox('ascod-c2-2', '(2) PFO e embolia pulmonar (NÃO precedendo o infarto)')}
                        ${ascodCheckbox('ascod-c2-3', '(3) Eco-contraste espontâneo intracardíaco')}
                        ${ascodCheckbox('ascod-c2-4', '(4) Acinesia apical do VE e FE >35%')}
                        ${ascodCheckbox('ascod-c2-5', '(5) História de IAM ou palpitação/sopro (lesões bilaterais)')}
                        ${ascodCheckbox('ascod-c2-6', '(6) Nenhuma fonte cardíaca direta, mas infarto cerebral múltiplo (bilateral/bisterritorial) ou evidência de embolia sistêmica (renal, esplênica, etc.)')}
                        <h5 class="ascod-subtitulo">C3 (Ligação Causal Improvável)</h5>
                        <span class="sub-instrucao-titulo" style="padding: 0 0 10px;">Pelo menos uma das seguintes <b>isoladamente</b>:</span>
                        ${ascodCheckbox('ascod-c3-1', 'PFO (isolado)')}
                        ${ascodCheckbox('ascod-c3-2', 'Aneurisma do septo atrial (ASA) (isolado)')}
                        ${ascodCheckbox('ascod-c3-3', 'Strands (filamentos valvares) (isolado)')}
                        ${ascodCheckbox('ascod-c3-4', 'Calcificação mitral anular ou da valva aórtica (isolado)')}
                        ${ascodCheckbox('ascod-c3-5', 'Acinesia não apical do VE (isolado)')}
                        ${ascodCheckbox('ascod-c3-6', 'Fibrilação atrial transitória < 60 s (isolado)')}
                        ${ascodCheckbox('ascod-c3-7', 'Hiperexcitabilidade atrial (isolado)')}
                        <h5 class="ascod-subtitulo">C9 (Investigação Incompleta)</h5>
                        ${ascodCheckbox('ascod-c9-1', 'Mínimo é ECG e exame por cardiologista, na ausência de exames de imagem cardíacos')}
                    </div>
                </div>

                <div class="ascod-accordion-container">
                    <button class="ascod-accordion" onclick="toggleAscodCategory(this)">O - Outra Causa</button>
                    <div class="ascod-panel">
                        <h5 class="ascod-subtitulo">O1 (Potencialmente Causal)</h5>
                        ${ascodCheckbox('ascod-o1-1', '(1) Dolicoectasia com aneurisma complicado')}
                        ${ascodCheckbox('ascod-o1-2', '(2) Policitemia vera ou trombocitemia >800.000/mm³')}
                        ${ascodCheckbox('ascod-o1-3', '(3) Lúpus eritematoso sistêmico')}
                        ${ascodCheckbox('ascod-o1-4', '(4) Coagulação intravascular disseminada')}
                        ${ascodCheckbox('ascod-o1-5', '(5) Síndrome do anticorpo antifosfolipídio (>100 GPL ou anticoag. lúpico)')}
                        ${ascodCheckbox('ascod-o1-6', '(6) Doença de Fabry')}
                        ${ascodCheckbox('ascod-o1-7', '(7) Meningite coexistente')}
                        ${ascodCheckbox('ascod-o1-8', '(8) Anemia falciforme')}
                        ${ascodCheckbox('ascod-o1-9', '(9) Aneurisma intracraniano rompido com ou sem vasoespasmo')}
                        ${ascodCheckbox('ascod-o1-10', '(10) Hiper-homocisteinemia grave')}
                        ${ascodCheckbox('ascod-o1-11', '(11) Doença de Horton')}
                        ${ascodCheckbox('ascod-o1-12', '(12) Outras angiites cerebrais inflamatórias ou infecciosas')}
                        ${ascodCheckbox('ascod-o1-13', '(13) Doença de Moyamoya, etc...')}
                        <h5 class="ascod-subtitulo">O2 (Ligação Causal Incerta)</h5>
                        ${ascodCheckbox('ascod-o2-1', '(1) Aneurisma sacular (com suspeita de embolia)')}
                        ${ascodCheckbox('ascod-o2-2', '(2) Enxaqueca com déficit neurológico >60 min')}
                        ${ascodCheckbox('ascod-o2-3', '(3) Malformação arteriovenosa')}
                        <h5 class="ascod-subtitulo">O3 (Ligação Causal Improvável)</h5>
                        ${ascodCheckbox('ascod-o3-1', '(1) Trombocitose <800.000/mm³')}
                        ${ascodCheckbox('ascod-o3-2', '(2) Anticorpo antifosfolipídio <100 unidades GPL')}
                        ${ascodCheckbox('ascod-o3-3', '(3) Homocisteinemia <40 µmol/L')}
                        ${ascodCheckbox('ascod-o3-4', '(4) Malignoma associado a hipercoagulação (D-dímero, TVP, etc.)')}
                        <h5 class="ascod-subtitulo">O9 (Investigação Incompleta)</h5>
                        ${ascodCheckbox('ascod-o9-1', 'Não foi possível excluir outras causas (ex: líquor, hemostasia, marcadores...')}
                    </div>
                </div>

                <div class="ascod-accordion-container">
                    <button class="ascod-accordion" onclick="toggleAscodCategory(this)">D - Dissecção</button>
                    <div class="ascod-panel">
                        <h5 class="ascod-subtitulo">D1 (Potencialmente Causal)</h5>
                        ${ascodCheckbox('ascod-d1-1', '(1) Demonstração direta (hematoma mural, hipersinal em RM c/ supressão de gordura, etc.)')}
                        ${ascodCheckbox('ascod-d1-2', '(2) Demonstração indireta (estenose longa, etc.) + US inequívoco com recanalização')}
                        <h5 class="ascod-subtitulo">D2 (Ligação Causal Incerta)</h5>
                        ${ascodCheckbox('ascod-d2-1', '(1) Evidência fraca (história sugestiva, Horner doloroso, hist. prévia)')}
                        ${ascodCheckbox('ascod-d2-2', '(2) Displasia fibromuscular (DFM) em artéria que irriga o campo isquêmico')}
                        <h5 class="ascod-subtitulo">D3 (Ligação Causal Improvável)</h5>
                        ${ascodCheckbox('ascod-d3-1', '(1) Kinking ou dolicoectasia (sem aneurisma complicado)')}
                        ${ascodCheckbox('ascod-d3-2', '(2) DFM em artérias que NÃO irrigam o campo isquêmico')}
                        <h5 class="ascod-subtitulo">D9 (Investigação Incompleta)</h5>
                        ${ascodCheckbox('ascod-d9-1', 'Investigação incompleta (<60a com A1/S1/C1/O1 e exames de dissecção indisponíveis/inconclusivos)')}
                    </div>
                </div>

            </div> <div class="resultado-coluna">
                <div class="resultado-box-fixo">
                    <h3>ASCOD</h3>
                    <div class="placar-numero" id="ascod-placar-numero" style="font-size: 2.2em; margin-bottom: 10px;">
                        A0 S0 C0 O0 D0
                    </div>
                    <div class="placar-classificacao" id="ascod-placar-classificacao" style="font-size: 1.3em; margin-top: 15px;">
                        Etiologia Indeterminada
                    </div>
                    <h4 style="margin-top: 20px; margin-bottom: 5px; color: #333;">Resumo (p/ Prontuário):</h4>
                    <div class="placar-copia" id="ascod-placar-detalhe" style="font-size: 1.1em; text-align: center;">
                        ASCOD: A0 S0 C0 O0 D0
                    </div>
                </div>
            </div> </div> `;

    // 2. Injete o HTML na página
    injetarConteudo(htmlConteudo);
    
    // 3. Adiciona estilos necessários (reutilizando IDs de estilo que já criamos)
    adicionarEstiloASCOD_v3();

    // 4. Chame o cálculo uma vez para definir o estado inicial
    calcularASCOD_v3();
}

/**
 * Função NOVA para controlar a "sanfona"
 */
function toggleAscodCategory(btn) {
    btn.classList.toggle("active");
    const panel = btn.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}

/**
 * Função de CÁLCULO (v3.3) - Atualizada com Categoria D (FINAL)
 */
function calcularASCOD_v3() {
    
    const isChecked = (id) => document.getElementById(id).checked;

    // --- Categoria A ---
    let score_A = 0;
    let desc_A = "A0 (Não detectada)";
    if (isChecked('ascod-a1-1') || isChecked('ascod-a1-2') || isChecked('ascod-a1-3') || isChecked('ascod-a1-4')) {
        score_A = 1; desc_A = "A1 (Potencialmente Causal)";
    } else if (isChecked('ascod-a2-1') || isChecked('ascod-a2-2')) {
        score_A = 2; desc_A = "A2 (Causa Incerta)";
    } else if (isChecked('ascod-a3-1') || isChecked('ascod-a3-2') || isChecked('ascod-a3-3') || isChecked('ascod-a3-4') || isChecked('ascod-a3-5')) {
        score_A = 3; desc_A = "A3 (Doença Presente)";
    } else if (isChecked('ascod-a9-1')) {
        score_A = 9; desc_A = "A9 (Incompleta)";
    }
    
    // --- Categoria S ---
    let score_S = 0;
    let desc_S = "S0 (Não detectada)";
    const s1_1 = isChecked('ascod-s1-1');
    const s1_sub = isChecked('ascod-s1-2') || isChecked('ascod-s1-3') || isChecked('ascod-s1-4');
    if (s1_1 && s1_sub) {
        score_S = 1; desc_S = "S1 (Potencialmente Causal)";
    } else if (isChecked('ascod-s2-1') || isChecked('ascod-s2-2')) {
        score_S = 2; desc_S = "S2 (Ligação Incerta)";
    } else if (isChecked('ascod-s3-1')) {
        score_S = 3; desc_S = "S3 (Doença Presente)";
    } else if (isChecked('ascod-s9-1')) {
        score_S = 9; desc_S = "S9 (Incompleta)";
    }

    // --- Categoria C ---
    let score_C = 0;
    let desc_C = "C0 (Não detectada)";
    const c1_checked = isChecked('ascod-c1-1') || isChecked('ascod-c1-2') || isChecked('ascod-c1-3') || 
                       isChecked('ascod-c1-4') || isChecked('ascod-c1-5') || isChecked('ascod-c1-6') || 
                       isChecked('ascod-c1-7') || isChecked('ascod-c1-8') || isChecked('ascod-c1-9') || 
                       isChecked('ascod-c1-10') || isChecked('ascod-c1-11') || isChecked('ascod-c1-12') || 
                       isChecked('ascod-c1-13') || isChecked('ascod-c1-14');
    const c2_checked = isChecked('ascod-c2-1') || isChecked('ascod-c2-2') || isChecked('ascod-c2-3') || 
                       isChecked('ascod-c2-4') || isChecked('ascod-c2-5') || isChecked('ascod-c2-6');
    const c3_checked = isChecked('ascod-c3-1') || isChecked('ascod-c3-2') || isChecked('ascod-c3-3') || 
                       isChecked('ascod-c3-4') || isChecked('ascod-c3-5') || isChecked('ascod-c3-6') || 
                       isChecked('ascod-c3-7');
    if (c1_checked) {
        score_C = 1; desc_C = "C1 (Potencialmente Causal)";
    } else if (c2_checked) {
        score_C = 2; desc_C = "C2 (Ligação Incerta)";
    } else if (c3_checked) {
        score_C = 3; desc_C = "C3 (Doença Presente)";
    } else if (isChecked('ascod-c9-1')) {
        score_C = 9; desc_C = "C9 (Incompleta)";
    }

    // --- Categoria O ---
    let score_O = 0;
    let desc_O = "O0 (Não detectada)";
    const o1_checked = isChecked('ascod-o1-1') || isChecked('ascod-o1-2') || isChecked('ascod-o1-3') ||
                       isChecked('ascod-o1-4') || isChecked('ascod-o1-5') || isChecked('ascod-o1-6') ||
                       isChecked('ascod-o1-7') || isChecked('ascod-o1-8') || isChecked('ascod-o1-9') ||
                       isChecked('ascod-o1-10') || isChecked('ascod-o1-11') || isChecked('ascod-o1-12') ||
                       isChecked('ascod-o1-13');
    const o2_checked = isChecked('ascod-o2-1') || isChecked('ascod-o2-2') || isChecked('ascod-o2-3');
    const o3_checked = isChecked('ascod-o3-1') || isChecked('ascod-o3-2') || isChecked('ascod-o3-3') ||
                       isChecked('ascod-o3-4');
    if (o1_checked) {
        score_O = 1; desc_O = "O1 (Potencialmente Causal)";
    } else if (o2_checked) {
        score_O = 2; desc_O = "O2 (Ligação Incerta)";
    } else if (o3_checked) {
        score_O = 3; desc_O = "O3 (Doença Presente)";
    } else if (isChecked('ascod-o9-1')) {
        score_O = 9; desc_O = "O9 (Incompleta)";
    }

    // --- Categoria D ---
    let score_D = 0;
    let desc_D = "D0 (Não detectada)";
    const d1_checked = isChecked('ascod-d1-1') || isChecked('ascod-d1-2');
    const d2_checked = isChecked('ascod-d2-1') || isChecked('ascod-d2-2');
    const d3_checked = isChecked('ascod-d3-1') || isChecked('ascod-d3-2');
    
    if (d1_checked) {
        score_D = 1; desc_D = "D1 (Potencialmente Causal)";
    } else if (d2_checked) {
        score_D = 2; desc_D = "D2 (Ligação Incerta)";
    } else if (d3_checked) {
        score_D = 3; desc_D = "D3 (Doença Presente)";
    } else if (isChecked('ascod-d9-1')) {
        score_D = 9; desc_D = "D9 (Incompleta)";
    }


    // 4. Exibir o resultado
    const scores = [
        { letra: 'A', val: score_A, desc: desc_A },
        { letra: 'S', val: score_S, desc: desc_S },
        { letra: 'C', val: score_C, desc: desc_C },
        { letra: 'O', val: score_O, desc: desc_O },
        { letra: 'D', val: score_D, desc: desc_D }
    ];

    // Filtra apenas os que são prováveis (1, 2, 3) e ordena pelo mais provável (1)
    const provaveis = scores.filter(s => s.val > 0 && s.val < 9).sort((a, b) => a.val - b.val);

    let placarNumero = `A${score_A} S${score_S} C${score_C} O${score_O} D${score_D}`;
    let classificacao = 'Múltiplas causas ou Indeterminado';

    if (provaveis.length > 0) {
        const principal = provaveis[0]; // A etiologia mais provável
        placarNumero = `${principal.letra}${principal.val}`;
        classificacao = principal.desc;
        // Se houver mais de uma causa provável (ex: A1 e C1)
        if (provaveis.length > 1 && provaveis[1].val === principal.val) {
            placarNumero += ` + ${provaveis[1].letra}${provaveis[1].val}`;
            classificacao = "Múltiplas causas prováveis";
        }
    } else if (scores.some(s => s.val === 9)) {
        placarNumero = `A${score_A} S${score_S} C${score_C} O${score_O} D${score_D}`.replace(/0/g, '?');
        classificacao = "Avaliação Incompleta";
    } else if (scores.every(s => s.val === 0)) {
        placarNumero = "A0 S0 C0 O0 D0";
        classificacao = "Etiologia Indeterminada";
    }

    document.getElementById('ascod-placar-numero').innerText = placarNumero;
    document.getElementById('ascod-placar-classificacao').innerText = classificacao;
    document.getElementById('ascod-placar-detalhe').innerText = `ASCOD: A${score_A} S${score_S} C${score_C} O${score_O} D${score_D}`;
}

/**
 * Função auxiliar para criar UM checkbox
 */
function ascodCheckbox(id, texto) {
    return `
    <div class="opcao-radio" style="padding-left: 30px; border-bottom: none;">
        <label>
            <input type="checkbox" id="${id}" onchange="calcularASCOD_v3()">
            <span class="checkmark-check" style="top: 15px; left: 0;"></span>
            ${texto}
        </label>
    </div>
    `;
}

/**
 * Adiciona estilos necessários (v3.0)
 */
function adicionarEstiloASCOD_v3() {
    
    // 1. Estilo para Checkbox
    if (!document.getElementById('checkbox-style')) {
        const styleCheck = document.createElement('style');
        styleCheck.id = 'checkbox-style';
        styleCheck.innerHTML = `
            .checkmark-check {
                position: absolute; top: 15px; left: 20px; height: 20px; width: 20px;
                background-color: #eee; border: 1px solid #ccc; border-radius: 3px;
            }
            .opcao-radio:hover input ~ .checkmark-check { background-color: #ccc; }
            .opcao-radio input:checked ~ .checkmark-check { background-color: #007bff; border-color: #007bff; }
            .checkmark-check:after {
                content: ""; position: absolute; display: none;
                left: 7px; top: 3px; width: 5px; height: 10px;
                border: solid white; border-width: 0 3px 3px 0;
                transform: rotate(45deg);
            }
            .opcao-radio input:checked ~ .checkmark-check:after { display: block; }
        `;
        document.head.appendChild(styleCheck);
    }

    // 2. Estilo para Caixa de Cópia
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
    
    // 3. Estilo do Acordeão
    if (!document.getElementById('ascod-style')) {
        const styleSub = document.createElement('style');
        styleSub.id = 'ascod-style';
        styleSub.innerHTML = `
            .ascod-accordion {
                background-color: #f7faff; color: #005a9c; cursor: pointer;
                padding: 18px; width: 100%; border: none;
                border-bottom: 1px solid #e0e7f0; text-align: left;
                outline: none; font-size: 1.1em; font-weight: 700;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                transition: background-color 0.2s ease;
                position: relative; padding-left: 28px;
            }
            .ascod-accordion::before {
                content: ''; position: absolute; top: 0; left: 0;
                width: 8px; height: 100%; background-color: #005a9c;
            }
            .ascod-accordion::after {
                content: '+'; font-size: 1.3em; color: #005a9c;
                float: right; margin-left: 5px;
            }
            .ascod-accordion.active::after { content: "−"; }
            .ascod-accordion:hover, .ascod-accordion.active { background-color: #f0f7ff; }
            .ascod-panel {
                padding: 0 18px; background-color: white;
                display: none; overflow: hidden;
                border: 1px solid #e0e7f0; border-top: none;
            }
            .ascod-subtitulo {
                padding: 10px 0 5px; color: #005a9c; font-size: 0.9em;
                font-weight: 700; margin: 10px 0 0 0;
                border-top: 1px dashed #eee;
            }
            .ascod-panel .ascod-subtitulo:first-of-type {
                margin-top: 15px; border-top: none;
            }
            .ascod-panel .opcao-radio { border-bottom: none; }
        `;
        document.head.appendChild(styleSub);
    }
}