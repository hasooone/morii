function hasRole(member, roleName) {
  return member.roles.cache.some(r => r.name === roleName);
}

module.exports = {
  requireAdmin(interaction) {
    if (!hasRole(interaction.member, 'ادمن ستريتر')) {
      interaction.reply({ content: '❌ ما عندك صلاحية لاستخدام هذا الأمر', ephemeral: true });
      return false;
    }
    return true;
  },
};
