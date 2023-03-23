const Telegram = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

const botToken = "Token Bot Telegram";
const openaiToken = "Token OpenAI";

const config = new Configuration({
  apiKey: openaiToken,
});

const openai = new OpenAIApi(config);

const bot = new Telegram(botToken, { polling: true });

bot.onText(/\/start/, (i) => {
  bot.sendMessage(i.chat.id, "Welcome Bot by Ilham Dika, slilahkan tulis chat apapun nanti biar bot ini akan menjawab");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  const reply = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: msg.text,
    temperature: 0.86,
    max_tokens: 3314,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,

  });

  bot.sendMessage(chatId, reply.data.choices[0].text);
});