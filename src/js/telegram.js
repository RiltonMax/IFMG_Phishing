const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
const telegramBaseUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export const sendMessageToTelegram = async (message) => {
  try {
    const params = new URLSearchParams();
    params.append("chat_id", TELEGRAM_CHAT_ID);
    params.append("parse_mode", "Markdown");
    params.append("text", message);

    const response = await fetch(`${telegramBaseUrl}/sendMessage?${params}`);
    const data = await response.json();

    return data.ok;
  } catch (e) {
    console.log(e);
  }
};