const apiKeyInput =document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form =document.getElementById('form')


form.addEventListener('submit', (event) => {
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

    try{

    }
    catch (error){
console.log('error', error)
    }finally{
        askButton.disabled = false
        askButton.textContent = 'Perguntar'
        askButton.classList.remove('loading')
    }
}
)
