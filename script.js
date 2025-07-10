const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const markdownToHtml = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

const perguntarAI = async (question, game, apiKey) => {

    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const pergunta = `
## Especialidade
Voce e um especialista em assistente de meta para o jogo ${game}
## Tarefa
Voce deve responder as perguntas do usuario com base no seu conhecimento do jogo, estrategias e dicas
## Regras 
-Se voce nao sabe a resposta, responda: "Desculpe, nao consegui encontrar uma resposta para isso" nao tente inventar uma resposta.
-Considere a data atual ${new Date().toLocaleDateString()}
-Faca pesquisa atualizadas sobre o pach atual, baseado na data atual, pada dar uma resposta coerente.
-Nunca responda itens que voce nao tenha certeza que exista no pach atual.

## Resposta 
-Economize na resposta, seja direto e responda no maximo 150 palavras
-responda em markdown
- nao precisa fazer nenhuma saudacao ou despedida, apenas responda o que o usuario esta querendo. 

## Pergunta
aqui esta a pergunda do usuario:${question}
`

    const contents = [{
        role: 'user',
        parts: [{
            text: pergunta
        }]
    }]

    const tools = [{
        google_search: {}
    }]
    // chamada API
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })
    const data = await response.json()

    return data.candidates[0].content.parts[0].text
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const apiKey = apiKeyInput.value;
    const game = gameSelect.value;
    const question = questionInput.value;

    if (apiKey == '' || game == '' || question == '') {
        alert('Preencha todos os campos')
        return

    }
    askButton.disabled = true
    askButton.textContent = 'Carregando...'
    askButton.classList.add('loading')

    try {
        const text = await perguntarAI(question, game, apiKey)
        aiResponse.querySelector('.response-content').innerHTML = markdownToHtml(text)
        aiResponse.classList.remove('hidden')
    }
    catch (error) {
        console.log('error', error)
    } finally {
        askButton.disabled = false
        askButton.textContent = 'Perguntar'
        askButton.classList.remove('loading')
    }
}
)
