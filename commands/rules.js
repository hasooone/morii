const { SlashCommandBuilder } = require('discord.js');
const rules = require('../rules.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('يعرض قوانين السيرفر')
    .addChannelOption(option =>
      option.setName('روم')
        .setDescription('الروم اللي تبعت فيه (اختياري)')),
  async execute(interaction) {
    const channel = interaction.options.getChannel('روم');
    const text = rules.filter(r => r).join('\n');

    if (channel) {
      await channel.send(text);
      await interaction.reply({ content: '✅ تم إرسال القوانين', ephemeral: true });
    } else {
      await interaction.reply(text);
    }
  },
};
