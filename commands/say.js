const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('يخليني أبعث رسالة')
    .addStringOption(option =>
      option.setName('رسالة')
        .setDescription('النص اللي تريدني أبعثه')
        .setRequired(true))
    .addChannelOption(option =>
      option.setName('روم')
        .setDescription('الروم اللي تبعت فيه (اختياري)')),
  async execute(interaction) {
    const message = interaction.options.getString('رسالة');
    const channel = interaction.options.getChannel('روم');

    const target = channel || interaction.channel;

    const sendMessage = (content) => {
      if (content.length <= 2000) return target.send(content);
      if (content.length <= 4096) {
        return target.send({ embeds: [new EmbedBuilder().setDescription(content).setColor(0x0099FF)] });
      }
      const chunks = [];
      for (let i = 0; i < content.length; i += 2000) chunks.push(content.slice(i, i + 2000));
      target.send(chunks[0]);
      for (let i = 1; i < chunks.length; i++) target.send(chunks[i]);
    };

    await sendMessage(message);

    if (channel) {
      await interaction.reply({ content: '✅ تم الإرسال', ephemeral: true });
    }
  },
};
