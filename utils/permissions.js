module.exports = {
  requireAdmin(interaction) {
    if (!interaction.member.permissions.has('Administrator')) {
      interaction.reply({ content: '❌ ما عندك صلاحية لاستخدام هذا الأمر', ephemeral: true });
      return false;
    }
    return true;
  },
};
