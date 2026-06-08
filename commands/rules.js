const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const rules = require('../rules.json');

const COLOR = 0xFFD700;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('يعرض قوانين السيرفر')
    .addChannelOption(option =>
      option.setName('روم')
        .setDescription('الروم اللي تبعت فيه (اختياري)')),
  async execute(interaction) {
    const channel = interaction.options.getChannel('روم');

    const embed = new EmbedBuilder()
      .setColor(COLOR);

    const items = rules.filter(r => r);
    embed.setDescription(items[0]);

    for (let i = 1; i < items.length; i++) {
      const [title, ...rest] = items[i].replace(/\*\*/g, '').split(' : ');
      embed.addFields({ name: title, value: rest.join(' : ') });
    }

    if (channel) {
      await channel.send({ embeds: [embed] });
      await interaction.reply({ content: '✅ تم إرسال القوانين', ephemeral: true });
    } else {
      await interaction.reply({ embeds: [embed] });
    }
  },
};
