import { Client, Intents } from "discord.js";
import { BOT_TOKEN } from "./config.js";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", (client) => {
  const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${client?.user?.id}&permissions=74759&scope=bot`;
  const botTag = client?.user?.tag;
  console.log(
    `${botTag} is ready to ban spammers!\n` +
      `Invite ${botTag} to your server using this link: ${inviteLink}`
  );
});

client.on("message", (message) => {
  console.log(message.content);
});

client.login(BOT_TOKEN);
