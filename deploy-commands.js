const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token, clientId, guildId } = require('./config');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`تسجيل ${commands.length} أمر...`);
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );
    console.log(`تم تسجيل ${data.length} أمر بنجاح!`);
  } catch (err) {
    console.error(err);
  }
})();
