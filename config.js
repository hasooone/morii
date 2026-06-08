const config = {
  token: process.env.TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  inputChannelId: process.env.INPUT_CHANNEL_ID,
  outputChannelId: process.env.OUTPUT_CHANNEL_ID,
};

const missing = Object.entries(config).filter(([, v]) => !v);
if (missing.length) {
  const local = require('./config.json');
  Object.assign(config, local);
}

module.exports = config;
