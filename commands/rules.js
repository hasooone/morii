const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('يخليني أبعث أي شيء')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('النص اللي تريدني أبعثه')
        .setRequired(true))
    .addChannelOption(option =>
      option.setName('روم')
        .setDescription('الروم اللي تبعت فيه (اختياري)')),
  async execute(interaction) {
    const text = interaction.options.getString('text');
    const channel = interaction.options.getChannel('روم');

    if (channel) {
      await channel.send(text);
      await interaction.reply({ content: '✅ تم', ephemeral: true });
    } else {
      await interaction.reply(text);
    }
  },
};
