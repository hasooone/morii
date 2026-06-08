const { SlashCommandBuilder } = require('discord.js');
const { requireAdmin } = require('../utils/permissions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('يعرض سرعة الاتصال'),
  async execute(interaction) {
    if (!(await requireAdmin(interaction))) return;
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
