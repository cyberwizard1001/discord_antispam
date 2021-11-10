import { Client, Intents } from "discord.js";
import { BOT_TOKEN } from "./config.js";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Stores the previous message sent by a user
const messageStore = {};

client.once("ready", (client) => {
  const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${client?.user?.id}&permissions=74759&scope=bot`;
  const botTag = client?.user?.tag;
  console.log(
    `${botTag} is ready to ban spammers!\n` +
      `Invite ${botTag} to your server using this link: ${inviteLink}`
  );
});

client.on("messageCreate", async (message) => {
  if (message.channel.type === "DM") return;

  // Retrieve user id of person who sent message
  const userId = message.author?.id;

  // Check if the message content is the same as the last message what they sent in the last one minute
  if (
    message.content?.length >= 10 &&
    messageStore[userId]?.content == message.content &&
    messageStore[userId]?.timestamp + 60000 > Date.now()
  ) {
    await message.member?.kick();
    const invite = await message.channel.createInvite({
      maxUses: 1,
      reason: "Automatic spam/kick reinvite",
    });
    await message.author.send(
      `Hi! I had to kick you because you flagged my spam detection. If you think this was a mistake, please join the server ${invite.url}`
    );
  }

  messageStore[userId] = {
    content: message.content,
    timestamp: Date.now(),
  };
});

client.login(BOT_TOKEN);
