const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { requireAdmin } = require('../utils/permissions');

const COLOR = 0x0099FF;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('يبعت القوانين في إطار مرتب')
    .addStringOption(option =>
      option.setName('القوانين')
        .setDescription('اكتب القوانين هنا')
        .setRequired(true))
    .addChannelOption(option =>
      option.setName('روم')
        .setDescription('الروم اللي تبعت فيه (اختياري)')),
  async execute(interaction) {
    if (!requireAdmin(interaction)) return;
    const text = interaction.options.getString('القوانين');
    const channel = interaction.options.getChannel('روم');

    const embed = new EmbedBuilder()
      .setDescription(text)
      .setColor(COLOR);

    if (channel) {
      await channel.send({ embeds: [embed] });
      await interaction.reply({ content: '✅ تم إرسال القوانين', ephemeral: true });
    } else {
      await interaction.reply({ embeds: [embed] });
    }
  },
};
