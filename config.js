let local = {};
try {
  local = require('./config.json');
} catch {}

const config = {
  token: process.env.TOKEN || local.token,
  clientId: process.env.CLIENT_ID || local.clientId,
  guildId: process.env.GUILD_ID || local.guildId,
  inputChannelId: process.env.INPUT_CHANNEL_ID || local.inputChannelId,
  outputChannelId: process.env.OUTPUT_CHANNEL_ID || local.outputChannelId,
};

module.exports = config;
