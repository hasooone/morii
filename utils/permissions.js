const ALLOWED_ROLE = '1513406970919391393';

module.exports = {
  requireAdmin(interaction) {
    if (!interaction.member.roles.cache.has(ALLOWED_ROLE)) {
      interaction.reply({ content: '❌ ما عندك صلاحية لاستخدام هذا الأمر', ephemeral: true });
      return false;
    }
    return true;
  },
};
