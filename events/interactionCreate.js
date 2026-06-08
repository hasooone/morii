const ALLOWED_ROLE = '1513406970919391393';

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    try {
      const member = await interaction.member.fetch();
      if (!member.roles.cache.has(ALLOWED_ROLE)) {
        return await interaction.reply({
          content: '❌ ما عندك صلاحية لاستخدام هذا الأمر',
          ephemeral: true,
        });
      }
    } catch {
      return await interaction.reply({
        content: '❌ ما عندك صلاحية لاستخدام هذا الأمر',
        ephemeral: true,
      });
    }

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: 'حدث خطأ أثناء تنفيذ الأمر!',
        ephemeral: true,
      });
    }
  },
};
