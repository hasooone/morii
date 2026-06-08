const ALLOWED_ROLE = '1513406970919391393';

module.exports = {
  async requireAdmin(interaction) {
    const member = await interaction.member.fetch();
    if (!member.roles.cache.has(ALLOWED_ROLE)) {
      await interaction.reply({ content: '❌ ما عندك صلاحية لاستخدام هذا الأمر', ephemeral: true });
      return false;
    }
    return true;
  },
};
