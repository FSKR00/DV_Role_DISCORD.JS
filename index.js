const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(
    `Profile : ${client.user.tag}\nToken : ${token}\n위와 같은 정보로 성공적으로 로그인하였습니다.\n\nCopyright © & ㅁㅅ#0001. All rights reserved.`
  );
  setInterval(() => {
    const statues = [`SVN Entertainment`];

    const status = statues[Math.floor(Math.random() * statues.length)];
    client.user.setActivity(status, { type: "PLAYING" });
  }, 3000);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "ERROR 관리자에게 문의하십시오.",
      ephemeral: true,
    });
  }
});

client.login(token);
