const { inputChannelId, outputChannelId } = require('../config');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;
    if (message.channel.id !== inputChannelId) return;

    const target = message.client.channels.cache.get(outputChannelId);
    if (!target) return;

    const content = message.content;
    const attachment = message.attachments.first();

    if (content && attachment) {
      await target.send({ content: `# **${content}**`, files: [attachment.url] });
    } else if (attachment) {
      await target.send({ files: [attachment.url] });
    } else if (content) {
      await target.send(`# **${content}**`);
    }

    await message.delete();
  },
};
