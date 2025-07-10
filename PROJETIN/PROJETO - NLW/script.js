const apiKeyInput = document.getElementById('apiKey');
const gameSelect = document.getElementById('game-select');
const questionInput = document.getElementById('question');
const askButton = document.querySelector('button');
const aiResponse = document.getElementById('ai-response');  
const form = document.querySelector('form');

const markdowntoHtml = (resposta) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(resposta);
}

//AIzaSyDSVcbh2-U41-lhU-f7jQQSvyaAiyJUcRw
const perguntarIa = async (question, game, apiKey) => {
    const model = 'gemini-2.0-flash';
    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey;
    const quest = `
    ## Especialidade: ${game}
    Voce é um especialista em ${game} e pode responder perguntas sobre o jogo.
    ## Tarefa:
    Responda a pergunta do usuário com base no conhecimento sobre o jogo ${game}. 
    ## Regras: 
    Se voce não souber a resposta, diga que não sabe e não invente uma resposta.
    Se a pergunta não for sobre o jogo ${game}, diga que não sabe responder com base no jogo selecionado.
    Considere a data atual ${new Date().toLocaleDateString('pt-BR')}.
    Faça pesquisas atualizadas sobre o patch atual do jogo ${game} para responder a pergunta.
    Nunca responda itens que você não tenha certeza, sempre diga que não sabe.
    ## Resposta:
    Economize na resposta, seja objetivo e direto ao ponto. Responda com no máximo 500 caracteres.
    Responda em Markdown, com subtítulos, listas e negrito quando necessário.
    ## Exemplo de resposta:
        Para o mapa "Fracture" no jogo Valorant, a melhor estratégia é:
        - **Ataque A**: Utilize agentes com habilidades de controle de área, como Omen e Viper, para dominar o ponto A.
        - **Ataque B**: Use agentes com habilidades de mobilidade, como Jett e Raze, para surpreender os inimigos no ponto B.
        - **Defesa**: Coloque sentinelas em pontos estratégicos para garantir visão e controle do mapa. Os pontos estratégicos incluem:
            - **Ponto A**: Coloque uma câmera no alto do ponto A para ter visão ampla.
            - **Ponto B**: Use um drone para verificar a presença de inimigos antes de avançar.
        - **Dicas**:
            - Sempre comunique-se com sua equipe sobre a posição dos inimigos.
            - Utilize habilidades de controle de área para atrasar o avanço inimigo.
        - **Build recomendada**:
        - **Armas**: Use rifles de precisão como Vandal ou Phantom para maior dano.
        - **Habilidades**: Invista em habilidades de controle de área e mobilidade para maximizar sua eficácia no mapa.
        
    ## Pergunta:
    ${question}
    `
    const contents = [{
        role : 'user',
        parts: [{
            text: quest
        }]
    }]

    const tools = [{
        googleSearch: {}
    }]

        //chamada API
    const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            contents,
            tools
        })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text;
}

    

const sendForm = async (event) => {
    event.preventDefault(); 
    const apiKey = apiKeyInput.value;
    const game = gameSelect.value;
    const question = questionInput.value;

    if (apiKey=== '' || game === '' || question === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    askButton.disabled = true;
    askButton.textContent = 'Enviando...';
    askButton.classList.add('loading');

    try {
        //Perguntar para a IA.
        //Exibir resposta da IA.
        const resposta = await perguntarIa(question, game, apiKey);
        aiResponse.querySelector('.response-content').innerHTML = markdowntoHtml(resposta);

    } catch (error) {
        console.log("Erro:", error)
    } finally {
        askButton.disabled = false;
        askButton.textContent = 'Perguntar';
        askButton.classList.remove('loading');  
        aiResponse.classList.remove('hidden'); 
    }
} 

form.addEventListener( 'submit', sendForm)