const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('يعرض سرعة الاتصال'),
  async execute(interaction) {
    const reply = await interaction.reply({
      content: 'قياس السرعة...',
      withResponse: true,
    });
    const latency = reply.resource.message.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply(
      `🏓 Pong! الـ latency: ${latency}ms | API: ${interaction.client.ws.ping}ms`,
    );
  },
};
